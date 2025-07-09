// controllers/subscription.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { Subscription } = require('../models');
const { sendSuccess } = require('../utils/response');
const { sendConfirmationEmail, sendInvoiceEmail } = require('../utils/email');
const { generateInvoicePDF } = require('../utils/pdf');
const { catchAsync } = require('../middlewares/requestHandler');
const logger = require('../utils/logger');
const config = require('../config/environment');

/**
 * Create Stripe payment intent for multiple plans
 * POST /api/subscription/create-payment-intent
 */
exports.createPaymentIntent = catchAsync(async (req, res, next) => {
    const { plans, totalPrice, customerData } = req.body;

    // Validation
    if (!plans || !Array.isArray(plans) || plans.length === 0) {
        return res.status(400).json({
            success: false,
            message: 'Plans array is required and cannot be empty'
        });
    }

    if (!totalPrice || totalPrice <= 0) {
        return res.status(400).json({
            success: false,
            message: 'Total price must be greater than 0'
        });
    }

    if (!customerData || !customerData.firstName || !customerData.lastName || !customerData.email) {
        return res.status(400).json({
            success: false,
            message: 'Customer data with firstName, lastName, and email is required'
        });
    }

    try {
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(customerData.email)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email format'
            });
        }

        // Calculate total from plans to verify frontend calculation
        const calculatedTotal = plans.reduce((sum, plan) => {
            return sum + (plan.price || 0);
        }, 0);

        // Verify the total matches (with small tolerance for floating point)
        if (Math.abs(calculatedTotal - totalPrice) > 0.01) {
            logger.warn(`Total price mismatch: calculated ${calculatedTotal}, received ${totalPrice}`);
            return res.status(400).json({
                success: false,
                message: 'Price calculation mismatch'
            });
        }

        // Prepare metadata for Stripe - store plans as JSON string
        const plansMetadata = {
            numberOfPlans: plans.length.toString(),
            totalPrice: totalPrice.toString(),
            totalEmployees: plans.reduce((sum, plan) => sum + (plan.numberOfEmployees || 0), 0).toString(),
            
            // Customer information
            customerFirstName: customerData.firstName.substring(0, 500),
            customerLastName: customerData.lastName.substring(0, 500),
            customerEmail: customerData.email.substring(0, 500),
            customerPhone: customerData.phone?.substring(0, 500) || '',
            customerCompany: customerData.company?.substring(0, 500) || '',
            
            // Store plans data as JSON (Stripe metadata limit is 500 chars per key)
            plansData: JSON.stringify(plans).substring(0, 500),
            
            // Plan summary for easy reference
            planTitles: plans.map(plan => plan.planTitle).join(', ').substring(0, 500),
        };

        // Create payment intent with Stripe
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(totalPrice * 100), // Convert to cents
            currency: 'usd',
            automatic_payment_methods: {
                enabled: true,
            },
            metadata: plansMetadata,
            description: `Security Plans Purchase - ${plans.length} plan(s) for ${customerData.firstName} ${customerData.lastName}`,
            receipt_email: customerData.email, // Stripe will send receipt to this email
        });

        // Log the transaction for monitoring
        logger.info('Payment intent created successfully', {
            paymentIntentId: paymentIntent.id,
            amount: totalPrice,
            currency: 'usd',
            customerEmail: customerData.email,
            numberOfPlans: plans.length,
            plans: plans.map(plan => ({
                title: plan.planTitle,
                employees: plan.numberOfEmployees,
                price: plan.price
            }))
        });

        // Send response
        sendSuccess(res, {
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id,
            amount: totalPrice,
            currency: 'usd'
        }, 'Payment intent created successfully');

    } catch (error) {
        logger.error('Error creating payment intent:', {
            error: error.message,
            stack: error.stack,
            customerEmail: customerData?.email,
            totalPrice,
            numberOfPlans: plans?.length
        });

        // Handle specific Stripe errors
        if (error.type === 'StripeCardError') {
            return res.status(400).json({
                success: false,
                message: 'Payment failed: ' + error.message
            });
        } else if (error.type === 'StripeRateLimitError') {
            return res.status(429).json({
                success: false,
                message: 'Too many requests, please try again later'
            });
        } else if (error.type === 'StripeInvalidRequestError') {
            return res.status(400).json({
                success: false,
                message: 'Invalid payment request: ' + error.message
            });
        } else if (error.type === 'StripeAPIError') {
            return res.status(503).json({
                success: false,
                message: 'Payment service temporarily unavailable'
            });
        } else if (error.type === 'StripeConnectionError') {
            return res.status(503).json({
                success: false,
                message: 'Network error, please try again'
            });
        } else if (error.type === 'StripeAuthenticationError') {
            logger.error('Stripe authentication error - check API keys');
            return res.status(500).json({
                success: false,
                message: 'Payment configuration error'
            });
        }

        // Generic error
        return res.status(500).json({
            success: false,
            message: 'Payment processing failed'
        });
    }
});

/**
 * Handle Stripe webhook
 * POST /api/subscription/webhook
 */
exports.handleWebhook = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        // Verify webhook signature
        event = stripe.webhooks.constructEvent(req.body, sig, config.stripe.webhookSecret);
    } catch (err) {
        logger.error(`Webhook signature verification failed: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    try {
        // Handle the event
        switch (event.type) {
            case 'payment_intent.succeeded':
                await handlePaymentSuccess(event.data.object);
                break;
            case 'payment_intent.payment_failed':
                await handlePaymentFailure(event.data.object);
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

/**
 * Handle successful payment
 */
async function handlePaymentSuccess(paymentIntent) {
    try {
        logger.info(`Payment succeeded: ${paymentIntent.id}`);

        // Check if subscription already exists to avoid duplicates
        const existingSubscription = await Subscription.findOne({ 
            stripePaymentIntentId: paymentIntent.id 
        });

        if (existingSubscription) {
            logger.info(`Subscription already exists for payment intent: ${paymentIntent.id}`);
            return;
        }

        // Parse plans data from metadata
        let plans = [];
        try {
            if (paymentIntent.metadata.plansData) {
                plans = JSON.parse(paymentIntent.metadata.plansData);
            }
        } catch (parseError) {
            logger.error('Error parsing plans data from metadata:', parseError);
            // Fallback: create single plan from basic metadata
            plans = [{
                planTitle: paymentIntent.metadata.planTitles || 'Security Plan',
                numberOfEmployees: parseInt(paymentIntent.metadata.totalEmployees) || 0,
                price: parseFloat(paymentIntent.metadata.totalPrice) || 0
            }];
        }

        // Get customer details from metadata
        const customerDetails = {
            firstName: paymentIntent.metadata.customerFirstName || '',
            lastName: paymentIntent.metadata.customerLastName || '',
            email: paymentIntent.metadata.customerEmail || '',
            phone: paymentIntent.metadata.customerPhone || '',
            company: paymentIntent.metadata.customerCompany || ''
        };

        // If we have payment method, get additional details
        if (paymentIntent.payment_method) {
            try {
                const paymentMethod = await stripe.paymentMethods.retrieve(paymentIntent.payment_method);
                
                // Use billing details as fallback if metadata is empty
                if (!customerDetails.firstName && paymentMethod.billing_details.name) {
                    const nameParts = paymentMethod.billing_details.name.split(' ');
                    customerDetails.firstName = nameParts[0] || '';
                    customerDetails.lastName = nameParts.slice(1).join(' ') || '';
                }
                if (!customerDetails.email && paymentMethod.billing_details.email) {
                    customerDetails.email = paymentMethod.billing_details.email;
                }
                if (!customerDetails.phone && paymentMethod.billing_details.phone) {
                    customerDetails.phone = paymentMethod.billing_details.phone;
                }
            } catch (pmError) {
                logger.warn('Could not retrieve payment method details:', pmError.message);
            }
        }
        
        // Create subscription record with multiple plans
        const subscriptionData = {
            plans: plans, // Array of plan objects
            totalPrice: parseFloat(paymentIntent.metadata.totalPrice),
            customerDetails: {
                firstName: customerDetails.firstName,
                lastName: customerDetails.lastName,
                email: customerDetails.email,
                phone: customerDetails.phone
            },
            stripePaymentIntentId: paymentIntent.id,
            paymentStatus: 'succeeded',
            status: 'active'
        };

        const subscription = await Subscription.create(subscriptionData);

        logger.info(`Subscription created successfully: ${subscription._id}`, {
            subscriptionId: subscription._id,
            planCount: subscription.planCount,
            totalEmployees: subscription.totalEmployees,
            totalPrice: subscription.totalPrice,
            customerEmail: subscription.customerDetails.email
        });

        // Send confirmation email
        try {
            if (customerDetails.email) {
                await sendConfirmationEmail(subscription);
                await Subscription.findByIdAndUpdate(subscription._id, { 
                    confirmationEmailSent: true 
                });
                logger.info(`Confirmation email sent for subscription: ${subscription._id}`);
            }
        } catch (emailError) {
            logger.error(`Failed to send confirmation email: ${emailError.message}`);
        }

        // Generate and send invoice
        try {
            if (customerDetails.email) {
                const invoicePath = await generateInvoicePDF(subscription);
                await sendInvoiceEmail(subscription, invoicePath);
                await Subscription.findByIdAndUpdate(subscription._id, { 
                    invoiceEmailSent: true 
                });
                logger.info(`Invoice sent for subscription: ${subscription._id}`);
            }
        } catch (invoiceError) {
            logger.error(`Failed to send invoice: ${invoiceError.message}`);
        }

    } catch (error) {
        logger.error('Error handling payment success:', error);
        throw error;
    }
}

/**
 * Handle failed payment
 */
async function handlePaymentFailure(paymentIntent) {
    try {
        logger.warn(`Payment failed: ${paymentIntent.id}`);

        // Parse plans data from metadata
        let plans = [];
        try {
            if (paymentIntent.metadata.plansData) {
                plans = JSON.parse(paymentIntent.metadata.plansData);
            }
        } catch (parseError) {
            logger.error('Error parsing plans data from metadata:', parseError);
            // Fallback: create single plan from basic metadata
            plans = [{
                planTitle: paymentIntent.metadata.planTitles || 'Security Plan',
                numberOfEmployees: parseInt(paymentIntent.metadata.totalEmployees) || 0,
                price: parseFloat(paymentIntent.metadata.totalPrice) || 0
            }];
        }

        // Create failed subscription record for tracking
        const subscriptionData = {
            plans: plans,
            totalPrice: parseFloat(paymentIntent.metadata.totalPrice),
            customerDetails: {
                firstName: paymentIntent.metadata.customerFirstName || '',
                lastName: paymentIntent.metadata.customerLastName || '',
                email: paymentIntent.metadata.customerEmail || '',
                phone: paymentIntent.metadata.customerPhone || ''
            },
            stripePaymentIntentId: paymentIntent.id,
            paymentStatus: 'failed',
            status: 'inactive'
        };

        const failedSubscription = await Subscription.create(subscriptionData);
        
        logger.error(`Payment failed for intent: ${paymentIntent.id}`, {
            subscriptionId: failedSubscription._id,
            reason: paymentIntent.last_payment_error?.message || 'Unknown error',
            customerEmail: subscriptionData.customerDetails.email
        });

    } catch (error) {
        logger.error('Error handling payment failure:', error);
        throw error;
    }
}
/**
 * Health check endpoint
 * GET /api/subscription/health
 */
exports.healthCheck = catchAsync(async (req, res, next) => {
    try {
        // Check database connection
        const subscriptionCount = await Subscription.countDocuments();
        
        // Check Stripe connection
        const balance = await stripe.balance.retrieve();

        sendSuccess(res, {
            status: 'OK',
            timestamp: new Date().toISOString(),
            database: 'connected',
            subscriptions: subscriptionCount,
            stripe: balance ? 'connected' : 'disconnected',
            environment: process.env.NODE_ENV || 'development'
        }, 'Service is healthy');
    } catch (error) {
        logger.error('Health check failed:', error);
        throw error;
    }
});