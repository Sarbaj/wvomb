import express from 'express';
import Contact from '../models/Contact.js';
import { authenticateAdmin } from '../middleware/auth.js';

const router = express.Router();

// Get contact details (public)
router.get('/', async (req, res) => {
  try {
    const contact = await Contact.findOne().sort({ createdAt: -1 });
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update contact details (admin)
router.put('/', authenticateAdmin, async (req, res) => {
  try {
    let contact = await Contact.findOne();
    
    if (!contact) {
      contact = new Contact(req.body);
    } else {
      Object.assign(contact, req.body);
    }
    
    await contact.save();
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
