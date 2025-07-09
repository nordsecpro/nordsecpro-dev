// middleware/errorMiddleware.js

const mongoose = require('mongoose');
const { StatusCodes } = require('http-status-codes');
const { AppError } = require('./errorHandler'); 

// Middleware to validate MongoDB ObjectId format
exports.validateObjectId = (req, res, next) => {
  const idParams = ['id', 'subscriptionId', 'planId', 'orderId']; // Simplified ID params for restaurant booking API
  
  for (const param of idParams) {
    if (req.params[param] && !mongoose.Types.ObjectId.isValid(req.params[param])) {
      return next(new AppError(`Invalid ${param} format`, StatusCodes.BAD_REQUEST));
    }
  }
  
  next();
};

// Global error handler middleware
exports.globalErrorHandler = (err, req, res, next) => {
  // Set defaults
  let statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  let message = err.message || 'Something went wrong';
  
  // Log error for server logs
  console.error('ERROR:', err);
  
  // Handle known error types
  
  // MongoDB Cast Error (invalid ObjectId)
  if (err.name === 'CastError') {
    statusCode = StatusCodes.BAD_REQUEST;
    message = `Invalid ${err.path}: ${err.value}`;
  }
  
  // Mongoose Validation Error
  if (err.name === 'ValidationError') {
    statusCode = StatusCodes.BAD_REQUEST;
    message = Object.values(err.errors).map(val => val.message).join(', ');
  }
  
  // Mongoose duplicate key error
  if (err.code === 11000) {
    statusCode = StatusCodes.CONFLICT;
    const field = Object.keys(err.keyValue).join(', ');
    message = `Duplicate field value: ${field}. Please use another value.`;
  }
  
  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    statusCode = StatusCodes.UNAUTHORIZED;
    message = 'Invalid token. Please log in again.';
  }
  
  if (err.name === 'TokenExpiredError') {
    statusCode = StatusCodes.UNAUTHORIZED;
    message = 'Your token has expired. Please log in again.';
  }
  
  // Geolocation errors
  if (err.message && err.message.includes('coordinates')) {
    statusCode = StatusCodes.BAD_REQUEST;
    message = 'Invalid coordinates provided. Please provide valid latitude and longitude.';
  }
  
  // Deal availability errors
  if (err.message && err.message.includes('deal not available')) {
    statusCode = StatusCodes.CONFLICT;
    message = 'This deal is no longer available for booking.';
  }
  
  // Booking limit errors
  if (err.message && err.message.includes('booking limit')) {
    statusCode = StatusCodes.CONFLICT;
    message = 'Maximum booking limit reached for this deal.';
  }
  
  // Development vs Production error response
  if (process.env.NODE_ENV === 'development') {
    // In development, send detailed error information
    return res.status(statusCode).json({
      status: 'error',
      message,
      error: err,
      stack: err.stack
    });
  } else {
    // In production, send clean error response
    return res.status(statusCode).json({
      status: 'error',
      message
    });
  }
};

// Unhandled route middleware
exports.undefinedRouteHandler = (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, StatusCodes.NOT_FOUND));
};

// Handle async errors without try-catch
exports.catchAsync = fn => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

