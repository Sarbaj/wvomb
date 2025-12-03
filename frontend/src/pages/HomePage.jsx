import { color, motion } from "motion/react";
import { ArrowRight, TrendingUp, Shield, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import { FloatingCard } from "../components/FloatingCard";
import ImageWithFallback from "../components/figma/ImageWithFallback";
import ServicesPage from "./ServicesPage";
import ContactPage from "./ContactPage";

export default function HomePage() {
  const services = [
    {
      icon: TrendingUp,
      title: "Fractional CFO",
      description:
        "Strategic financial leadership tailored to your growth stage and business needs.",
      },
    {
      icon: BarChart3,
      title: "Fundraising",
      description:
        "Expert guidance through capital raising, investor relations, and deal structuring.",
      },
    {
      icon: Shield,
      title: "Compliance",
      description:
        "Comprehensive regulatory compliance, GST, income tax, and audit management.",
    },
  ];

  return (
      <>
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 lg:pt-48 pb-24 lg:pb-32 overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.8 }}
                className="mb-6 text-sm tracking-[0.2em] uppercase text-[#8A8A8A]" style={{color:"#520052"}}
              >
                WvOMB ADVISORS
              </motion.div>

              <motion.h1
                className="text-6xl lg:text-8xl xl:text-9xl tracking-tight mb-8 leading-[0.9]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }} 
              >
                Elevating Your
                <br />
                <span style={{color:"#520052"}}>Business</span>
                <br />
                Performance
              </motion.h1>

              <motion.p
                className="text-xl lg:text-2xl text-[#8A8A8A] mb-12 max-w-xl leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}style={{color:"#520052"}}
              >
                Elevating your business performance with expert financial guidance and support.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <Link
                  to="/services"
                  className="inline-flex items-center gap-3 bg-black text-white px-10 py-5 text-lg hover:bg-[#1a1a1a] transition-colors group"
                >
                  Our Services
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 1.2,
                delay: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative"
            >
              <div className="absolute inset-0 bg-[#F2F2F2] transform translate-x-8 translate-y-8 -z-10" />

              <ImageWithFallback
                src="https://images.unsplash.com/photo-1758630737900-a28682c5aa69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBidXNpbmVzcyUyMG9mZmljZXxlbnwxfHx8fDE3NjI5ODk2NTN8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Modern business office"
                className="w-full h-[600px] object-cover grayscale"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 lg:py-32 bg-[#F2F2F2] relative">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity:  1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            <h2 className="text-5xl lg:text-7xl tracking-tight mb-6">
              Our <span style={{color:"#520052"}}>Expertise</span>
            </h2>
            <p className="text-xl text-[#8A8A8A] max-w-2xl" style={{color:"#520052"}}>
              Comprehensive financial and operational solutions designed for modern businesses.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <motion.div
                key={service.title} 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <FloatingCard className="group cursor-pointer h-full flex flex-col">
                  <div className="flex flex-col gap-6 h-full">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#C96AE0] via-[#520052] to-[#1A001A] flex items-center justify-center text-white shadow-[0_10px_30px_rgba(0,0,0,0.4)] group-hover:scale-110 transition-transform duration-300">
                      {service.icon && <service.icon size={28} />}
                    </div>

                    <div className="flex-1 flex flex-col">
                      <h3 className="text-2xl lg:text-3xl mb-3 tracking-tight" style={{color:"#520052"}}>
                        {service.title}
                      </h3>
                      <p className="text-lg text-[#8A8A8A] leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </FloatingCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 lg:py-32 bg-black text-white relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-3 gap-12 lg:gap-20">
            {[
              
              { value: "₹5000M+", label: "Capital Raised" },
                  { value: "100 Years", label: "Team Combine Experience" },
                 { value: "25%", label: "Avg Cost Reduction" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="text-center"
              >
                <div className="text-6xl lg:text-8xl mb-4 tracking-tight" >{stat.value}</div>
                <div className="text-xl text-[#8A8A8A] tracking-wide" >{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-Action */}
      <section className="py-24 lg:py-32 bg-[#D9D9D9] relative">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl lg:text-7xl tracking-tight mb-8 leading-tight">
              Ready to Transform
              <br />
              Your Business?
            </h2>

            <p className="text-xl text-[#8A8A8A] mb-12 max-w-2xl mx-auto" style={{color:"#520052"}}>
              Let's discuss how we can help you achieve your financial and operational goals.
            </p>

            <Link
              to="/contact"
              className="inline-flex items-center gap-3 bg-black text-white px-10 py-5 text-lg hover:bg-[#1a1a1a] transition-colors group"
            >
              Get in Touch
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
    <ServicesPage/>
    <ContactPage/>
    </>
  );
}
