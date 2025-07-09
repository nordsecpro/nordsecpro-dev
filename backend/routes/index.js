// routes/index.js
const express = require('express');
const router = express.Router();

// Import routes
const adminRoutes = require('./admin');
const subscriptionRoutes = require('./subscription');

// Mount routes
router.use('/admin', adminRoutes);
router.use('/subscription', subscriptionRoutes);

module.exports = router;