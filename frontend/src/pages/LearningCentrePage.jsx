import { motion } from 'motion/react';
import { FloatingCard } from '../components/FloatingCard';
import { ExternalLink } from 'lucide-react';

export default function LearningCentrePage() {
  // LinkedIn articles - Add your article links here
  const articles = [
    {
      title: 'Article Title 1',
      description: 'Brief description of your first LinkedIn article...',
      link: 'https://linkedin.com/pulse/your-article-1',
      date: 'December 2024'
    },
    {
      title: 'Article Title 2',
      description: 'Brief description of your second LinkedIn article...',
      link: 'https://linkedin.com/pulse/your-article-2',
      date: 'November 2024'
    },
    {
      title: 'Article Title 3',
      description: 'Brief description of your third LinkedIn article...',
      link: 'https://linkedin.com/pulse/your-article-3',
      date: 'October 2024'
    },
    // Add more articles here
  ];

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
            <p className="text-xl text-[#8A8A8A]">
              Insights and expertise from our team on LinkedIn
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article, index) => (
              <motion.a
                key={index}
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="block"
              >
                <FloatingCard className="h-full group hover:shadow-xl transition-shadow cursor-pointer">
                  <div className="flex flex-col gap-4 h-full">
                    <div className="flex items-start justify-between">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#C96AE0] via-[#520052] to-[#1A001A] flex items-center justify-center text-white shadow-lg rounded">
                        <ExternalLink size={20} />
                      </div>
                      <span className="text-sm text-[#8A8A8A]">{article.date}</span>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-xl lg:text-2xl mb-3 tracking-tight group-hover:text-[#520052] transition-colors" style={{color:"#520052"}}>
                        {article.title}
                      </h3>
                      <p className="text-[#8A8A8A] leading-relaxed">
                        {article.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-[#520052] font-medium group-hover:gap-3 transition-all">
                      Read on LinkedIn
                      <ExternalLink size={16} />
                    </div>
                  </div>
                </FloatingCard>
              </motion.a>
            ))}
          </div>

          {articles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-[#8A8A8A]">Articles coming soon...</p>
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
