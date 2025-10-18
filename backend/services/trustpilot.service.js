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

  async incrementApiCallCounter(callCount = 1) {
    await TrustpilotCache.findOneAndUpdate(
      { cache_key: 'trustpilot_metadata' },
      {
        $inc: { api_calls_this_month: callCount },
        $set: { 
          current_month: this.getCurrentMonth(),
          last_fetched: new Date()
        }
      },
      { upsert: true }
    );
  }

  // NEW METHOD: Fetch company details including trust score
  async fetchCompanyDetails() {
    const response = await axios({
      method: 'GET',
      url: `${this.baseUrl}/company-details`,
      params: {
        company_domain: this.domain,
        locale: 'en-US'
      },
      headers: {
        'x-rapidapi-key': this.apiKey,
        'x-rapidapi-host': this.apiHost
      },
      timeout: 10000
    });

    if (response.data.status !== 'OK') {
      throw new Error(response.data.error?.message || 'API error fetching company details');
    }

    return response.data.data;
  }

  async fetchReviewsFromAPI() {
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
      throw new Error(response.data.error?.message || 'API error fetching reviews');
    }

    return response.data.data;
  }

  // UPDATED METHOD: Now fetches both reviews and company details
  async fetchFromAPI() {
    const canCall = await this.canMakeApiCall();
    if (!canCall) {
      throw new Error('Monthly API limit reached');
    }

    // Check if we have enough API calls remaining for both requests
    const cache = await this.getCache();
    const remainingCalls = this.MAX_MONTHLY_CALLS - (cache?.api_calls_this_month || 0);
    if (remainingCalls < 2) {
      throw new Error('Not enough API calls remaining for full update');
    }

    // Fetch both reviews and company details in parallel
    const [reviewsData, companyData] = await Promise.all([
      this.fetchReviewsFromAPI(),
      this.fetchCompanyDetails()
    ]);

    // Merge the data
    return {
      ...reviewsData,
      trust_score: companyData.company.trust_score,
      company_rating: companyData.company.rating
    };
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

  // UPDATED METHOD: Now includes trust_score
  async updateCache(data) {
    await TrustpilotCache.findOneAndUpdate(
      { cache_key: 'trustpilot_metadata' },
      {
        total_reviews: data.total_reviews,
        trust_score: data.trust_score, // ADD THIS
        rating_distribution: data.rating_distribution,
        review_language_distribution: data.review_language_distribution,
        last_fetched: new Date()
      },
      { upsert: true }
    );
  }

  // UPDATED METHOD: Now handles trust_score
  async fetchAndStoreReviews() {
    const data = await this.fetchFromAPI();
    await this.storeReviews(data.reviews);
    await this.updateCache(data);
    await this.incrementApiCallCounter(2); // Increment by 2 since we make 2 API calls

    return {
      reviews: data.reviews,
      total_reviews: data.total_reviews,
      trust_score: data.trust_score, // ADD THIS
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

  // UPDATED METHOD: Now includes trust_score in response
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
      trust_score: cache?.trust_score || null, // ADD THIS
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

  // UPDATED METHOD: Now includes trust_score
  async getCompanyInfo() {
    const cache = await this.getCache();

    return {
      domain: this.domain,
      total_reviews: cache?.total_reviews || 0,
      trust_score: cache?.trust_score || null, // ADD THIS
      rating_distribution: cache?.rating_distribution || {},
      language_distribution: cache?.review_language_distribution || {},
      last_updated: cache?.last_fetched || null,
      api_calls_used_this_month: cache?.api_calls_this_month || 0,
      api_calls_remaining: this.MAX_MONTHLY_CALLS - (cache?.api_calls_this_month || 0)
    };
  }

  // NEW METHOD: Force refresh trust score only (uses 1 API call)
  async refreshTrustScoreOnly() {
    const canCall = await this.canMakeApiCall();
    if (!canCall) {
      throw new Error('Monthly API limit reached');
    }

    try {
      const companyData = await this.fetchCompanyDetails();
      
      // Update only the trust score in cache
      await TrustpilotCache.findOneAndUpdate(
        { cache_key: 'trustpilot_metadata' },
        {
          $set: { 
            trust_score: companyData.company.trust_score,
            last_fetched: new Date()
          }
        }
      );

      await this.incrementApiCallCounter(1);

      return {
        trust_score: companyData.company.trust_score,
        source: 'api'
      };
    } catch (error) {
      console.error('Failed to refresh trust score:', error.message);
      throw error;
    }
  }

  async forceRefresh() {
    return await this.fetchAndStoreReviews();
  }
}

module.exports = new TrustpilotService();