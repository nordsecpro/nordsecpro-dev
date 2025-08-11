// routes/subscription.js
const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscription');
const { validatePlanData } = require('../middlewares/validation');

// Create payment intent for subscription
router.post('/create-payment-intent', validatePlanData, subscriptionController.createPayment);

// // Get user's subscription status
// router.get('/status/:email', subscriptionController.getSubscriptionStatus);

// // Cancel ongoing subscription
// router.post('/cancel', subscriptionController.cancelSubscription);

module.exports = router;