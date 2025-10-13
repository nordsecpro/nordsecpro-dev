// routes/trustpilot.js
const express = require('express');
const router = express.Router();
const trustpilotController = require('../controllers/trustpilot.controller');

// GET /api/trustpilot/reviews
router.get('/reviews', trustpilotController.getReviews);

// GET /api/trustpilot/profile
router.get('/profile', trustpilotController.getBusinessProfile);


module.exports = router;
