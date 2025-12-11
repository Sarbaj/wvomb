import express from 'express';
import Article from '../models/Article.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Get all published articles (public)
router.get('/', async (req, res) => {
  try {
    const { category, limit = 10, page = 1 } = req.query;
    const query = { isPublished: true };
    
    if (category && category !== 'all') {
      query.category = category;
    }

    const articles = await Article.find(query)
      .sort({ publishedAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .select('-content'); // Exclude full content for list view

    const total = await Article.countDocuments(query);

    res.json({
      articles,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).json({ message: 'Failed to fetch articles' });
  }
});

// Get single article by ID (public)
router.get('/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    
    if (!article || !article.isPublished) {
      return res.status(404).json({ message: 'Article not found' });
    }

    // Increment view count
    article.views += 1;
    await article.save();

    res.json(article);
  } catch (error) {
    console.error('Error fetching article:', error);
    res.status(500).json({ message: 'Failed to fetch article' });
  }
});

// Get all articles for admin (including unpublished)
router.get('/admin/all', auth, async (req, res) => {
  try {
    const { category, status, limit = 20, page = 1 } = req.query;
    const query = {};
    
    if (category && category !== 'all') {
      query.category = category;
    }
    
    if (status === 'published') {
      query.isPublished = true;
    } else if (status === 'draft') {
      query.isPublished = false;
    }

    const articles = await Article.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    const total = await Article.countDocuments(query);

    res.json({
      articles,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Error fetching articles for admin:', error);
    res.status(500).json({ message: 'Failed to fetch articles' });
  }
});

// Create new article (admin only)
router.post('/', auth, async (req, res) => {
  try {
    const {
      title,
      description,
      content,
      author,
      category,
      tags,
      featuredImage,
      isPublished,
      readTime
    } = req.body;

    // Validate required fields
    if (!title || !description || !content || !author || !category) {
      return res.status(400).json({ 
        message: 'Title, description, content, author, and category are required' 
      });
    }

    const article = new Article({
      title,
      description,
      content,
      author,
      category,
      tags: tags || [],
      featuredImage,
      isPublished: isPublished || false,
      readTime: readTime || 5
    });

    await article.save();

    res.status(201).json({
      message: 'Article created successfully',
      article
    });
  } catch (error) {
    console.error('Error creating article:', error);
    res.status(500).json({ message: 'Failed to create article' });
  }
});

// Update article (admin only)
router.put('/:id', auth, async (req, res) => {
  try {
    const {
      title,
      description,
      content,
      author,
      category,
      tags,
      featuredImage,
      isPublished,
      readTime
    } = req.body;

    const article = await Article.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        content,
        author,
        category,
        tags,
        featuredImage,
        isPublished,
        readTime,
        ...(isPublished && !req.body.publishedAt ? { publishedAt: new Date() } : {})
      },
      { new: true }
    );

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    res.json({
      message: 'Article updated successfully',
      article
    });
  } catch (error) {
    console.error('Error updating article:', error);
    res.status(500).json({ message: 'Failed to update article' });
  }
});

// Delete article (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    res.json({ message: 'Article deleted successfully' });
  } catch (error) {
    console.error('Error deleting article:', error);
    res.status(500).json({ message: 'Failed to delete article' });
  }
});

// Get article categories
router.get('/meta/categories', async (req, res) => {
  try {
    const categories = [
      'Financial Planning',
      'Business Strategy',
      'Tax & Compliance',
      'Investment',
      'Market Analysis',
      'Industry Insights',
      'Other'
    ];
    
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch categories' });
  }
});

export default router;