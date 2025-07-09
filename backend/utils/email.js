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
// Send confirmation email for multiple plans subscription
const sendConfirmationEmail = async (subscription) => {
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
        
        const mailOptions = {
            from: config.email.user,
            to: subscription.customerDetails.email,
            subject: `Subscription Confirmation - ${planCount > 1 ? `${planCount} Security Plans` : (subscription.plans?.[0]?.planTitle || subscription.planTitle || 'Security Service')}`,
            html: `
                <h2>Thank you for your subscription!</h2>
                <p>Dear ${subscription.customerDetails.firstName} ${subscription.customerDetails.lastName},</p>
                
                <p>Your security services subscription has been successfully processed. Here are the details:</p>
                
                <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
                    <h3>Subscription Details</h3>
                    <p><strong>Total Plans:</strong> ${planCount}</p>
                    <p><strong>Total Employees Covered:</strong> ${totalEmployees.toLocaleString()}</p>
                    <p><strong>Total Price:</strong> $${totalPrice.toLocaleString()}</p>
                    <p><strong>Date:</strong> ${new Date(subscription.createdAt).toLocaleDateString()}</p>
                    
                    <h4>Plan Breakdown:</h4>
                    ${plansHtml}
                </div>
                
                <p>We'll be in touch shortly to begin your onboarding process.</p>
                
                <p>If you have any questions, please don't hesitate to contact us at ${process.env.COMPANY_EMAIL || 'info@codelink.se'}.</p>
                
                <p>Best regards,<br>Your Security Team at ${process.env.COMPANY_NAME || 'codelink.se'}</p>
            `
        };
        
        await transporter.sendMail(mailOptions);
        logger.info(`Confirmation email sent to ${subscription.customerDetails.email}`, {
            subscriptionId: subscription._id,
            planCount: planCount,
            totalAmount: totalPrice
        });
        
    } catch (error) {
        logger.error('Error sending confirmation email:', error);
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

module.exports = {
    sendConfirmationEmail,
    sendInvoiceEmail
};