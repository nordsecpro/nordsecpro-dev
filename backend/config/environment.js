// config/environment.js
const dotenv = require('dotenv');
const Joi = require('joi');

dotenv.config({ path: '.env' });

const envSchema = Joi.object({
  // Core Application Configuration
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.number().default(5000),
  CORS_ORIGIN: Joi.string().default('*'),

  // Database Configuration
  MONGODB_URI: Joi.string().required(),

  // Frontend URLs
  FRONTEND_URL: Joi.string().uri().default('http://localhost:3001'),
  ADMIN_URL: Joi.string().uri().default('http://localhost:3000'),

  // Authentication & Security
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRE: Joi.string().default('7d'),
  BCRYPT_SALT_ROUNDS: Joi.number().default(10),

  // Stripe Configuration
  STRIPE_SECRET_KEY: Joi.string().required(),
  STRIPE_WEBHOOK_SECRET: Joi.string().required(),

  // Email Configuration
  EMAIL_USER: Joi.string().email().required(),
  EMAIL_APP_PASSWORD: Joi.string().required(),

  // Rate Limiting
  RATE_LIMIT_WINDOW_MS: Joi.number().default(900000), // 15 minutes
  RATE_LIMIT_MAX_REQUESTS: Joi.number().default(100),

  // Logging
  LOG_LEVEL: Joi.string()
    .valid('error', 'warn', 'info', 'debug')
    .default('info'),

  // Admin Configuration
  ADMIN_EMAIL: Joi.string().email().default('admin@example.com'),
  ADMIN_PASSWORD: Joi.string().default('admin123'),
}).unknown(true);

const { error, value: envVars } = envSchema.validate(process.env, {
  allowUnknown: true,
  abortEarly: false,
});

if (error) {
  console.error(
    '❌ Environment configuration error: ',
    error.details.map((d) => `- ${d.message}`).join('\n')
  );
  process.exit(1);
}

module.exports = {
  nodeEnv: envVars.NODE_ENV,
  port: envVars.PORT,
  database: {
    uri: envVars.MONGODB_URI,
  },
  url: {
    frontend: envVars.FRONTEND_URL,
    admin: envVars.ADMIN_URL,
  },

  company: {
    name: process.env.COMPANY_NAME || 'SecureGuard Solutions',
    tagline:
      process.env.COMPANY_TAGLINE ||
      'Professional Security & Compliance Services',
    address: process.env.COMPANY_ADDRESS || '123 Security Blvd',
    city: process.env.COMPANY_CITY || 'San Francisco',
    state: process.env.COMPANY_STATE || 'CA',
    zipCode: process.env.COMPANY_ZIP || '94102',
    email: process.env.COMPANY_EMAIL || 'hello@secureguard.com',
    phone: process.env.COMPANY_PHONE || '+1 (555) 123-4567',
    website: process.env.COMPANY_WEBSITE || 'https://secureguard.com',
    supportEmail:
      process.env.COMPANY_SUPPORT_EMAIL || 'support@secureguard.com',
    logo: process.env.COMPANY_LOGO_URL || null,
  },

  jwt: {
    secret: envVars.JWT_SECRET,
    expiresIn: envVars.JWT_EXPIRE,
  },
  stripe: {
    secretKey: envVars.STRIPE_SECRET_KEY,
    webhookSecret: envVars.STRIPE_WEBHOOK_SECRET,
  },
  email: {
    user: envVars.EMAIL_USER,
    password: envVars.EMAIL_APP_PASSWORD,
  },
  security: {
    bcryptSaltRounds: envVars.BCRYPT_SALT_ROUNDS,
    corsOrigin: envVars.CORS_ORIGIN,
    rateLimit: {
      windowMs: envVars.RATE_LIMIT_WINDOW_MS,
      maxRequests: envVars.RATE_LIMIT_MAX_REQUESTS,
    },
  },
  logging: {
    level: envVars.LOG_LEVEL,
  },
  admin: {
    email: envVars.ADMIN_EMAIL,
    password: envVars.ADMIN_PASSWORD,
  },
};
