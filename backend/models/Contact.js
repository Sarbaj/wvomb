import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true
  },
  socialLinks: {
    linkedin: String,
    twitter: String,
    facebook: String,
    instagram: String
  }
}, {
  timestamps: true
});

export default mongoose.model('Contact', contactSchema);
