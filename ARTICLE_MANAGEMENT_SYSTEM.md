# Article Management System

## Overview
Complete article management system for the Learning Centre with admin functionality to create, edit, and publish articles.

## Backend Implementation

### Article Model (`backend/models/Article.js`)
```javascript
{
  title: String (required),
  description: String (required),
  content: String (required),
  author: String (required),
  category: String (enum, required),
  tags: [String],
  featuredImage: String (optional),
  isPublished: Boolean (default: false),
  publishedAt: Date (auto-set when published),
  readTime: Number (default: 5 minutes),
  views: Number (default: 0),
  timestamps: true
}
```

### Categories Available
- Financial Planning
- Business Strategy
- Tax & Compliance
- Investment
- Market Analysis
- Industry Insights
- Other

### API Endpoints (`backend/routes/articles.js`)

#### Public Endpoints
- `GET /api/articles` - Get published articles with pagination and filtering
- `GET /api/articles/:id` - Get single article (increments view count)
- `GET /api/articles/meta/categories` - Get available categories

#### Admin Endpoints (Authentication Required)
- `GET /api/articles/admin/all` - Get all articles (including drafts)
- `POST /api/articles` - Create new article
- `PUT /api/articles/:id` - Update article
- `DELETE /api/articles/:id` - Delete article

## Frontend Implementation

### Learning Centre Page (`frontend/src/pages/LearningCentrePage.jsx`)

#### Features
- **Dynamic Article Loading** - Fetches articles from backend API
- **Category Filtering** - Filter articles by category with interactive buttons
- **Professional Article Cards** - Display with:
  - Article title and description
  - Author and publication date
  - Category badge and view count
  - Tags (first 3 displayed)
  - Read time estimate
- **Loading States** - Spinner and error handling
- **Empty States** - Appropriate messages when no articles found
- **Responsive Design** - Works on all screen sizes

#### Article Card Information
- Category badge with color coding
- View count with eye icon
- Author name with user icon
- Publication date with calendar icon
- Tags with proper truncation
- Read time estimate

### Admin Dashboard Integration

#### Articles Tab
- **Article Management** - Full CRUD operations for articles
- **Status Indicators** - Published/Draft badges with color coding
- **Article Statistics** - Shows published vs total articles
- **Quick Actions** - Edit and delete buttons for each article
- **Responsive Layout** - Mobile-friendly design

#### Article Modal
- **Rich Form** - Complete article creation/editing form
- **Category Selection** - Dropdown with predefined categories
- **Tag Management** - Add/remove tags with interactive interface
- **Content Editor** - Large textarea for article content
- **Publication Control** - Checkbox to publish/unpublish
- **Image Support** - Featured image URL field
- **Validation** - Required field validation

## Key Features

### Content Management
- **Draft System** - Save articles as drafts before publishing
- **Rich Metadata** - Categories, tags, read time, author info
- **View Tracking** - Automatic view count increment
- **Publication Control** - Publish/unpublish articles instantly

### User Experience
- **Category Filtering** - Easy navigation through article categories
- **Search-Friendly** - Proper metadata for SEO
- **Professional Design** - Clean, minimalistic article cards
- **Mobile Responsive** - Optimized for all devices

### Admin Experience
- **Intuitive Interface** - Easy-to-use article management
- **Bulk Operations** - Quick edit/delete actions
- **Status Overview** - Clear published/draft indicators
- **Rich Editor** - Comprehensive article creation form

## Usage Flow

### For Admins
1. Navigate to Admin Dashboard → Articles tab
2. Click "Add Article" to create new content
3. Fill in title, description, content, and metadata
4. Add tags and select category
5. Choose to save as draft or publish immediately
6. Edit existing articles with full form pre-populated
7. Delete articles with confirmation prompt

### For Visitors
1. Visit Learning Centre page
2. Browse all articles or filter by category
3. View article cards with rich metadata
4. Click to read full articles (future enhancement)
5. See view counts and engagement metrics

## Technical Details

### Database Indexing
- Optimized queries for published articles
- Category and tag indexing for fast filtering
- Date-based sorting for chronological display

### Security
- Admin authentication required for all write operations
- Input validation and sanitization
- Proper error handling and user feedback

### Performance
- Pagination support for large article collections
- Efficient database queries with proper indexing
- Responsive image loading and caching

The system provides a complete content management solution that allows WvOMB to maintain a professional knowledge base while giving administrators full control over content creation and publication.