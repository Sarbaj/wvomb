import express from 'express';
import Message from '../models/Message.js';
import { authenticateAdmin } from '../middleware/auth.js';
import { sendEmail } from '../utils/email.js';

const router = express.Router();

// Service name mapping
const getServiceName = (serviceValue) => {
  const serviceMap = {
    'fractional-cfo': 'Fractional CFO Services',
    'fundraising': 'Fundraising Support',
    'gst': 'GST Compliance',
    'income-tax': 'Income Tax Services',
    'debt-recovery': 'Debt Recovery',
    'sez': 'SEZ Setup & Compliance',
    'erp': 'ERP Implementation',
    'other': 'Other Services'
  };
  return serviceMap[serviceValue] || serviceValue;
};

// Submit contact form (public)
router.post('/', async (req, res) => {
  try {
    const { name, email, company, service, message } = req.body;

    // Create message in database
    const newMessage = new Message({
      name,
      email,
      company,
      service,
      message
    });

    await newMessage.save();

    // Send email notification
    try {
      const serviceName = getServiceName(service);
      
      await sendEmail({
        to: process.env.ADMIN_EMAIL || 'aashish.pande@wvomb.co',
        subject: `New Contact Form Submission from ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
            <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h2 style="color: #520052; margin-top: 0;">New Contact Form Submission</h2>
              
              <div style="margin: 20px 0; padding: 15px; background-color: #f5f5f5; border-left: 4px solid #520052;">
                <p style="margin: 8px 0;"><strong>Name:</strong> ${name}</p>
                <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #520052;">${email}</a></p>
                <p style="margin: 8px 0;"><strong>Company:</strong> ${company || 'Not provided'}</p>
                <p style="margin: 8px 0;"><strong>Service Interest:</strong> <span style="color: #520052; font-weight: bold;">${serviceName}</span></p>
              </div>
              
              <div style="margin: 20px 0;">
                <p style="margin: 8px 0;"><strong>Message:</strong></p>
                <div style="padding: 15px; background-color: #f5f5f5; border-radius: 4px; white-space: pre-wrap;">${message}</div>
              </div>
              
              <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;">
              <p style="font-size: 12px; color: #888; margin: 0;">Submitted at: ${new Date().toLocaleString()}</p>
            </div>
          </div>
        `
      });

      // Mark email as sent
      newMessage.emailSent = true;
      await newMessage.save();
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Continue even if email fails - message is still saved
    }

    res.status(201).json({ 
      message: 'Message received successfully. We will get back to you soon!',
      success: true 
    });
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({ 
      message: 'Failed to send message. Please try again.',
      error: error.message 
    });
  }
});

// Get all messages (admin)
router.get('/', authenticateAdmin, async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single message (admin)
router.get('/:id', authenticateAdmin, async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    res.json(message);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update message status (admin)
router.patch('/:id', authenticateAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    
    res.json(message);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete message (admin)
router.delete('/:id', authenticateAdmin, async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
