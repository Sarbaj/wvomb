import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { FloatingCard } from '../components/FloatingCard';
import { ExternalLink, Calendar, User, Tag, Eye } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function LearningCentrePage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchArticles();
    fetchCategories();
  }, [selectedCategory]);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/articles?category=${selectedCategory}&limit=12`);
      if (response.ok) {
        const data = await response.json();
        setArticles(data.articles);
      } else {
        setError('Failed to load articles');
      }
    } catch (error) {
      setError('Unable to connect to server');
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_URL}/api/articles/meta/categories`);
      if (response.ok) {
        const data = await response.json();
        setCategories(['all', ...data]);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-white pt-32">
      {/* Hero Section */}
      <section className="py-12 lg:py-20">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-4xl"
          >
            <h1 className="text-6xl lg:text-8xl tracking-tight mb-8 leading-[0.9]">
              Learning
              <br />
              <span style={{color:"#520052"}}>Centre</span>
            </h1>
            <p className="text-2xl text-[#8A8A8A] leading-relaxed">
              Expand your financial knowledge with our curated resources, guides, and expert insights.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-12 lg:py-20 bg-[#F2F2F2]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-4xl lg:text-5xl tracking-tight mb-4">
              Latest <span style={{color:"#520052"}}>Articles</span>
            </h2>
            <p className="text-xl text-[#8A8A8A] mb-8">
              Insights and expertise from our financial advisory team
            </p>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-3 mb-8">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-[#520052] text-white'
                      : 'bg-white text-[#8A8A8A] hover:bg-[#520052] hover:text-white'
                  }`}
                >
                  {category === 'all' ? 'All Categories' : category}
                </button>
              ))}
            </div>
          </motion.div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#520052] mx-auto mb-4"></div>
              <p className="text-[#8A8A8A]">Loading articles...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-xl text-red-600 mb-4">{error}</p>
              <button
                onClick={fetchArticles}
                className="bg-[#520052] text-white px-6 py-3 rounded hover:bg-[#6B006B] transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article, index) => (
                <motion.div
                  key={article._id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="block"
                >
                  <FloatingCard className="h-full group hover:shadow-xl transition-shadow cursor-pointer">
                    <div className="flex flex-col gap-4 h-full">
                      {/* Article Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 bg-[#520052] flex items-center justify-center text-white rounded">
                            <Tag size={16} />
                          </div>
                          <span className="text-xs bg-[#520052]/10 text-[#520052] px-2 py-1 rounded-full">
                            {article.category}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-[#8A8A8A]">
                          <Eye size={12} />
                          {article.views}
                        </div>
                      </div>
                      
                      {/* Article Content */}
                      <div className="flex-1">
                        <h3 className="text-xl lg:text-2xl mb-3 tracking-tight group-hover:text-[#520052] transition-colors" style={{color:"#520052"}}>
                          {article.title}
                        </h3>
                        <p className="text-[#8A8A8A] leading-relaxed mb-4">
                          {article.description}
                        </p>
                        
                        {/* Article Meta */}
                        <div className="flex items-center gap-4 text-sm text-[#8A8A8A] mb-4">
                          <div className="flex items-center gap-1">
                            <User size={12} />
                            {article.author}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar size={12} />
                            {formatDate(article.publishedAt)}
                          </div>
                        </div>

                        {/* Tags */}
                        {article.tags && article.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {article.tags.slice(0, 3).map((tag, i) => (
                              <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Read More Link */}
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-[#8A8A8A]">{article.readTime} min read</span>
                        <div className="flex items-center gap-2 text-[#520052] font-medium group-hover:gap-3 transition-all">
                          Read Article
                          <ExternalLink size={16} />
                        </div>
                      </div>
                    </div>
                  </FloatingCard>
                </motion.div>
              ))}
            </div>
          )}

          {!loading && !error && articles.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-[#520052]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <ExternalLink className="text-[#520052]" size={24} />
              </div>
              <h3 className="text-xl font-medium mb-2">No Articles Yet</h3>
              <p className="text-[#8A8A8A]">
                {selectedCategory === 'all' 
                  ? 'Articles will appear here once published by our team.'
                  : `No articles found in "${selectedCategory}" category.`
                }
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-black text-white text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto px-6"
        >
          <h2 className="text-5xl lg:text-7xl mb-8">
            Want to <span style={{color:"#520052"}}>Connect?</span>
          </h2>
          <p className="text-xl text-[#8A8A8A] mb-12">
            Follow us on LinkedIn for more insights and updates, or get in touch for personalized guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://www.linkedin.com/company/your-company" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#520052] text-white px-10 py-5 text-lg hover:bg-[#6B0066] transition-colors"
            >
              Follow on LinkedIn
            </a>
            <a 
              href="/contact" 
              className="inline-block bg-white text-black px-10 py-5 text-lg hover:bg-[#F2F2F2] transition-colors"
            >
              Contact Us
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
