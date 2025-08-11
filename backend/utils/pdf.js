// utils/pdf.js
const PDFDocument = require('pdfkit');
const logger = require('./logger');

const money = (n) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(n || 0));

/**
 * Generate a professional invoice PDF (multi-plan supported).
 * Returns a Buffer (no filesystem writes; safe for serverless).
 *
 * @param {Object} subscription - DB subscription object (or sub-like) with:
 *   - _id, createdAt, paymentStatus, planType
 *   - customerDetails: { firstName, lastName, email, phone }
 *   - plans: [{ planTitle, numberOfEmployees, price }]  // one-time or ongoing
 *   - totalPrice
 * @returns {Promise<{ buffer: Buffer, filename: string, mimeType: string }>}
 */
const generateInvoicePDF = async (subscription = {}) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 });

      // collect PDF data into memory
      const chunks = [];
      doc.on('data', (c) => chunks.push(c));
      doc.on('error', (err) => {
        logger.error('PDF document error:', err);
        reject(err);
      });
      doc.on('end', () => {
        const buffer = Buffer.concat(chunks);
        const shortId = subscription._id ? String(subscription._id).slice(-8).toUpperCase() : 'UNKNOWN';
        const filename = `invoice_${shortId}_${Date.now()}.pdf`;
        logger.info('Invoice PDF buffer generated', {
          subscriptionId: subscription._id || 'unknown',
          filename,
        });
        resolve({ buffer, filename, mimeType: 'application/pdf' });
      });

      // ---------- data prep ----------
      const shortId = subscription._id ? String(subscription._id).slice(-8).toUpperCase() : 'UNKNOWN';
      const invoiceDate = subscription.createdAt ? new Date(subscription.createdAt) : new Date();
      const dueDate = new Date(invoiceDate.getTime() + 30 * 24 * 60 * 60 * 1000);

      const cust = subscription.customerDetails || {};
      const custName = `${cust.firstName || ''} ${cust.lastName || ''}`.trim() || 'Valued Customer';
      const custEmail = cust.email || '';
      const custPhone = cust.phone || '';

      const plans = Array.isArray(subscription.plans) && subscription.plans.length > 0
        ? subscription.plans
        : [{
            planTitle: subscription.planTitle || 'Security Service',
            numberOfEmployees: Number(subscription.numberOfEmployees) || 0,
            price: Number(subscription.price || subscription.totalPrice || 0),
          }];

      const paymentStatus = String(subscription.paymentStatus || 'pending').toUpperCase();
      const subtotal = plans.reduce((s, p) => s + (Number(p.price) || 0), 0);
      const finalTotalPrice = Number(subscription.totalPrice ?? subtotal ?? 0);
      const totalEmployees = plans.reduce((s, p) => s + (Number(p.numberOfEmployees) || 0), 0);
      const planCount = plans.length;

      // ---------- styles / helpers ----------
      const primaryColor = '#2563eb';
      const secondaryColor = '#64748b';
      const textColor = '#1e293b';
      let currentY = 50;
      const addLine = (y) => doc.moveTo(50, y).lineTo(550, y).stroke('#e0e0e0');

      // ---------- header ----------
      try {
        doc.rect(0, 0, doc.page.width, 120).fill(primaryColor);

        doc.fillColor('white')
          .fontSize(28).font('Helvetica-Bold')
          .text(process.env.COMPANY_NAME || 'Cypentra', 50, 30);

        doc.fontSize(12).font('Helvetica')
          .text(process.env.COMPANY_TAGLINE || 'Professional Security & Compliance Services', 50, 65);

        doc.fontSize(32).font('Helvetica-Bold').text('INVOICE', 400, 40);
      } catch (e) {
        logger.warn('PDF header fallback:', e.message);
        doc.fillColor(textColor).fontSize(24).font('Helvetica-Bold').text('INVOICE', 50, 50);
      }

      currentY = 150;

      // ---------- invoice info ----------
      doc.fillColor(textColor).fontSize(14).font('Helvetica-Bold').text('Invoice Information', 50, currentY);
      currentY += 25;

      doc.fontSize(11).font('Helvetica').fillColor(secondaryColor);
      doc.text('Invoice Number:', 50, currentY);
      doc.text('Invoice Date:', 50, currentY + 15);
      doc.text('Due Date:', 50, currentY + 30);
      doc.text('Payment Status:', 50, currentY + 45);

      doc.fillColor(textColor).font('Helvetica-Bold');
      doc.text(`INV-${shortId}`, 200, currentY);
      doc.text(invoiceDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }), 200, currentY + 15);
      doc.text(dueDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }), 200, currentY + 30);

      if (paymentStatus === 'SUCCEEDED') doc.fillColor('#16a34a').text('PAID', 200, currentY + 45);
      else if (paymentStatus === 'FAILED') doc.fillColor('#dc2626').text('FAILED', 200, currentY + 45);
      else doc.fillColor('#f59e0b').text('PENDING', 200, currentY + 45);

      currentY += 80;

      // ---------- from (company) ----------
      doc.fillColor(textColor).fontSize(14).font('Helvetica-Bold').text('From:', 50, currentY);
      currentY += 20;

      doc.fontSize(12).font('Helvetica-Bold').text(process.env.COMPANY_NAME || 'Cypentra', 50, currentY);
      doc.font('Helvetica').fillColor(secondaryColor);
      if (process.env.COMPANY_ADDRESS) { currentY += 15; doc.text(process.env.COMPANY_ADDRESS, 50, currentY); }
      if (process.env.COMPANY_CITY) {
        currentY += 15;
        const cityLine = `${process.env.COMPANY_CITY}${process.env.COMPANY_STATE ? ', ' + process.env.COMPANY_STATE : ''} ${process.env.COMPANY_ZIP || ''}`.trim();
        doc.text(cityLine, 50, currentY);
      }
      if (process.env.COMPANY_EMAIL) { currentY += 15; doc.fillColor(primaryColor).text(`Email: ${process.env.COMPANY_EMAIL}`, 50, currentY); }
      if (process.env.COMPANY_PHONE) { currentY += 15; doc.fillColor(secondaryColor).text(`Phone: ${process.env.COMPANY_PHONE}`, 50, currentY); }

      // ---------- bill to (right) ----------
      doc.fillColor(textColor).fontSize(14).font('Helvetica-Bold').text('Bill To:', 320, currentY - 80);

      let customerY = currentY - 60;
      doc.fontSize(12).font('Helvetica-Bold').text(custName, 320, customerY);
      doc.font('Helvetica').fillColor(secondaryColor);
      if (custEmail) { customerY += 15; doc.fillColor(primaryColor).text(custEmail, 320, customerY); }
      if (custPhone) { customerY += 15; doc.fillColor(secondaryColor).text(custPhone, 320, customerY); }

      currentY += 40;
      addLine(currentY);
      currentY += 30;

      // ---------- services ----------
      doc.fillColor(textColor).fontSize(16).font('Helvetica-Bold').text('Security Services Provided', 50, currentY);
      currentY += 30;

      // header
      doc.rect(50, currentY, 500, 30).fill('#f8fafc').stroke('#e2e8f0');
      doc.fillColor(textColor).fontSize(11).font('Helvetica-Bold')
        .text('Service Description', 60, currentY + 10)
        .text('Employees', 320, currentY + 10)
        .text('Amount', 450, currentY + 10);
      currentY += 30;

      // rows
      plans.forEach((plan, index) => {
        const rowHeight = 35;
        if (index % 2 === 0) doc.rect(50, currentY, 500, rowHeight).fill('#fafafa').stroke('#e2e8f0');
        else doc.rect(50, currentY, 500, rowHeight).stroke('#e2e8f0');

        const price = Number(plan.price) || 0;
        const emp = Number(plan.numberOfEmployees) || 0;

        doc.fillColor(textColor).fontSize(10).font('Helvetica')
          .text(plan.planTitle || 'Security Service', 60, currentY + 10, { width: 250 });

        doc.text(String(emp), 320, currentY + 10);
        doc.font('Helvetica-Bold').text(money(price), 450, currentY + 10);

        currentY += rowHeight;
      });

      currentY += 20;

      // ---------- summary ----------
      const summaryY = currentY;
      doc.fillColor(textColor).fontSize(12).font('Helvetica-Bold').text('Order Summary', 50, summaryY);
      doc.fontSize(10).font('Helvetica').fillColor(secondaryColor);
      doc.text(`Total Plans: ${planCount}`, 50, summaryY + 25);
      doc.text(`Total Employees Covered: ${totalEmployees.toLocaleString()}`, 50, summaryY + 40);
      if (totalEmployees > 0) {
        const avg = Math.round(finalTotalPrice / totalEmployees);
        doc.text(`Average Price per Employee: ${money(avg)}`, 50, summaryY + 55);
      }

      // totals box
      doc.rect(350, currentY, 200, 80).fill('#f8fafc').stroke('#e2e8f0');
      doc.fillColor(secondaryColor).fontSize(11).font('Helvetica').text('Subtotal:', 360, currentY + 15);
      doc.fillColor(textColor).font('Helvetica-Bold').text(money(subtotal), 450, currentY + 15);
      doc.fillColor(secondaryColor).font('Helvetica').text('Tax (0%):', 360, currentY + 35);
      doc.fillColor(textColor).font('Helvetica-Bold').text(money(0), 450, currentY + 35);

      addLine(currentY + 50);
      doc.fillColor(textColor).fontSize(14).font('Helvetica-Bold').text('Total Amount:', 360, currentY + 60);
      doc.fillColor(primaryColor).text(money(finalTotalPrice), 450, currentY + 60);

      currentY += 120;

      // end
      doc.end();
    } catch (error) {
      logger.error('Error in generateInvoicePDF:', error);
      reject(error);
    }
  });
};

module.exports = { generateInvoicePDF };
