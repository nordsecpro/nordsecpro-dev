// middlewares/errorHandler.js
const { StatusCodes } = require('http-status-codes');
const logger = require('../utils/logger');

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

const handleCastErrorDB = err => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, StatusCodes.BAD_REQUEST);
};

const handleDuplicateFieldsDB = err => {
  // Handle different formats of duplicate key errors
  let value;
  if (err.errmsg) {
    const match = err.errmsg.match(/(["'])(\\?.)*?\1/);
    value = match ? match[0] : 'duplicate value';
  } else if (err.keyValue) {
    value = Object.values(err.keyValue)[0];
  } else {
    value = 'duplicate value';
  }
  
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, StatusCodes.CONFLICT);
};

const handleValidationErrorDB = err => {
  const errors = Object.values(err.errors).map(el => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, StatusCodes.BAD_REQUEST);
};

const handleJWTError = () => 
  new AppError('Invalid token. Please log in again!', StatusCodes.UNAUTHORIZED);

const handleJWTExpiredError = () => 
  new AppError('Your token has expired! Please log in again.', StatusCodes.UNAUTHORIZED);

// Restaurant booking specific error handlers
const handleGeolocationError = err => {
  return new AppError('Invalid coordinates provided. Latitude must be between -90 and 90, longitude between -180 and 180.', StatusCodes.BAD_REQUEST);
};

const handleDealUnavailableError = err => {
  return new AppError('This deal is no longer available for booking.', StatusCodes.CONFLICT);
};

const handleBookingLimitError = err => {
  return new AppError('Maximum booking limit reached for this deal.', StatusCodes.CONFLICT);
};

const handleDealExpiredError = err => {
  return new AppError('This deal has expired and is no longer available.', StatusCodes.GONE);
};

const handleBookingConflictError = err => {
  return new AppError('You have already booked this deal.', StatusCodes.CONFLICT);
};

const handleInvalidDateRangeError = err => {
  return new AppError('Invalid date range. End date must be after start date.', StatusCodes.BAD_REQUEST);
};

const sendErrorDev = (err, res) => {
  logger.error(`ERROR 💥: ${err}`);
  
  return res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  });
};

const sendErrorProd = (err, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  }
  
  // Programming or other unknown error: don't leak error details
  logger.error('ERROR 💥', err);
  
  // Send generic message
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    status: 'error',
    message: 'Something went wrong'
  });
};

const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else {
    let error = { ...err };
    error.message = err.message;

    // MongoDB errors
    if (err.name === 'CastError') error = handleCastErrorDB(err);
    if (err.code === 11000) error = handleDuplicateFieldsDB(err);
    if (err.name === 'ValidationError') error = handleValidationErrorDB(err);
    
    // JWT errors
    if (err.name === 'JsonWebTokenError') error = handleJWTError();
    if (err.name === 'TokenExpiredError') error = handleJWTExpiredError();
    
    // Restaurant booking specific errors
    if (err.message && err.message.includes('coordinates')) error = handleGeolocationError(err);
    if (err.message && err.message.includes('deal not available')) error = handleDealUnavailableError(err);
    if (err.message && err.message.includes('booking limit')) error = handleBookingLimitError(err);
    if (err.message && err.message.includes('deal expired')) error = handleDealExpiredError(err);
    if (err.message && err.message.includes('already booked')) error = handleBookingConflictError(err);
    if (err.message && err.message.includes('invalid date range')) error = handleInvalidDateRangeError(err);

    sendErrorProd(error, res);
  }
};

// Helper functions for creating specific errors
const createDealNotFoundError = () => {
  return new AppError('Deal not found', StatusCodes.NOT_FOUND);
};

const createBookingNotFoundError = () => {
  return new AppError('Booking not found', StatusCodes.NOT_FOUND);
};

const createUnauthorizedBookingError = () => {
  return new AppError('You are not authorized to access this booking', StatusCodes.FORBIDDEN);
};

const createDealUnavailableError = () => {
  return new AppError('This deal is no longer available for booking', StatusCodes.CONFLICT);
};

const createBookingLimitError = () => {
  return new AppError('Maximum booking limit reached for this deal', StatusCodes.CONFLICT);
};

const createInvalidCoordinatesError = () => {
  return new AppError('Invalid coordinates. Please provide valid latitude and longitude values', StatusCodes.BAD_REQUEST);
};

const createDuplicateBookingError = () => {
  return new AppError('You have already booked this deal', StatusCodes.CONFLICT);
};

module.exports = {
  AppError,
  errorHandler,
  // Export helper functions for controllers
  createDealNotFoundError,
  createBookingNotFoundError,
  createUnauthorizedBookingError,
  createDealUnavailableError,
  createBookingLimitError,
  createInvalidCoordinatesError,
  createDuplicateBookingError
};