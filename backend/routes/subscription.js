// routes/subscription.js
const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscription');
const { validatePlanData } = require('../middlewares/validation');

// Create payment intent for subscription
router.post('/create-payment-intent', validatePlanData, subscriptionController.createPaymentIntent);


// Health check
router.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Subscription service is running' });
});

module.exports = router;