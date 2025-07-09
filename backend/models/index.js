// models/index.js

// Import only required model files for Restaurant Booking API
const Admin = require('./Admin');
const Subscription = require('./Subscription');
const Contact = require('./Contact'); 

// Export only the models needed for the restaurant booking system
module.exports = {
    Admin,
    Subscription,
    Contact
};