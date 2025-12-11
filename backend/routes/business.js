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
    try {
      const emailContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #520052 0%, #8B008B 100%); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">New Business Sale Submission</h1>
          </div>
          
          <div style="padding: 30px; background: #f9f9f9;">
            <h2 style="color: #520052; margin-bottom: 20px;">Business Details</h2>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <p><strong>Company Name:</strong> ${companyName}</p>
              <p><strong>Expected Valuation:</strong> ${expectedValuation}</p>
              <p><strong>Equity Percentage:</strong> ${equityPercentage}%</p>
              <p><strong>Sector:</strong> ${sector}</p>
              <p><strong>Contact Number:</strong> ${contactNumber}</p>
              <p><strong>Email:</strong> ${email}</p>
              ${additionalInfo ? `<p><strong>Additional Information:</strong> ${additionalInfo}</p>` : ''}
            </div>
            
            <div style="background: #520052; color: white; padding: 15px; border-radius: 8px; text-align: center;">
              <p style="margin: 0;">Submitted on: ${new Date().toLocaleString()}</p>
            </div>
          </div>
        </div>
      `;

      await sendEmail({
        to: process.env.ADMIN_EMAIL || 'admin@wvomb.com',
        subject: `New Business Sale Submission - ${companyName}`,
        html: emailContent
      });

      businessSale.emailSent = true;
      await businessSale.save();
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
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
    try {
      const emailContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #520052 0%, #8B008B 100%); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">New Investment Interest</h1>
          </div>
          
          <div style="padding: 30px; background: #f9f9f9;">
            <h2 style="color: #520052; margin-bottom: 20px;">Investor Details</h2>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <p><strong>Investor Name:</strong> ${investorName}</p>
              <p><strong>Investment Amount:</strong> ${investmentAmount}</p>
              <p><strong>Preferred Sector:</strong> ${preferredSector || 'Not specified'}</p>
              <p><strong>Contact Number:</strong> ${contactNumber}</p>
              <p><strong>Email:</strong> ${email}</p>
              ${otherConditions ? `<p><strong>Other Conditions:</strong> ${otherConditions}</p>` : ''}
              ${additionalInfo ? `<p><strong>Additional Information:</strong> ${additionalInfo}</p>` : ''}
            </div>
            
            <div style="background: #520052; color: white; padding: 15px; border-radius: 8px; text-align: center;">
              <p style="margin: 0;">Submitted on: ${new Date().toLocaleString()}</p>
            </div>
          </div>
        </div>
      `;

      await sendEmail({
        to: process.env.ADMIN_EMAIL || 'admin@wvomb.com',
        subject: `New Investment Interest - ${investorName}`,
        html: emailContent
      });

      businessBuy.emailSent = true;
      await businessBuy.save();
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
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