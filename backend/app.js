require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const compression = require('compression');
const logger = require('./utils/logger');
const routes = require('./routes');
const connectDB = require('./config/database');
const config = require('./config/environment');
const {
  globalErrorHandler,
  undefinedRouteHandler,
} = require('./middlewares/errorMiddleware');
const subscriptionController = require('./controllers/subscription');

// Create Express app
const app = express();

// Connect to database
connectDB();

// Trust proxy for production deployment
app.set('trust proxy', 1);

// Security Headers
app.use(helmet());

// CORS Configuration for Subscription Service
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, Postman, Stripe webhooks)
      if (!origin) return callback(null, true);

      // Allow all origins in development or if CORS_ORIGIN is *
      if (
        config.nodeEnv === 'development' ||
        config.security.corsOrigin === '*'
      ) {
        callback(null, true);
      } else {
        // In production, add your frontend domains here
        const allowedOrigins = [
          config.url.frontend || 'http://localhost:3000', // Default frontend URL for development
          config.url.admin || 'http://localhost:4000', // Default admin URL for development
          // Add your frontend domains here for production
          // 'https://your-subscription-app.com'
        ];

        if (allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          logger.warn(`CORS blocked request from origin: ${origin}`);
          callback(null, false);
        }
      }
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

// Development logging
if (config.nodeEnv === 'development') {
  app.use(morgan('dev'));
}

// IMPORTANT: Put webhook route BEFORE express.json() middleware
app.post(
  '/api/subscription/webhook',
  express.raw({ type: 'application/json' }),
  subscriptionController.handleWebhook
);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Data sanitization
app.use(mongoSanitize());
app.use(xss());

// Rate limiting
app.use(
  '/api',
  rateLimit({
    max: config.security.rateLimit.maxRequests,
    windowMs: config.security.rateLimit.windowMs,
    message: {
      status: 'error',
      message: 'Too many requests from this IP, please try again later!',
    },
    standardHeaders: true,
    legacyHeaders: false,
  })
);

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: ['sort', 'fields', 'page', 'limit'],
  })
);

// Compression
app.use(compression());

// Request logging
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`, {
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    admin: req.admin?.id,
  });
  next();
});

app.get('/sitemap.xml', (req, res) => {
  const urls = [
    { loc: 'https://cypentra.com/',            changefreq: 'weekly',  priority: '1.0' },
    { loc: 'https://cypentra.com/pricing',     changefreq: 'monthly', priority: '0.8' },
    { loc: 'https://cypentra.com/docs',        changefreq: 'weekly',  priority: '0.8' },
    { loc: 'https://cypentra.com/contact',     changefreq: 'yearly',  priority: '0.5' },
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls.map(u => `
      <url>
        <loc>${u.loc}</loc>
        <changefreq>${u.changefreq}</changefreq>
        <priority>${u.priority}</priority>
      </url>`).join('')}
  </urlset>`;
  res.type('application/xml').send(xml);
});


app.get('/robots.txt', (req, res) => {
  res.type('text').send(
`User-agent: *
Allow: /
Disallow: /api/

Sitemap: https://cypentra.com/sitemap.xml
`
  );
});


app.get('/', (req, res) => {
  res.type('html').send(`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Cypentra | Secure Subscriptions & Stripe Billing</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="description" content="Cypentra provides secure subscription management with Stripe integration—billing, payments, and SaaS tooling for modern apps." />
  <meta name="keywords" content="Cypentra, subscription service, Stripe billing, SaaS payments, subscription API, Node.js, Express, MongoDB" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://cypentra.com/" />

  <!-- Favicon hints (backend copy, optional if already handled on frontend) -->
  <link rel="icon" href="/favicon.ico" />
  <link rel="icon" type="image/png" href="/favicon-192.png" sizes="192x192" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Cypentra" />
  <meta property="og:title" content="Cypentra | Secure Subscriptions & Stripe Billing" />
  <meta property="og:description" content="Secure subscription and billing API with Stripe integration." />
  <meta property="og:url" content="https://cypentra.com/" />
  <meta property="og:image" content="https://cypentra.com/og-image.png" />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Cypentra" />
  <meta name="twitter:description" content="Secure subscription and billing API with Stripe integration." />
  <meta name="twitter:image" content="https://cypentra.com/og-image.png" />

  <!-- JSON-LD: WebSite + Organization -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": "https://cypentra.com/",
    "name": "Cypentra",
    "description": "Secure subscription service with Stripe integration",
    "publisher": {
      "@type": "Organization",
      "name": "Cypentra",
      "logo": {
        "@type": "ImageObject",
        "url": "https://cypentra.com/icon-512.png"
      }
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://cypentra.com/search?q={query}",
      "query-input": "required name=query"
    }
  }
  </script>
</head>
<body>
  <main style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;padding:32px;max-width:720px;margin:auto;">
    <h1>Cypentra</h1>
    <p>Secure subscription and billing API with Stripe integration.</p>
    <p><a href="https://cypentra.com">Go to the main site</a></p>
  </main>
</body>
</html>`);
});




// API Routes
app.use('/api', routes);

// Handle undefined routes
app.all('*', undefinedRouteHandler);

// Global error handler
app.use(globalErrorHandler);

// Server startup
const PORT = config.port || 5000;
const server = app.listen(PORT, () => {
  logger.info(`🚀 Subscription Service API running in ${config.nodeEnv} mode`);
  logger.info(`📍 Server address: http://localhost:${PORT}`);
  logger.info(`🔗 API base URL: http://localhost:${PORT}/api`);
  logger.info(`📊 Health check: http://localhost:${PORT}/health`);

  // Log available endpoints in development
  if (config.nodeEnv === 'development') {
    logger.info(`📋 Available endpoints:`);
    logger.info(`   🔐 Admin: /api/admin`);
    logger.info(`   💳 Subscription: /api/subscription`);
    logger.info(`   🎯 Webhook: /api/subscription/webhook`);
  }
});

// Graceful shutdown handlers
process.on('unhandledRejection', (err) => {
  logger.error('❌ UNHANDLED REJECTION! Shutting down...', {
    name: err.name,
    message: err.message,
    stack: err.stack,
  });
  server.close(() => process.exit(1));
});

process.on('uncaughtException', (err) => {
  logger.error('❌ UNCAUGHT EXCEPTION! Shutting down...', {
    name: err.name,
    message: err.message,
    stack: err.stack,
  });
  process.exit(1);
});

process.on('SIGTERM', () => {
  logger.info('📤 SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    logger.info('✅ Process terminated!');
  });
});

process.on('SIGINT', () => {
  logger.info('📤 SIGINT RECEIVED. Shutting down gracefully');
  server.close(() => {
    logger.info('✅ Process terminated!');
  });
});

module.exports = app;
