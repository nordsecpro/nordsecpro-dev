// scripts/createIndexes.js
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/database');

async function createIndexes() {
  try {
    // Connect to MongoDB using your existing connection function
    console.log('Connecting to MongoDB...');
    await connectDB();
    console.log('Connected to MongoDB successfully');

    const db = mongoose.connection;

    console.log('Creating indexes for Subscription Service...');

    // ADMIN COLLECTION INDEXES
    console.log('Creating Admin indexes...');
    await db.collection('admins').createIndexes([
      { key: { email: 1 }, unique: true },
      { key: { isActive: 1 } },
      { key: { createdAt: -1 } }
    ]);

    // SUBSCRIPTION COLLECTION INDEXES
    console.log('Creating Subscription indexes...');
    await db.collection('subscriptions').createIndexes([
      // Customer details indexes
      { key: { 'customerDetails.email': 1 } },
      { key: { 'customerDetails.firstName': 1 } },
      { key: { 'customerDetails.lastName': 1 } },
      
      // Plan and pricing indexes
      { key: { planTitle: 1 } },
      { key: { numberOfEmployees: 1 } },
      { key: { price: -1 } },
      
      // Status and payment indexes
      { key: { status: 1 } },
      { key: { paymentStatus: 1 } },
      
      // Date indexes
      { key: { createdAt: -1 } },
      { key: { updatedAt: -1 } },
      
      // Compound indexes for efficient queries
      { key: { status: 1, createdAt: -1 } },
      { key: { planTitle: 1, status: 1 } },
      { key: { paymentStatus: 1, createdAt: -1 } },
      { key: { 'customerDetails.email': 1, status: 1 } },
      
      // Text search index for customer search
      { key: { 
          'customerDetails.firstName': 'text', 
          'customerDetails.lastName': 'text',
          'customerDetails.email': 'text',
          planTitle: 'text'
        } 
      }
    ]);

    console.log('All indexes created successfully!');

    // List all indexes for verification
    console.log('\n=== VERIFICATION ===');
    
    console.log('\nAdmin collection indexes:');
    const adminIndexes = await db.collection('admins').listIndexes().toArray();
    adminIndexes.forEach(index => console.log(`  - ${Object.keys(index.key).join(', ')}`));
    
    console.log('\nSubscription collection indexes:');
    const subscriptionIndexes = await db.collection('subscriptions').listIndexes().toArray();
    subscriptionIndexes.forEach(index => console.log(`  - ${Object.keys(index.key).join(', ')}`));

    console.log('\n✅ Index creation completed successfully!');

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');

  } catch (error) {
    console.error('❌ Error creating indexes:', error);
    process.exit(1);
  }
}

// Run the function
createIndexes();