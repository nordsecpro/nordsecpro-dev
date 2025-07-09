// utils/logger.js
const winston = require('winston');
const env = require('../config/environment');

// Define log format
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.json()
);

// Create the logger instance
const logger = winston.createLogger({
  level: env.nodeEnv === 'development' ? 'debug' : 'info',
  format: logFormat,
  defaultMeta: { service: 'secure consult' },
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(({ timestamp, level, message, ...meta }) => {
          return `${timestamp} ${level}: ${message} ${Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ''}`;
        })
      )
    })
  ]
});

// Add file transport only in non-serverless environments
// This is the key change - we don't try to write to the filesystem in Vercel
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  logger.add(new winston.transports.File({ 
    filename: 'logs/error.log', 
    level: 'error' 
  }));
  logger.add(new winston.transports.File({ 
    filename: 'logs/combined.log' 
  }));
}

module.exports = logger;