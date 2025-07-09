// utils/pdf.js
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const logger = require('./logger');
/**
 * Generate a professional invoice PDF for multiple plans subscription
 * @param {Object} subscription - Subscription object from database with plans array
 * @returns {Promise<string>} - Path to generated PDF file
 */
const generateInvoicePDF = async (subscription) => {
    try {
        const doc = new PDFDocument({ margin: 50 });
        const fileName = `invoice_${subscription._id}_${Date.now()}.pdf`;
        const invoicesDir = path.join(__dirname, '../invoices');
        const filePath = path.join(invoicesDir, fileName);
        
        // Create invoices directory if it doesn't exist
        if (!fs.existsSync(invoicesDir)) {
            fs.mkdirSync(invoicesDir, { recursive: true });
        }
        
        return new Promise((resolve, reject) => {
            doc.pipe(fs.createWriteStream(filePath));
            
            // Helper function to add a horizontal line
            const addLine = (y) => {
                doc.moveTo(50, y)
                   .lineTo(550, y)
                   .stroke('#e0e0e0');
            };
            
            // Colors
            const primaryColor = '#2563eb';
            const secondaryColor = '#64748b';
            const textColor = '#1e293b';
            
            let currentY = 50;
            
            // Company Logo/Header Section
            try {
                doc.rect(0, 0, doc.page.width, 120)
                   .fill(primaryColor);
                
                // Company Name (White text on blue background)
                doc.fillColor('white')
                   .fontSize(28)
                   .font('Helvetica-Bold')
                   .text(process.env.COMPANY_NAME || 'codelink.se', 50, 30);
                
                doc.fontSize(12)
                   .font('Helvetica')
                   .text(process.env.COMPANY_TAGLINE || 'Professional Security & Compliance Services', 50, 65);
                
                // Invoice Title (Right side)
                doc.fontSize(32)
                   .font('Helvetica-Bold')
                   .text('INVOICE', 400, 40);
            } catch (headerError) {
                logger.warn('Error creating PDF header, using simple version:', headerError.message);
                // Fallback to simple header
                doc.fillColor(textColor)
                   .fontSize(24)
                   .font('Helvetica-Bold')
                   .text('INVOICE', 50, 50);
            }
            
            currentY = 150;
            
            // Reset text color for body
            doc.fillColor(textColor);
            
            // Invoice Information Section
            doc.fontSize(14)
               .font('Helvetica-Bold')
               .text('Invoice Information', 50, currentY);
            
            currentY += 25;
            
            const invoiceDate = new Date(subscription.createdAt);
            const dueDate = new Date(invoiceDate);
            dueDate.setDate(dueDate.getDate() + 30); // 30 days from invoice date
            
            doc.fontSize(11)
               .font('Helvetica')
               .fillColor(secondaryColor);
            
            // Left column - Invoice details
            doc.text(`Invoice Number:`, 50, currentY);
            doc.text(`Invoice Date:`, 50, currentY + 15);
            doc.text(`Due Date:`, 50, currentY + 30);
            doc.text(`Payment Status:`, 50, currentY + 45);
            
            // Right column - Values
            doc.fillColor(textColor)
               .font('Helvetica-Bold');
            doc.text(`INV-${subscription._id ? subscription._id.toString().slice(-8).toUpperCase() : 'UNKNOWN'}`, 200, currentY);
            doc.text(invoiceDate.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            }), 200, currentY + 15);
            doc.text(dueDate.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            }), 200, currentY + 30);
            
            // Payment status with color coding
            const paymentStatus = (subscription.paymentStatus || 'pending').toUpperCase();
            if (paymentStatus === 'SUCCEEDED') {
                doc.fillColor('#16a34a').text('PAID', 200, currentY + 45);
            } else if (paymentStatus === 'FAILED') {
                doc.fillColor('#dc2626').text('FAILED', 200, currentY + 45);
            } else {
                doc.fillColor('#f59e0b').text('PENDING', 200, currentY + 45);
            }
            
            currentY += 80;
            
            // Company Information Section
            doc.fillColor(textColor)
               .fontSize(14)
               .font('Helvetica-Bold')
               .text('From:', 50, currentY);
            
            currentY += 20;
            
            doc.fontSize(12)
               .font('Helvetica-Bold')
               .text(process.env.COMPANY_NAME || 'codelink.se', 50, currentY);
            
            doc.font('Helvetica')
               .fillColor(secondaryColor);
            
            if (process.env.COMPANY_ADDRESS) {
                currentY += 15;
                doc.text(process.env.COMPANY_ADDRESS, 50, currentY);
            }
            
            if (process.env.COMPANY_CITY) {
                currentY += 15;
                const cityLine = `${process.env.COMPANY_CITY}, ${process.env.COMPANY_STATE || ''} ${process.env.COMPANY_ZIP || ''}`.trim();
                doc.text(cityLine, 50, currentY);
            }
            
            
            if (process.env.COMPANY_EMAIL) {
                currentY += 15;
                doc.fillColor(primaryColor)
                   .text(`Email: ${process.env.COMPANY_EMAIL}`, 50, currentY);
            }
            
            if (process.env.COMPANY_PHONE) {
                currentY += 15;
                doc.fillColor(secondaryColor)
                   .text(`Phone: ${process.env.COMPANY_PHONE}`, 50, currentY);
            }
            
            // Customer Information Section (Right side)
            doc.fillColor(textColor)
               .fontSize(14)
               .font('Helvetica-Bold')
               .text('Bill To:', 320, currentY - 80);
            
            let customerY = currentY - 60;
            
            doc.fontSize(12)
               .font('Helvetica-Bold')
               .text(`${subscription.customerDetails.firstName} ${subscription.customerDetails.lastName}`, 320, customerY);
            
            doc.font('Helvetica')
               .fillColor(secondaryColor);
            
            customerY += 15;
            doc.fillColor(primaryColor)
               .text(subscription.customerDetails.email, 320, customerY);
            
            if (subscription.customerDetails.phone) {
                customerY += 15;
                doc.fillColor(secondaryColor)
                   .text(subscription.customerDetails.phone, 320, customerY);
            }
            
            currentY += 40;
            
            // Add separator line
            addLine(currentY);
            currentY += 30;
            
            // Services Section
            doc.fillColor(textColor)
               .fontSize(16)
               .font('Helvetica-Bold')
               .text('Security Services Provided', 50, currentY);
            
            currentY += 30;
            
            // Table Header
            doc.rect(50, currentY, 500, 30)
               .fill('#f8fafc')
               .stroke('#e2e8f0');
            
            doc.fillColor(textColor)
               .fontSize(11)
               .font('Helvetica-Bold')
               .text('Service Description', 60, currentY + 10)
               .text('Employees', 320, currentY + 10)
               .text('Amount', 450, currentY + 10);
            
            currentY += 30;
            
            // Service Rows - Loop through all plans
            let subtotal = 0;
            if (subscription.plans && Array.isArray(subscription.plans)) {
                subscription.plans.forEach((plan, index) => {
                    const rowHeight = 35;
                    
                    // Alternate row colors
                    if (index % 2 === 0) {
                        doc.rect(50, currentY, 500, rowHeight)
                           .fill('#fafafa')
                           .stroke('#e2e8f0');
                    } else {
                        doc.rect(50, currentY, 500, rowHeight)
                           .stroke('#e2e8f0');
                    }
                    
                    doc.fillColor(textColor)
                       .fontSize(10)
                       .font('Helvetica')
                       .text(plan.planTitle || 'Unknown Plan', 60, currentY + 10, { width: 250 });
                    
                    doc.text((plan.numberOfEmployees || 0).toString(), 320, currentY + 10);
                    
                    doc.font('Helvetica-Bold')
                       .text(`${(plan.price || 0).toLocaleString()}`, 450, currentY + 10);
                    
                    subtotal += (plan.price || 0);
                    currentY += rowHeight;
                });
            } else {
                // Fallback for old single plan format or missing plans
                const rowHeight = 35;
                
                doc.rect(50, currentY, 500, rowHeight)
                   .fill('#fafafa')
                   .stroke('#e2e8f0');
                
                doc.fillColor(textColor)
                   .fontSize(10)
                   .font('Helvetica')
                   .text(subscription.planTitle || 'Security Service', 60, currentY + 10, { width: 250 });
                
                doc.text((subscription.numberOfEmployees || 0).toString(), 320, currentY + 10);
                
                doc.font('Helvetica-Bold')
                   .text(`${(subscription.price || subscription.totalPrice || 0).toLocaleString()}`, 450, currentY + 10);
                
                subtotal = subscription.price || subscription.totalPrice || 0;
                currentY += rowHeight;
            }
            
            currentY += 20;
            
            // Summary Section
            const summaryY = currentY;
            
            // Left side - Plan summary
            doc.fillColor(textColor)
               .fontSize(12)
               .font('Helvetica-Bold')
               .text('Order Summary', 50, summaryY);
            
            doc.fontSize(10)
               .font('Helvetica')
               .fillColor(secondaryColor);
            
            const totalEmployees = subscription.plans && Array.isArray(subscription.plans) 
                ? subscription.plans.reduce((sum, plan) => sum + (plan.numberOfEmployees || 0), 0)
                : (subscription.numberOfEmployees || 0);
            
            const planCount = subscription.plans && Array.isArray(subscription.plans) 
                ? subscription.plans.length 
                : 1;
            
            const finalTotalPrice = subscription.totalPrice || subtotal || 0;
            
            doc.text(`Total Plans: ${planCount}`, 50, summaryY + 25);
            doc.text(`Total Employees Covered: ${totalEmployees.toLocaleString()}`, 50, summaryY + 40);
            if (totalEmployees > 0) {
                doc.text(`Average Price per Employee: ${Math.round(finalTotalPrice / totalEmployees)}`, 50, summaryY + 55);
            }
            
            // Right side - Financial total
            doc.rect(350, currentY, 200, 80)
               .fill('#f8fafc')
               .stroke('#e2e8f0');
            
            // Subtotal
            doc.fillColor(secondaryColor)
               .fontSize(11)
               .font('Helvetica')
               .text('Subtotal:', 360, currentY + 15);
            doc.fillColor(textColor)
               .font('Helvetica-Bold')
               .text(`$${subtotal.toLocaleString()}`, 450, currentY + 15);
            
            // Tax (0% for security services)
            doc.fillColor(secondaryColor)
               .font('Helvetica')
               .text('Tax (0%):', 360, currentY + 35);
            doc.fillColor(textColor)
               .font('Helvetica-Bold')
               .text('$0.00', 450, currentY + 35);
            
            // Total
            addLine(currentY + 50);
            doc.fillColor(textColor)
               .fontSize(14)
               .font('Helvetica-Bold')
               .text('Total Amount:', 360, currentY + 60);
            doc.fillColor(primaryColor)
               .text(`${finalTotalPrice.toLocaleString()}`, 450, currentY + 60);
            
            currentY += 120;
            
            doc.end();
            
            doc.on('end', () => {
                logger.info(`Professional multi-plan invoice PDF generated: ${fileName}`, {
                    subscriptionId: subscription._id || 'unknown',
                    planCount: planCount,
                    totalAmount: finalTotalPrice,
                    customerEmail: subscription.customerDetails?.email || 'unknown'
                });
                resolve(filePath);
            });
            
            doc.on('error', (err) => {
                logger.error('Error generating PDF:', err);
                reject(err);
            });
        });
        
    } catch (error) {
        logger.error('Error in generateInvoicePDF:', error);
        throw error;
    }
};

module.exports = {
    generateInvoicePDF
};