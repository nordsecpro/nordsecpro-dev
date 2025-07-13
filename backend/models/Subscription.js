const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
    // Multiple plans - array of plan objects
    plans: [{
        planTitle: {
            type: String,
            required: true
        },
        numberOfEmployees: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    }],

    // Total price for all plans combined
    totalPrice: {
        type: Number,
        required: true
    },

    // Customer details from Stripe form
    customerDetails: {
        firstName: {
            type: String,
            required: false
        },
        lastName: {
            type: String,
            required: false
        },
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String
        }
    },

    // Payment info
    stripePaymentIntentId: {
        type: String,
        required: true
        // Removed unique: true - now using compound index
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'succeeded', 'failed'],
        default: 'pending'
    },

    // Email tracking
    confirmationEmailSent: {
        type: Boolean,
        default: false
    },
    invoiceEmailSent: {
        type: Boolean,
        default: false
    },

    // Status
    status: {
        type: String,
        enum: ['active', 'inactive', 'cancelled'],
        default: 'active'
    },

    // MINIMAL REQUIRED ADDITIONS for new functionality
    planType: {
        type: String,
        enum: ['one-time', 'ongoing'],
        default: 'one-time'
    },

    stripeSubscriptionId: {
        type: String,
        sparse: true
    },

    nextBillingDate: Date,
    lastRenewalDate: Date,
    autoRenew: { type: Boolean, default: false },
    cancelledAt: Date
}, {
    timestamps: true
});

// Virtual to get total number of employees across all plans
subscriptionSchema.virtual('totalEmployees').get(function () {
    return this.plans.reduce((total, plan) => total + plan.numberOfEmployees, 0);
});

// Virtual to get plan count
subscriptionSchema.virtual('planCount').get(function () {
    return this.plans.length;
});

// Virtual to check if it's an ongoing subscription
subscriptionSchema.virtual('isOngoing').get(function () {
    return this.planType === 'ongoing';
});

// Virtual to check if it's a one-time purchase
subscriptionSchema.virtual('isOneTime').get(function () {
    return this.planType === 'one-time';
});

// Ensure virtuals are included in JSON output
subscriptionSchema.set('toJSON', { virtuals: true });
subscriptionSchema.set('toObject', { virtuals: true });

// ✅ COMPOUND UNIQUE INDEX - Allows same payment intent for different plan types
subscriptionSchema.index({ stripePaymentIntentId: 1, planType: 1 }, { unique: true });

// Other indexes for better query performance
subscriptionSchema.index({ 'customerDetails.email': 1, planType: 1, status: 1 });
subscriptionSchema.index({ stripeSubscriptionId: 1 });
subscriptionSchema.index({ nextBillingDate: 1 });

module.exports = mongoose.model('Subscription', subscriptionSchema);