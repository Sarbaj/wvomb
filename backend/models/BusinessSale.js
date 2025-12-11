import mongoose from 'mongoose';

const businessSaleSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
    trim: true
  },
  expectedValuation: {
    type: String,
    required: true,
    trim: true
  },
  equityPercentage: {
    type: Number,
    required: true,
    min: 1,
    max: 100
  },
  sector: {
    type: String,
    required: true,
    enum: [
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
      'Other'
    ]
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
businessSaleSchema.index({ sector: 1, status: 1 });
businessSaleSchema.index({ createdAt: -1 });

export default mongoose.model('BusinessSale', businessSaleSchema);