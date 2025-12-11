import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, User, Tag, Eye, Clock } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function ArticleDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchArticle();
  }, [id]);

  const fetchArticle = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/articles/${id}`);
      if (response.ok) {
        const data = await response.json();
        setArticle(data);
      } else if (response.status === 404) {
        setError('Article not found');
      } else {
        setError('Failed to load article');
      }
    } catch (error) {
      setError('Unable to connect to server');
      console.error('Error fetching article:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#520052] mx-auto mb-4"></div>
            <p className="text-[#8A8A8A]">Loading article...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white pt-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-red-600 text-2xl">!</span>
            </div>
            <h2 className="text-2xl font-medium mb-4">Article Not Found</h2>
            <p className="text-[#8A8A8A] mb-8">{error}</p>
            <button
              onClick={() => navigate('/learning-centre')}
              className="bg-[#520052] text-white px-6 py-3 rounded hover:bg-[#6B006B] transition-colors"
            >
              Back to Learning Centre
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white pt-32">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/learning-centre')}
          className="flex items-center gap-2 text-[#8A8A8A] hover:text-[#520052] transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          Back to Learning Centre
        </motion.button>

        {/* Article Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          {/* Category Badge */}
          <div className="flex items-center gap-4 mb-6">
            <span className="bg-[#520052]/10 text-[#520052] px-3 py-1 rounded-full text-sm font-medium">
              {article.category}
            </span>
            <div className="flex items-center gap-1 text-sm text-[#8A8A8A]">
              <Eye size={16} />
              {article.views} views
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-6 leading-tight">
            {article.title}
          </h1>

          {/* Description */}
          <p className="text-xl text-[#8A8A8A] leading-relaxed mb-8">
            {article.description}
          </p>

          {/* Article Meta */}
          <div className="flex flex-wrap items-center gap-6 text-[#8A8A8A] pb-8 border-b border-[#E5E5E5]">
            <div className="flex items-center gap-2">
              <User size={16} />
              <span>By {article.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>{formatDate(article.publishedAt)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>{article.readTime} min read</span>
            </div>
          </div>
        </motion.div>

        {/* Featured Image */}
        {article.featuredImage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <img
              src={article.featuredImage}
              alt={article.title}
              className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </motion.div>
        )}

        {/* Article Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="prose prose-lg max-w-none mb-12"
        >
          <div 
            className="text-lg leading-relaxed text-gray-800"
            style={{ 
              lineHeight: '1.8',
              fontSize: '18px'
            }}
            dangerouslySetInnerHTML={{ 
              __html: article.content.replace(/\n/g, '<br />') 
            }}
          />
        </motion.div>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-12"
          >
            <div className="flex items-center gap-2 mb-4">
              <Tag size={16} className="text-[#8A8A8A]" />
              <span className="text-sm text-[#8A8A8A] font-medium">Tags</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Back to Learning Centre CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center py-12 border-t border-[#E5E5E5]"
        >
          <h3 className="text-2xl font-light mb-4">Explore More Articles</h3>
          <p className="text-[#8A8A8A] mb-8">
            Discover more insights and expertise from our financial advisory team
          </p>
          <button
            onClick={() => navigate('/learning-centre')}
            className="bg-[#520052] text-white px-8 py-3 rounded hover:bg-[#6B006B] transition-colors"
          >
            Back to Learning Centre
          </button>
        </motion.div>
      </div>
    </div>
  );
}