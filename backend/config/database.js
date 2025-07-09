// config/database.js
const mongoose = require('mongoose');
const logger = require('../utils/logger');
const env = require('./environment');

const connectDB = async () => {
    try {
        console.log('Connecting to MongoDB...', env.database.uri);
        const conn = await mongoose.connect(env.database.uri);

        logger.info(`MongoDB Connected: ${conn.connection.host}`);

        // Handle errors after initial connection
        mongoose.connection.on('error', err => {
            logger.error('MongoDB connection error:', {
                error: err.message,
                stack: err.stack
            });
        });

        mongoose.connection.on('disconnected', () => {
            logger.warn('MongoDB disconnected');
        });

        mongoose.connection.on('reconnected', () => {
            logger.info('MongoDB reconnected');
        });

        // Handle process termination
        process.on('SIGINT', async () => {
            try {
                await mongoose.connection.close();
                logger.info('MongoDB connection closed through app termination');
                process.exit(0);
            } catch (err) {
                logger.error('Error during MongoDB shutdown:', {
                    error: err.message,
                    stack: err.stack
                });
                process.exit(1);
            }
        });

    } catch (error) {
        logger.error('Error connecting to MongoDB:', {
            error: error.message,
            stack: error.stack,
            uri: env.database.uri.replace(/\/\/[^:]+:[^@]+@/, '//***:***@') // Hide credentials in logs
        });
        process.exit(1);
    }
};

module.exports = connectDB;