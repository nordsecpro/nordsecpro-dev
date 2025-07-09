// scripts/seed.js - Subscription Service Seed Data
const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const connectDB = require('../config/database');
const config = require('../config/environment');

// Main database seeding function
async function seedDatabase() {
  let connection;
  try {
    // First establish the database connection
    console.log('Connecting to database...');
    connection = await connectDB();
    console.log('Database connected successfully');

    console.log('Starting database seeding...');

    // Clear existing data
    await clearDatabase();

    // Create admin user
    const admin = await createAdmin();
    console.log('Admin user created');

    // Create test scenarios first
    console.log('Creating test scenarios...');
    await createTestScenarios();

    // Create test subscriptions
    const subscriptions = await createSubscriptions(200);
    console.log('Test subscriptions created');

    // Generate summary statistics
    const summary = await generateSummary();

    console.log('Database seeding completed successfully!');
    console.log(`
      Admin credentials:
      Email: ${admin.email}
      Password: ${config.admin.password}
      
      ${summary}
    `);

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('MongoDB disconnected');

  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

// Clear existing data
async function clearDatabase() {
  const { Admin, Subscription } = require('../models');
  
  console.log('Clearing existing data...');
  await Promise.all([
    Admin.deleteMany({}),
    Subscription.deleteMany({})
  ]);
  console.log('Database cleared');
}

// Create admin user
async function createAdmin() {
  const { Admin } = require('../models');

  const admin = await Admin.create({
    firstName: 'Admin',
    lastName: 'User',
    email: config.admin.email,
    password: config.admin.password,
    isActive: true
  });

  console.log(`Admin created with email: ${admin.email}`);
  return admin;
}

// Create specific test scenarios for better testing
async function createTestScenarios() {
  const { Subscription } = require('../models');

  // Scenario 1: High-value enterprise customer with all plans
  await Subscription.create({
    plans: [
      {
        planTitle: 'Startup Security Launchpad',
        numberOfEmployees: 50,
        price: 5000
      },
      {
        planTitle: 'SOC 2 Pre-Audit Blueprint',
        numberOfEmployees: 100,
        price: 12500
      },
      {
        planTitle: 'Audit Check: Final Review',
        numberOfEmployees: 150,
        price: 22500
      },
      {
        planTitle: 'vCISO On-Demand',
        numberOfEmployees: 200,
        price: 40000
      }
    ],
    totalPrice: 80000,
    customerDetails: {
      firstName: 'Sarah',
      lastName: 'Johnson', 
      email: 'sarah.johnson@enterprise-corp.com',
      phone: '+1-555-0123'
    },
    status: 'active',
    paymentStatus: 'succeeded',
    stripePaymentIntentId: `pi_enterprise_test_${faker.string.alphanumeric(20)}`,
    confirmationEmailSent: true,
    invoiceEmailSent: true,
    createdAt: faker.date.past({ days: 30 }),
    updatedAt: faker.date.recent({ days: 5 })
  });

  // Scenario 2: Failed payment scenario
  await Subscription.create({
    plans: [
      {
        planTitle: 'SOC 2 Pre-Audit Blueprint',
        numberOfEmployees: 25,
        price: 6875
      }
    ],
    totalPrice: 6875,
    customerDetails: {
      firstName: 'Mike',
      lastName: 'Chen',
      email: 'mike.chen@startup-inc.com',
      phone: '+1-555-0456'
    },
    status: 'inactive',
    paymentStatus: 'failed',
    stripePaymentIntentId: `pi_failed_test_${faker.string.alphanumeric(20)}`,
    confirmationEmailSent: false,
    invoiceEmailSent: false,
    createdAt: faker.date.past({ days: 7 }),
    updatedAt: faker.date.recent({ days: 1 })
  });

  // Scenario 3: Recent large subscription with two plans
  await Subscription.create({
    plans: [
      {
        planTitle: 'SOC 2 Pre-Audit Blueprint',
        numberOfEmployees: 75,
        price: 10625
      },
      {
        planTitle: 'vCISO On-Demand',
        numberOfEmployees: 125,
        price: 28750
      }
    ],
    totalPrice: 39375,
    customerDetails: {
      firstName: 'Emily',
      lastName: 'Rodriguez',
      email: 'emily.rodriguez@techvision.com',
      phone: '+1-555-0789'
    },
    status: 'active',
    paymentStatus: 'succeeded',
    stripePaymentIntentId: `pi_recent_test_${faker.string.alphanumeric(20)}`,
    confirmationEmailSent: true,
    invoiceEmailSent: false,
    createdAt: faker.date.recent({ days: 2 }),
    updatedAt: faker.date.recent({ hours: 6 })
  });

  // Scenario 4: Small startup with basic plan
  await Subscription.create({
    plans: [
      {
        planTitle: 'Startup Security Launchpad',
        numberOfEmployees: 8,
        price: 2900
      }
    ],
    totalPrice: 2900,
    customerDetails: {
      firstName: 'Alex',
      lastName: 'Thompson',
      email: 'alex@newstartup.io',
      phone: '+1-555-0321'
    },
    status: 'active',
    paymentStatus: 'succeeded',
    stripePaymentIntentId: `pi_startup_test_${faker.string.alphanumeric(20)}`,
    confirmationEmailSent: true,
    invoiceEmailSent: true,
    createdAt: faker.date.past({ days: 14 }),
    updatedAt: faker.date.past({ days: 10 })
  });

  console.log('Test scenarios created successfully');
}

// Create test subscriptions with multiple plans
async function createSubscriptions(count) {
  const { Subscription } = require('../models');
  const subscriptions = [];

  // Available plans with realistic pricing
  const availablePlans = [
    {
      title: 'Startup Security Launchpad',
      basePrice: 2500,
      pricePerEmployee: 50
    },
    {
      title: 'SOC 2 Pre-Audit Blueprint',
      basePrice: 5000,
      pricePerEmployee: 75
    },
    {
      title: 'Audit Check: Final Review',
      basePrice: 7500,
      pricePerEmployee: 100
    },
    {
      title: 'vCISO On-Demand',
      basePrice: 10000,
      pricePerEmployee: 150
    }
  ];

  for (let i = 0; i < count; i++) {
    // Determine number of plans for this subscription (1-3 plans, weighted toward single plans)
    const planCount = faker.helpers.weightedArrayElement([
      { weight: 60, value: 1 }, // 60% single plan
      { weight: 30, value: 2 }, // 30% two plans  
      { weight: 10, value: 3 }  // 10% three plans
    ]);

    // Generate unique plans for this subscription
    const selectedPlans = faker.helpers.arrayElements(availablePlans, planCount);
    
    const plans = [];
    let totalPrice = 0;

    // Create plan objects with calculated prices
    selectedPlans.forEach(planTemplate => {
      const numberOfEmployees = faker.number.int({ min: 5, max: 250 });
      const planPrice = planTemplate.basePrice + (numberOfEmployees * planTemplate.pricePerEmployee);
      
      plans.push({
        planTitle: planTemplate.title,
        numberOfEmployees,
        price: planPrice
      });
      
      totalPrice += planPrice;
    });

    // Generate realistic company names
    const companyNames = [
      'TechCorp', 'InnovateLab', 'DataSystems', 'CloudTech', 'SecureBase',
      'DigitalFlow', 'SmartSolutions', 'TechVision', 'DataBridge', 'CyberShield',
      'NextGen Systems', 'FutureTech', 'CodeCraft', 'DataForge', 'TechPioneer',
      'SecureLink', 'CyberGuard', 'TechShield', 'DataVault', 'CloudSafe',
      'InfoSec Pro', 'ByteShield', 'NetSecure', 'TechFortress', 'CyberCore'
    ];

    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    // Create subscription with multiple plans structure
    const subscription = await Subscription.create({
      plans: plans, // Array of plan objects
      totalPrice: totalPrice, // Sum of all plan prices
      customerDetails: {
        firstName,
        lastName,
        email: faker.internet.email({ firstName, lastName }),
        phone: faker.phone.number()
      },
      status: faker.helpers.arrayElement([
        'active', 'active', 'active', 'active', // 80% active
        'inactive', 'inactive'
      ]),
      paymentStatus: faker.helpers.arrayElement([
        'succeeded', 'succeeded', 'succeeded', 'succeeded', 'succeeded', // 90% succeeded
        'pending', 'failed'
      ]),
      stripePaymentIntentId: `pi_${faker.string.alphanumeric(24)}`,
      confirmationEmailSent: faker.datatype.boolean(0.8), // 80% have confirmation sent
      invoiceEmailSent: faker.datatype.boolean(0.7), // 70% have invoice sent
      createdAt: faker.date.past({ years: 1 }),
      updatedAt: faker.date.recent({ days: 30 })
    });

    subscriptions.push(subscription);
    
    // Log progress every 50 subscriptions
    if ((i + 1) % 50 === 0) {
      console.log(`Created ${i + 1}/${count} subscriptions...`);
    }
  }

  return subscriptions;
}

// Generate comprehensive summary
async function generateSummary() {
  const { Subscription } = require('../models');

  const totalSubscriptions = await Subscription.countDocuments();
  const activeSubscriptions = await Subscription.countDocuments({ status: 'active' });
  const totalRevenue = await Subscription.aggregate([
    { $match: { paymentStatus: 'succeeded' } },
    { $group: { _id: null, total: { $sum: '$totalPrice' } } }
  ]);
  
  const planStats = await Subscription.aggregate([
    { $unwind: '$plans' },
    { $group: { _id: '$plans.planTitle', count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]);

  const planCountStats = await Subscription.aggregate([
    {
      $group: {
        _id: { $size: '$plans' },
        count: { $sum: 1 }
      }
    },
    { $sort: { '_id': 1 } }
  ]);

  const paymentStats = await Subscription.aggregate([
    {
      $group: {
        _id: '$paymentStatus',
        count: { $sum: 1 }
      }
    }
  ]);

  let summary = `Total created:
      - 1 admin user
      - ${totalSubscriptions} total subscriptions
      - ${activeSubscriptions} active subscriptions
      - $${(totalRevenue[0]?.total || 0).toLocaleString()} total revenue
      
      Plan distribution:`;

  planStats.forEach(plan => {
    summary += `\n      - ${plan._id}: ${plan.count} instances`;
  });

  summary += `\n      
      Subscription types:`;
  planCountStats.forEach(stat => {
    const planText = stat._id === 1 ? 'Single plan' : `${stat._id} plans`;
    summary += `\n      - ${planText}: ${stat.count} subscriptions`;
  });

  summary += `\n      
      Payment status:`;
  paymentStats.forEach(stat => {
    summary += `\n      - ${stat._id}: ${stat.count} subscriptions`;
  });

  return summary;
}

// Run the seeding function
if (require.main === module) {
  seedDatabase();
}

module.exports = { seedDatabase };