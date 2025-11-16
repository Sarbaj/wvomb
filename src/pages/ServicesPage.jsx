import { motion } from 'motion/react';
import { TrendingUp, BarChart3, Shield, FileText, DollarSign, Building2, Settings } from 'lucide-react';
import { FloatingCard } from '../components/FloatingCard';
import ImageWithFallback from '../components/figma/ImageWithFallback';

export default function ServicesPage() {
  const services = [
    {
      icon: TrendingUp,
      title: 'Fractional CFO Services',
      description:
        'Strategic financial leadership without the full-time commitment. Get expert CFO guidance tailored to your business stage and growth objectives.',
      features: ['Financial Strategy', 'Cash Flow Management', 'Board Reporting', 'KPI Development'],
    },
    {
      icon: BarChart3,
      title: 'Fundraising Support',
      description:
        'Navigate the complex world of capital raising with confidence. From pitch deck creation to investor negotiations and deal closure.',
      features: ['Pitch Deck Design', 'Investor Targeting', 'Due Diligence', 'Valuation Analysis'],
    },
    {
      icon: Shield,
      title: 'GST Compliance',
      description:
        'Comprehensive GST advisory and compliance management. Stay ahead of regulatory changes while optimizing your tax position.',
      features: ['GST Registration', 'Return Filing', 'Input Credit Optimization', 'Audit Support'],
    },
    {
      icon: FileText,
      title: 'Income Tax Services',
      description:
        'End-to-end income tax planning and compliance for individuals and businesses. Minimize liability while ensuring full regulatory adherence.',
      features: ['Tax Planning', 'Return Preparation', 'Assessment Support', 'Advance Tax Advisory'],
    },
    {
      icon: DollarSign,
      title: 'Debt Recovery',
      description:
        'Professional debt recovery services that protect relationships while securing your receivables through strategic negotiation.',
      features: ['Debtor Analysis', 'Collection Strategy', 'Legal Coordination', 'Settlement Negotiation'],
    },
    {
      icon: Building2,
      title: 'SEZ Setup & Compliance',
      description:
        'Complete support for Special Economic Zone establishment and ongoing compliance management for export-oriented businesses.',
      features: ['SEZ Registration', 'Compliance Management', 'Benefit Optimization', 'Annual Reporting'],
    },
    {
      icon: Settings,
      title: 'ERP Implementation',
      description:
        'Streamline operations with tailored ERP solutions. From vendor selection to implementation and training for seamless adoption.',
      features: ['Needs Assessment', 'Vendor Selection', 'Implementation Support', 'User Training'],
    },
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
              Comprehensive
              <br />
              <span style={{color:"#520052"}}>Financial</span>
              <br />
              Solutions
            </h1>
            <p className="text-2xl text-[#8A8A8A] leading-relaxed">
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
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <FloatingCard className="group cursor-pointer h-full flex flex-col">
                  <div className="flex flex-col gap-6 h-full">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#C96AE0] via-[#520052] to-[#1A001A] flex items-center justify-center text-white shadow-[0_10px_30px_rgba(0,0,0,0.4)] group-hover:scale-110 transition-transform">
                      <service.icon size={28} />
                    </div>

                    <div className="flex-1 flex flex-col">
                      <h3 className="text-2xl lg:text-3xl mb-3 tracking-tight" style={{color:"#520052"}}>{service.title}</h3>
                      <p className="text-lg text-[#8A8A8A] mb-4 leading-relaxed">{service.description}</p>

                      <div className="grid grid-cols-2 gap-3 mt-auto">
                        {service.features.map((feature) => (
                          <div key={feature} className="flex items-center gap-2 text-[#8A8A8A]">
                            <span className="w-2 h-2 bg-black rounded-full" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </FloatingCard>
              </motion.div>
            ))}
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
