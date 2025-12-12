import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { TrendingUp, BarChart3, Shield, FileText, DollarSign, Building2, Settings, ChevronDown, ChevronUp } from 'lucide-react';
import { FloatingCard } from '../components/FloatingCard';
import ImageWithFallback from '../components/figma/ImageWithFallback';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const iconMap = {
  TrendingUp, BarChart3, Shield, FileText, DollarSign, Building2, Settings
};

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedService, setExpandedService] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    // Handle scrolling to specific service from URL hash
    const hash = window.location.hash.substring(1);
    if (hash && services.length > 0) {
      const element = document.getElementById(hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
      }
    }
  }, [services]);

  const fetchServices = async () => {
    try {
      const response = await fetch(`${API_URL}/api/services`);
      if (response.ok) {
        const data = await response.json();
        setServices(data);
      } else {
        setError('Failed to load services. Please try again later.');
      }
    } catch (error) {
      setError('Unable to connect to server. Please check if the backend is running.');
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  const displayServices = services.map(service => ({
    ...service,
    icon: iconMap[service.icon] || TrendingUp
  }));

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-32">
        <div className="text-center">
          <div className="text-2xl text-[#8A8A8A] mb-4">Loading services...</div>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#520052] mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-32">
        <div className="text-center max-w-md px-6">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-3xl font-light mb-4">Unable to Load Services</h2>
          <p className="text-lg text-[#8A8A8A] mb-6">{error}</p>
          <button
            onClick={fetchServices}
            className="bg-[#520052] text-white px-8 py-3 rounded hover:bg-[#6B0066] transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (services.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-32">
        <div className="text-center max-w-md px-6">
          <div className="text-6xl mb-4">📋</div>
          <h2 className="text-3xl font-light mb-4">No Services Available</h2>
          <p className="text-lg text-[#8A8A8A]">Please check back later or contact us for more information.</p>
        </div>
      </div>
    );
  }

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
            <h1 className="text-5xl sm:text-6xl lg:text-8xl tracking-tight mb-8 leading-[0.9] break-words">
              Comprehensive
              <br />
              <span style={{color:"#520052"}}>Financial</span>
              <br />
              Solutions
            </h1>
            <p className="text-2xl text-[#8A8A8A] leading-relaxed" style={{color:"#520052"}}>
              From strategic advisory to operational execution, we provide the full spectrum of
              financial and compliance services your business needs to thrive.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Service */}
      <section className="py-12 lg:py-20">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1758518730384-be3d205838e8"
                alt="Business partnership"
                className="w-full h-[600px] object-cover grayscale shadow-[0_20px_80px_rgba(0,0,0,0.12)]"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="order-1 lg:order-2"
            >
              <FloatingCard>
                <TrendingUp size={48} className="mb-6" />
                <h2 className="text-4xl lg:text-5xl tracking-tight mb-6" style={{color:"#520052"}}>
                  Strategic Financial Leadership
                </h2>
                <p className="text-xl text-[#8A8A8A] mb-8 leading-relaxed">
                  Our Fractional CFO service brings C-suite financial expertise without full-time cost.
                </p>

                <ul className="space-y-3 text-lg text-[#8A8A8A]">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-black rounded-full mt-2" />  
                    Financial modeling and forecasting
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-black rounded-full mt-2" />
                    Investor relations and board reporting
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-black rounded-full mt-2" />
                    Strategic planning and KPI development
                  </li>
                </ul>
              </FloatingCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-24 bg-[#F2F2F2]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-5xl mb-20">
            Our <span style={{color:"#520052"}}>Services</span>
          </motion.h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {displayServices.map((service, index) => {
              const IconComponent = service.icon;
              const isExpanded = expandedService === service._id;
              
              return (
                <motion.div
                  key={service._id || service.title}
                  id={service._id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="h-full scroll-mt-32"
                >
                  <FloatingCard className="group cursor-pointer h-full flex flex-col overflow-hidden">
                    <div className="flex flex-col gap-6 h-full">
                      <div className="w-16 h-16 bg-gradient-to-br from-[#C96AE0] via-[#520052] to-[#1A001A] flex items-center justify-center text-white shadow-[0_10px_30px_rgba(0,0,0,0.4)] group-hover:scale-110 transition-transform">
                        <IconComponent size={28} />
                      </div>

                      <div className="flex-1 flex flex-col">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-2xl lg:text-3xl tracking-tight" style={{color:"#520052"}}>{service.title}</h3>
                          <button
                            onClick={() => setExpandedService(isExpanded ? null : service._id)}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            aria-label={isExpanded ? 'Collapse details' : 'Expand details'}
                          >
                            {isExpanded ? (
                              <ChevronUp size={20} className="text-[#520052]" />
                            ) : (
                              <ChevronDown size={20} className="text-[#520052]" />
                            )}
                          </button>
                        </div>
                        
                        <p className="text-lg text-[#8A8A8A] mb-4 leading-relaxed">{service.description}</p>

                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="border-t border-gray-200 pt-4 mb-4">
                                <h4 className="text-lg font-medium mb-3" style={{color:"#520052"}}>Key Benefits:</h4>
                                <ul className="space-y-2 text-[#8A8A8A]">
                                  <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 bg-[#520052] rounded-full mt-2 flex-shrink-0" />
                                    Expert guidance tailored to your business needs
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 bg-[#520052] rounded-full mt-2 flex-shrink-0" />
                                    Compliance with latest regulations and standards
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 bg-[#520052] rounded-full mt-2 flex-shrink-0" />
                                    Cost-effective solutions for growing businesses
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 bg-[#520052] rounded-full mt-2 flex-shrink-0" />
                                    Ongoing support and consultation
                                  </li>
                                </ul>
                              </div>

                              <div className="border-t border-gray-200 pt-4">
                                <h4 className="text-lg font-medium mb-3" style={{color:"#520052"}}>What's Included:</h4>
                                <div className="grid grid-cols-1 gap-2">
                                  <div className="flex items-center gap-2 text-[#8A8A8A]">
                                    <span className="w-2 h-2 bg-green-500 rounded-full" />
                                    Initial consultation and assessment
                                  </div>
                                  <div className="flex items-center gap-2 text-[#8A8A8A]">
                                    <span className="w-2 h-2 bg-green-500 rounded-full" />
                                    Customized implementation plan
                                  </div>
                                  <div className="flex items-center gap-2 text-[#8A8A8A]">
                                    <span className="w-2 h-2 bg-green-500 rounded-full" />
                                    Regular progress reviews
                                  </div>
                                  <div className="flex items-center gap-2 text-[#8A8A8A]">
                                    <span className="w-2 h-2 bg-green-500 rounded-full" />
                                    Documentation and reporting
                                  </div>
                                </div>
                              </div>

                              <div className="mt-4 pt-4 border-t border-gray-200 flex gap-2">
                                <Link 
                                  to={`/services/${service._id}`}
                                  className="inline-flex items-center gap-2 bg-[#520052] text-white px-4 py-2 rounded hover:bg-[#6B0066] transition-colors text-sm"
                                >
                                  Learn More
                                  <TrendingUp size={16} />
                                </Link>
                                <Link 
                                  to="/contact" 
                                  className="inline-flex items-center gap-2 border border-[#520052] text-[#520052] px-4 py-2 rounded hover:bg-[#520052] hover:text-white transition-colors text-sm"
                                >
                                  Get Started
                                </Link>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {!isExpanded && (
                          <div className="mt-auto">
                            {service.features && service.features.length > 0 && (
                              <div className="grid grid-cols-2 gap-3 mb-4">
                                {service.features.slice(0, 4).map((feature) => (
                                  <div key={feature} className="flex items-center gap-2 text-[#8A8A8A]">
                                    <span className="w-2 h-2 bg-black rounded-full" />
                                    <span className="text-sm">{feature}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                            <Link 
                              to={`/services/${service._id}`}
                              className="inline-flex items-center gap-2 text-[#520052] hover:text-[#6B0066] transition-colors text-sm font-medium"
                            >
                              View Details
                              <TrendingUp size={16} />
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </FloatingCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-black text-white text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl lg:text-7xl mb-8">
            Let's Discuss Your <span style={{color:"#520052"}}>Financial Needs</span>
          </h2>
          <p className="text-xl text-[#8A8A8A] mb-12 max-w-2xl mx-auto">
            Schedule a consultation to explore how our services can accelerate your business growth.
          </p>
          <a href="/contact" className="bg-white text-black px-10 py-5 text-lg hover:bg-[#F2F2F2]">
            Schedule Consultation
          </a>
        </motion.div>
      </section>
    </div>
  );
}
