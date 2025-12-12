import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle, Star, Users, Clock } from 'lucide-react';
import { FloatingCard } from '../components/FloatingCard';
import ImageWithFallback from '../components/figma/ImageWithFallback';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const iconMap = {
  TrendingUp: () => import('lucide-react').then(mod => mod.TrendingUp),
  BarChart3: () => import('lucide-react').then(mod => mod.BarChart3),
  Shield: () => import('lucide-react').then(mod => mod.Shield),
  FileText: () => import('lucide-react').then(mod => mod.FileText),
  DollarSign: () => import('lucide-react').then(mod => mod.DollarSign),
  Building2: () => import('lucide-react').then(mod => mod.Building2),
  Settings: () => import('lucide-react').then(mod => mod.Settings)
};

export default function ServiceDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [IconComponent, setIconComponent] = useState(null);

  useEffect(() => {
    fetchService();
  }, [id]);

  useEffect(() => {
    if (service?.icon && iconMap[service.icon]) {
      iconMap[service.icon]().then(Icon => {
        setIconComponent(() => Icon);
      });
    }
    
    // Update document title for SEO
    if (service?.title) {
      document.title = `${service.title} - WVOMB Financial Services`;
    }
    
    return () => {
      document.title = 'WVOMB - Financial Advisory Services';
    };
  }, [service]);

  const fetchService = async () => {
    try {
      const response = await fetch(`${API_URL}/api/services/${id}`);
      if (response.ok) {
        const data = await response.json();
        setService(data);
      } else if (response.status === 404) {
        setError('Service not found');
      } else {
        setError('Failed to load service details');
      }
    } catch (error) {
      setError('Unable to connect to server');
      console.error('Error fetching service:', error);
    } finally {
      setLoading(false);
    }
  };



  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-32">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#520052] mx-auto mb-4"></div>
          <p className="text-[#8A8A8A]">Loading service details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-32">
        <div className="text-center max-w-md px-6">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-3xl font-light mb-4">Service Not Available</h2>
          <p className="text-lg text-[#8A8A8A] mb-6">{error}</p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => navigate('/services')}
              className="bg-[#520052] text-white px-6 py-3 rounded hover:bg-[#6B0066] transition-colors"
            >
              View All Services
            </button>
            <button
              onClick={() => navigate(-1)}
              className="border border-[#E5E5E5] px-6 py-3 rounded hover:bg-[#F2F2F2] transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-32">
      {/* Breadcrumb */}
      <section className="py-6 border-b border-[#F2F2F2]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-2 text-sm text-[#8A8A8A]">
            <Link to="/" className="hover:text-[#520052] transition-colors">Home</Link>
            <span>/</span>
            <Link to="/services" className="hover:text-[#520052] transition-colors">Services</Link>
            <span>/</span>
            <span className="text-black">{service?.title}</span>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="py-12 lg:py-20">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Link
                to="/services"
                className="inline-flex items-center gap-2 text-[#8A8A8A] hover:text-[#520052] transition-colors mb-6"
              >
                <ArrowLeft size={20} />
                Back to Services
              </Link>

              <div className="flex items-center gap-4 mb-6">
                {IconComponent && (
                  <div className="w-16 h-16 bg-gradient-to-br from-[#C96AE0] via-[#520052] to-[#1A001A] flex items-center justify-center text-white shadow-[0_10px_30px_rgba(0,0,0,0.4)]">
                    <IconComponent size={28} />
                  </div>
                )}
                <div>
                  <h1 className="text-4xl lg:text-6xl tracking-tight mb-2" style={{color:"#520052"}}>
                    {service?.title}
                  </h1>
                  <div className="flex items-center gap-4 text-sm text-[#8A8A8A]">
                    <div className="flex items-center gap-1">
                      <Star className="fill-yellow-400 text-yellow-400" size={16} />
                      <span>Professional Service</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users size={16} />
                      <span>Expert Team</span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-xl text-[#8A8A8A] leading-relaxed mb-8">
                {service?.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  className="bg-[#520052] text-white px-8 py-4 rounded hover:bg-[#6B0066] transition-colors text-center"
                >
                  Get Started Today
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43"
                alt={`${service?.title} service`}
                className="w-full h-[500px] object-cover grayscale shadow-[0_20px_80px_rgba(0,0,0,0.12)]"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-20 bg-[#F2F2F2]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <FloatingCard className="mb-8">
                  <h2 className="text-3xl mb-6" style={{color:"#520052"}}>What We Offer</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-xl font-medium mb-4">Key Benefits</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={16} />
                          <span className="text-[#8A8A8A]">Expert guidance tailored to your business needs</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={16} />
                          <span className="text-[#8A8A8A]">Compliance with latest regulations and standards</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={16} />
                          <span className="text-[#8A8A8A]">Cost-effective solutions for growing businesses</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={16} />
                          <span className="text-[#8A8A8A]">Ongoing support and consultation</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-medium mb-4">What's Included</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <CheckCircle className="text-[#520052] mt-1 flex-shrink-0" size={16} />
                          <span className="text-[#8A8A8A]">Initial consultation and assessment</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle className="text-[#520052] mt-1 flex-shrink-0" size={16} />
                          <span className="text-[#8A8A8A]">Customized implementation plan</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle className="text-[#520052] mt-1 flex-shrink-0" size={16} />
                          <span className="text-[#8A8A8A]">Regular progress reviews</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle className="text-[#520052] mt-1 flex-shrink-0" size={16} />
                          <span className="text-[#8A8A8A]">Documentation and reporting</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </FloatingCard>

                {service?.features && service.features.length > 0 && (
                  <FloatingCard className="mb-8">
                    <h2 className="text-3xl mb-6" style={{color:"#520052"}}>Service Features</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                      {service.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-3 p-4 bg-[#F9F9F9] rounded">
                          <CheckCircle className="text-[#520052] flex-shrink-0" size={20} />
                          <span className="text-[#8A8A8A]">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </FloatingCard>
                )}

                <FloatingCard>
                  <h2 className="text-3xl mb-6" style={{color:"#520052"}}>Our Process</h2>
                  <div className="space-y-6">
                    {[
                      {
                        step: "1",
                        title: "Initial Consultation",
                        description: "We start with a comprehensive discussion to understand your specific needs and challenges."
                      },
                      {
                        step: "2",
                        title: "Assessment & Planning",
                        description: "Our experts analyze your current situation and develop a customized strategy."
                      },
                      {
                        step: "3",
                        title: "Implementation",
                        description: "We execute the plan with precision, keeping you informed at every step."
                      },
                      {
                        step: "4",
                        title: "Ongoing Support",
                        description: "Continuous monitoring and support to ensure long-term success."
                      }
                    ].map((process, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="w-12 h-12 bg-[#520052] text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                          {process.step}
                        </div>
                        <div>
                          <h3 className="text-xl font-medium mb-2">{process.title}</h3>
                          <p className="text-[#8A8A8A]">{process.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </FloatingCard>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-6"
              >


                {/* Quick Info */}
                <FloatingCard>
                  <h3 className="text-xl mb-4" style={{color:"#520052"}}>Service Info</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Clock className="text-[#520052]" size={20} />
                      <div>
                        <p className="font-medium">Response Time</p>
                        <p className="text-sm text-[#8A8A8A]">Within 24 hours</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="text-[#520052]" size={20} />
                      <div>
                        <p className="font-medium">Expert Team</p>
                        <p className="text-sm text-[#8A8A8A]">Certified professionals</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="text-[#520052]" size={20} />
                      <div>
                        <p className="font-medium">Guarantee</p>
                        <p className="text-sm text-[#8A8A8A]">100% satisfaction</p>
                      </div>
                    </div>
                  </div>
                </FloatingCard>
              </motion.div>
            </div>
          </div>
        </div>
      </section>



      {/* CTA Section */}
      <section className="py-20 bg-black text-white text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl lg:text-6xl mb-6">
            Ready to Get <span style={{color:"#520052"}}>Started?</span>
          </h2>
          <p className="text-xl text-[#8A8A8A] mb-8 max-w-2xl mx-auto">
            Let's discuss how our {service?.title.toLowerCase()} can help accelerate your business growth.
          </p>
          <Link
            to="/contact"
            className="bg-white text-black px-10 py-5 text-lg hover:bg-[#F2F2F2] transition-colors"
          >
            Schedule Consultation
          </Link>
        </motion.div>
      </section>
    </div>
  );
}