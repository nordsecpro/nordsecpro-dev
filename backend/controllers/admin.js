// controllers/admin.js
const bcrypt = require('bcryptjs');
const { Admin, Subscription, Contact } = require('../models');
const { generateToken } = require('../utils/jwt');
const { sendSuccess } = require('../utils/response');
const { AppError } = require('../middlewares/errorHandler');
const { catchAsync } = require('../middlewares/requestHandler');
const APIFeatures = require('../utils/apiFeatures');
const logger = require('../utils/logger');

/**
 * Admin login
 * POST /api/admin/login
 */
exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    // Find admin by email
    const admin = await Admin.findOne({ email }).select('+password');
    if (!admin) {
        return next(new AppError('Invalid email or password', 401));
    }

    // Check if admin is active
    if (!admin.isActive) {
        return next(new AppError('Account has been deactivated', 403));
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
        return next(new AppError('Invalid email or password', 401));
    }

    // Generate JWT token
    const token = generateToken({ id: admin._id });

    // Remove password from response
    admin.password = undefined;

    sendSuccess(res, { admin, token }, 'Login successful');

    logger.info(`Admin logged in: ${admin.email}`);
});


/**
 * Create new contact inquiry
 * POST /api/contact
 */
exports.createContact = catchAsync(async (req, res, next) => {
    const { name, email, company, subject, message, type } = req.body;
    
    if (!name || !email || !message) {
        return next(new AppError('Name, email, and message are required', 400));
    }

    const contact = await Contact.create({
        name,
        email,
        company,
        subject,
        message,
        type
    });

    sendSuccess(res, { contact }, 'Message sent successfully', 201);
});

/**
 * Get all contacts with filtering and search
 * GET /api/admin/contacts
 */
exports.getAllContacts = catchAsync(async (req, res, next) => {
    const { 
        page = 1, 
        limit = 10, 
        status, 
        search 
    } = req.query;

    // Build filter
    const filter = {};
    if (status) filter.status = status;
    if (search) filter.$text = { $search: search };

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Get contacts and total count
    const [contacts, total] = await Promise.all([
        Contact.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit)),
        Contact.countDocuments(filter)
    ]);

    const pagination = {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        total,
        limit: parseInt(limit)
    };

    sendSuccess(res, { contacts, pagination }, 'Contacts retrieved successfully');
});

/**
 * Get admin profile
 * GET /api/admin/profile
 */
exports.getProfile = catchAsync(async (req, res, next) => {
    const admin = await Admin.findById(req.admin.id);
    
    if (!admin) {
        return next(new AppError('Admin not found', 404));
    }

    sendSuccess(res, { admin }, 'Profile retrieved successfully');
});

/**
 * Update admin profile
 * PUT /api/admin/profile
 */
exports.updateProfile = catchAsync(async (req, res, next) => {
    const { firstName, lastName, email } = req.body;

    // Check if email is already taken by another admin
    if (email && email !== req.admin.email) {
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return next(new AppError('Email already in use', 409));
        }
    }

    const updatedAdmin = await Admin.findByIdAndUpdate(
        req.admin.id,
        { firstName, lastName, email },
        { new: true, runValidators: true }
    );

    if (!updatedAdmin) {
        return next(new AppError('Admin not found', 404));
    }

    sendSuccess(res, { admin: updatedAdmin }, 'Profile updated successfully');

    logger.info(`Admin profile updated: ${updatedAdmin.email}`);
});

/**
 * Change admin password
 * PUT /api/admin/change-password
 */
exports.changePassword = catchAsync(async (req, res, next) => {
    const { currentPassword, newPassword } = req.body;

    // Get admin with password
    const admin = await Admin.findById(req.admin.id).select('+password');
    if (!admin) {
        return next(new AppError('Admin not found', 404));
    }

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, admin.password);
    if (!isCurrentPasswordValid) {
        return next(new AppError('Current password is incorrect', 400));
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    await Admin.findByIdAndUpdate(req.admin.id, { password: hashedPassword });

    sendSuccess(res, null, 'Password changed successfully');

    logger.info(`Admin password changed: ${admin.email}`);
});

/**
 * Admin dashboard overview
 * GET /api/admin/dashboard
/**
 * Get dashboard statistics for multiple plans model
 * GET /api/admin/dashboard
 */
exports.getDashboard = catchAsync(async (req, res, next) => {
    // Get basic statistics
    const totalSubscriptions = await Subscription.countDocuments();
    const activeSubscriptions = await Subscription.countDocuments({ status: 'active' });
    const inactiveSubscriptions = await Subscription.countDocuments({ status: 'inactive' });

    // Calculate total revenue using totalPrice field
    const revenueResult = await Subscription.aggregate([
        { $match: { paymentStatus: 'succeeded' } },
        { $group: { _id: null, total: { $sum: '$totalPrice' } } }
    ]);
    const totalRevenue = revenueResult[0]?.total || 0;

    // Calculate total employees across all subscriptions
    const employeesResult = await Subscription.aggregate([
        { $match: { status: 'active' } },
        { $unwind: '$plans' },
        { $group: { _id: null, totalEmployees: { $sum: '$plans.numberOfEmployees' } } }
    ]);
    const totalEmployees = employeesResult[0]?.totalEmployees || 0;

    // Get monthly growth
    const now = new Date();
    const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    const thisMonthCount = await Subscription.countDocuments({
        createdAt: { $gte: startOfThisMonth }
    });

    const lastMonthCount = await Subscription.countDocuments({
        createdAt: { $gte: startOfLastMonth, $lt: startOfThisMonth }
    });

    const monthlyGrowth = lastMonthCount > 0 
        ? ((thisMonthCount - lastMonthCount) / lastMonthCount * 100).toFixed(1)
        : 0;

    // Get most popular plan across all subscriptions
    const planStats = await Subscription.aggregate([
        { $unwind: '$plans' },
        { $group: { _id: '$plans.planTitle', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 1 }
    ]);
    const popularPlan = planStats[0]?._id || 'N/A';

    // Get plan distribution for charts
    const planDistribution = await Subscription.aggregate([
        { $unwind: '$plans' },
        { 
            $group: { 
                _id: '$plans.planTitle', 
                count: { $sum: 1 },
                totalEmployees: { $sum: '$plans.numberOfEmployees' },
                totalRevenue: { $sum: '$plans.price' }
            } 
        },
        { $sort: { count: -1 } }
    ]);

    // Get average order value
    const avgOrderValue = totalRevenue / (totalSubscriptions || 1);

    // Get recent subscriptions with enhanced data
    const recentSubscriptions = await Subscription.find()
        .select('plans totalPrice customerDetails status paymentStatus createdAt')
        .sort({ createdAt: -1 })
        .limit(5)
        .lean(); // Use lean for better performance

    // Transform recent subscriptions to include calculated fields
    const transformedRecentSubscriptions = recentSubscriptions.map(sub => ({
        _id: sub._id,
        customerName: `${sub.customerDetails.firstName} ${sub.customerDetails.lastName}`,
        customerEmail: sub.customerDetails.email,
        planCount: sub.plans.length,
        planTitles: sub.plans.map(plan => plan.planTitle).join(', '),
        totalEmployees: sub.plans.reduce((sum, plan) => sum + plan.numberOfEmployees, 0),
        totalPrice: sub.totalPrice,
        status: sub.status,
        paymentStatus: sub.paymentStatus,
        createdAt: sub.createdAt
    }));

    // Revenue by month for the last 6 months
    const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);
    const monthlyRevenue = await Subscription.aggregate([
        {
            $match: {
                paymentStatus: 'succeeded',
                createdAt: { $gte: sixMonthsAgo }
            }
        },
        {
            $group: {
                _id: {
                    year: { $year: '$createdAt' },
                    month: { $month: '$createdAt' }
                },
                revenue: { $sum: '$totalPrice' },
                count: { $sum: 1 }
            }
        },
        { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    const dashboardData = {
        // Basic stats
        totalSubscriptions,
        activeSubscriptions,
        inactiveSubscriptions,
        totalRevenue,
        totalEmployees,
        
        // Growth metrics
        monthlyGrowth: parseFloat(monthlyGrowth),
        avgOrderValue: Math.round(avgOrderValue * 100) / 100,
        
        // Plan insights
        popularPlan,
        planDistribution,
        
        // Recent activity
        recentSubscriptions: transformedRecentSubscriptions,
        
        // Chart data
        monthlyRevenue
    };

    sendSuccess(res, dashboardData, 'Dashboard data retrieved successfully');
});

/**
 * Get all subscriptions with filtering and pagination for multiple plans
 * GET /api/admin/subscriptions
 */
exports.getAllSubscriptions = catchAsync(async (req, res, next) => {
    // Build query
    let query = Subscription.find().select('-stripePaymentIntentId');

    // Apply filters
    if (req.query.status) {
        query = query.where('status').equals(req.query.status);
    }

    if (req.query.paymentStatus) {
        query = query.where('paymentStatus').equals(req.query.paymentStatus);
    }

    if (req.query.planTitle) {
        query = query.where('plans.planTitle').equals(req.query.planTitle);
    }

    if (req.query.customerEmail) {
        query = query.where('customerDetails.email').regex(new RegExp(req.query.customerEmail, 'i'));
    }

    if (req.query.startDate && req.query.endDate) {
        query = query.where('createdAt').gte(new Date(req.query.startDate)).lte(new Date(req.query.endDate));
    }

    // Search functionality
    if (req.query.search) {
        const searchRegex = new RegExp(req.query.search, 'i');
        query = query.or([
            { 'customerDetails.firstName': searchRegex },
            { 'customerDetails.lastName': searchRegex },
            { 'customerDetails.email': searchRegex },
            { 'customerDetails.company': searchRegex },
            { 'plans.planTitle': searchRegex }
        ]);
    }

    // Count total documents for pagination
    const totalDocuments = await Subscription.countDocuments(query.getFilter());

    // Apply pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Apply sorting
    const sortBy = req.query.sortBy || '-createdAt';
    query = query.sort(sortBy).skip(skip).limit(limit);

    // Execute query
    const subscriptions = await query.lean();

    // Transform subscriptions to include calculated fields
    const transformedSubscriptions = subscriptions.map(sub => ({
        ...sub,
        planCount: sub.plans.length,
        totalEmployees: sub.plans.reduce((sum, plan) => sum + plan.numberOfEmployees, 0),
        planTitles: sub.plans.map(plan => plan.planTitle).join(', '),
        customerName: `${sub.customerDetails.firstName} ${sub.customerDetails.lastName}`
    }));

    const result = {
        subscriptions: transformedSubscriptions,
        pagination: {
            currentPage: page,
            totalPages: Math.ceil(totalDocuments / limit),
            totalItems: totalDocuments,
            itemsPerPage: limit,
            hasNextPage: page < Math.ceil(totalDocuments / limit),
            hasPrevPage: page > 1
        }
    };

    sendSuccess(res, result, 'Subscriptions retrieved successfully');
});

/**
 * Get single subscription with enhanced details
 * GET /api/admin/subscriptions/:id
 */
exports.getSubscription = catchAsync(async (req, res, next) => {
    const subscription = await Subscription.findById(req.params.id)
        .select('-stripePaymentIntentId')
        .lean();

    if (!subscription) {
        return next(new AppError('Subscription not found', 404));
    }

    // Enhance subscription data with calculated fields
    const enhancedSubscription = {
        ...subscription,
        planCount: subscription.plans.length,
        totalEmployees: subscription.plans.reduce((sum, plan) => sum + plan.numberOfEmployees, 0),
        customerName: `${subscription.customerDetails.firstName} ${subscription.customerDetails.lastName}`,
        
        // Plan breakdown
        planBreakdown: subscription.plans.map((plan, index) => ({
            ...plan,
            percentage: ((plan.price / subscription.totalPrice) * 100).toFixed(1)
        })),
        
        // Additional metrics
        avgPricePerEmployee: Math.round((subscription.totalPrice / subscription.plans.reduce((sum, plan) => sum + plan.numberOfEmployees, 0)) * 100) / 100,
        avgPlanPrice: Math.round((subscription.totalPrice / subscription.plans.length) * 100) / 100
    };

    sendSuccess(res, { subscription: enhancedSubscription }, 'Subscription retrieved successfully');
});

/**
 * Update subscription
 * PUT /api/admin/subscriptions/:id
 */
exports.updateSubscription = catchAsync(async (req, res, next) => {
    const { status, metadata } = req.body;

    const subscription = await Subscription.findByIdAndUpdate(
        req.params.id,
        { status, metadata },
        { new: true, runValidators: true }
    );

    if (!subscription) {
        return next(new AppError('Subscription not found', 404));
    }

    sendSuccess(res, { subscription }, 'Subscription updated successfully');

    logger.info(`Subscription updated: ${subscription._id}`);
});

/**
 * Delete subscription
 * DELETE /api/admin/subscriptions/:id
 */
exports.deleteSubscription = catchAsync(async (req, res, next) => {
    const subscription = await Subscription.findByIdAndDelete(req.params.id);

    if (!subscription) {
        return next(new AppError('Subscription not found', 404));
    }

    sendSuccess(res, null, 'Subscription deleted successfully');

    logger.info(`Subscription deleted: ${req.params.id}`);
});

/**
 * Admin logout
 * POST /api/admin/logout
 */
exports.logout = catchAsync(async (req, res, next) => {
    sendSuccess(res, null, 'Logout successful');

    logger.info(`Admin logged out: ${req.admin.email}`);
});