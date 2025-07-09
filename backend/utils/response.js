// utils/response.js

// Success response
const sendSuccess = (res, data = null, message = 'Success', statusCode = 200) => {
    const response = {
        success: true,
        message
    };
    
    if (data !== null) {
        response.data = data;
    }
    
    return res.status(statusCode).json(response);
};

// Error response
const sendError = (res, message = 'Something went wrong', statusCode = 500, errors = null) => {
    const response = {
        success: false,
        message
    };
    
    if (errors) {
        response.errors = errors;
    }
    
    return res.status(statusCode).json(response);
};

// utils/response.js - Add these enhanced methods


module.exports = {
    sendSuccess,
    sendError
};