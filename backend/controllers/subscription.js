const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { Subscription } = require('../models');
const { sendSuccess } = require('../utils/response');
const { sendConfirmationEmail, sendInvoiceEmail, sendOngoingPlanWelcomeEmail, sendAlreadySubscribedEmail } = require('../utils/email');
const { generateInvoicePDF } = require('../utils/pdf');
const { catchAsync } = require('../middlewares/requestHandler');
const logger = require('../utils/logger');
const config = require('../config/environment');
const { PLAN_TYPE_MAP, ONGOING_PLANS } = require('../config/planTypes');

exports.createPaymentIntent = catchAsync(async (req, res, next) => {
    const { plans, totalPrice, customerData } = req.body;

    // Basic validation
    if (!Array.isArray(plans) || plans.length === 0 || !totalPrice || !customerData?.email || !customerData?.firstName || !customerData?.lastName) {
        return res.status(400).json({ success: false, message: 'Missing or invalid request data' });
    }

    // Separate plans
    const oneTimePlans = plans.filter(p => PLAN_TYPE_MAP[p.planTitle] === 'one-time');
    const ongoingPlans = plans.filter(p => PLAN_TYPE_MAP[p.planTitle] === 'ongoing');

    // Check if user already has any active ongoing plans (ONLY for ongoing plans)
    if (ongoingPlans.length > 0) {
        const existingOngoing = await Subscription.findOne({
            'customerDetails.email': customerData.email,
            'plans.planTitle': { $in: ongoingPlans.map(p => p.planTitle) },
            status: 'active',
            paymentStatus: 'succeeded',
            planType: 'ongoing'  // Only check for ongoing plans
        });

        if (existingOngoing) {
            logger.info(`User ${customerData.email} already has active ongoing plan(s)`);
            
            // Send "already subscribed" email
            try {
                await sendAlreadySubscribedEmail(customerData, existingOngoing);
                logger.info(`Already subscribed email sent to: ${customerData.email}`);
            } catch (emailError) {
                logger.error('Error sending already subscribed email:', emailError);
            }

            return res.status(400).json({ 
                success: false, 
                message: 'You already have an active ongoing subscription. Check your email for details.',
                existingSubscription: {
                    id: existingOngoing._id,
                    plans: existingOngoing.plans,
                    subscriptionDate: existingOngoing.createdAt
                }
            });
        }
    }

    const responsePayload = {};

    // ✅ Handle one-time plans (can be purchased multiple times)
    if (oneTimePlans.length > 0) {
        const oneTimeTotal = oneTimePlans.reduce((sum, plan) => sum + (plan.price || 0), 0);

        const metadata = {
            numberOfPlans: oneTimePlans.length.toString(),
            totalPrice: oneTimeTotal.toString(),
            customerEmail: customerData.email,
            customerFirstName: customerData.firstName,
            customerLastName: customerData.lastName,
            customerPhone: customerData.phone || '',
            planTitles: oneTimePlans.map(p => p.planTitle).join(', ').substring(0, 500),
            plansData: JSON.stringify(oneTimePlans).substring(0, 500),
            planType: 'one-time'
        };

        let paymentIntent;
        try {
            paymentIntent = await stripe.paymentIntents.create({
                amount: Math.round(oneTimeTotal * 100),
                currency: 'usd',
                automatic_payment_methods: { enabled: true },
                metadata,
                receipt_email: customerData.email,
                description: `One-time Plans for ${customerData.email}`
            });
        } catch (err) {
            logger.error('Error creating payment intent for one-time plans', err);
            return res.status(500).json({ success: false, message: 'Failed to create payment intent' });
        }

        responsePayload.oneTime = {
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id,
            amount: oneTimeTotal
        };

        logger.info('Created payment intent for one-time plans', responsePayload.oneTime);
    }

    // ✅ Handle recurring ongoing plan (only one active at a time)
    if (ongoingPlans.length > 0) {
        const plan = ongoingPlans[0]; // Assuming only one ongoing allowed at a time

        let customer;
        try {
            // Check if customer already exists in Stripe
            const existingCustomers = await stripe.customers.list({
                email: customerData.email,
                limit: 1
            });

            if (existingCustomers.data.length > 0) {
                customer = existingCustomers.data[0];
                logger.info(`Using existing Stripe customer: ${customer.id}`);
            } else {
                customer = await stripe.customers.create({
                    name: `${customerData.firstName} ${customerData.lastName}`,
                    email: customerData.email,
                    metadata: {
                        firstName: customerData.firstName,
                        lastName: customerData.lastName,
                        phone: customerData.phone || ''
                    }
                });
                logger.info(`Created new Stripe customer: ${customer.id}`);
            }
        } catch (err) {
            logger.error('Error creating/finding Stripe customer for ongoing plan', err);
            return res.status(500).json({ success: false, message: 'Failed to create Stripe customer' });
        }

        let product;
        try {
            // Check if product already exists
            const products = await stripe.products.list({
                active: true,
                limit: 100
            });
            
            const existingProduct = products.data.find(p => p.name === plan.planTitle);
            
            if (existingProduct) {
                product = existingProduct;
                logger.info(`Using existing product: ${product.id}`);
            } else {
                product = await stripe.products.create({ 
                    name: plan.planTitle,
                    description: `Ongoing ${plan.planTitle} subscription`
                });
                logger.info(`Created new product: ${product.id}`);
            }
        } catch (err) {
            logger.error('Error creating/finding product for ongoing plan', err);
            return res.status(500).json({ success: false, message: 'Failed to create product for ongoing plan' });
        }

        let price;
        try {
            // Check if price already exists for this product
            const prices = await stripe.prices.list({
                product: product.id,
                active: true
            });
            
            const existingPrice = prices.data.find(p => 
                p.unit_amount === Math.round(plan.price * 100) && 
                p.recurring?.interval === 'month'
            );
            
            if (existingPrice) {
                price = existingPrice;
                logger.info(`Using existing price: ${price.id}`);
            } else {
                price = await stripe.prices.create({
                    unit_amount: Math.round(plan.price * 100),
                    currency: 'usd',
                    recurring: { interval: 'month' },
                    product: product.id
                });
                logger.info(`Created new price: ${price.id}`);
            }
        } catch (err) {
            logger.error('Error creating/finding price for ongoing plan', err);
            return res.status(500).json({ success: false, message: 'Failed to create price for ongoing plan' });
        }

        let subscription;
        try {
            subscription = await stripe.subscriptions.create({
                customer: customer.id,
                items: [{ price: price.id }],
                metadata: {
                    planTitle: plan.planTitle,
                    customerEmail: customerData.email,
                    customerFirstName: customerData.firstName,
                    customerLastName: customerData.lastName,
                    customerPhone: customerData.phone || '',
                    planType: 'ongoing',
                    isFirstTimeSubscription: 'true',
                    totalPrice: plan.price.toString(),
                    numberOfEmployees: plan.numberOfEmployees?.toString() || '0',
                    plansData: JSON.stringify([plan])
                },
                payment_behavior: 'default_incomplete',
                expand: ['latest_invoice.payment_intent'],
                collection_method: 'charge_automatically',
                proration_behavior: 'none'
            });
        } catch (err) {
            logger.error('Error creating subscription for ongoing plan', err);
            return res.status(500).json({ success: false, message: 'Failed to create subscription' });
        }

        responsePayload.ongoing = {
            clientSecret: subscription.latest_invoice.payment_intent.client_secret,
            subscriptionId: subscription.id,
            customerId: customer.id,
            amount: plan.price
        };

        logger.info('Created subscription for ongoing plan', responsePayload.ongoing);
    }

    if (!responsePayload.oneTime && !responsePayload.ongoing) {
        return res.status(400).json({ success: false, message: 'No valid plans to process.' });
    }

    sendSuccess(res, responsePayload, 'Checkout session created');
});

/**
 * Handle Stripe webhook
 * POST /api/subscription/webhook
 */
exports.handleWebhook = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, config.stripe.webhookSecret);
    } catch (err) {
        logger.error(`Webhook signature verification failed: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    try {
        switch (event.type) {
            case 'payment_intent.succeeded':
                logger.info('Payment Intent succeeded:', event.data.object);
                
                // Check if this payment intent is part of a subscription
                const paymentIntent = event.data.object;
                const isSubscriptionPayment = paymentIntent.invoice || paymentIntent.metadata?.planType === 'ongoing';
                
                if (isSubscriptionPayment) {
                    logger.info('Payment intent is part of subscription, will be handled by invoice webhook');
                    // Don't process here - let the invoice webhook handle it
                } else {
                    // This is a true one-time payment
                    await handlePaymentSuccess(paymentIntent, 'one-time');
                }
                break;

            case 'invoice.payment_succeeded':
            case 'invoice_payment.paid': // Handle both event names
                const invoice = event.data.object;
                logger.info('Invoice payment succeeded:', invoice);
                
                if (invoice.billing_reason === 'subscription_create') {
                    // First time subscription payment
                    const paymentIntent = invoice.payment_intent;
                    const paymentIntentData = await stripe.paymentIntents.retrieve(paymentIntent);
                    await handlePaymentSuccess(paymentIntentData, 'ongoing', true);
                } else if (invoice.billing_reason === 'subscription_cycle') {
                    // Monthly renewal
                    await handleSubscriptionRenewal(invoice);
                }
                break;

            case 'invoice.paid':
                const paidInvoice = event.data.object;
                logger.info('Invoice paid:', paidInvoice);
                
                if (paidInvoice.billing_reason === 'subscription_create') {
                    const paymentIntent = paidInvoice.payment_intent;
                    const paymentIntentData = await stripe.paymentIntents.retrieve(paymentIntent);
                    await handlePaymentSuccess(paymentIntentData, 'ongoing', true);
                } else if (paidInvoice.billing_reason === 'subscription_cycle') {
                    await handleSubscriptionRenewal(paidInvoice);
                }
                break;

            case 'payment_intent.payment_failed':
            case 'invoice.payment_failed':
                await handlePaymentFailure(event.data.object);
                break;

            case 'customer.subscription.deleted':
                await handleSubscriptionCancellation(event.data.object);
                break;

            default:
                logger.info(`Unhandled event type: ${event.type}`);
        }

        res.json({ received: true });
    } catch (error) {
        logger.error('Webhook processing error:', error);
        res.status(500).json({ error: 'Webhook processing failed' });
    }
};

// Handle successful payment with improved duplicate prevention
async function handlePaymentSuccess(paymentIntent, planType = 'one-time', isFirstTimeOngoing = false) {
    try {
        logger.info(`Payment succeeded: ${paymentIntent.id}`);

        // Enhanced duplicate check - check by payment intent AND plan type
        const existingSubscription = await Subscription.findOne({
            stripePaymentIntentId: paymentIntent.id,
            planType: planType  // Add plan type to make it unique
        });

        if (existingSubscription) {
            logger.info(`Subscription already exists for payment intent: ${paymentIntent.id} with planType: ${planType}`, {
                existingId: existingSubscription._id,
                existingStatus: existingSubscription.status,
                existingPlanType: existingSubscription.planType
            });
            
            // Update the existing subscription if it's incomplete
            if (existingSubscription.paymentStatus !== 'succeeded') {
                existingSubscription.paymentStatus = 'succeeded';
                existingSubscription.status = 'active';
                await existingSubscription.save();
                logger.info(`Updated existing subscription status: ${existingSubscription._id}`);
            }
            
            return existingSubscription;
        }

        // Retrieve customer details from metadata
        let metadata = paymentIntent.metadata || {};
        
        // For ongoing subscriptions, try to get metadata from the subscription object
        if (planType === 'ongoing' && isFirstTimeOngoing) {
            try {
                const paymentIntentExpanded = await stripe.paymentIntents.retrieve(paymentIntent.id, {
                    expand: ['invoice', 'invoice.subscription']
                });
                
                if (paymentIntentExpanded.invoice && paymentIntentExpanded.invoice.subscription) {
                    const subscriptionMetadata = paymentIntentExpanded.invoice.subscription.metadata || {};
                    // Merge subscription metadata with payment intent metadata (subscription takes priority)
                    metadata = { ...metadata, ...subscriptionMetadata };
                    logger.info('Retrieved metadata from subscription:', subscriptionMetadata);
                }
            } catch (stripeError) {
                logger.warn('Could not retrieve subscription metadata:', stripeError.message);
            }
        }
        
        // Fallback to Stripe's billing details if metadata doesn't have customer details
        const billingDetails = paymentIntent.billing_details || {};
        
        const customerDetails = {
            firstName: metadata.customerFirstName || (billingDetails.name ? billingDetails.name.split(' ')[0] : 'Unknown'),
            lastName: metadata.customerLastName || (billingDetails.name ? billingDetails.name.split(' ').slice(1).join(' ') : 'Unknown'),
            email: metadata.customerEmail || billingDetails.email || paymentIntent.receipt_email || 'Unknown',
            phone: metadata.customerPhone || billingDetails.phone || 'Unknown',
        };

        // If any customer data is missing, log the error but proceed
        if (!customerDetails.firstName || !customerDetails.lastName || !customerDetails.email || customerDetails.email === 'Unknown') {
            logger.error('Missing required customer details:', {
                customerDetails,
                paymentIntentMetadata: paymentIntent.metadata,
                subscriptionMetadata: metadata
            });
        }

        let plans = [];
        let totalPriceFromMetadata = 0;

        if (metadata.plansData) {
            try {
                plans = JSON.parse(metadata.plansData);
                // Calculate total from parsed plans as backup
                totalPriceFromMetadata = plans.reduce((sum, plan) => sum + (plan.price || 0), 0);
                logger.info('Parsed plans data successfully:', { plans, calculatedTotal: totalPriceFromMetadata });
            } catch (parseError) {
                logger.error('Error parsing plans data:', parseError);
                // Create a fallback plan if parsing fails
                plans = [{
                    planTitle: metadata.planTitles || metadata.planTitle || 'Unknown Plan',
                    price: parseFloat(metadata.totalPrice || 0),
                    numberOfEmployees: parseInt(metadata.numberOfEmployees || 0)
                }];
                totalPriceFromMetadata = parseFloat(metadata.totalPrice || 0);
            }
        } else {
            // If no plansData in metadata, create fallback plan
            const fallbackPrice = parseFloat(metadata.totalPrice || 0);
            plans = [{
                planTitle: metadata.planTitles || metadata.planTitle || 'Unknown Plan',
                price: fallbackPrice,
                numberOfEmployees: parseInt(metadata.numberOfEmployees || 0)
            }];
            totalPriceFromMetadata = fallbackPrice;
        }

        // Use the higher value between metadata totalPrice and calculated total
        const finalTotalPrice = Math.max(
            parseFloat(metadata.totalPrice || 0),
            totalPriceFromMetadata
        );

        logger.info('Price calculation details:', {
            metadataTotalPrice: metadata.totalPrice,
            calculatedFromPlans: totalPriceFromMetadata,
            finalTotalPrice: finalTotalPrice,
            plansCount: plans.length
        });

        // For ongoing subscriptions, get the Stripe subscription ID from the invoice
        let stripeSubscriptionId = null;
        if (planType === 'ongoing' && isFirstTimeOngoing) {
            try {
                // Try to find the subscription ID from Stripe
                const paymentIntentExpanded = await stripe.paymentIntents.retrieve(paymentIntent.id, {
                    expand: ['invoice', 'invoice.subscription']
                });
                
                if (paymentIntentExpanded.invoice && paymentIntentExpanded.invoice.subscription) {
                    stripeSubscriptionId = paymentIntentExpanded.invoice.subscription.id || paymentIntentExpanded.invoice.subscription;
                }
            } catch (stripeError) {
                logger.warn('Could not retrieve Stripe subscription ID:', stripeError.message);
            }
        }

        const subscriptionData = {
            plans,
            totalPrice: finalTotalPrice,
            customerDetails,
            stripePaymentIntentId: paymentIntent.id,
            paymentStatus: 'succeeded',
            status: 'active',
            planType: planType,
            // For ongoing plans, store additional subscription info
            ...(planType === 'ongoing' && {
                stripeSubscriptionId: stripeSubscriptionId,
                nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
                autoRenew: true
            })
        };

        // Save subscription data with additional error handling
        let subscription;
        try {
            subscription = await Subscription.create(subscriptionData);
            logger.info(`Subscription created: ${subscription._id}`, {
                planType: planType,
                isFirstTime: isFirstTimeOngoing,
                customerEmail: customerDetails.email
            });
        } catch (createError) {
            // Handle duplicate key error gracefully
            if (createError.code === 11000) {
                logger.warn(`Duplicate subscription creation attempt for payment intent: ${paymentIntent.id} with planType: ${planType}`);
                const existingSub = await Subscription.findOne({ 
                    stripePaymentIntentId: paymentIntent.id,
                    planType: planType 
                });
                if (existingSub) {
                    return existingSub;
                } else {
                    // If no existing subscription found with same plan type, this might be the second plan type
                    logger.info(`Creating second subscription for different plan type: ${planType}`);
                    // Continue with creation (this will fail if truly duplicate, which is expected)
                }
            }
            throw createError;
        }

        // Send appropriate emails based on plan type
        try {
            if (customerDetails.email && customerDetails.email !== 'Unknown') {
                if (planType === 'one-time') {
                    // One-time plan: Send regular confirmation + invoice
                    await sendConfirmationEmail(subscription);
                    logger.info(`One-time plan confirmation email sent to: ${customerDetails.email}`);

                    const invoicePDF = await generateInvoicePDF(subscription);
                    if (invoicePDF) {
                        await sendInvoiceEmail(subscription, invoicePDF);
                        logger.info(`One-time plan invoice email sent to: ${customerDetails.email}`);
                    }
                } else if (planType === 'ongoing' && isFirstTimeOngoing) {
                    // First-time ongoing plan: Send special welcome email + invoice
                    await sendOngoingPlanWelcomeEmail(subscription);
                    logger.info(`Ongoing plan welcome email sent to: ${customerDetails.email}`);

                    const invoicePDF = await generateInvoicePDF(subscription);
                    if (invoicePDF) {
                        await sendInvoiceEmail(subscription, invoicePDF);
                        logger.info(`Ongoing plan invoice email sent to: ${customerDetails.email}`);
                    }
                } else {
                    // Regular ongoing renewal
                    await sendConfirmationEmail(subscription);
                    logger.info(`Ongoing plan renewal confirmation sent to: ${customerDetails.email}`);
                }
            } else {
                logger.warn('Skipping email sending - no valid customer email found');
            }
        } catch (emailError) {
            logger.error('Error sending emails:', emailError);
            // Don't throw error here - payment was successful, just email failed
        }

        return subscription;

    } catch (error) {
        logger.error('Error in handlePaymentSuccess:', error);
        throw error;
    }
}

// Handle subscription renewal
async function handleSubscriptionRenewal(invoice) {
    try {
        logger.info(`Processing subscription renewal for invoice: ${invoice.id}`);

        const subscription = await stripe.subscriptions.retrieve(invoice.subscription);
        const customerEmail = subscription.metadata?.customerEmail;

        if (!customerEmail) {
            logger.error('No customer email found in subscription metadata');
            return;
        }

        // Update existing subscription record
        const existingSubscription = await Subscription.findOne({
            'customerDetails.email': customerEmail,
            planType: 'ongoing',
            status: 'active'
        });

        if (existingSubscription) {
            // Update renewal information (using existing fields where possible)
            existingSubscription.nextBillingDate = new Date(invoice.period_end * 1000);
            // Use a custom field to track renewals without changing model
            existingSubscription.lastRenewalDate = new Date();
            
            await existingSubscription.save();
            
            logger.info(`Subscription renewed for ${customerEmail}`, {
                subscriptionId: existingSubscription._id
            });

            // Send renewal confirmation email
            try {
                await sendConfirmationEmail(existingSubscription, { isRenewal: true });
                logger.info(`Renewal confirmation email sent to: ${customerEmail}`);
            } catch (emailError) {
                logger.error('Error sending renewal confirmation email:', emailError);
            }
        } else {
            logger.error(`No existing subscription found for renewal: ${customerEmail}`);
        }

    } catch (error) {
        logger.error('Error handling subscription renewal:', error);
    }
}

// Handle subscription cancellation
async function handleSubscriptionCancellation(stripeSubscription) {
    try {
        logger.info(`Processing subscription cancellation: ${stripeSubscription.id}`);

        const customerEmail = stripeSubscription.metadata?.customerEmail;

        if (customerEmail) {
            const subscription = await Subscription.findOne({
                'customerDetails.email': customerEmail,
                planType: 'ongoing',
                status: 'active'
            });

            if (subscription) {
                subscription.status = 'cancelled';
                subscription.cancelledAt = new Date();
                subscription.autoRenew = false;
                
                await subscription.save();
                
                logger.info(`Subscription cancelled for ${customerEmail}`);
            }
        }

    } catch (error) {
        logger.error('Error handling subscription cancellation:', error);
    }
}

/**
 * Handle failed payment
 */
async function handlePaymentFailure(paymentIntent) {
    logger.warn(`Payment failed: ${paymentIntent.id}`);

    const metadata = paymentIntent.metadata || {};
    const billingDetails = paymentIntent.billing_details || {};
    
    const planTitle = metadata.planTitle || '';
    const planType = PLAN_TYPE_MAP?.[planTitle] || 'unknown';

    let plans = [];
    if (metadata.plansData) {
        try {
            plans = JSON.parse(metadata.plansData);
        } catch (parseError) {
            logger.error('Error parsing plans data for failed payment:', parseError);
            plans = [{
                planTitle: planTitle || 'Unknown Plan',
                price: parseFloat(metadata.totalPrice) || 0,
                numberOfEmployees: 0
            }];
        }
    } else {
        plans = [{
            planTitle: planTitle || 'Unknown Plan',
            price: parseFloat(metadata.totalPrice) || 0,
            numberOfEmployees: 0
        }];
    }

    const subscriptionData = {
        plans,
        totalPrice: parseFloat(metadata.totalPrice || 0),
        customerDetails: {
            firstName: metadata.customerFirstName || (billingDetails.name ? billingDetails.name.split(' ')[0] : 'Unknown'),
            lastName: metadata.customerLastName || (billingDetails.name ? billingDetails.name.split(' ').slice(1).join(' ') : 'Unknown'),
            email: metadata.customerEmail || billingDetails.email || 'Unknown',
            phone: metadata.customerPhone || billingDetails.phone || 'Unknown'
        },
        stripePaymentIntentId: paymentIntent.id,
        paymentStatus: 'failed',
        status: 'inactive',
        planType: metadata.planType || 'one-time' // Default to one-time if not specified
    };

    try {
        // Check if a failed subscription already exists to avoid duplicates
        const existingFailedSub = await Subscription.findOne({
            stripePaymentIntentId: paymentIntent.id
        });

        if (existingFailedSub) {
            logger.info(`Failed subscription already exists for payment intent: ${paymentIntent.id}`);
            return existingFailedSub;
        }

        const failedSub = await Subscription.create(subscriptionData);
        logger.error(`Failed subscription recorded: ${failedSub._id}`, {
            planType,
            customerEmail: subscriptionData.customerDetails.email
        });
        return failedSub;
    } catch (error) {
        logger.error('Error creating failed subscription record:', error);
        // If it's a duplicate key error, log but don't throw
        if (error.code === 11000) {
            logger.info(`Duplicate failed subscription ignored for payment intent: ${paymentIntent.id}`);
        } else {
            throw error;
        }
    }
}

/**
 * Get user's subscription status
 */
exports.getSubscriptionStatus = catchAsync(async (req, res) => {
    const { email } = req.params;

    if (!email) {
        return res.status(400).json({ success: false, message: 'Email is required' });
    }

    // Get ongoing subscription
    const ongoingSubscription = await Subscription.findOne({
        'customerDetails.email': email,
        planType: 'ongoing',
        status: 'active',
        paymentStatus: 'succeeded'
    }).sort({ createdAt: -1 });

    // Get all one-time purchases
    const oneTimePurchases = await Subscription.find({
        'customerDetails.email': email,
        planType: 'one-time',
        status: 'active',
        paymentStatus: 'succeeded'
    }).sort({ createdAt: -1 });

    const response = {
        hasOngoingSubscription: !!ongoingSubscription,
        ongoingSubscription: ongoingSubscription || null,
        oneTimePurchases: oneTimePurchases || [],
        totalOneTimePurchases: oneTimePurchases.length
    };

    sendSuccess(res, response, 'Subscription status retrieved');
});

/**
 * Cancel ongoing subscription
 */
exports.cancelSubscription = catchAsync(async (req, res) => {
    const { email, subscriptionId } = req.body;

    if (!email || !subscriptionId) {
        return res.status(400).json({ success: false, message: 'Email and subscription ID are required' });
    }

    // Find the subscription
    const subscription = await Subscription.findOne({
        _id: subscriptionId,
        'customerDetails.email': email,
        planType: 'ongoing',
        status: 'active'
    });

    if (!subscription) {
        return res.status(404).json({ success: false, message: 'Active subscription not found' });
    }

    try {
        // Cancel in Stripe
        if (subscription.stripeSubscriptionId) {
            await stripe.subscriptions.update(subscription.stripeSubscriptionId, {
                cancel_at_period_end: true
            });
        }

        // Update in database
        subscription.status = 'cancelled';
        subscription.cancelledAt = new Date();
        subscription.autoRenew = false;
        await subscription.save();

        logger.info(`Subscription cancelled by user: ${email}`);

        sendSuccess(res, { subscription }, 'Subscription cancelled successfully');
    } catch (error) {
        logger.error('Error cancelling subscription:', error);
        return res.status(500).json({ success: false, message: 'Failed to cancel subscription' });
    }
});