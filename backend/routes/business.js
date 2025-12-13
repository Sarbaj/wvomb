import express from 'express';
import BusinessSale from '../models/BusinessSale.js';
import BusinessBuy from '../models/BusinessBuy.js';
import { sendEmail } from '../utils/email.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Submit business for sale
router.post('/sell', async (req, res) => {
  try {
    const {
      companyName,
      expectedValuation,
      equityPercentage,
      sector,
      contactNumber,
      email,
      additionalInfo
    } = req.body;

    // Validate required fields
    if (!companyName || !expectedValuation || !equityPercentage || !sector || !contactNumber || !email) {
      return res.status(400).json({ 
        message: 'All required fields must be provided' 
      });
    }

    // Create new business sale entry
    const businessSale = new BusinessSale({
      companyName,
      expectedValuation,
      equityPercentage: parseInt(equityPercentage),
      sector,
      contactNumber,
      email,
      additionalInfo
    });

    await businessSale.save();

    // Send notification email
    if (process.env.ZOHO_SMTP_USER && process.env.ZOHO_SMTP_PASS) {
      try {
        const emailContent = `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Business Sale Submission</title>
          </head>
          <body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: Arial, sans-serif;">
            <table role="presentation" style="width: 100%; border-collapse: collapse;">
              <tr>
                <td align="center" style="padding: 40px 0;">
                  <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #ffffff;">
                    
                    <!-- Header -->
                    <tr>
                      <td style="padding: 0;">
                        <div style="background-color: #520052; padding: 30px; text-align: center;">
                          <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 500;">
                            WVOMB - Business Sale Submission
                          </h1>
                        </div>
                      </td>
                    </tr>

                    <!-- Content -->
                    <tr>
                      <td style="padding: 30px;">
                        <div style="background-color: #F0F9FF; border-left: 4px solid #0EA5E9; padding: 16px; margin-bottom: 30px; border-radius: 4px;">
                          <p style="margin: 0; color: #0C4A6E; font-size: 14px; font-weight: 600;">
                            New business sale inquiry received from your website
                          </p>
                        </div>

                        <h2 style="color: #520052; margin-bottom: 20px; font-size: 24px; font-weight: 500;">Business Details</h2>
                        
                        <table role="presentation" style="width: 100%; border-collapse: collapse; background: #F9FAFB; padding: 20px; border-radius: 8px;">
                          <tr><td style="padding: 8px 0;"><strong style="color: #6B7280;">Company Name:</strong></td><td style="padding: 8px 0; color: #111827;">${companyName}</td></tr>
                          <tr><td style="padding: 8px 0;"><strong style="color: #6B7280;">Expected Valuation:</strong></td><td style="padding: 8px 0; color: #111827;">${expectedValuation}</td></tr>
                          <tr><td style="padding: 8px 0;"><strong style="color: #6B7280;">Equity Percentage:</strong></td><td style="padding: 8px 0; color: #111827;">${equityPercentage}%</td></tr>
                          <tr><td style="padding: 8px 0;"><strong style="color: #6B7280;">Sector:</strong></td><td style="padding: 8px 0; color: #111827;">${sector}</td></tr>
                          <tr><td style="padding: 8px 0;"><strong style="color: #6B7280;">Contact Number:</strong></td><td style="padding: 8px 0; color: #111827;">${contactNumber}</td></tr>
                          <tr><td style="padding: 8px 0;"><strong style="color: #6B7280;">Email:</strong></td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #520052; text-decoration: none;">${email}</a></td></tr>
                          ${additionalInfo ? `<tr><td style="padding: 8px 0; vertical-align: top;"><strong style="color: #6B7280;">Additional Info:</strong></td><td style="padding: 8px 0; color: #111827;">${additionalInfo}</td></tr>` : ''}
                        </table>
                        
                        <div style="background-color: #520052; color: white; padding: 15px; border-radius: 8px; text-align: center; margin-top: 20px;">
                          <p style="margin: 0; font-size: 14px;">Submitted on: ${new Date().toLocaleString()}</p>
                        </div>

                        <div style="text-align: center; margin-top: 30px;">
                          <a href="mailto:${email}" style="display: inline-block; background-color: #520052; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 500;">
                            Contact ${companyName}
                          </a>
                        </div>
                      </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                      <td style="padding: 20px; background-color: #F9FAFB; border-top: 1px solid #E5E7EB; text-align: center;">
                        <p style="margin: 0; color: #6B7280; font-size: 12px;">
                          © ${new Date().getFullYear()} WVOMB Advisors. Business Sale Platform.
                        </p>
                      </td>
                    </tr>

                  </table>
                </td>
              </tr>
            </table>
          </body>
          </html>
        `;

        await sendEmail({
          to: process.env.ADMIN_EMAIL || 'aashish.pande@wvomb.co',
          subject: `Business Sale Inquiry - ${companyName}`,
          html: emailContent
        });

        businessSale.emailSent = true;
        await businessSale.save();
        console.log('✅ Business sale notification sent');
      } catch (emailError) {
        console.error('⚠️ Email sending failed:', emailError);
      }
    } else {
      console.log('ℹ️ Brevo API not configured - business sale saved to database only');
    }

    res.status(201).json({
      message: 'Business sale submission received successfully',
      id: businessSale._id
    });

  } catch (error) {
    console.error('Business sale submission error:', error);
    res.status(500).json({ 
      message: 'Failed to submit business sale information' 
    });
  }
});

// Submit investment interest
router.post('/buy', async (req, res) => {
  try {
    const {
      investorName,
      investmentAmount,
      preferredSector,
      otherConditions,
      contactNumber,
      email,
      additionalInfo
    } = req.body;

    // Validate required fields
    if (!investorName || !investmentAmount || !contactNumber || !email) {
      return res.status(400).json({ 
        message: 'All required fields must be provided' 
      });
    }

    // Create new business buy entry
    const businessBuy = new BusinessBuy({
      investorName,
      investmentAmount,
      preferredSector,
      otherConditions,
      contactNumber,
      email,
      additionalInfo
    });

    await businessBuy.save();

    // Send notification email
    if (process.env.ZOHO_SMTP_USER && process.env.ZOHO_SMTP_PASS) {
      try {
        const emailContent = `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Investment Interest</title>
          </head>
          <body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: Arial, sans-serif;">
            <table role="presentation" style="width: 100%; border-collapse: collapse;">
              <tr>
                <td align="center" style="padding: 40px 0;">
                  <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #ffffff;">
                    
                    <!-- Header -->
                    <tr>
                      <td style="padding: 0;">
                        <div style="background-color: #520052; padding: 30px; text-align: center;">
                          <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 500;">
                            WVOMB - Investment Interest
                          </h1>
                        </div>
                      </td>
                    </tr>

                    <!-- Content -->
                    <tr>
                      <td style="padding: 30px;">
                        <div style="background-color: #F0F9FF; border-left: 4px solid #0EA5E9; padding: 16px; margin-bottom: 30px; border-radius: 4px;">
                          <p style="margin: 0; color: #0C4A6E; font-size: 14px; font-weight: 600;">
                            New investment interest received from your website
                          </p>
                        </div>

                        <h2 style="color: #520052; margin-bottom: 20px; font-size: 24px; font-weight: 500;">Investor Details</h2>
                        
                        <table role="presentation" style="width: 100%; border-collapse: collapse; background: #F9FAFB; padding: 20px; border-radius: 8px;">
                          <tr><td style="padding: 8px 0;"><strong style="color: #6B7280;">Investor Name:</strong></td><td style="padding: 8px 0; color: #111827;">${investorName}</td></tr>
                          <tr><td style="padding: 8px 0;"><strong style="color: #6B7280;">Investment Amount:</strong></td><td style="padding: 8px 0; color: #111827;">${investmentAmount}</td></tr>
                          <tr><td style="padding: 8px 0;"><strong style="color: #6B7280;">Preferred Sector:</strong></td><td style="padding: 8px 0; color: #111827;">${preferredSector || 'Any Sector'}</td></tr>
                          <tr><td style="padding: 8px 0;"><strong style="color: #6B7280;">Contact Number:</strong></td><td style="padding: 8px 0; color: #111827;">${contactNumber}</td></tr>
                          <tr><td style="padding: 8px 0;"><strong style="color: #6B7280;">Email:</strong></td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #520052; text-decoration: none;">${email}</a></td></tr>
                          ${otherConditions ? `<tr><td style="padding: 8px 0; vertical-align: top;"><strong style="color: #6B7280;">Conditions:</strong></td><td style="padding: 8px 0; color: #111827;">${otherConditions}</td></tr>` : ''}
                          ${additionalInfo ? `<tr><td style="padding: 8px 0; vertical-align: top;"><strong style="color: #6B7280;">Additional Info:</strong></td><td style="padding: 8px 0; color: #111827;">${additionalInfo}</td></tr>` : ''}
                        </table>
                        
                        <div style="background-color: #520052; color: white; padding: 15px; border-radius: 8px; text-align: center; margin-top: 20px;">
                          <p style="margin: 0; font-size: 14px;">Submitted on: ${new Date().toLocaleString()}</p>
                        </div>

                        <div style="text-align: center; margin-top: 30px;">
                          <a href="mailto:${email}" style="display: inline-block; background-color: #520052; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 500;">
                            Contact ${investorName}
                          </a>
                        </div>
                      </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                      <td style="padding: 20px; background-color: #F9FAFB; border-top: 1px solid #E5E7EB; text-align: center;">
                        <p style="margin: 0; color: #6B7280; font-size: 12px;">
                          © ${new Date().getFullYear()} WVOMB Advisors. Investment Platform.
                        </p>
                      </td>
                    </tr>

                  </table>
                </td>
              </tr>
            </table>
          </body>
          </html>
        `;

        await sendEmail({
          to: process.env.ADMIN_EMAIL || 'aashish.pande@wvomb.co',
          subject: `Investment Interest - ${investorName}`,
          html: emailContent
        });

        businessBuy.emailSent = true;
        await businessBuy.save();
        console.log('✅ Investment interest notification sent');
      } catch (emailError) {
        console.error('⚠️ Email sending failed:', emailError);
      }
    } else {
      console.log('ℹ️ Brevo API not configured - investment interest saved to database only');
    }

    res.status(201).json({
      message: 'Investment interest registered successfully',
      id: businessBuy._id
    });

  } catch (error) {
    console.error('Investment interest submission error:', error);
    res.status(500).json({ 
      message: 'Failed to register investment interest' 
    });
  }
});

// Get all business sales (admin only)
router.get('/sales', auth, async (req, res) => {
  try {
    const sales = await BusinessSale.find().sort({ createdAt: -1 });
    res.json(sales);
  } catch (error) {
    console.error('Error fetching business sales:', error);
    res.status(500).json({ message: 'Failed to fetch business sales' });
  }
});

// Get all investment interests (admin only)
router.get('/investments', auth, async (req, res) => {
  try {
    const investments = await BusinessBuy.find().sort({ createdAt: -1 });
    res.json(investments);
  } catch (error) {
    console.error('Error fetching investment interests:', error);
    res.status(500).json({ message: 'Failed to fetch investment interests' });
  }
});

// Update business sale status (admin only)
router.put('/sales/:id', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const sale = await BusinessSale.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    
    if (!sale) {
      return res.status(404).json({ message: 'Business sale not found' });
    }
    
    res.json(sale);
  } catch (error) {
    console.error('Error updating business sale:', error);
    res.status(500).json({ message: 'Failed to update business sale' });
  }
});

// Update investment interest status (admin only)
router.put('/investments/:id', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const investment = await BusinessBuy.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    
    if (!investment) {
      return res.status(404).json({ message: 'Investment interest not found' });
    }
    
    res.json(investment);
  } catch (error) {
    console.error('Error updating investment interest:', error);
    res.status(500).json({ message: 'Failed to update investment interest' });
  }
});

// Delete business sale (admin only)
router.delete('/sales/:id', auth, async (req, res) => {
  try {
    const sale = await BusinessSale.findByIdAndDelete(req.params.id);
    
    if (!sale) {
      return res.status(404).json({ message: 'Business sale not found' });
    }
    
    res.json({ message: 'Business sale deleted successfully' });
  } catch (error) {
    console.error('Error deleting business sale:', error);
    res.status(500).json({ message: 'Failed to delete business sale' });
  }
});

// Delete investment interest (admin only)
router.delete('/investments/:id', auth, async (req, res) => {
  try {
    const investment = await BusinessBuy.findByIdAndDelete(req.params.id);
    
    if (!investment) {
      return res.status(404).json({ message: 'Investment interest not found' });
    }
    
    res.json({ message: 'Investment interest deleted successfully' });
  } catch (error) {
    console.error('Error deleting investment interest:', error);
    res.status(500).json({ message: 'Failed to delete investment interest' });
  }
});

export default router;