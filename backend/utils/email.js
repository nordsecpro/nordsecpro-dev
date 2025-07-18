// utils/email.js
const nodemailer = require('nodemailer');
const logger = require('./logger');
const config = require('../config/environment');

// Create email transporter
const createTransporter = () => {
    return nodemailer.createTransport({
        service: 'gmail', // or your email service
        auth: {
            user: config.email.user,
            pass: config.email.password
        }
    });
};
// Enhanced confirmation email that handles renewals and different plan types
const sendConfirmationEmail = async (subscription, options = {}) => {
    const customerEmail = subscription.customerDetails?.email;

    if (!customerEmail || customerEmail === 'Unknown') {
        logger.error('Cannot send confirmation email: No valid recipient email');
        return;
    }

    const isRenewal = options.isRenewal || false;
    const isOneTime = subscription.planType === 'one-time';

    try {
        const transporter = createTransporter();

        // Generate plans summary for email
        let plansHtml = '';
        let totalEmployees = 0;

        if (subscription.plans && Array.isArray(subscription.plans)) {
            // Multiple plans format
            plansHtml = subscription.plans.map((plan, index) => {
                totalEmployees += plan.numberOfEmployees || 0;
                return `
                    <p><strong>Plan ${index + 1}:</strong> ${plan.planTitle}</p>
                    <p><strong>Employees:</strong> ${(plan.numberOfEmployees || 0).toLocaleString()}</p>
                    <p><strong>Price:</strong> $${(plan.price || 0).toLocaleString()}</p>
                    <br>
                `;
            }).join('');
        } else {
            // Fallback for old single plan format
            totalEmployees = subscription.numberOfEmployees || 0;
            plansHtml = `
                <p><strong>Plan:</strong> ${subscription.planTitle || 'Security Service'}</p>
                <p><strong>Employees:</strong> ${totalEmployees.toLocaleString()}</p>
                <p><strong>Price:</strong> $${(subscription.price || subscription.totalPrice || 0).toLocaleString()}</p>
            `;
        }

        const planCount = subscription.plans && Array.isArray(subscription.plans) ? subscription.plans.length : 1;
        const totalPrice = subscription.totalPrice || subscription.price || 0;

        let subject, title, subtitle, description;

        if (isRenewal) {
            subject = `✅ Subscription Renewed Successfully`;
            title = '🔄 Subscription Renewed';
            subtitle = 'Your monthly subscription has been renewed';
            description = 'Your subscription has been successfully renewed for another month. Thank you for your continued trust in our security services!';
        } else if (isOneTime) {
            subject = `✅ Purchase Confirmation - ${subscription.plans[0]?.planTitle || 'Security Plan'}`;
            title = '✅ Purchase Confirmed';
            subtitle = 'Your one-time purchase has been processed';
            description = 'Thank you for your purchase! Your one-time security plan has been activated and is ready to use.';
        } else {
            subject = `✅ Subscription Confirmation - ${subscription.plans[0]?.planTitle || 'Security Plan'}`;
            title = '✅ Subscription Confirmed';
            subtitle = 'Your subscription has been activated';
            description = 'Thank you for your purchase! Your subscription has been confirmed and activated.';
        }

        const mailOptions = {
            from: config.email.user,
            to: customerEmail,
            subject: subject,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <div style="background: linear-gradient(135deg, #16a34a 0%, #15803d 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
                        <h1 style="margin: 0; font-size: 28px;">${title}</h1>
                        <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">${subtitle}</p>
                    </div>
                    
                    <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px;">
                        <h2 style="color: #1e293b; margin-bottom: 20px;">Hi ${subscription.customerDetails.firstName}!</h2>
                        
                        <p style="color: #475569; line-height: 1.6; margin-bottom: 20px;">
                            ${description}
                        </p>
                        
                        <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #16a34a; margin: 20px 0;">
                            <h3 style="color: #1e293b; margin: 0 0 15px 0;">📋 ${isRenewal ? 'Renewal' : 'Order'} Details</h3>
                            <p style="margin: 5px 0; color: #475569;"><strong>Total Plans:</strong> ${planCount}</p>
                            <p style="margin: 5px 0; color: #475569;"><strong>Total Employees Covered:</strong> ${totalEmployees.toLocaleString()}</p>
                            <p style="margin: 5px 0; color: #475569;"><strong>Date:</strong> ${new Date(subscription.createdAt).toLocaleDateString()}</p>
                            
                            <h4 style="color: #1e293b; margin: 15px 0 10px 0;">Plan Breakdown:</h4>
                            ${plansHtml}
                            
                            <p style="margin: 15px 0 5px 0; color: #475569;"><strong>Total Amount:</strong> $${totalPrice.toLocaleString()}</p>
                            <p style="margin: 5px 0; color: #475569;"><strong>Payment Status:</strong> <span style="color: #16a34a; font-weight: bold;">Paid</span></p>
                            ${subscription.planType === 'ongoing' ? `<p style="margin: 5px 0; color: #475569;"><strong>Next Billing:</strong> ${subscription.nextBillingDate ? new Date(subscription.nextBillingDate).toLocaleDateString() : 'In 30 days'}</p>` : ''}
                        </div>
                        
                        ${isOneTime ? `
                            <div style="background: #dbeafe; padding: 15px; border-radius: 8px; margin: 20px 0;">
                                <h4 style="color: #1e40af; margin: 0 0 10px 0;">🛡️ One-Time Purchase</h4>
                                <p style="color: #1e40af; margin: 0; font-size: 14px;">
                                    This is a one-time purchase with no recurring charges. You can purchase additional one-time plans anytime!
                                </p>
                            </div>
                        ` : subscription.planType === 'ongoing' ? `
                            <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
                                <h4 style="color: #92400e; margin: 0 0 10px 0;">🔄 Auto-Renewal Active</h4>
                                <p style="color: #92400e; margin: 0; font-size: 14px;">
                                    ${isRenewal ? 'Your subscription continues with monthly auto-renewal.' : 'Your subscription will automatically renew monthly.'} You can cancel anytime.
                                </p>
                            </div>
                        ` : ''}
                        
                        <p style="color: #475569; line-height: 1.6; margin: 20px 0;">
                            We'll be in touch shortly to begin your onboarding process.
                        </p>
                        
                        <div style="text-align: center; margin: 30px 0;">
                            <p style="color: #475569; margin-bottom: 15px;">Questions about your ${isOneTime ? 'purchase' : 'subscription'}?</p>
                            <a href="mailto:${process.env.COMPANY_EMAIL || config.email.user}" 
                               style="background: #16a34a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                                Contact Support
                            </a>
                        </div>
                        
                        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;">
                        
                        <p style="color: #64748b; font-size: 12px; text-align: center; margin: 0;">
                            ${process.env.COMPANY_NAME || 'codelink.se'} | ${process.env.COMPANY_EMAIL || config.email.user}
                        </p>
                    </div>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        logger.info(`${isRenewal ? 'Renewal' : 'Confirmation'} email sent to ${customerEmail}`, {
            subscriptionId: subscription._id,
            planCount: planCount,
            totalAmount: totalPrice,
            isRenewal: isRenewal,
            planType: subscription.planType
        });

    } catch (error) {
        logger.error(`Error sending ${isRenewal ? 'renewal' : 'confirmation'} email:`, error);
        throw error;
    }
};

// Send invoice email for multiple plans subscription
const sendInvoiceEmail = async (subscription, invoicePath) => {
    try {
        const transporter = createTransporter();

        // Generate plans summary for email
        let plansHtml = '';
        let totalEmployees = 0;

        if (subscription.plans && Array.isArray(subscription.plans)) {
            // Multiple plans format
            plansHtml = subscription.plans.map((plan, index) => {
                totalEmployees += plan.numberOfEmployees || 0;
                return `
                    <li><strong>${plan.planTitle}:</strong> ${(plan.numberOfEmployees || 0).toLocaleString()} employees - $${(plan.price || 0).toLocaleString()}</li>
                `;
            }).join('');
        } else {
            // Fallback for old single plan format
            totalEmployees = subscription.numberOfEmployees || 0;
            plansHtml = `
                <li><strong>${subscription.planTitle || 'Security Service'}:</strong> ${totalEmployees.toLocaleString()} employees - $${(subscription.price || subscription.totalPrice || 0).toLocaleString()}</li>
            `;
        }

        const planCount = subscription.plans && Array.isArray(subscription.plans) ? subscription.plans.length : 1;
        const totalPrice = subscription.totalPrice || subscription.price || 0;
        const invoiceNumber = subscription._id ? `INV-${subscription._id.toString().slice(-8).toUpperCase()}` : 'INV-UNKNOWN';

        const mailOptions = {
            from: config.email.user,
            to: subscription.customerDetails.email,
            subject: `Invoice ${invoiceNumber} - Security Services`,
            html: `
                <h2>Invoice for Your Security Services</h2>
                <p>Dear ${subscription.customerDetails.firstName} ${subscription.customerDetails.lastName},</p>
                
                <p>Please find attached your invoice for the security services subscription.</p>
                
                <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
                    <h3>Invoice Details</h3>
                    <p><strong>Invoice Number:</strong> ${invoiceNumber}</p>
                    <p><strong>Invoice Date:</strong> ${new Date(subscription.createdAt).toLocaleDateString()}</p>
                    <p><strong>Total Plans:</strong> ${planCount}</p>
                    <p><strong>Total Employees:</strong> ${totalEmployees.toLocaleString()}</p>
                    
                    <h4>Services:</h4>
                    <ul>
                        ${plansHtml}
                    </ul>
                    
                    <p><strong>Total Amount:</strong> $${totalPrice.toLocaleString()}</p>
                    <p><strong>Status:</strong> Paid</p>
                </div>
                
                <p>Payment Information:</p>
                <ul>
                    <li><strong>Transaction ID:</strong> ${subscription.stripePaymentIntentId || 'N/A'}</li>
                    <li><strong>Payment Date:</strong> ${new Date(subscription.createdAt).toLocaleDateString()}</li>
                </ul>
                
                <p>Thank you for your business!</p>
                
                <p>Best regards,<br>Your Security Team at ${process.env.COMPANY_NAME || 'codelink.se'}</p>
            `,
            attachments: [
                {
                    filename: `invoice_${invoiceNumber}.pdf`,
                    path: invoicePath
                }
            ]
        };

        await transporter.sendMail(mailOptions);
        logger.info(`Invoice email sent to ${subscription.customerDetails.email}`, {
            subscriptionId: subscription._id,
            invoiceNumber: invoiceNumber,
            planCount: planCount,
            totalAmount: totalPrice
        });

    } catch (error) {
        logger.error('Error sending invoice email:', error);
        throw error;
    }
};

/**
 * Send welcome email for first-time ongoing plan subscribers
 */
const sendOngoingPlanWelcomeEmail = async (subscription) => {
    const customerEmail = subscription.customerDetails?.email;

    if (!customerEmail || customerEmail === 'Unknown') {
        logger.error('Cannot send ongoing plan welcome email: No valid recipient email');
        return;
    }

    try {
        const transporter = createTransporter();

        const mailOptions = {
            from: config.email.user,
            to: customerEmail,
            subject: `🎉 Welcome to Your ${subscription.plans[0]?.planTitle || 'Security'} Subscription!`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <div style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
                        <h1 style="margin: 0; font-size: 28px;">🎉 Welcome to Your Subscription!</h1>
                        <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Your ongoing security plan is now active</p>
                    </div>
                    
                    <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px;">
                        <h2 style="color: #1e293b; margin-bottom: 20px;">Hi ${subscription.customerDetails.firstName}!</h2>
                        
                        <p style="color: #475569; line-height: 1.6; margin-bottom: 20px;">
                            Congratulations! Your ongoing subscription has been successfully activated. You now have access to our premium security services with automatic monthly renewal.
                        </p>
                        
                        <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #2563eb; margin: 20px 0;">
                            <h3 style="color: #1e293b; margin: 0 0 15px 0;">📋 Your Subscription Details</h3>
                            <p style="margin: 5px 0; color: #475569;"><strong>Plan:</strong> ${subscription.plans[0]?.planTitle || 'Security Plan'}</p>
                            <p style="margin: 5px 0; color: #475569;"><strong>Monthly Price:</strong> $${subscription.totalPrice}</p>
                            <p style="margin: 5px 0; color: #475569;"><strong>Next Billing Date:</strong> ${new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
                            <p style="margin: 5px 0; color: #475569;"><strong>Status:</strong> <span style="color: #16a34a; font-weight: bold;">Active</span></p>
                        </div>
                        
                        <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
                            <h4 style="color: #92400e; margin: 0 0 10px 0;">🔄 Auto-Renewal Information</h4>
                            <p style="color: #92400e; margin: 0; font-size: 14px;">
                                Your subscription will automatically renew every month. You can cancel anytime without penalty.
                            </p>
                        </div>
                        
                        <div style="text-align: center; margin: 30px 0;">
                            <p style="color: #475569; margin-bottom: 15px;">Questions about your subscription?</p>
                            <a href="mailto:${process.env.COMPANY_EMAIL || config.email.user}" 
                               style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                                Contact Support
                            </a>
                        </div>
                        
                        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;">
                        
                        <p style="color: #64748b; font-size: 12px; text-align: center; margin: 0;">
                            ${process.env.COMPANY_NAME || 'codelink.se'} | ${process.env.COMPANY_EMAIL || config.email.user}
                        </p>
                    </div>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        logger.info(`Ongoing plan welcome email sent successfully to: ${customerEmail}`);
    } catch (error) {
        logger.error('Error sending ongoing plan welcome email:', error);
        throw error;
    }
};

/**
 * Send "already subscribed" email when user tries to buy ongoing plan again
 */
const sendAlreadySubscribedEmail = async (customerData, existingSubscription) => {
    const customerEmail = customerData.email;

    if (!customerEmail) {
        logger.error('Cannot send already subscribed email: No valid recipient email');
        return;
    }

    try {
        const transporter = createTransporter();

        const mailOptions = {
            from: config.email.user,
            to: customerEmail,
            subject: `⚠️ You Already Have an Active Subscription`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
                        <h1 style="margin: 0; font-size: 28px;">⚠️ Already Subscribed</h1>
                        <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">You already have an active ongoing subscription</p>
                    </div>
                    
                    <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px;">
                        <h2 style="color: #1e293b; margin-bottom: 20px;">Hi ${customerData.firstName}!</h2>
                        
                        <p style="color: #475569; line-height: 1.6; margin-bottom: 20px;">
                            We noticed you tried to purchase an ongoing subscription, but you already have an active subscription with us. 
                            No worries - your current subscription is working perfectly!
                        </p>
                        
                        <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #f59e0b; margin: 20px 0;">
                            <h3 style="color: #1e293b; margin: 0 0 15px 0;">📋 Your Current Subscription</h3>
                            <p style="margin: 5px 0; color: #475569;"><strong>Plan:</strong> ${existingSubscription.plans[0]?.planTitle || 'Security Plan'}</p>
                            <p style="margin: 5px 0; color: #475569;"><strong>Monthly Price:</strong> $${existingSubscription.totalPrice}</p>
                            <p style="margin: 5px 0; color: #475569;"><strong>Started:</strong> ${new Date(existingSubscription.createdAt).toLocaleDateString()}</p>
                            <p style="margin: 5px 0; color: #475569;"><strong>Status:</strong> <span style="color: #16a34a; font-weight: bold;">Active & Auto-Renewing</span></p>
                        </div>
                        
                        <div style="background: #dbeafe; padding: 15px; border-radius: 8px; margin: 20px 0;">
                            <h4 style="color: #1e40af; margin: 0 0 10px 0;">💡 Want to Purchase One-Time Plans?</h4>
                            <p style="color: #1e40af; margin: 0; font-size: 14px;">
                                You can still purchase one-time security plans anytime! Only ongoing subscriptions are limited to one active subscription per account.
                            </p>
                        </div>
                        
                        <div style="text-align: center; margin: 30px 0;">
                            <p style="color: #475569; margin-bottom: 15px;">Need help managing your subscription?</p>
                            <a href="mailto:${process.env.COMPANY_EMAIL || config.email.user}" 
                               style="background: #f59e0b; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin-right: 10px;">
                                Contact Support
                            </a>
                        </div>
                        
                        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;">
                        
                        <p style="color: #64748b; font-size: 12px; text-align: center; margin: 0;">
                            ${process.env.COMPANY_NAME || 'codelink.se'} | ${process.env.COMPANY_EMAIL || config.email.user}
                        </p>
                    </div>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        logger.info(`Already subscribed email sent successfully to: ${customerEmail}`);
    } catch (error) {
        logger.error('Error sending already subscribed email:', error);
        throw error;
    }
};

/**
 * Send notification email to admin when a new contact form is submitted
 */
const sendContactNotificationEmail = async (contact) => {
    try {
        const transporter = createTransporter();
        const adminEmail = config.email.user;
        const mailOptions = {
            from: config.email.user,
            to: adminEmail,
            subject: `New Contact Form Submission from ${contact.name}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h2 style="color: #1e293b;">New Contact Form Submission</h2>
                    <p><strong>Name:</strong> ${contact.name}</p>
                    <p><strong>Email:</strong> ${contact.email}</p>
                    <p><strong>Company:</strong> ${contact.company || 'N/A'}</p>
                    <p><strong>Subject:</strong> ${contact.subject || 'N/A'}</p>
                    <p><strong>Type:</strong> ${contact.type || 'N/A'}</p>
                    <p><strong>Message:</strong></p>
                    <div style="background: #f8fafc; padding: 15px; border-radius: 8px; color: #334155;">${contact.message}</div>
                    <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;">
                    <p style="color: #64748b; font-size: 12px; text-align: center; margin: 0;">
                        ${process.env.COMPANY_NAME || 'codelink.se'} | ${process.env.COMPANY_EMAIL || config.email.user}
                    </p>
                </div>
            `
        };
        await transporter.sendMail(mailOptions);
        logger.info(`Contact notification email sent to admin: ${adminEmail}`);
    } catch (error) {
        logger.error('Error sending contact notification email:', error);
        throw error;
    }
};

module.exports = {
    sendConfirmationEmail,
    sendInvoiceEmail,
    sendOngoingPlanWelcomeEmail,
    sendAlreadySubscribedEmail,
    sendContactNotificationEmail
};