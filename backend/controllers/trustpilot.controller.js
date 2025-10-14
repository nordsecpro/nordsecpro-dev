// controllers/trustpilot.controller.js
const trustpilotService = require('../services/trustpilot.service');
const { catchAsync } = require('../middlewares/requestHandler');
const { sendSuccess } = require('../utils/response');

const validatePaginationParams = (query) => {
  const requestedPerPage = parseInt(query.per_page || query.perPage || 20, 10);
  const requestedPage = parseInt(query.page || 1, 10);
  const requestedStars = query.stars ? parseInt(query.stars, 10) : null;

  return {
    page: Math.max(1, requestedPage),
    perPage: Math.min(Math.max(1, requestedPerPage), 100),
    stars: requestedStars,
    language: query.language
  };
};

const buildPaginationResponse = (data, page, perPage) => {
  const totalPages = Math.ceil(data.total_reviews / perPage);

  return {
    reviews: data.reviews,
    pagination: {
      current_page: page,
      per_page: perPage,
      total_pages: totalPages,
      total_reviews: data.total_reviews,
      has_next_page: page < totalPages,
      has_prev_page: page > 1,
    },
    metadata: {
      data_source: data.source,
      cache_age_hours: data.cache_age_hours,
      api_calls_used: data.api_calls_used,
      api_calls_remaining: data.api_calls_remaining,
      rating_distribution: data.rating_distribution,
      language_distribution: data.language_distribution
    }
  };
};

exports.getReviews = catchAsync(async (req, res) => {
  const { page, perPage, stars, language } = validatePaginationParams(req.query);
  
  const data = await trustpilotService.getCompanyReviews({
    page,
    perPage,
    stars,
    language
  });

  const response = buildPaginationResponse(data, page, perPage);
  
  return sendSuccess(res, response, 'Reviews retrieved successfully');
});

exports.getBusinessProfile = catchAsync(async (req, res) => {
  const info = await trustpilotService.getCompanyInfo();
  return sendSuccess(res, { profile: info }, 'Company profile retrieved successfully');
});

exports.forceRefresh = catchAsync(async (req, res) => {
  const result = await trustpilotService.forceRefresh();
  return sendSuccess(res, result, 'Reviews refreshed successfully');
});