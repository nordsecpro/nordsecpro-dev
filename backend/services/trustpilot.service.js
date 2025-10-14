// services/trustpilot.service.js
const axios = require('axios');
const TrustpilotReview = require('../models/TrustpilotReview.model');
const TrustpilotCache = require('../models/TrustpilotCache.model');

class TrustpilotService {
  constructor() {
    this.apiKey = process.env.RAPIDAPI_KEY;
    this.apiHost = 'trustpilot-company-and-reviews-data.p.rapidapi.com';
    this.baseUrl = `https://${this.apiHost}`;
    this.domain = 'cypentra.com';
    this.CACHE_DURATION_HOURS = 24;
    this.MAX_MONTHLY_CALLS = 100;
  }

  getCurrentMonth() {
    return new Date().toISOString().slice(0, 7);
  }

  calculateHoursSince(date) {
    return (Date.now() - new Date(date)) / (1000 * 60 * 60);
  }

  async getCache() {
    return await TrustpilotCache.findOne({ cache_key: 'trustpilot_metadata' });
  }

  async isCacheValid() {
    const cache = await this.getCache();
    if (!cache) return false;
    
    const hoursSinceLastFetch = this.calculateHoursSince(cache.last_fetched);
    return hoursSinceLastFetch < this.CACHE_DURATION_HOURS;
  }

  async canMakeApiCall() {
    const currentMonth = this.getCurrentMonth();
    const cache = await this.getCache();

    if (!cache) return true;

    if (cache.current_month !== currentMonth) {
      await TrustpilotCache.updateOne(
        { cache_key: 'trustpilot_metadata' },
        { 
          api_calls_this_month: 0,
          current_month: currentMonth
        }
      );
      return true;
    }

    return cache.api_calls_this_month < this.MAX_MONTHLY_CALLS;
  }

  async incrementApiCallCounter() {
    await TrustpilotCache.findOneAndUpdate(
      { cache_key: 'trustpilot_metadata' },
      {
        $inc: { api_calls_this_month: 1 },
        $set: { 
          current_month: this.getCurrentMonth(),
          last_fetched: new Date()
        }
      },
      { upsert: true }
    );
  }

  async fetchFromAPI() {
    const canCall = await this.canMakeApiCall();
    if (!canCall) {
      throw new Error('Monthly API limit reached');
    }

    const response = await axios({
      method: 'GET',
      url: `${this.baseUrl}/company-reviews`,
      params: {
        company_domain: this.domain,
        page: 1,
        per_page: 20,
        locale: 'en-US'
      },
      headers: {
        'x-rapidapi-key': this.apiKey,
        'x-rapidapi-host': this.apiHost
      },
      timeout: 10000
    });

    if (response.data.status !== 'OK') {
      throw new Error(response.data.error?.message || 'API error');
    }

    return response.data.data;
  }

  async storeReviews(reviews) {
    const operations = reviews.map(review => ({
      updateOne: {
        filter: { review_id: review.review_id },
        update: {
          ...review,
          review_time: new Date(review.review_time),
          review_experienced_time: new Date(review.review_experienced_time)
        },
        upsert: true
      }
    }));

    await TrustpilotReview.bulkWrite(operations);
  }

  async updateCache(data) {
    await TrustpilotCache.findOneAndUpdate(
      { cache_key: 'trustpilot_metadata' },
      {
        total_reviews: data.total_reviews,
        rating_distribution: data.rating_distribution,
        review_language_distribution: data.review_language_distribution,
        last_fetched: new Date()
      },
      { upsert: true }
    );
  }

  async fetchAndStoreReviews() {
    const data = await this.fetchFromAPI();
    await this.storeReviews(data.reviews);
    await this.updateCache(data);
    await this.incrementApiCallCounter();

    return {
      reviews: data.reviews,
      total_reviews: data.total_reviews,
      rating_distribution: data.rating_distribution,
      language_distribution: data.review_language_distribution,
      source: 'api'
    };
  }

  buildQuery(stars, language) {
    const query = {};
    
    if (stars && stars >= 1 && stars <= 5) {
      query.review_rating = stars;
    }
    
    if (language) {
      query.review_language = language.toLowerCase();
    }

    return query;
  }

  async getReviewsFromDB(options = {}) {
    const { page = 1, perPage = 20, stars, language } = options;
    
    const query = this.buildQuery(stars, language);
    const skip = (page - 1) * perPage;

    const [reviews, totalReviews, cache] = await Promise.all([
      TrustpilotReview
        .find(query)
        .sort({ review_time: -1 })
        .skip(skip)
        .limit(perPage)
        .lean(),
      TrustpilotReview.countDocuments(query),
      this.getCache()
    ]);

    return {
      reviews,
      total_reviews: totalReviews,
      rating_distribution: cache?.rating_distribution || {},
      language_distribution: cache?.review_language_distribution || {},
      source: 'database',
      cache_age_hours: cache ? Math.floor(this.calculateHoursSince(cache.last_fetched)) : null,
      api_calls_used: cache?.api_calls_this_month || 0,
      api_calls_remaining: this.MAX_MONTHLY_CALLS - (cache?.api_calls_this_month || 0)
    };
  }

  async getCompanyReviews(options = {}) {
    const cacheValid = await this.isCacheValid();

    if (!cacheValid) {
      try {
        await this.fetchAndStoreReviews();
      } catch (error) {
        console.error('API fetch failed:', error.message);
      }
    }

    return await this.getReviewsFromDB(options);
  }

  async getCompanyInfo() {
    const cache = await this.getCache();

    return {
      domain: this.domain,
      total_reviews: cache?.total_reviews || 0,
      rating_distribution: cache?.rating_distribution || {},
      language_distribution: cache?.review_language_distribution || {},
      last_updated: cache?.last_fetched || null,
      api_calls_used_this_month: cache?.api_calls_this_month || 0,
      api_calls_remaining: this.MAX_MONTHLY_CALLS - (cache?.api_calls_this_month || 0)
    };
  }

  async forceRefresh() {
    return await this.fetchAndStoreReviews();
  }
}

module.exports = new TrustpilotService();