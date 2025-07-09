// middlewares/auth.js
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const config = require('../config/environment');

/**
 * Protect admin routes - check if user is authenticated
 */
exports.protect = async (req, res, next) => {
    try {
        // Get token from header
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Access denied. No token provided.'
            });
        }

        // Verify token
        const decoded = jwt.verify(token, config.jwt.secret);
        
        // Check if admin still exists and is active
        const admin = await Admin.findById(decoded.id);
        if (!admin || !admin.isActive) {
            return res.status(401).json({
                success: false,
                message: 'Access denied. Admin not found or inactive.'
            });
        }

        // Add admin to request
        req.admin = admin;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Access denied. Invalid token.'
        });
    }
};

/**
 * Generate JWT token for admin
 */
exports.generateToken = (adminId) => {
    return jwt.sign(
        { id: adminId },
        config.jwt.secret,
        { expiresIn: config.jwt.expiresIn }
    );
};