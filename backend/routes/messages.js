import express from 'express';
import Message from '../models/Message.js';
import authenticateAdmin from '../middleware/auth.js';
import { sendEmail, sendAutoReply, generateEmailTemplate } from '../utils/email.js';

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

    // Send email notification to admin (only if Zoho SMTP is configured)
    if (process.env.ZOHO_SMTP_USER && process.env.ZOHO_SMTP_PASS) {
      try {
        const serviceName = getServiceName(service);
        
        await sendEmail({
          to: process.env.ADMIN_EMAIL || 'aashish.pande@wvomb.co',
          subject: `🔔 New Contact Form Submission from ${name}`,
          html: generateEmailTemplate(name, email, company, serviceName, message)
        });

        // Send auto-reply to user
        await sendAutoReply(email, name);

        // Mark email as sent
        newMessage.emailSent = true;
        await newMessage.save();
        
        console.log('✅ Emails sent successfully');
      } catch (emailError) {
        console.error('⚠️ Email sending failed (message saved to database):', emailError.message);
        // Continue even if email fails - message is still saved
      }
    } else {
      console.log('ℹ️ Zoho SMTP not configured - message saved to database only');
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
