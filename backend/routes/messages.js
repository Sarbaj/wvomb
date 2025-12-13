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
  const timestamp = new Date().toISOString();
  const requestId = Math.random().toString(36).substring(7);
  
  try {
    const { name, email, company, service, message } = req.body;
    
    console.log(`\n🔥 [${timestamp}] [${requestId}] NEW CONTACT FORM SUBMISSION`);
    console.log(`📝 Name: ${name}`);
    console.log(`📧 Email: ${email}`);
    console.log(`🏢 Company: ${company || 'Not provided'}`);
    console.log(`🎯 Service: ${service}`);
    console.log(`💬 Message: ${message.substring(0, 100)}${message.length > 100 ? '...' : ''}`);
    console.log(`🌐 IP: ${req.ip || req.connection.remoteAddress}`);
    console.log(`🔧 User-Agent: ${req.get('User-Agent')}`);

    // Create message in database
    console.log(`💾 [${requestId}] Saving message to database...`);
    const newMessage = new Message({
      name,
      email,
      company,
      service,
      message
    });

    await newMessage.save();
    console.log(`✅ [${requestId}] Message saved to database with ID: ${newMessage._id}`);

    // Send email notification to admin (only if Zoho SMTP is configured)
    if (process.env.ZOHO_SMTP_USER && process.env.ZOHO_SMTP_PASS) {
      console.log(`📧 [${requestId}] SMTP credentials found - initiating email process`);
      console.log(`📧 [${requestId}] SMTP User: ${process.env.ZOHO_SMTP_USER}`);
      console.log(`📧 [${requestId}] Admin Email: ${process.env.ADMIN_EMAIL}`);
      
      // Send emails asynchronously to avoid blocking the response
      setImmediate(async () => {
        try {
          console.log(`📧 [${requestId}] Starting background email sending process...`);
          const serviceName = getServiceName(service);
          console.log(`🎯 [${requestId}] Service mapped to: ${serviceName}`);
          
          // Send admin notification
          console.log(`📤 [${requestId}] Sending admin notification email...`);
          await sendEmail({
            to: process.env.ADMIN_EMAIL || 'aashish.pande@wvomb.co',
            subject: `🔔 New Contact Form Submission from ${name}`,
            html: generateEmailTemplate(name, email, company, serviceName, message)
          });
          console.log(`✅ [${requestId}] Admin notification sent successfully`);

          // Send auto-reply to user
          console.log(`📤 [${requestId}] Sending auto-reply to user: ${email}`);
          await sendAutoReply(email, name);
          console.log(`✅ [${requestId}] Auto-reply sent successfully`);

          // Mark email as sent
          console.log(`💾 [${requestId}] Updating database - marking emails as sent...`);
          newMessage.emailSent = true;
          await newMessage.save();
          console.log(`✅ [${requestId}] Database updated successfully`);
          
          console.log(`🎉 [${requestId}] ALL EMAILS SENT SUCCESSFULLY! Process complete.`);
        } catch (emailError) {
          console.error(`❌ [${requestId}] EMAIL SENDING FAILED:`, emailError.message);
          console.error(`❌ [${requestId}] Full error details:`, emailError);
          console.error(`❌ [${requestId}] Stack trace:`, emailError.stack);
        }
      });
      
      console.log(`🚀 [${requestId}] Email sending initiated in background - continuing with response`);
    } else {
      console.log(`⚠️ [${requestId}] Zoho SMTP not configured - message saved to database only`);
      console.log(`⚠️ [${requestId}] ZOHO_SMTP_USER: ${process.env.ZOHO_SMTP_USER ? 'SET' : 'NOT SET'}`);
      console.log(`⚠️ [${requestId}] ZOHO_SMTP_PASS: ${process.env.ZOHO_SMTP_PASS ? 'SET' : 'NOT SET'}`);
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
