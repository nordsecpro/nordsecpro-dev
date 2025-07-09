// models/Contact.js
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  company: {
    type: String,
    trim: true
  },
  subject: {
    type: String,
    trim: true
  },
  message: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    default: 'general_inquiry'
  },
  status: {
    type: String,
    enum: ['new', 'resolved'],
    default: 'new'
  }
}, {
  timestamps: true
});

// Simple indexes for search and filter
contactSchema.index({ status: 1 });
contactSchema.index({ createdAt: -1 });
contactSchema.index({ name: 'text', email: 'text', company: 'text' });

module.exports = mongoose.model('Contact', contactSchema);