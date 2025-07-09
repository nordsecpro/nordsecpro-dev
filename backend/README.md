# 💳 Subscription Service API

A comprehensive REST API for subscription service management with Stripe payment integration built with Node.js, Express, and MongoDB.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Core Features](#core-features)
- [Stripe Integration](#stripe-integration)
- [Database Schema](#database-schema)
- [Environment Setup](#environment-setup)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)

## ✨ Features

### Core Requirements ✅
- **Subscription Plan Management** - Multiple security service plans
- **Stripe Payment Integration** - Secure payment processing
- **Admin Dashboard** - Subscription management and analytics
- **Email Notifications** - Confirmation and invoice emails
- **PDF Invoice Generation** - Professional invoice PDFs

### Additional Features
- **Admin Authentication** - JWT-based secure admin access
- **Real-time Payment Webhooks** - Stripe webhook handling
- **Advanced Analytics** - Revenue and subscription insights
- **Rate Limiting** - API abuse prevention
- **Data Validation** - Comprehensive input validation
- **Email System** - Automated customer communications

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose ODM
- **Payment Processing:** Stripe
- **Authentication:** JWT (JSON Web Tokens)
- **Email:** Nodemailer
- **PDF Generation:** PDFKit
- **Security:** Helmet, CORS, Rate Limiting, Data Sanitization
- **Validation:** Express Validator with comprehensive error handling

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- MongoDB (v4.4+)
- Stripe Account
- Gmail Account (for email notifications)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd subscription-service-api

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env with your configuration

# Start MongoDB (if local)
mongod

# Create database indexes
npm run create-indexes

# Seed the database with sample data
npm run seed

# Start the development server
npm run dev
```

### Environment Variables

```env
# Server Configuration
NODE_ENV=development
PORT=5000

# Database
MONGODB_URI=mongodb://localhost:27017/subscription_service

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_APP_PASSWORD=your-gmail-app-password

# Admin Configuration
ADMIN_EMAIL=admin@yourcompany.com
ADMIN_PASSWORD=secure-admin-password

# Security
BCRYPT_SALT_ROUNDS=10
RATE_LIMIT_MAX_REQUESTS=100
RATE_LIMIT_WINDOW_MS=900000
CORS_ORIGIN=*
LOG_LEVEL=info
```

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for admin authentication.

### Admin Access
- **Admin** - System administrators (subscription management, analytics, all operations)

### Test Credentials
After running the seed script:
```
Admin Account:
Email: admin@yourcompany.com (from env)
Password: secure-admin-password (from env)
```

## 📡 API Endpoints

### Admin Authentication
```
POST   /api/admin/login           # Admin login
GET    /api/admin/profile         # Get admin profile
PUT    /api/admin/change-password # Change admin password
POST   /api/admin/logout          # Admin logout
```

### Admin Dashboard
```
GET    /api/admin/dashboard       # Dashboard overview
GET    /api/admin/subscriptions   # Get all subscriptions
GET    /api/admin/subscriptions/:id # Get single subscription
```

### Subscription Management
```
POST   /api/subscription/create-payment-intent # Create Stripe payment ⭐ CORE
POST   /api/subscription/webhook  # Stripe webhook handler ⭐ CORE
GET    /api/subscription/health   # Service health check
```

## 🎯 Core Features

### 1. Create Payment Intent
**Endpoint:** `POST /api/subscription/create-payment-intent`

```javascript
// Example Request
{
  "planTitle": "SOC 2 Pre-Audit Blueprint",
  "numberOfEmployees": 70,
  "price": 8500
}

// Example Response
{
  "success": true,
  "message": "Payment intent created successfully",
  "data": {
    "clientSecret": "pi_xxxxx_secret_xxxxx",
    "paymentIntentId": "pi_xxxxx"
  }
}
```

### 2. Stripe Webhook
**Endpoint:** `POST /api/subscription/webhook`

Automatically handles successful payments:
- Saves subscription to database
- Sends confirmation email
- Generates and emails invoice PDF

### 3. Admin Dashboard
**Endpoint:** `GET /api/admin/dashboard`

```javascript
// Example Response
{
  "success": true,
  "data": {
    "totalSubscriptions": 150,
    "totalRevenue": 725000,
    "activeSubscriptions": 140,
    "monthlyGrowth": 12.5,
    "popularPlan": "SOC 2 Pre-Audit Blueprint",
    "recentSubscriptions": [...]
  }
}
```

## 💳 Stripe Integration

### Payment Flow
1. **Frontend** sends plan data to `/create-payment-intent`
2. **Backend** creates Stripe payment intent
3. **Frontend** shows Stripe checkout with payment intent
4. **Customer** completes payment in Stripe
5. **Stripe** calls webhook on successful payment
6. **Backend** saves subscription and sends emails

### Subscription Plans
```javascript
const plans = [
  {
    title: "Startup Security Launchpad",
    basePrice: 2500,
    pricePerEmployee: 50
  },
  {
    title: "SOC 2 Pre-Audit Blueprint", 
    basePrice: 5000,
    pricePerEmployee: 75
  },
  {
    title: "Audit Check: Final Review",
    basePrice: 7500,
    pricePerEmployee: 100
  },
  {
    title: "vCISO On-Demand",
    basePrice: 10000,
    pricePerEmployee: 150
  }
];
```

### Webhook Security
- Stripe signature verification
- Raw body parsing for webhook endpoints
- Secure webhook secret validation

## 🗄️ Database Schema

### Admin Model
```javascript
{
  firstName: String,
  lastName: String,
  email: String (unique),
  password: String (hashed),
  isActive: Boolean,
  timestamps: true
}
```

### Subscription Model
```javascript
{
  planTitle: String,
  numberOfEmployees: Number,
  price: Number,
  customerDetails: {
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    company: String
  },
  status: ['active', 'pending', 'cancelled'],
  paymentStatus: ['paid', 'pending', 'failed'],
  stripePaymentIntentId: String (unique),
  stripeCustomerId: String,
  metadata: {
    source: String,
    notes: String
  },
  timestamps: true
}
```

## 📧 Email System

### Confirmation Email
Sent automatically after successful payment:
- Welcome message
- Subscription details
- Next steps information

### Invoice Email
Professional invoice with PDF attachment:
- Detailed billing information
- Company branding
- Payment confirmation

### Email Configuration
Uses Gmail SMTP with app passwords for secure authentication.

## 🔧 Advanced Features

### Query Parameters (Admin Dashboard)
```
# Pagination
?page=1&limit=10

# Filtering
?status=active&planTitle=SOC 2 Pre-Audit Blueprint

# Search across customer details
?search=john@company.com

# Date range filtering
?startDate=2024-01-01&endDate=2024-12-31

# Sorting
?sort=-createdAt,price
```

### Rate Limiting
- **General API**: 100 requests per 15 minutes
- **Payment Operations**: 50 requests per hour
- **Admin Operations**: 200 requests per hour

### Security Features
- **JWT Authentication** with secure token handling
- **Password Hashing** using bcryptjs
- **Stripe Webhook Verification** with signature validation
- **Data Sanitization** against NoSQL injection
- **XSS Protection** using xss-clean
- **Helmet** for security headers
- **CORS** configuration
- **Rate Limiting** per IP

## 📊 API Response Format

### Success Response
```javascript
{
  "success": true,
  "message": "Operation completed successfully",
  "data": { /* response data */ }
}
```

### Error Response
```javascript
{
  "success": false,
  "message": "Error description",
  "errors": ["Detailed error information"]
}
```

### Paginated Response
```javascript
{
  "success": true,
  "message": "Data retrieved successfully",
  "data": [...],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalCount": 50,
    "limit": 10,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

## 🧪 Testing

### Manual Testing
```bash
# Test admin login
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@yourcompany.com","password":"your-password"}'

# Test payment intent creation
curl -X POST http://localhost:5000/api/subscription/create-payment-intent \
  -H "Content-Type: application/json" \
  -d '{"planTitle":"SOC 2 Pre-Audit Blueprint","numberOfEmployees":50,"price":8750}'

# Test admin dashboard (requires authentication)
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  http://localhost:5000/api/admin/dashboard
```

### Database Operations
```bash
# Seed database with sample data
npm run seed

# Create database indexes
npm run create-indexes
```

## 🚀 Deployment

### Environment Setup
1. Set `NODE_ENV=production`
2. Configure production MongoDB URI
3. Set secure JWT secret
4. Configure Stripe production keys
5. Set up production email credentials
6. Configure CORS for your frontend domain

### Stripe Webhook Configuration
1. Add webhook endpoint in Stripe Dashboard
2. Set webhook URL: `https://your-domain.com/api/subscription/webhook`
3. Select event: `payment_intent.succeeded`
4. Copy webhook signing secret to environment

### Production Checklist
- [ ] Environment variables configured
- [ ] Database indexes created
- [ ] Stripe webhooks configured
- [ ] SSL certificates installed
- [ ] Rate limiting configured
- [ ] Email service configured
- [ ] Monitoring setup
- [ ] Backup strategy implemented
- [ ] Error logging configured

## 📈 Analytics & Monitoring

### Admin Dashboard Metrics
- Total subscriptions and revenue
- Monthly growth rates
- Plan popularity analysis
- Customer acquisition trends
- Payment success rates

### Logging
- Winston-based structured logging
- Request/response logging
- Error tracking
- Performance monitoring

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## 📞 Support

For technical support or questions:
- Create an issue in the repository
- Email: support@subscription-service.com

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🎯 Project Status

✅ **Core Features Completed**
- Stripe payment integration
- Subscription management
- Admin dashboard
- Email notifications
- PDF invoice generation

✅ **Additional Features**
- Admin authentication
- Real-time webhook handling
- Advanced analytics
- Rate limiting & security
- Comprehensive logging

🔄 **Future Enhancements**
- Customer portal
- Subscription modifications
- Advanced reporting
- Multi-tenant support
- API rate plan management

---

**Built with ❤️ for subscription-based businesses**