import { motion } from 'motion/react';
import { useState } from 'react';
import { Send, User, DollarSign, Target, FileText, Phone, Mail } from 'lucide-react';
import { FloatingCard } from '../components/FloatingCard';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function BuyBusinessPage() {
  const [formData, setFormData] = useState({
    investorName: '',
    investmentAmount: '',
    preferredSector: '',
    otherConditions: '',
    contactNumber: '',
    email: '',
    additionalInfo: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError('');
    setSubmitSuccess(false);

    try {
      const response = await fetch(`${API_URL}/api/business/buy`, {
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
          investorName: '',
          investmentAmount: '',
          preferredSector: '',
          otherConditions: '',
          contactNumber: '',
          email: '',
          additionalInfo: ''
        });
        
        setTimeout(() => setSubmitSuccess(false), 5000);
      } else {
        setSubmitError(data.message || 'Failed to submit. Please try again.');
      }
    } catch (error) {
      setSubmitError('Unable to submit. Please check your connection.');
      console.error('Error submitting form:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const sectors = [
    'Any Sector',
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
  ];

  return (
    <div className="min-h-screen bg-white pt-32">
      {/* Hero Section */}
      <section className="py-12 md:py-16 lg:py-24 relative">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-1"
            >
              <div className="inline-flex items-center gap-2 bg-[#520052]/5 px-3 md:px-4 py-2 rounded-full mb-4 md:mb-6">
                <div className="w-2 h-2 bg-[#520052] rounded-full"></div>
                <span className="text-xs md:text-sm font-medium text-[#520052]">Investment Platform</span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light tracking-tight mb-4 md:mb-6 leading-tight">
                Buy a
                <br />
                <span className="text-[#520052]">Business</span>
              </h1>

              <p className="text-base md:text-lg lg:text-xl text-[#8A8A8A] leading-relaxed mb-6 md:mb-8">
                Discover investment opportunities and acquire established businesses. Share your investment criteria and let us match you with the perfect business opportunity.
              </p>

              {/* Key Features */}
              <div className="space-y-3 md:space-y-4">
                {[
                  'Curated business opportunities',
                  'Complete due diligence support',
                  'End-to-end transaction assistance'
                ].map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-4 h-4 md:w-5 md:h-5 bg-[#520052] rounded-sm flex items-center justify-center flex-shrink-0">
                      <svg className="w-2.5 h-2.5 md:w-3 md:h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-sm md:text-base text-gray-700">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Visual */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative order-2 lg:order-2"
            >
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl md:rounded-2xl p-6 md:p-8 lg:p-12">
                <div className="space-y-4 md:space-y-6">
                  {/* Key Benefits */}
                  <div className="text-center mb-6 md:mb-8">
                    <h3 className="text-lg md:text-xl font-medium text-gray-900 mb-3 md:mb-4">Investment Benefits</h3>
                    <div className="grid grid-cols-1 gap-3 md:gap-4">
                      <div className="flex items-center gap-2 md:gap-3 text-left">
                        <div className="w-2 h-2 bg-[#520052] rounded-full flex-shrink-0"></div>
                        <span className="text-xs md:text-sm text-gray-600">Curated opportunities</span>
                      </div>
                      <div className="flex items-center gap-2 md:gap-3 text-left">
                        <div className="w-2 h-2 bg-[#520052] rounded-full flex-shrink-0"></div>
                        <span className="text-xs md:text-sm text-gray-600">Due diligence support</span>
                      </div>
                      <div className="flex items-center gap-2 md:gap-3 text-left">
                        <div className="w-2 h-2 bg-[#520052] rounded-full flex-shrink-0"></div>
                        <span className="text-xs md:text-sm text-gray-600">Transaction assistance</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Process Steps */}
                  <div className="space-y-3 md:space-y-4 pt-4 md:pt-6 border-t border-gray-200">
                    {[
                      { step: '01', title: 'Set Criteria', desc: 'Define your investment preferences' },
                      { step: '02', title: 'Review Deals', desc: 'Access curated opportunities' },
                      { step: '03', title: 'Acquire', desc: 'Complete your investment' }
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3 md:gap-4">
                        <div className="w-7 h-7 md:w-8 md:h-8 bg-[#520052] text-white rounded-lg flex items-center justify-center text-xs md:text-sm font-medium flex-shrink-0">
                          {item.step}
                        </div>
                        <div className="min-w-0">
                          <div className="font-medium text-gray-900 mb-1 text-sm md:text-base">{item.title}</div>
                          <div className="text-xs md:text-sm text-gray-600 break-words">{item.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-6 lg:py-12">
        <div className="max-w-3xl mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <FloatingCard>
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <div className="bg-[#520052] text-white p-2 rounded-lg">
                  <Target size={20} />
                </div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl tracking-tight">Investment Preferences</h2>
              </div>

              {submitSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="mb-6 p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-400 rounded-lg shadow-lg relative overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-emerald-400/10"
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                  
                  <div className="relative flex items-start gap-4">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                      className="flex-shrink-0 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
                    >
                      <motion.svg
                        className="w-7 h-7 text-white"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                      >
                        <path d="M5 13l4 4L19 7" />
                      </motion.svg>
                    </motion.div>
                    
                    <div className="flex-1">
                      <motion.h3
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-xl font-semibold text-green-800 mb-1"
                      >
                        Registration Successful!
                      </motion.h3>
                      <motion.p
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-green-700 text-sm leading-relaxed"
                      >
                        Thank you for registering your investment preferences. We'll match you with suitable business opportunities and contact you within 48 hours.
                      </motion.p>
                    </div>
                  </div>
                  
                  <motion.div
                    className="absolute bottom-0 left-0 h-1 bg-green-500"
                    initial={{ width: "100%" }}
                    animate={{ width: "0%" }}
                    transition={{ duration: 5, ease: "linear" }}
                  />
                </motion.div>
              )}

              {submitError && (
                <motion.div
                  initial={{ opacity: 0, y: -20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="mb-6 p-5 bg-gradient-to-r from-red-50 to-rose-50 border-2 border-red-400 rounded-lg shadow-lg"
                >
                  <div className="flex items-start gap-3">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                      className="flex-shrink-0 w-10 h-10 bg-red-500 rounded-full flex items-center justify-center"
                    >
                      <span className="text-white text-xl font-bold">!</span>
                    </motion.div>
                    <div>
                      <h3 className="text-lg font-semibold text-red-800 mb-1">Error Submitting Form</h3>
                      <p className="text-red-700 text-sm">{submitError}</p>
                    </div>
                  </div>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
                <div className="grid md:grid-cols-2 gap-3 md:gap-4">
                  <div>
                    <label htmlFor="investorName" className="block text-xs sm:text-sm tracking-wide mb-2 text-[#8A8A8A]">
                      Investor Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#8A8A8A]" size={18} />
                      <input
                        type="text"
                        id="investorName"
                        value={formData.investorName}
                        onChange={(e) => setFormData({ ...formData, investorName: e.target.value })}
                        className="w-full pl-12 pr-4 py-2 md:py-3 bg-[#F2F2F2] border-2 border-transparent focus:border-[#520052] focus:bg-white transition-all outline-none text-sm md:text-base"
                        placeholder="Your Full Name"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="investmentAmount" className="block text-xs sm:text-sm tracking-wide mb-2 text-[#8A8A8A]">
                      Available Investment Amount *
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#8A8A8A]" size={18} />
                      <input
                        type="text"
                        id="investmentAmount"
                        value={formData.investmentAmount}
                        onChange={(e) => setFormData({ ...formData, investmentAmount: e.target.value })}
                        className="w-full pl-12 pr-4 py-2 md:py-3 bg-[#F2F2F2] border-2 border-transparent focus:border-[#520052] focus:bg-white transition-all outline-none text-sm md:text-base"
                        placeholder="₹ 5 Crores"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-3 md:gap-4">
                  <div>
                    <label htmlFor="preferredSector" className="block text-xs sm:text-sm tracking-wide mb-2 text-[#8A8A8A]">
                      Preferred Sector
                    </label>
                    <div className="relative">
                      <Target className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#8A8A8A]" size={18} />
                      <select
                        id="preferredSector"
                        value={formData.preferredSector}
                        onChange={(e) => setFormData({ ...formData, preferredSector: e.target.value })}
                        className="w-full pl-12 pr-4 py-3 md:py-4 bg-[#F2F2F2] border-2 border-transparent focus:border-[#520052] focus:bg-white transition-all outline-none text-sm md:text-base"
                      >
                        <option value="">Select Preferred Sector</option>
                        {sectors.map(sector => (
                          <option key={sector} value={sector}>{sector}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contactNumber" className="block text-xs sm:text-sm tracking-wide mb-2 text-[#8A8A8A]">
                      Contact Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#8A8A8A]" size={18} />
                      <input
                        type="tel"
                        id="contactNumber"
                        value={formData.contactNumber}
                        onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                        className="w-full pl-12 pr-4 py-3 md:py-4 bg-[#F2F2F2] border-2 border-transparent focus:border-[#520052] focus:bg-white transition-all outline-none text-sm md:text-base"
                        placeholder="+91 98765 43210"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs sm:text-sm tracking-wide mb-2 text-[#8A8A8A]">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#8A8A8A]" size={18} />
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 md:py-4 bg-[#F2F2F2] border-2 border-transparent focus:border-[#520052] focus:bg-white transition-all outline-none text-sm md:text-base"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="otherConditions" className="block text-xs sm:text-sm tracking-wide mb-2 text-[#8A8A8A]">
                    Other Conditions or Requirements
                  </label>
                  <div className="relative">
                    <FileText className="absolute left-4 top-4 text-[#8A8A8A]" size={18} />
                    <textarea
                      id="otherConditions"
                      value={formData.otherConditions}
                      onChange={(e) => setFormData({ ...formData, otherConditions: e.target.value })}
                      rows="4"
                      className="w-full pl-12 pr-4 py-2 md:py-3 bg-[#F2F2F2] border-2 border-transparent focus:border-[#520052] focus:bg-white transition-all outline-none resize-none text-sm md:text-base"
                      placeholder="Specify any conditions like minimum revenue, geographic location, management retention, etc."
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="additionalInfo" className="block text-xs sm:text-sm tracking-wide mb-2 text-[#8A8A8A]">
                    Additional Information
                  </label>
                  <textarea
                    id="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                    rows="4"
                    className="w-full px-4 py-2 md:py-3 bg-[#F2F2F2] border-2 border-transparent focus:border-[#520052] focus:bg-white transition-all outline-none resize-none text-sm md:text-base"
                    placeholder="Tell us about your investment experience, timeline, or any specific preferences..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#520052] text-white px-4 py-3 md:px-6 md:py-4 text-sm md:text-base hover:bg-[#6B006B] transition-colors flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Submitting...' : 'Register Investment Interest'}
                  {!submitting && <Send size={20} className="group-hover:translate-x-1 transition-transform" />}
                </button>
              </form>
            </FloatingCard>
          </motion.div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-20 lg:py-32 bg-[#F8F9FA]">
        <div className="max-w-6xl mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight mb-4">
              Investment <span className="text-[#520052]">Advantages</span>
            </h2>
            <div className="w-16 h-px bg-[#520052] mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                title: 'Curated Opportunities',
                description: 'Access pre-screened, profitable businesses with verified financials and growth potential.'
              },
              {
                title: 'Due Diligence Support',
                description: 'Our experts assist with financial analysis, legal review, and risk assessment.'
              },
              {
                title: 'Seamless Process',
                description: 'From initial matching to deal closure, we facilitate every step of the acquisition.'
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 bg-[#520052] rounded-lg mx-auto mb-6 flex items-center justify-center">
                  <div className="w-6 h-6 bg-white rounded-sm"></div>
                </div>
                <h3 className="text-xl font-medium mb-4 text-gray-900">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}