// services/trustpilot.service.js - FINAL PRODUCTION VERSION
const axios = require('axios');

class TrustpilotService {
  constructor() {
    this.apiKey = process.env.RAPIDAPI_KEY || 'a9e5421681mshd7eace160db45bcp1fa6efjsn08835f776562';
    this.apiHost = 'trustpilot-company-and-reviews-data.p.rapidapi.com';
    this.baseUrl = `https://${this.apiHost}`;
    this.domain = 'cypentra.com';
  }

  /**
   * Get company reviews from Trustpilot
   * Note: RapidAPI always returns 20 reviews per request, ignoring per_page parameter
   * Manual pagination is handled in the controller layer
   */
  async getCompanyReviews(options = {}) {
    try {
      const params = {
        company_domain: this.domain,
        page: options.page || 1,
        per_page: 20, // API ignores this, always returns 20
        locale: 'en-US'
      };

      // Optional filters
      if (options.stars) params.stars = options.stars;
      if (options.language) params.language = options.language;

      const response = await axios({
        method: 'GET',
        url: `${this.baseUrl}/company-reviews`,
        params,
        headers: {
          'x-rapidapi-key': this.apiKey,
          'x-rapidapi-host': this.apiHost
        },
        timeout: 10000
      });

      // Check for API errors
      if (response.data.status !== 'OK') {
        throw new Error(response.data.error?.message || 'API returned error status');
      }

      const data = response.data.data;

      return {
        reviews: data.reviews || [],
        total_reviews: data.total_reviews || 0,
        current_page: parseInt(params.page),
        rating_distribution: data.rating_distribution || {},
        language_distribution: data.review_language_distribution || {}
      };

    } catch (error) {
      console.error('Error fetching reviews:', {
        message: error.message,
        response: error.response?.data
      });
      
      throw new Error(
        error.response?.data?.error?.message || 
        error.message || 
        'Failed to fetch reviews'
      );
    }
  }

  /**
   * Get company information and stats
   */
  async getCompanyInfo() {
    const result = await this.getCompanyReviews({ page: 1 });
    return {
      domain: this.domain,
      total_reviews: result.total_reviews,
      rating_distribution: result.rating_distribution,
      language_distribution: result.language_distribution
    };
  }
}

module.exports = new TrustpilotService();