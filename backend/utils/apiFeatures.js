// utils/apiFeatures.js
/**
 * Simple API Features class for building MongoDB queries
 * Optimized for Subscription Service
 */
class APIFeatures {
  /**
   * Initialize APIFeatures with a query and request query params
   * @param {Object} query - Mongoose query object
   * @param {Object} reqQuery - Express request query object
   */
  constructor(query, reqQuery) {
    this.query = query;
    this.reqQuery = reqQuery;
  }

  /**
   * Filter the query based on query parameters
   * @returns {APIFeatures} this instance for chaining
   */
  filter() {
    const queryObj = { ...this.reqQuery };
    const excludedFields = ['page', 'sort', 'limit', 'fields', 'search'];
    excludedFields.forEach(el => delete queryObj[el]);

    // Advanced filtering with MongoDB operators
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt|eq|ne|in|nin)\b/g, match => `$${match}`);
    
    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  /**
   * Search across subscription fields
   * @returns {APIFeatures} this instance for chaining
   */
  search() {
    if (this.reqQuery.search) {
      const searchTerm = this.reqQuery.search;
      const searchQuery = {
        $or: [
          { 'customerDetails.firstName': { $regex: searchTerm, $options: 'i' } },
          { 'customerDetails.lastName': { $regex: searchTerm, $options: 'i' } },
          { 'customerDetails.email': { $regex: searchTerm, $options: 'i' } },
          { planTitle: { $regex: searchTerm, $options: 'i' } },
          { status: { $regex: searchTerm, $options: 'i' } }
        ]
      };
      this.query = this.query.find(searchQuery);
    }
    return this;
  }

  /**
   * Filter subscriptions by date range
   * @returns {APIFeatures} this instance for chaining
   */
  filterByDateRange() {
    const { startDate, endDate } = this.reqQuery;
    
    if (startDate || endDate) {
      const dateFilter = {};
      
      if (startDate) {
        dateFilter.$gte = new Date(startDate);
      }
      
      if (endDate) {
        dateFilter.$lte = new Date(endDate);
      }
      
      this.query = this.query.find({ createdAt: dateFilter });
    }
    
    return this;
  }

  /**
   * Filter by subscription status
   * @returns {APIFeatures} this instance for chaining
   */
  filterByStatus() {
    if (this.reqQuery.status) {
      this.query = this.query.find({ status: this.reqQuery.status });
    }
    return this;
  }

  /**
   * Filter by plan title
   * @returns {APIFeatures} this instance for chaining
   */
  filterByPlan() {
    if (this.reqQuery.plan) {
      this.query = this.query.find({ planTitle: this.reqQuery.plan });
    }
    return this;
  }

  /**
   * Sort the query results
   * @returns {APIFeatures} this instance for chaining
   */
  sort() {
    if (this.reqQuery.sort) {
      const sortBy = this.reqQuery.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      // Default sort by creation date (newest first)
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  /**
   * Limit fields returned in the query
   * @returns {APIFeatures} this instance for chaining
   */
  limitFields() {
    if (this.reqQuery.fields) {
      const fields = this.reqQuery.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      // Exclude version field by default
      this.query = this.query.select('-__v');
    }
    return this;
  }

  /**
   * Paginate the query results
   * @returns {APIFeatures} this instance for chaining
   */
  paginate() {
    const page = parseInt(this.reqQuery.page, 10) || 1;
    const limit = parseInt(this.reqQuery.limit, 10) || 10;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);
    
    return this;
  }

  /**
   * Execute the query to get the data and count
   * @returns {Promise<Object>} Object containing data and pagination info
   */
  async execute() {
    try {
      // Clone the query for counting total
      const countQuery = this.query.model.find(this.query.getFilter());
      
      // Execute both queries in parallel
      const [data, total] = await Promise.all([
        this.query.exec(),
        countQuery.countDocuments()
      ]);

      // Calculate pagination metadata
      const page = parseInt(this.reqQuery.page, 10) || 1;
      const limit = parseInt(this.reqQuery.limit, 10) || 10;
      
      return {
        success: true,
        data,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalCount: total,
          limit,
          hasNextPage: page < Math.ceil(total / limit),
          hasPrevPage: page > 1
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Get subscription statistics
   * @returns {Promise<Object>} Subscription statistics
   */
  async getStats() {
    try {
      const stats = await this.query.model.aggregate([
        { $match: this.query.getFilter() },
        {
          $group: {
            _id: null,
            totalSubscriptions: { $sum: 1 },
            totalRevenue: { $sum: '$price' },
            avgPrice: { $avg: '$price' },
            maxPrice: { $max: '$price' },
            minPrice: { $min: '$price' }
          }
        }
      ]);

      return stats[0] || {
        totalSubscriptions: 0,
        totalRevenue: 0,
        avgPrice: 0,
        maxPrice: 0,
        minPrice: 0
      };
    } catch (error) {
      throw new Error(`Stats calculation failed: ${error.message}`);
    }
  }

  /**
   * Get plan-wise statistics
   * @returns {Promise<Array>} Plan statistics
   */
  async getPlanStats() {
    try {
      return await this.query.model.aggregate([
        { $match: this.query.getFilter() },
        {
          $group: {
            _id: '$planTitle',
            count: { $sum: 1 },
            totalRevenue: { $sum: '$price' },
            avgEmployees: { $avg: '$numberOfEmployees' }
          }
        },
        { $sort: { count: -1 } }
      ]);
    } catch (error) {
      throw new Error(`Plan stats calculation failed: ${error.message}`);
    }
  }
}

module.exports = APIFeatures;