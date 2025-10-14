const { Subscription } = require('../models');
// at top of controllers/payments.js
const { sendConfirmationEmail, sendInvoiceEmail, sendOngoingPlanWelcomeEmail } = require('../utils/email');
const { generateInvoicePDF } = require('../utils/pdf');

// controllers/payments.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


// ---- Fixed plan catalogs (only what you support now) ----
const ONE_TIME_PLANS = new Set([
    'GDPR & Privacy Quick-Setup',
    'Cloud Security Starter Pack',
]);

const ONGOING_PLAN_TITLE = 'vCISO Lite (On Demand)';

// ---- Helpers ----
function isValidCustomerData(cd) {
    return cd && cd.email && cd.firstName && cd.lastName;
}

function classifyRequest(plans) {
    if (!Array.isArray(plans) || plans.length === 0) return { kind: 'invalid', reason: 'No plans provided' };

    // Ongoing: exactly one plan, must match the ongoing title
    if (plans.length === 1 && plans[0].planTitle === ONGOING_PLAN_TITLE) {
        return { kind: 'ongoing', plan: plans[0] };
    }

    // One-time: 1-3 items, all must be from ONE_TIME_PLANS
    if (plans.length >= 1 && plans.length <= 2 && plans.every(p => ONE_TIME_PLANS.has(p.planTitle))) {
        return { kind: 'one-time', items: plans };
    }

    return { kind: 'invalid', reason: 'Plans do not match supported request types' };
}

function calcTotal(plans) {
    return plans.reduce((s, p) => s + (Number(p.price) || 0), 0);
}

// ---- Controller: create payment or subscription for just 2 cases ----
exports.createPayment = async (req, res) => {
    try {
        const { plans, totalPrice, customerData } = req.body || {};

        if (!isValidCustomerData(customerData)) {
            return res.status(400).json({ success: false, message: 'Missing customer data (firstName, lastName, email)' });
        }
        const classification = classifyRequest(plans);
        if (classification.kind === 'invalid') {
            return res.status(400).json({ success: false, message: classification.reason });
        }

        // Always compute total on server; ignore client-sent total if it mismatches
        let response;
        if (classification.kind === 'one-time') {
            const items = classification.items;
            const amount = calcTotal(items);
            if (amount <= 0) return res.status(400).json({ success: false, message: 'Invalid amount' });

            const metadata = {
                planType: 'one-time',
                customerEmail: customerData.email,
                customerFirstName: customerData.firstName,
                customerLastName: customerData.lastName,
                customerPhone: customerData.phone || '',
                plansData: JSON.stringify(items),
                totalPrice: String(amount),
            };

            const pi = await stripe.paymentIntents.create({
                amount: Math.round(amount * 100),
                currency: 'usd',
                automatic_payment_methods: { enabled: true },
                receipt_email: customerData.email,
                description: `One-time bundle for ${customerData.email}`,
                metadata,
            });

            response = {
                type: 'one-time',
                clientSecret: pi.client_secret,
                paymentIntentId: pi.id,
                amount,
            };
        } else {
            // ongoing (single monthly plan)
            const plan = classification.plan;
            const amount = Number(plan.price) || 0;
            if (amount <= 0) return res.status(400).json({ success: false, message: 'Invalid amount' });

            // Find or create customer
            const existing = await stripe.customers.list({ email: customerData.email, limit: 1 });
            const customer =
                existing.data.length > 0
                    ? existing.data[0]
                    : await stripe.customers.create({
                        name: `${customerData.firstName} ${customerData.lastName}`,
                        email: customerData.email,
                        metadata: {
                            firstName: customerData.firstName,
                            lastName: customerData.lastName,
                            phone: customerData.phone || '',
                        },
                    });

            // Find or create product/price for monthly
            const productList = await stripe.products.list({ active: true, limit: 100 });
            let product = productList.data.find(p => p.name === ONGOING_PLAN_TITLE);
            if (!product) {
                product = await stripe.products.create({
                    name: ONGOING_PLAN_TITLE,
                    description: `Ongoing ${ONGOING_PLAN_TITLE} subscription`,
                });
            }

            const priceList = await stripe.prices.list({ product: product.id, active: true });
            let price = priceList.data.find(p => p.recurring?.interval === 'month' && p.unit_amount === Math.round(amount * 100));
            if (!price) {
                price = await stripe.prices.create({
                    product: product.id,
                    unit_amount: Math.round(amount * 100),
                    currency: 'usd',
                    recurring: { interval: 'month' },
                });
            }

            const subscription = await stripe.subscriptions.create({
                customer: customer.id,
                items: [{ price: price.id }],
                payment_behavior: 'default_incomplete',
                collection_method: 'charge_automatically',
                expand: ['latest_invoice.payment_intent'],
                metadata: {
                    planType: 'ongoing',
                    planTitle: plan.planTitle,
                    customerEmail: customerData.email,
                    customerFirstName: customerData.firstName,
                    customerLastName: customerData.lastName,
                    customerPhone: customerData.phone || '',
                    plansData: JSON.stringify([plan]),
                    totalPrice: String(amount),
                    numberOfEmployees: String(plan.numberOfEmployees || 0),
                },
            });

            response = {
                type: 'ongoing',
                clientSecret: subscription.latest_invoice.payment_intent.client_secret,
                subscriptionId: subscription.id,
                customerId: customer.id,
                amount,
            };
        }

        return res.json({ success: true, data: response, message: 'Ready for client confirmation' });
    } catch (err) {
        console.error('createPayment error', err);
        return res.status(500).json({ success: false, message: 'Unable to create payment' });
    }
};

// ---- Minimal webhook: record success for the two cases only ----
// Route: POST /api/stripe/webhook (raw body)
exports.handleWebhook = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        console.error('Webhook signature verification failed:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    try {
        switch (event.type) {
            // ONE-TIME: direct PI success
            case 'payment_intent.succeeded': {
                const pi = event.data.object;
                if (pi.metadata?.planType !== 'one-time') break;

                const md = pi.metadata || {};
                const plans = safeParsePlans(md.plansData, md);

                // idempotency
                let sub = await Subscription.findOne({ stripePaymentIntentId: pi.id, planType: 'one-time' });
                if (!sub) {
                    sub = await Subscription.create({
                        plans,
                        totalPrice: Number(md.totalPrice || 0),
                        customerDetails: {
                            firstName: md.customerFirstName || '',
                            lastName: md.customerLastName || '',
                            email: md.customerEmail || '',
                            phone: md.customerPhone || '',
                        },
                        stripePaymentIntentId: pi.id,
                        paymentStatus: 'succeeded',
                        status: 'active',
                        planType: 'one-time',
                    });
                }

                try {
                    await sendConfirmationEmail(sub);
                    const pdf = await generateInvoicePDF(sub);        // { buffer, filename, mimeType }
                    await sendInvoiceEmail(sub, pdf);                 // supports buffer attachment
                } catch (e) {
                    console.error('Email/PDF error (one-time):', e);
                }
                break;
            }

            case 'invoice.payment_succeeded':
            case 'invoice.paid': {
                const invoice = event.data.object;

                // First charge (subscription_create) and renewals (subscription_cycle)
                const isFirstCharge = invoice.billing_reason === 'subscription_create';
                const isRenewal = invoice.billing_reason === 'subscription_cycle';

                // Fetch subscription (+ customer) and paymentIntent
                const [stripeSub, paymentIntent] = await Promise.all([
                    stripe.subscriptions.retrieve(invoice.subscription, { expand: ['customer'] }),
                    invoice.payment_intent ? stripe.paymentIntents.retrieve(invoice.payment_intent) : null,
                ]);

                // Merge metadata (prefer Subscription)
                const md = { ...(stripeSub?.metadata || {}), ...(paymentIntent?.metadata || {}) };

                // Robust customer email fallback chain
                const customerEmail =
                    md.customerEmail ||
                    invoice.customer_email ||
                    (stripeSub?.customer && typeof stripeSub.customer === 'object' ? stripeSub.customer.email : null) ||
                    paymentIntent?.receipt_email ||
                    paymentIntent?.charges?.data?.[0]?.billing_details?.email ||
                    null;

                // Build plans
                const plans = safeParsePlans(md.plansData, md);

                // Idempotency: one doc per Stripe subscription
                let sub = await Subscription.findOne({
                    stripeSubscriptionId: invoice.subscription,
                    planType: 'ongoing',
                });

                if (!sub && isFirstCharge) {
                    sub = await Subscription.create({
                        plans,
                        totalPrice: Number(md.totalPrice || 0),
                        customerDetails: {
                            firstName: md.customerFirstName || '',
                            lastName: md.customerLastName || '',
                            email: customerEmail || '',          // <- ensure set
                            phone: md.customerPhone || '',
                        },
                        stripePaymentIntentId: paymentIntent?.id || invoice.payment_intent || '',
                        stripeSubscriptionId: invoice.subscription,
                        nextBillingDate: stripeSub?.current_period_end ? new Date(stripeSub.current_period_end * 1000) : undefined,
                        autoRenew: true,
                        paymentStatus: 'succeeded',
                        status: 'active',
                        planType: 'ongoing',
                    });
                } else if (sub && !sub.customerDetails?.email && customerEmail) {
                    // backfill missing email if needed
                    sub.customerDetails.email = customerEmail;
                    await sub.save();
                }

                // If somehow still no DB record (rare), create a sub-like for emails
                const subForEmail = sub || {
                    plans,
                    totalPrice: Number(md.totalPrice || 0),
                    customerDetails: {
                        firstName: md.customerFirstName || '',
                        lastName: md.customerLastName || '',
                        email: customerEmail || '',
                        phone: md.customerPhone || '',
                    },
                    paymentStatus: 'succeeded',
                    planType: 'ongoing',
                    _id: invoice.subscription, // just for filename
                    createdAt: new Date(invoice.created || Date.now()),
                    nextBillingDate: stripeSub?.current_period_end ? new Date(stripeSub.current_period_end * 1000) : undefined,
                };

                // --- SEND EMAILS ---
                try {
                    if (isFirstCharge) {
                        await sendOngoingPlanWelcomeEmail(subForEmail);
                        const pdf = await generateInvoicePDF(subForEmail);
                        await sendInvoiceEmail(subForEmail, pdf);

                        // mark flags if we have a DB record (avoid duplicates on retries)
                        if (sub) {
                            if (!sub.confirmationEmailSent) sub.confirmationEmailSent = true;
                            if (!sub.invoiceEmailSent) sub.invoiceEmailSent = true;
                            await sub.save();
                        }
                    }

                    if (isRenewal) {
                        if (sub) {
                            // update next billing + renewal date
                            if (stripeSub?.current_period_end) {
                                sub.nextBillingDate = new Date(stripeSub.current_period_end * 1000);
                                sub.lastRenewalDate = new Date();
                                await sub.save();
                            }
                            await sendConfirmationEmail(sub, { isRenewal: true });
                            // (optional) also attach the renewal invoice pdf:
                            const pdf = await generateInvoicePDF(sub);
                            await sendInvoiceEmail(sub, pdf);
                        } else {
                            // fallback if DB doc missing
                            await sendConfirmationEmail(subForEmail, { isRenewal: true });
                        }
                    }
                } catch (e) {
                    console.error('Ongoing invoice email/PDF error:', e);
                }

                break;
            }



            case 'payment_intent.payment_failed':
            case 'invoice.payment_failed': {
                console.warn('Stripe payment failed:', event.type, event.data.object?.id);
                break;
            }

            default:
                break;
        }

        res.json({ received: true });
    } catch (err) {
        console.error('Webhook handler error:', err);
        res.status(500).json({ error: 'Webhook processing failed' });
    }
};

function safeParsePlans(plansData, fallbackMeta) {
    try {
        if (plansData) return JSON.parse(plansData);
    } catch (_) { }
    // Fallback (shouldn’t normally happen)
    return [
        {
            planTitle: fallbackMeta.planTitle || 'Unknown Plan',
            price: Number(fallbackMeta.totalPrice || 0),
            numberOfEmployees: Number(fallbackMeta.numberOfEmployees || 0),
        },
    ];
}
