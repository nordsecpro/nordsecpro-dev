// utils/email.js
const nodemailer = require('nodemailer');
const logger = require('./logger');
const config = require('../config/environment');

const money = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(n || 0));
const safe = (v, d = '') => (v == null || v === 'Unknown' ? d : v);

// build a single transporter (avoid re-creating each send)
let _transporter;
const getTransporter = async () => {
    if (_transporter) return _transporter;
    _transporter = nodemailer.createTransport({
        service: 'gmail', // for Gmail, use an App Password or OAuth2
        auth: {
            user: config.email.user,
            pass: config.email.password,
        },
    });
    try {
        await _transporter.verify();
        logger.info('Email transporter verified.');
    } catch (e) {
        logger.warn('Email transporter verify failed (continuing):', e.message);
    }
    return _transporter;
};

const buildPlanSummary = (subscription = {}) => {
    const plans = Array.isArray(subscription.plans) && subscription.plans.length
        ? subscription.plans
        : [{
            planTitle: subscription.planTitle || 'Security Service',
            numberOfEmployees: Number(subscription.numberOfEmployees) || 0,
            price: Number(subscription.price || subscription.totalPrice || 0),
        }];

    const planCount = plans.length;
    const totalEmployees = plans.reduce((s, p) => s + (Number(p.numberOfEmployees) || 0), 0);
    const subtotal = plans.reduce((s, p) => s + (Number(p.price) || 0), 0);
    const totalPrice = Number(subscription.totalPrice ?? subtotal);

    const plansHtml = plans.map((p, i) => `
    <p style="margin:0 0 8px 0"><strong>${planCount > 1 ? `Plan ${i + 1}:` : 'Plan:'}</strong> ${safe(p.planTitle, 'Security Plan')}</p>
    <p style="margin:0 0 4px 0;color:#475569"><strong>Employees:</strong> ${(Number(p.numberOfEmployees) || 0).toLocaleString()}</p>
    <p style="margin:0 0 12px 0;color:#475569"><strong>Price:</strong> ${money(p.price)}</p>
  `).join('');

    const listHtml = plans.map((p) =>
        `<li><strong>${safe(p.planTitle, 'Security Plan')}:</strong> ${(Number(p.numberOfEmployees) || 0).toLocaleString()} employees - ${money(p.price)}</li>`
    ).join('');

    return { plans, planCount, totalEmployees, subtotal, totalPrice, plansHtml, listHtml };
};

const statusLabel = (paymentStatusRaw) => {
    const s = String(paymentStatusRaw || '').toLowerCase();
    if (s === 'succeeded' || s === 'paid') return { text: 'Paid', color: '#16a34a' };
    if (s === 'failed') return { text: 'Failed', color: '#dc2626' };
    return { text: 'Pending', color: '#f59e0b' };
};

// Enhanced confirmation email (covers one-time, first sub, and renewals)
const sendConfirmationEmail = async (subscription = {}, options = {}) => {
    const customerEmail = safe(subscription.customerDetails?.email);
    if (!customerEmail) {
        logger.error('Cannot send confirmation email: No valid recipient email');
        return;
    }

    const isRenewal = !!options.isRenewal;
    const isOneTime = subscription.planType === 'one-time';
    const createdAt = subscription.createdAt ? new Date(subscription.createdAt) : new Date();
    const { plans, planCount, totalEmployees, totalPrice, plansHtml } = buildPlanSummary(subscription);
    const firstPlanTitle = safe(plans[0]?.planTitle, 'Security Plan');

    let subject, title, subtitle, description;
    if (isRenewal) {
        subject = `✅ Subscription Renewed Successfully`;
        title = '🔄 Subscription Renewed';
        subtitle = 'Your monthly subscription has been renewed';
        description = 'Your subscription has been successfully renewed for another month. Thank you for your continued trust in our security services!';
    } else if (isOneTime) {
        subject = `✅ Purchase Confirmation - ${firstPlanTitle}`;
        title = '✅ Purchase Confirmed';
        subtitle = 'Your one-time purchase has been processed';
        description = 'Thank you for your purchase! Your one-time security plan has been activated and is ready to use.';
    } else {
        subject = `✅ Subscription Confirmation - ${firstPlanTitle}`;
        title = '✅ Subscription Confirmed';
        subtitle = 'Your subscription has been activated';
        description = 'Thank you for your purchase! Your subscription has been confirmed and activated.';
    }

    const { text: paymentText, color: paymentColor } = statusLabel(subscription.paymentStatus || (isRenewal ? 'paid' : 'paid'));
    const nextBill = subscription.nextBillingDate ? new Date(subscription.nextBillingDate) : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    const transporter = await getTransporter();
    const mailOptions = {
        from: config.email.user,
        to: customerEmail,
        subject,
        html: `
      <div style="font-family: Arial, sans-serif; max-width:600px; margin:0 auto; padding:20px;">
        <div style="background:linear-gradient(135deg,#16a34a,#15803d); color:#fff; padding:30px; border-radius:10px 10px 0 0; text-align:center;">
          <h1 style="margin:0; font-size:28px;">${title}</h1>
          <p style="margin:10px 0 0; font-size:16px; opacity:.9;">${subtitle}</p>
        </div>

        <div style="background:#f8fafc; padding:30px; border-radius:0 0 10px 10px;">
          <h2 style="color:#1e293b; margin-bottom:20px;">Hi ${safe(subscription.customerDetails?.firstName, 'there')}!</h2>
          <p style="color:#475569; line-height:1.6; margin-bottom:20px;">${description}</p>

          <div style="background:#fff; padding:20px; border-radius:8px; border-left:4px solid #16a34a; margin:20px 0;">
            <h3 style="color:#1e293b; margin:0 0 15px;">📋 ${isRenewal ? 'Renewal' : 'Order'} Details</h3>
            <p style="margin:5px 0; color:#475569;"><strong>Total Plans:</strong> ${planCount}</p>
            <p style="margin:5px 0; color:#475569;"><strong>Total Employees Covered:</strong> ${totalEmployees.toLocaleString()}</p>
            <p style="margin:5px 0; color:#475569;"><strong>Date:</strong> ${createdAt.toLocaleDateString()}</p>
            <h4 style="color:#1e293b; margin:15px 0 10px;">Plan Breakdown:</h4>
            ${plansHtml}
            <p style="margin:15px 0 5px; color:#475569;"><strong>Total Amount:</strong> ${money(totalPrice)}</p>
            <p style="margin:5px 0; color:#475569;"><strong>Payment Status:</strong> <span style="color:${paymentColor}; font-weight:bold;">${paymentText}</span></p>
            ${subscription.planType === 'ongoing'
                ? `<p style="margin:5px 0; color:#475569;"><strong>Next Billing:</strong> ${nextBill.toLocaleDateString()}</p>`
                : ''
            }
          </div>

          ${isOneTime ? `
            <div style="background:#dbeafe; padding:15px; border-radius:8px; margin:20px 0;">
              <h4 style="color:#1e40af; margin:0 0 10px;">🛡️ One-Time Purchase</h4>
              <p style="color:#1e40af; margin:0; font-size:14px;">This is a one-time purchase with no recurring charges. You can purchase additional one-time plans anytime!</p>
            </div>`
                : subscription.planType === 'ongoing' ? `
            <div style="background:#fef3c7; padding:15px; border-radius:8px; margin:20px 0;">
              <h4 style="color:#92400e; margin:0 0 10px;">🔄 Auto-Renewal Active</h4>
              <p style="color:#92400e; margin:0; font-size:14px;">${isRenewal ? 'Your subscription continues with monthly auto-renewal.' : 'Your subscription will automatically renew monthly.'} You can cancel anytime.</p>
            </div>` : ''}

          <p style="color:#475569; line-height:1.6; margin:20px 0;">We'll be in touch shortly to begin your onboarding process.</p>

          <div style="text-align:center; margin:30px 0;">
            <p style="color:#475569; margin-bottom:15px;">Questions about your ${isOneTime ? 'purchase' : 'subscription'}?</p>
            <a href="mailto:${process.env.COMPANY_EMAIL || config.email.user}" style="background:#16a34a; color:#fff; padding:12px 24px; text-decoration:none; border-radius:6px; display:inline-block;">Contact Support</a>
          </div>

          <hr style="border:none; border-top:1px solid #e2e8f0; margin:20px 0;">
          <p style="color:#64748b; font-size:12px; text-align:center; margin:0;">
            ${process.env.COMPANY_NAME || 'Cypentra'} | ${process.env.COMPANY_EMAIL || config.email.user}
          </p>
        </div>
      </div>
    `,
        // text fallback (optional, omitted for brevity)
    };

    await transporter.sendMail(mailOptions);
    logger.info(`${isRenewal ? 'Renewal' : 'Confirmation'} email sent`, {
        to: customerEmail,
        subscriptionId: subscription._id,
        planCount,
        totalAmount: totalPrice,
        isRenewal,
        planType: subscription.planType,
    });
};

// Invoice email with attachment
const sendInvoiceEmail = async (subscription = {}, invoicePath) => {
    const transporter = await getTransporter();
    const to = safe(subscription.customerDetails?.email);
    if (!to) {
        logger.error('Cannot send invoice email: No recipient email');
        return;
    }

    const { planCount, totalEmployees, totalPrice, listHtml } = buildPlanSummary(subscription);
    const createdAt = subscription.createdAt ? new Date(subscription.createdAt) : new Date();
    const invoiceNumber = subscription._id ? `INV-${String(subscription._id).slice(-8).toUpperCase()}` : 'INV-UNKNOWN';

    const mailOptions = {
        from: config.email.user,
        to,
        subject: `Invoice ${invoiceNumber} - Security Services`,
        html: `
      <h2>Invoice for Your Security Services</h2>
      <p>Dear ${safe(subscription.customerDetails?.firstName)} ${safe(subscription.customerDetails?.lastName)},</p>
      <p>Please find attached your invoice for the security services.</p>

      <div style="background:#f5f5f5; padding:20px; border-radius:5px; margin:20px 0;">
        <h3>Invoice Details</h3>
        <p><strong>Invoice Number:</strong> ${invoiceNumber}</p>
        <p><strong>Invoice Date:</strong> ${createdAt.toLocaleDateString()}</p>
        <p><strong>Total Plans:</strong> ${planCount}</p>
        <p><strong>Total Employees:</strong> ${totalEmployees.toLocaleString()}</p>
        <h4>Services:</h4>
        <ul>${listHtml}</ul>
        <p><strong>Total Amount:</strong> ${money(totalPrice)}</p>
        <p><strong>Status:</strong> Paid</p>
      </div>

      <p>Payment Information:</p>
      <ul>
        <li><strong>Transaction ID:</strong> ${safe(subscription.stripePaymentIntentId, 'N/A')}</li>
        <li><strong>Payment Date:</strong> ${createdAt.toLocaleDateString()}</li>
      </ul>

      <p>Thank you for your business!</p>
      <p>Best regards,<br/>Your Security Team at ${process.env.COMPANY_NAME || 'Cypentra'}</p>
    `,
        attachments: invoicePath ? [{ filename: `invoice_${invoiceNumber}.pdf`, path: invoicePath }] : [],
    };

    await transporter.sendMail(mailOptions);
    logger.info(`Invoice email sent`, {
        to,
        subscriptionId: subscription._id,
        invoiceNumber,
        planCount,
        totalAmount: totalPrice,
    });
};

// Welcome email for first-time ongoing plan
const sendOngoingPlanWelcomeEmail = async (subscription = {}) => {
    const customerEmail = safe(subscription.customerDetails?.email);
    if (!customerEmail) {
        logger.error('Cannot send ongoing plan welcome email: No recipient email');
        return;
    }
    const transporter = await getTransporter();

    const nextBill = subscription.nextBillingDate ? new Date(subscription.nextBillingDate) : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    const title = safe(subscription.plans?.[0]?.planTitle, 'Security Plan');

    const mailOptions = {
        from: config.email.user,
        to: customerEmail,
        subject: `🎉 Welcome to Your ${title} Subscription!`,
        html: `
      <div style="font-family: Arial,sans-serif; max-width:600px; margin:0 auto; padding:20px;">
        <div style="background:linear-gradient(135deg,#2563eb,#1d4ed8); color:#fff; padding:30px; border-radius:10px 10px 0 0; text-align:center;">
          <h1 style="margin:0; font-size:28px;">🎉 Welcome to Your Subscription!</h1>
          <p style="margin:10px 0 0; font-size:16px; opacity:.9;">Your ongoing security plan is now active</p>
        </div>
        <div style="background:#f8fafc; padding:30px; border-radius:0 0 10px 10px;">
          <h2 style="color:#1e293b; margin-bottom:20px;">Hi ${safe(subscription.customerDetails?.firstName, 'there')}!</h2>
          <p style="color:#475569; line-height:1.6; margin-bottom:20px;">
            Congratulations! Your ongoing subscription has been activated. You now have access to our premium security services with automatic monthly renewal.
          </p>
          <div style="background:#fff; padding:20px; border-radius:8px; border-left:4px solid #2563eb; margin:20px 0;">
            <h3 style="color:#1e293b; margin:0 0 15px;">📋 Your Subscription Details</h3>
            <p style="margin:5px 0; color:#475569;"><strong>Plan:</strong> ${title}</p>
            <p style="margin:5px 0; color:#475569;"><strong>Monthly Price:</strong> ${money(subscription.totalPrice)}</p>
            <p style="margin:5px 0; color:#475569;"><strong>Next Billing Date:</strong> ${nextBill.toLocaleDateString()}</p>
            <p style="margin:5px 0; color:#475569;"><strong>Status:</strong> <span style="color:#16a34a; font-weight:bold;">Active</span></p>
          </div>
          <div style="background:#fef3c7; padding:15px; border-radius:8px; margin:20px 0;">
            <h4 style="color:#92400e; margin:0 0 10px;">🔄 Auto-Renewal Information</h4>
            <p style="color:#92400e; margin:0; font-size:14px;">Your subscription will automatically renew monthly. You can cancel anytime.</p>
          </div>
          <div style="text-align:center; margin:30px 0;">
            <p style="color:#475569; margin-bottom:15px;">Questions about your subscription?</p>
            <a href="mailto:${process.env.COMPANY_EMAIL || config.email.user}" style="background:#2563eb; color:#fff; padding:12px 24px; text-decoration:none; border-radius:6px; display:inline-block;">Contact Support</a>
          </div>
          <hr style="border:none; border-top:1px solid #e2e8f0; margin:20px 0;">
          <p style="color:#64748b; font-size:12px; text-align:center; margin:0;">
            ${process.env.COMPANY_NAME || 'Cypentra'} | ${process.env.COMPANY_EMAIL || config.email.user}
          </p>
        </div>
      </div>
    `,
    };

    await transporter.sendMail(mailOptions);
    logger.info(`Ongoing plan welcome email sent`, { to: customerEmail, subscriptionId: subscription._id });
};

// Already subscribed notice
const sendAlreadySubscribedEmail = async (customerData = {}, existingSubscription = {}) => {
    const customerEmail = safe(customerData.email);
    if (!customerEmail) {
        logger.error('Cannot send already subscribed email: No recipient email');
        return;
    }
    const transporter = await getTransporter();

    const title = safe(existingSubscription.plans?.[0]?.planTitle, 'Security Plan');
    const createdAt = existingSubscription.createdAt ? new Date(existingSubscription.createdAt) : new Date();

    const mailOptions = {
        from: config.email.user,
        to: customerEmail,
        subject: `⚠️ You Already Have an Active Subscription`,
        html: `
      <div style="font-family: Arial,sans-serif; max-width:600px; margin:0 auto; padding:20px;">
        <div style="background:linear-gradient(135deg,#f59e0b,#d97706); color:#fff; padding:30px; border-radius:10px 10px 0 0; text-align:center;">
          <h1 style="margin:0; font-size:28px;">⚠️ Already Subscribed</h1>
          <p style="margin:10px 0 0; font-size:16px; opacity:.9;">You already have an active ongoing subscription</p>
        </div>
        <div style="background:#f8fafc; padding:30px; border-radius:0 0 10px 10px;">
          <h2 style="color:#1e293b; margin-bottom:20px;">Hi ${safe(customerData.firstName, 'there')}!</h2>
          <p style="color:#475569; line-height:1.6; margin-bottom:20px;">
            We noticed you tried to purchase an ongoing subscription, but you already have an active subscription with us.
          </p>
          <div style="background:#fff; padding:20px; border-radius:8px; border-left:4px solid #f59e0b; margin:20px 0;">
            <h3 style="color:#1e293b; margin:0 0 15px;">📋 Your Current Subscription</h3>
            <p style="margin:5px 0; color:#475569;"><strong>Plan:</strong> ${title}</p>
            <p style="margin:5px 0; color:#475569;"><strong>Monthly Price:</strong> ${money(existingSubscription.totalPrice)}</p>
            <p style="margin:5px 0; color:#475569;"><strong>Started:</strong> ${createdAt.toLocaleDateString()}</p>
            <p style="margin:5px 0; color:#475569;"><strong>Status:</strong> <span style="color:#16a34a; font-weight:bold;">Active & Auto-Renewing</span></p>
          </div>
          <div style="background:#dbeafe; padding:15px; border-radius:8px; margin:20px 0;">
            <h4 style="color:#1e40af; margin:0 0 10px;">💡 Want to Purchase One-Time Plans?</h4>
            <p style="color:#1e40af; margin:0; font-size:14px;">You can still purchase one-time security plans anytime! Only ongoing subscriptions are limited to one active subscription per account.</p>
          </div>
          <div style="text-align:center; margin:30px 0;">
            <a href="mailto:${process.env.COMPANY_EMAIL || config.email.user}" style="background:#f59e0b; color:#fff; padding:12px 24px; text-decoration:none; border-radius:6px; display:inline-block;">Contact Support</a>
          </div>
          <hr style="border:none; border-top:1px solid #e2e8f0; margin:20px 0;">
          <p style="color:#64748b; font-size:12px; text-align:center; margin:0;">
            ${process.env.COMPANY_NAME || 'Cypentra'} | ${process.env.COMPANY_EMAIL || config.email.user}
          </p>
        </div>
      </div>
    `,
    };

    await transporter.sendMail(mailOptions);
    logger.info(`Already subscribed email sent`, { to: customerEmail });
};

// Admin contact notification
const sendContactNotificationEmail = async (contact = {}) => {
    const transporter = await getTransporter();
    const adminEmail = config.email.user;

    const mailOptions = {
        from: config.email.user,
        to: adminEmail,
        subject: `New Contact Form Submission from ${safe(contact.name, 'Unknown')}`,
        html: `
      <div style="font-family: Arial, sans-serif; max-width:600px; margin:0 auto; padding:20px;">
        <h2 style="color:#1e293b;">New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${safe(contact.name, 'N/A')}</p>
        <p><strong>Email:</strong> ${safe(contact.email, 'N/A')}</p>
        <p><strong>Company:</strong> ${safe(contact.company, 'N/A')}</p>
        <p><strong>Subject:</strong> ${safe(contact.subject, 'N/A')}</p>
        <p><strong>Type:</strong> ${safe(contact.type, 'N/A')}</p>
        <p><strong>Message:</strong></p>
        <div style="background:#f8fafc; padding:15px; border-radius:8px; color:#334155;">${safe(contact.message, '')}</div>
        <hr style="border:none; border-top:1px solid #e2e8f0; margin:20px 0;">
        <p style="color:#64748b; font-size:12px; text-align:center; margin:0;">
          ${process.env.COMPANY_NAME || 'Cypentra'} | ${process.env.COMPANY_EMAIL || config.email.user}
        </p>
      </div>
    `,
    };

    await transporter.sendMail(mailOptions);
    logger.info(`Contact notification email sent to admin`, { to: adminEmail });
};

module.exports = {
    sendConfirmationEmail,
    sendInvoiceEmail,
    sendOngoingPlanWelcomeEmail,
    sendAlreadySubscribedEmail,
    sendContactNotificationEmail,
};
