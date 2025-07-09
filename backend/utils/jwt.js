// utils/jwt.js
const jwt = require('jsonwebtoken');
const config = require('../config/environment');

// Generate JWT token
const generateToken = (payload) => {
    return jwt.sign(payload, config.jwt.secret, {
        expiresIn: config.jwt.expiresIn
    });
};

// Verify JWT token
const verifyToken = (token) => {
    return jwt.verify(token, config.jwt.secret);
};

module.exports = {
    generateToken,
    verifyToken
};