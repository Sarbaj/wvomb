import mongoose from 'mongoose';

const businessBuySchema = new mongoose.Schema({
  investorName: {
    type: String,
    required: true,
    trim: true
  },
  investmentAmount: {
    type: String,
    required: true,
    trim: true
  },
  preferredSector: {
    type: String,
    enum: [
      'Any Sector',
      'Technology',
      'Healthcare', 
      'Finance',
      'Manufacturing',
      'Retail',
      'Real Estate',
      'Education',
      'Food & Beverage',
      'Transportation',
      'Energy',
      'Agriculture',
      'Other',
      ''
    ]
  },
  otherConditions: {
    type: String,
    trim: true
  },
  contactNumber: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  additionalInfo: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'matched', 'closed'],
    default: 'pending'
  },
  emailSent: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Index for better query performance
businessBuySchema.index({ preferredSector: 1, status: 1 });
businessBuySchema.index({ createdAt: -1 });

export default mongoose.model('BusinessBuy', businessBuySchema);