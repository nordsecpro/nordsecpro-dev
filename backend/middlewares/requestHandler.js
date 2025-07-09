// middlewares/requestHandler.js
const { StatusCodes } = require('http-status-codes');
const { AppError } = require('./errorHandler');

/**
 * Async handler to catch errors in async functions
 * @param {Function} fn - Async function to handle
 * @returns {Function} - Express middleware function
 */
exports.catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

/**
 * Standard API response formatter
 * @param {Object} res - Express response object
 * @param {Number} statusCode - HTTP status code
 * @param {String} message - Response message
 * @param {Object} data - Response data
 * @returns {Object} - Formatted response
 */
exports.sendResponse = (res, statusCode, message, data = null, meta = null) => {
  const response = {
    status: statusCode < 400 ? true : false,
    message,
  };

  if (data) response.data = data;
  if (meta) response.meta = meta;

  return res.status(statusCode).json(response);
};

/**
 * Pagination middleware to standardize pagination across the app
 * @param {Number} defaultLimit - Default number of results per page
 * @param {Number} maxLimit - Maximum number of results per page
 * @returns {Function} Express middleware
 */
exports.paginate = (defaultLimit = 10, maxLimit = 100) => {
  return (req, res, next) => {
    // Parse parameters with defaults
    const page = parseInt(req.query.page, 10) || 1;
    let limit = parseInt(req.query.limit, 10) || defaultLimit;

    // Ensure limit doesn't exceed maximum
    if (limit > maxLimit) limit = maxLimit;

    // Calculate skip for MongoDB
    const skip = (page - 1) * limit;

    // Add pagination to request object
    req.pagination = {
      page,
      limit,
      skip
    };

    next();
  };
};

/**
 * Filter query middleware for MongoDB queries
 * @returns {Function} Express middleware
 */
exports.filter = () => {
  return (req, res, next) => {
    // Create a copy of req.query
    const queryObj = { ...req.query };

    // Fields to exclude from filtering
    const excludedFields = ['page', 'sort', 'limit', 'fields', 'search'];
    excludedFields.forEach(field => delete queryObj[field]);

    // Process MongoDB operators
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt|eq|ne|in|nin|regex)\b/g, match => `$${match}`);

    // Parse the query string
    req.filter = JSON.parse(queryStr);

    // Handle search if present
    if (req.query.search) {
      // This will be customized per controller
      req.search = req.query.search;
    }

    next();
  };
};

/**
 * Sort query middleware for MongoDB queries
 * @param {String} defaultSort - Default sort field and direction (e.g. '-createdAt')
 * @returns {Function} Express middleware
 */
exports.sort = (defaultSort = '-createdAt') => {
  return (req, res, next) => {
    req.sort = req.query.sort ? req.query.sort.split(',').join(' ') : defaultSort;
    next();
  };
};

/**
 * Field limiting middleware for MongoDB queries
 * @param {String} defaultFields - Default fields to return
 * @returns {Function} Express middleware
 */
exports.limitFields = (defaultFields = '') => {
  return (req, res, next) => {
    req.fields = req.query.fields ? req.query.fields.split(',').join(' ') : defaultFields;
    next();
  };
};

/**
 * Request validation middleware 
 * @param {Function} schema - Joi schema for validation
 * @returns {Function} Express middleware
 */
exports.validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      const message = error.details.map(detail => detail.message).join(', ');
      return next(new AppError(message, StatusCodes.BAD_REQUEST));
    }

    next();
  };
};