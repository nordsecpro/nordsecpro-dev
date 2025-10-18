// models/TrustpilotCache.model.js
const mongoose = require('mongoose');

const trustpilotCacheSchema = new mongoose.Schema({
  cache_key: {
    type: String,
    required: true,
    unique: true,
    default: 'trustpilot_metadata'
  },
  total_reviews: Number,
  trust_score: Number,  // ADD THIS FIELD
  rating_distribution: {
    '1': Number,
    '2': Number,
    '3': Number,
    '4': Number,
    '5': Number
  },
  review_language_distribution: mongoose.Schema.Types.Mixed,
  last_fetched: {
    type: Date,
    default: Date.now,
    index: true
  },
  api_calls_this_month: {
    type: Number,
    default: 0
  },
  current_month: {
    type: String,
    default: () => new Date().toISOString().slice(0, 7)
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('TrustpilotCache', trustpilotCacheSchema);