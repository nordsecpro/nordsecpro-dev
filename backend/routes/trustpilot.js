// routes/trustpilot.js
const express = require('express');
const router = express.Router();
const trustpilotController = require('../controllers/trustpilot.controller');

router.get('/reviews', trustpilotController.getReviews);
router.get('/profile', trustpilotController.getBusinessProfile);
router.get('/refresh', trustpilotController.forceRefresh);

module.exports = router;