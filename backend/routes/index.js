// routes/index.js
const express = require('express');
const router = express.Router();

// Import routes
const adminRoutes = require('./admin');
const subscriptionRoutes = require('./subscription');
const trustpilotRoutes = require('./trustpilot');

// Mount routes
router.use('/admin', adminRoutes);
router.use('/subscription', subscriptionRoutes);
router.use('/trustpilot', trustpilotRoutes);

module.exports = router;