// middlewares/validation.js
const { body, param, validationResult } = require('express-validator');

// Helper function to handle validation results
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.msg);
        return res.status(400).json({
            success: false,
            message: 'Validation error',
            errors: errorMessages
        });
    }
    next();
};

// Admin login validation
const validateAdminLogin = [
    body('email')
        .isEmail()
        .withMessage('Please provide a valid email')
        .normalizeEmail(),
    
    body('password')
        .notEmpty()
        .withMessage('Password is required'),
    
    handleValidationErrors
];

// Admin profile update validation
const validateAdminUpdate = [
    body('firstName')
        .optional()
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('First name must be between 2 and 50 characters'),
    
    body('lastName')
        .optional()
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('Last name must be between 2 and 50 characters'),
    
    body('email')
        .optional()
        .isEmail()
        .withMessage('Please provide a valid email')
        .normalizeEmail(),
    
    handleValidationErrors
];

// Change password validation
const validateChangePassword = [
    body('currentPassword')
        .notEmpty()
        .withMessage('Current password is required'),
    
    body('newPassword')
        .isLength({ min: 6 })
        .withMessage('New password must be at least 6 characters long'),
    
    handleValidationErrors
];

// Plan data validation for multiple plans
const validatePlanData = [
    // Validate plans array
    body('plans')
        .isArray({ min: 1 })
        .withMessage('Plans array is required and must contain at least one plan'),
    
    // Validate each plan in the array
    body('plans.*.planTitle')
        .trim()
        .notEmpty()
        .withMessage('Plan title is required')
        .isIn([
            'Startup Security Launchpad',
            'SOC 2 Pre-Audit Blueprint', 
            'Audit Check: Final Review',
            'vCISO On-Demand'
        ])
        .withMessage('Invalid plan title'),
    
    body('plans.*.numberOfEmployees')
        .isInt({ min: 5, max: 250 })
        .withMessage('Number of employees must be between 5 and 250'),
    
    body('plans.*.price')
        .isFloat({ min: 0 })
        .withMessage('Price must be a positive number'),
    
    // Validate total price
    body('totalPrice')
        .isFloat({ min: 0 })
        .withMessage('Total price must be a positive number'),
    
    // Validate customer data
    body('customerData.firstName')
        .trim()
        .notEmpty()
        .withMessage('First name is required'),
    
    body('customerData.lastName')
        .trim()
        .notEmpty()
        .withMessage('Last name is required'),
    
    body('customerData.email')
        .isEmail()
        .withMessage('Valid email is required'),
    
    body('customerData.phone')
        .optional()
        .isMobilePhone()
        .withMessage('Invalid phone number format'),
    
    body('customerData.company')
        .optional()
        .trim(),
    
    handleValidationErrors
];

// MongoDB ObjectId validation
const validateObjectId = [
    param('id')
        .isMongoId()
        .withMessage('Invalid ID format'),
    
    handleValidationErrors
];

module.exports = {
    // Admin validations
    validateAdminLogin,
    validateAdminUpdate,
    validateChangePassword,
    
    // Plan validations
    validatePlanData,
    
    // Utility validations
    validateObjectId,
    
    // Error handler
    handleValidationErrors
};