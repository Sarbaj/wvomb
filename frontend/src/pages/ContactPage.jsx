import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { FloatingCard } from '../components/FloatingCard';
import { useState, useEffect } from 'react';
import ImageWithFallback from '../components/figma/ImageWithFallback';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: '',
  });

  const [contactData, setContactData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchContactData();
  }, []);

  const fetchContactData = async () => {
    try {
      const response = await fetch(`${API_URL}/api/contact`);
      if (response.ok) {
        const data = await response.json();
        setContactData(data);
      } else {
        setError('Failed to load contact information.');
      }
    } catch (error) {
      setError('Unable to connect to server.');
      console.error('Error fetching contact:', error);
    } finally {
      setLoading(false);
    }
  };

  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch(`${API_URL}/api/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitSuccess(true);
        setFormData({
          name: '',
          email: '',
          company: '',
          service: '',
          message: '',
        });
        
        // Reset success message after 5 seconds
        setTimeout(() => setSubmitSuccess(false), 5000);
      } else {
        setSubmitError(data.message || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      setSubmitError('Unable to send message. Please check your connection.');
      console.error('Error submitting form:', error);
    } finally {
      setSubmitting(false);
    }
  };

  // Contact info from backend data
  const contactInfo = contactData ? [
    {
      icon: Mail,
      label: 'Email',
      value: contactData.email,
      href: `mailto:${contactData.email}`,
    },
    {
      icon: Phone,
      label: 'Phone',
      value: contactData.phone,
      href: `tel:${contactData.phone.replace(/\s/g, '')}`,
    },
    {
      icon: MapPin,
      label: 'Office',
      value: contactData.address.split(',').slice(0, 2).join(','),
      href: null,
    },
  ] : [];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-32">
        <div className="text-center">
          <div className="text-2xl text-[#8A8A8A] mb-4">Loading contact information...</div>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#520052] mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error || !contactData) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-32">
        <div className="text-center max-w-md px-6">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-3xl font-light mb-4">Unable to Load Contact Information</h2>
          <p className="text-lg text-[#8A8A8A] mb-6">{error || 'No contact data available'}</p>
          <button
            onClick={fetchContactData}
            className="bg-[#520052] text-white px-8 py-3 rounded hover:bg-[#6B0066] transition-colors"
          >
            Try Again
          </button>
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
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <h1 className="text-6xl lg:text-8xl tracking-tight mb-8 leading-[0.9]">
              Ready to Elevate
              <br />
              <span style={{color:"#520052"}}>Your Business</span>
            </h1>

            <p className="text-2xl text-[#8A8A8A] leading-relaxed" style={{color:"#520052"}}>
              Elevating your business performance with expert financial guidance and support. Get in
              touch today to discuss how WvOMB ADVISORS can help.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form + Info */}
      <section className="py-12 lg:py-20">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <FloatingCard>
                <h2 className="text-3xl lg:text-4xl tracking-tight mb-8">Send us a message</h2>

                {submitSuccess && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded">
                    <p className="text-green-800">✓ Message sent successfully! We'll get back to you soon.</p>
                  </div>
                )}

                {submitError && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded">
                    <p className="text-red-800">{submitError}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">

                  <div>
                    <label htmlFor="name" className="block text-sm tracking-wide mb-2 text-[#8A8A8A]">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-6 py-4 bg-[#F2F2F2] border-2 border-transparent focus:border-black focus:bg-white transition-all outline-none"
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm tracking-wide mb-2 text-[#8A8A8A]">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-6 py-4 bg-[#F2F2F2] border-2 border-transparent focus:border-black focus:bg-white transition-all outline-none"
                      placeholder="john@company.com"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm tracking-wide mb-2 text-[#8A8A8A]">
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-6 py-4 bg-[#F2F2F2] border-2 border-transparent focus:border-black focus:bg-white transition-all outline-none"
                      placeholder="Your Company"
                    />
                  </div>

                  <div>
                    <label htmlFor="service" className="block text-sm tracking-wide mb-2 text-[#8A8A8A]">
                      Service Interest
                    </label>
                    <select
                      id="service"
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-6 py-4 bg-[#F2F2F2] border-2 border-transparent focus:border-black focus:bg-white transition-all outline-none"
                      required
                    >
                      <option value="">Select a service</option>
                      <option value="fractional-cfo">Fractional CFO</option>
                      <option value="fundraising">Fundraising Support</option>
                      <option value="gst">GST Compliance</option>
                      <option value="income-tax">Income Tax Services</option>
                      <option value="debt-recovery">Debt Recovery</option>
                      <option value="sez">SEZ Setup & Compliance</option>
                      <option value="erp">ERP Implementation</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm tracking-wide mb-2 text-[#8A8A8A]">
                      Message
                    </label>
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows="6"
                      className="w-full px-6 py-4 bg-[#F2F2F2] border-2 border-transparent focus:border-black focus:bg-white transition-all outline-none resize-none"
                      placeholder="Tell us about your needs..."
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-black text-white px-8 py-5 text-lg hover:bg-[#1a1a1a] transition-colors flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? 'Sending...' : 'Send Message'}
                    {!submitting && <Send size={20} className="group-hover:translate-x-1 transition-transform" />}
                  </button>
                </form>
              </FloatingCard>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-3xl lg:text-4xl tracking-tight mb-8">Get in touch</h3>
                <p className="text-xl text-[#8A8A8A] leading-relaxed mb-12" style={{color:"#520052"}}>
                  Reach out through any of these channels, and we'll get back to you within 24 hours.
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  >
                    <FloatingCard className="group hover:bg-[#F2F2F2] transition-colors cursor-pointer">
                      <div className="flex items-start gap-6">
                        <div className="bg-black text-white p-4 group-hover:scale-110 transition-transform">
                          <item.icon size={24} />
                        </div>
                        <div>
                          <div className="text-sm tracking-wide text-[#8A8A8A] mb-2">
                            {item.label}
                          </div>

                          {item.href ? (
                            <a href={item.href} className="text-xl hover:text-[#8A8A8A] transition-colors">
                              {item.value}
                            </a>
                          ) : (
                            <div className="text-xl">{item.value}</div>
                          )}
                        </div>
                      </div>
                    </FloatingCard>
                  </motion.div>
                ))}
              </div>

              {/* Illustration */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="mt-12"
              >
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1670225597315-782633cfbd2a"
                  alt="Abstract geometric design"
                  className="w-full h-[400px] object-cover grayscale"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-24 lg:py-32 bg-[#F2F2F2]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl lg:text-5xl tracking-tight mb-6">
                Visit Our <span style={{color:"#520052"}}>Office</span>
              </h2>

              <p className="text-xl text-[#8A8A8A] leading-relaxed mb-8" style={{color:"#520052"}}>
                Located in the heart of Gujarat's business district, our office is designed for
                collaboration and innovation.
              </p>

              <div className="space-y-4 text-lg">
                <div>
                  <div className="text-[#8A8A8A] mb-1">Address</div>
                  <div>{contactData.address}</div>
                </div>

                <div>
                  <div className="text-[#8A8A8A] mb-1">Office Hours</div>
                  <div>Monday - Friday: 9:00 AM - 6:00 PM</div>
                 
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1695067438561-75492f7b6a9c"
                alt="Modern building"
                className="w-full h-[500px] object-cover grayscale shadow-[0_20px_80px_rgb(0,0,0,0.12)]"
              />
            </motion.div>

          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 lg:py-32 bg-black text-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">

          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-5xl lg:text-6xl tracking-tight mb-20 text-center"
          >
            Quick <span className="text-[#8A8A8A]" style={{color:"#520052"}}>Questions</span>
          </motion.h2>

          <div className="space-y-8">
            {[
              {
                q: 'What is your typical engagement model?',
                a: 'We offer flexible engagement models including project-based, retainer, and fractional arrangements.',
              },
              {
                q: 'How quickly can you start?',
                a: 'Most engagements begin within a week of consultation.',
              },
              {
                q: 'Do you work with startups?',
                a: 'Yes — from early-stage startups to enterprises.',
              }
            ].map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="border-t border-[#333] pt-8"
              >
                <h3 className="text-2xl mb-4">{faq.q}</h3>
                <p className="text-lg text-[#8A8A8A] leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
