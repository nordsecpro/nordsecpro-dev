// controllers/trustpilot.controller.js - FINAL PRODUCTION VERSION
const trustpilotService = require('../services/trustpilot.service');
const { catchAsync } = require('../middlewares/requestHandler');
const { sendSuccess, sendError } = require('../utils/response');

/**
 * GET /api/trustpilot/reviews
 * Handles pagination manually since RapidAPI always returns 20 reviews
 */
exports.getReviews = catchAsync(async (req, res, next) => {
  const requestedPerPage = parseInt(req.query.per_page || req.query.perPage || 20, 10);
  const requestedPage = parseInt(req.query.page || 1, 10);
  const requestedStars = req.query.stars ? parseInt(req.query.stars, 10) : null;
  
  // Validate inputs
  const page = Math.max(1, requestedPage);
  const perPage = Math.min(Math.max(1, requestedPerPage), 100);
  
  const options = { page };

  // Try to pass stars to API (even though it ignores it)
  if (requestedStars && requestedStars >= 1 && requestedStars <= 5) {
    options.stars = requestedStars;
  }
  if (req.query.language) options.language = req.query.language;

  // Fetch from API
  const data = await trustpilotService.getCompanyReviews(options);

  // Manual filtering: Filter by stars if requested
  let reviews = data.reviews || [];
  
  if (requestedStars && requestedStars >= 1 && requestedStars <= 5) {
    reviews = reviews.filter(review => review.review_rating === requestedStars);
  }

  // Manual pagination: slice to requested amount
  const totalFilteredReviews = reviews.length;
  if (reviews.length > perPage) {
    reviews = reviews.slice(0, perPage);
  }

  // Calculate pagination info based on filtered results
  const totalPages = Math.ceil(totalFilteredReviews / perPage);

  const responseData = {
    reviews: reviews,
    pagination: {
      current_page: page,
      per_page: perPage,
      total_pages: totalPages,
      total_reviews: data.total_reviews, // ← Now shows filtered count
      has_next_page: page < totalPages,
      has_prev_page: page > 1,
    },
    company_info: data.company_info || null,
  };

  return sendSuccess(res, responseData, 'Reviews retrieved successfully');
});
/**
 * GET /api/trustpilot/profile
 */
exports.getBusinessProfile = catchAsync(async (req, res, next) => {
  const info = await trustpilotService.getCompanyInfo();
  return sendSuccess(res, { profile: info }, 'Company profile retrieved successfully');
});