import { motion } from "motion/react";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { FloatingCard } from "../components/FloatingCard";
import ImageWithFallback from "../components/figma/ImageWithFallback";

export default function InsightsPage() {
  const caseStudies = [
    {
      category: "Fundraising",
      title: "Series A Success: FinTech Startup Raises ₹50M",
      description:
        "How strategic positioning and comprehensive financial modeling helped a B2B FinTech startup secure Series A funding from top-tier investors.",
      image:
        "https://images.unsplash.com/photo-1758518732175-5d608ba3abdf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB0ZWFtJTIwbWVldGluZ3xlbnwxfHx8fDE3NjMwMTU0NDR8MA&ixlib=rb-4.1.0&q=80&w=1080",
      date: "Nov 2024",
      readTime: "8 min read",
    },
    {
      category: "Fractional CFO",
      title: "Scaling Operations: E-commerce Growth Story",
      description:
        "Implementing robust financial controls and forecasting systems that enabled a D2C brand to scale from ₹5Cr to ₹50Cr in 18 months.",
      image:
        "https://images.unsplash.com/photo-1758873269811-4e62e346b4b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHN0cmF0ZWd5JTIwcGxhbm5pbmd8ZW58MXx8fHwxNzYzMDM0NjI0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      date: "Oct 2024",
      readTime: "6 min read",
    },
    {
      category: "Compliance",
      title: "GST Optimization: Manufacturing Case Study",
      description:
        "Comprehensive GST restructuring that resulted in 15% reduction in tax liability while maintaining full compliance for a mid-sized manufacturer.",
      image:
        "https://images.unsplash.com/photo-1744782211816-c5224434614f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBjaGFydHMlMjBkYXRhfGVufDF8fHx8MTc2MzAxNDQ4N3ww&ixlib=rb-4.1.0&q=80&w=1080",
      date: "Sep 2024",
      readTime: "7 min read",
    },
    {
      category: "ERP Implementation",
      title: "Digital Transformation: Streamlining Operations",
      description:
        "End-to-end ERP implementation for a multi-location retail chain, reducing operational costs by 25% and improving data visibility.",
      image:
        "https://images.unsplash.com/photo-1571741699053-2d078c8f282a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjB3b3Jrc3BhY2UlMjBtaW5pbWFsfGVufDF8fHx8MTc2MzAxMDgzN3ww&ixlib=rb-4.1.0&q=80&w=1080",
      date: "Aug 2024",
      readTime: "10 min read",
    },
    {
      category: "SEZ Setup",
      title: "Export Excellence: SEZ Success Story",
      description:
        "Guiding an IT services company through SEZ registration and compliance, unlocking significant tax benefits and export advantages.",
      image:
        "https://images.unsplash.com/photo-1695067438561-75492f7b6a9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmUlMjBidWlsZGluZ3xlbnwxfHx8fDE3NjMwNjU2ODh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      date: "Jul 2024",
      readTime: "9 min read",
    },
  ];

  return (
    <div className="min-h-screen bg-white pt-32">
      {/* HERO */}
      <section className="py-12 lg:py-20">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-4xl"
          >
            <h1 className="text-6xl lg:text-8xl tracking-tight mb-8 leading-[0.9]">
              Case Studies <br />
              <span className="text-[#8A8A8A]" style={{color:"#520052"}}>&</span> Insights
            </h1>
            <p className="text-2xl text-[#8A8A8A] leading-relaxed" style={{color:"#520052"}}>
              Real stories of transformation, growth, and success.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="py-12 lg:py-20 bg-[#F2F2F2]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative group cursor-pointer"
          >
            <div className="relative h-[600px] overflow-hidden">
              <ImageWithFallback
                src={caseStudies[0].image}
                alt={caseStudies[0].title}
                className="w-full h-full object-cover grayscale group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-12 text-white">
                <div className="max-w-3xl">
                  <div className="text-sm tracking-widest text-[#D9D9D9] mb-4">
                    FEATURED
                  </div>
                  <h2 className="text-4xl lg:text-6xl mb-6 leading-tight">
                    {caseStudies[0].title}
                  </h2>
                  <p className="text-xl text-[#D9D9D9] mb-8">
                    {caseStudies[0].description}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MORE STORIES */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-5xl lg:text-6xl mb-20"
          >
            More <span className="text-[#8A8A8A]" style={{color:"#520052"}}>Stories</span>
          </motion.h2>

          <div className="space-y-12">
            {caseStudies.slice(1).map((study, index) => (
              <motion.div
                key={study.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -80 : 80 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <FloatingCard className="group cursor-pointer">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <ImageWithFallback
                        src={study.image}
                        alt={study.title}
                        className="w-full h-[350px] object-cover grayscale group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div>
                      <div className="text-xs tracking-widest text-[#8A8A8A] mb-4">
                        {study.category.toUpperCase()}
                      </div>
                      <h3 className="text-3xl lg:text-4xl mb-4"style={{color:"#520052"}}>
                        {study.title}
                      </h3>
                      <p className="text-lg text-[#8A8A8A] mb-6">
                        {study.description}
                      </p>

                      <button className="inline-flex items-center gap-2 text-black hover:gap-3 transition-all group" style={{color:"#520052"}}>
                        Read Case Study <ArrowRight size={18} />
                      </button>
                    </div>
                  </div>
                </FloatingCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-24 lg:py-32 bg-black text-white">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-5xl lg:text-6xl mb-6">
            Impact by <span className="text-[#8A8A8A]" style={{color:"#520052"}}>Numbers</span>
          </h2>

          <div className="grid md:grid-cols-4 gap-12 mt-16">
            {[
              { value: "₹5000M+", label: "Capital Raised" },
           
              { value: "100 Years", label: "Team Combine Experience" },
              { value: "25%", label: "Avg Cost Reduction" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-5xl lg:text-6xl mb-4">{s.value}</div>
                <div className="text-lg text-[#8A8A8A]">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32 bg-[#D9D9D9] text-center">
        <h2 className="text-5xl lg:text-7xl mb-8">
          Ready to Write Your <br />
          <span className="text-[#8A8A8A]" style={{color:"#520052"}}>Success Story?</span>
        </h2>
        <p className="text-xl text-[#8A8A8A] mb-12">
          Let's discuss how we can help you achieve similar results.
        </p>

        <a
          href="/contact"
          className="inline-flex items-center gap-3 bg-black text-white px-10 py-5 text-lg hover:bg-[#1a1a1a]"
        >
          Start Your Journey <ArrowRight size={20} />
        </a>
      </section>
    </div>
  );
}
