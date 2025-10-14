// models/TrustpilotReview.model.js
const mongoose = require('mongoose');

const trustpilotReviewSchema = new mongoose.Schema({
  review_id: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  review_title: String,
  review_text: String,
  review_rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
    index: true
  },
  review_is_verified: Boolean,
  review_is_pending: Boolean,
  review_likes: Number,
  review_language: String,
  review_time: Date,
  review_experienced_time: Date,
  consumer_id: String,
  consumer_name: String,
  consumer_review_count: Number,
  consumer_country: String,
  consumer_is_verified: Boolean,
  consumer_review_count_same_domain: Number,
}, {
  timestamps: true
});

trustpilotReviewSchema.index({ review_rating: 1, review_time: -1 });
trustpilotReviewSchema.index({ createdAt: -1 });

module.exports = mongoose.model('TrustpilotReview', trustpilotReviewSchema);