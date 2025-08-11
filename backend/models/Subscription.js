const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  planTitle: { type: String, required: true, trim: true },
  numberOfEmployees: { type: Number, required: true, min: 0 },
  price: { type: Number, required: true, min: 0 }
}, { _id: false });

const subscriptionSchema = new mongoose.Schema({
  // Multiple plans
  plans: {
    type: [planSchema],
    default: [] // <- avoids reduce/length errors on virtuals
  },

  // Totals
  totalPrice: { type: Number, required: true, min: 0 },
  currency: { type: String, default: 'usd', lowercase: true },

  // Customer
  customerDetails: {
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String }
  },

  // Payment info
  stripePaymentIntentId: { type: String, required: true, trim: true }, // idempotency + compound unique below
  paymentStatus: { type: String, enum: ['pending', 'succeeded', 'failed'], default: 'pending' },

  // Email tracking
  confirmationEmailSent: { type: Boolean, default: false },
  invoiceEmailSent: { type: Boolean, default: false },

  // Status
  status: { type: String, enum: ['active', 'inactive', 'cancelled'], default: 'active' },

  // Plan type
  planType: { type: String, enum: ['one-time', 'ongoing'], default: 'one-time' },

  // Ongoing-only
  stripeSubscriptionId: { type: String, sparse: true, trim: true },
  nextBillingDate: Date,
  lastRenewalDate: Date,
  autoRenew: { type: Boolean, default: false },
  cancelledAt: Date
}, { timestamps: true });

// Virtuals
subscriptionSchema.virtual('totalEmployees').get(function () {
  return (this.plans || []).reduce((total, plan) => total + (plan.numberOfEmployees || 0), 0);
});
subscriptionSchema.virtual('planCount').get(function () {
  return (this.plans || []).length;
});
subscriptionSchema.virtual('isOngoing').get(function () {
  return this.planType === 'ongoing';
});
subscriptionSchema.virtual('isOneTime').get(function () {
  return this.planType === 'one-time';
});

subscriptionSchema.set('toJSON', { virtuals: true });
subscriptionSchema.set('toObject', { virtuals: true });

// Idempotency for one-time vs ongoing
subscriptionSchema.index({ stripePaymentIntentId: 1, planType: 1 }, { unique: true });

// Ensure only one doc per Stripe subscription (ongoing)
subscriptionSchema.index({ stripeSubscriptionId: 1 }, { unique: true, sparse: true });

// Helpful query indexes
subscriptionSchema.index({ 'customerDetails.email': 1, planType: 1, status: 1 });
subscriptionSchema.index({ nextBillingDate: 1 });

module.exports = mongoose.model('Subscription', subscriptionSchema);
