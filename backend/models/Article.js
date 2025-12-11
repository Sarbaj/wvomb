import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: [
      'Financial Planning',
      'Business Strategy',
      'Tax & Compliance',
      'Investment',
      'Market Analysis',
      'Industry Insights',
      'Other'
    ]
  },
  tags: [{
    type: String,
    trim: true
  }],
  featuredImage: {
    type: String,
    trim: true
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  publishedAt: {
    type: Date
  },
  readTime: {
    type: Number, // in minutes
    default: 5
  },
  views: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for better query performance
articleSchema.index({ isPublished: 1, publishedAt: -1 });
articleSchema.index({ category: 1, isPublished: 1 });
articleSchema.index({ tags: 1 });

// Auto-set publishedAt when isPublished is set to true
articleSchema.pre('save', function(next) {
  if (this.isPublished && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  next();
});

export default mongoose.model('Article', articleSchema);