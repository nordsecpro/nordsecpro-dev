// models/Subscription.js
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
            required: true
        },
        lastName: {
            type: String,
            required: true
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
        required: true,
        unique: true
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
        enum: ['active', 'inactive'],
        default: 'active'
    }
}, {
    timestamps: true // adds createdAt and updatedAt
});

// Virtual to get total number of employees across all plans
subscriptionSchema.virtual('totalEmployees').get(function() {
    return this.plans.reduce((total, plan) => total + plan.numberOfEmployees, 0);
});

// Virtual to get plan count
subscriptionSchema.virtual('planCount').get(function() {
    return this.plans.length;
});

// Ensure virtuals are included in JSON output
subscriptionSchema.set('toJSON', { virtuals: true });
subscriptionSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Subscription', subscriptionSchema);