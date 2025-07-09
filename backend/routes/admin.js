// routes/admin.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');
const { protect } = require('../middlewares/auth');
const { validateAdminLogin, validateChangePassword } = require('../middlewares/validation');

// Login (no auth required)
router.post('/login', validateAdminLogin, adminController.login);
router.post('/contact', adminController.createContact);


// All routes below require authentication
router.use(protect);

// Admin profile
router.get('/profile', adminController.getProfile);
router.put('/profile', adminController.updateProfile);
router.get('/contacts', adminController.getAllContacts);
router.put('/change-password', validateChangePassword, adminController.changePassword);

// Dashboard
router.get('/dashboard', adminController.getDashboard);

// Subscriptions
router.get('/subscriptions', adminController.getAllSubscriptions);
router.get('/subscriptions/:id', adminController.getSubscription);
router.put('/subscriptions/:id', adminController.updateSubscription);
router.delete('/subscriptions/:id', adminController.deleteSubscription);

// Logout
router.post('/logout', adminController.logout);

module.exports = router;