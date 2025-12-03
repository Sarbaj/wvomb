import { motion } from 'motion/react';
import { Award, Users, Globe, Target } from 'lucide-react';
import { FloatingCard } from "../components/FloatingCard";
import ImageWithFallback from '../components/figma/ImageWithFallback';

export default function AboutPage() {
  const timeline = [
    {
      year: '2024',
      title: 'Expansion & Innovation',
      description: 'Launched advanced ERP implementation and SEZ consulting services.',
    },
    {
      year: '2022',
      title: 'Market Leadership',
      description: 'Became recognized leaders in fractional CFO services for startups.',
    },
    {
      year: '2020',
      title: 'Digital Transformation',
      description: 'Pioneered remote financial advisory during the global shift.',
    },
    {
      year: '2018',
      title: 'Foundation',
      description: 'WvOMB Advisors established with a vision for excellence.',
    }
  ];

  const values = [
    {
      icon: Target,
      title: 'Precision',
      description: 'Every decision backed by data, every strategy built on solid analysis.',
    },
    {
      icon: Users,
      title: 'Partnership',
      description: 'We succeed when you succeed. Your growth is our mission.',
    },
    {
      icon: Globe,
      title: 'Innovation',
      description: 'Modern solutions for modern challenges in an evolving marketplace.',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Uncompromising quality in every engagement, every deliverable.',
    }
  ];

  return (
    <div className="min-h-screen bg-white pt-32">

      {/* Hero Section */}
      <section className="py-12 lg:py-20">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="text-6xl lg:text-8xl tracking-tight mb-8 leading-[0.9]">
                Building the
                <br />
                <span className="text-[#8A8A8A]" style={{color:"#520052"}}>Future of</span>
                <br />
                Finance
              </h1>

              <p className="text-2xl text-[#8A8A8A] leading-relaxed" style={{color:"#520052"}}  >
                We are a team of financial strategists, compliance experts, and business architects
                committed to transforming how companies manage their financial operations.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative lg:ml-auto"
              style={{ maxWidth: '500px' }}
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1758518732175-5d608ba3abdf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                alt="Professional team"
                className="w-full h-[700px] object-cover grayscale shadow-[0_20px_80px_rgba(0,0,0,0.12)]"
              />
            </motion.div>

          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 lg:py-32 bg-[#F2F2F2]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-20 items-start">

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl lg:text-6xl tracking-tight mb-8">
                Our <span className="text-[#8A8A8A]" style={{color:"#520052"}}>Story</span>
              </h2>

              <div className="space-y-6 text-xl text-[#8A8A8A] leading-relaxed" style={{color:"#520052"}}>
                <p>
                  Founded on the principle that every business deserves access to world-class
                  financial expertise, WvOMB Advisors has grown from a small consultancy to a
                  trusted partner for companies across industries.
                </p>
                <p>
                  We bridge the gap between traditional financial services and the dynamic needs of
                  modern businesses...
                </p>
                <p>
                  Today, we serve startups, scale-ups, and established enterprises...
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-white transform -translate-x-8 translate-y-8" />

              <ImageWithFallback
                src="https://images.unsplash.com/photo-1571741699053-2d078c8f282a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                alt="Corporate workspace"
                className="relative w-full h-[500px] object-cover grayscale"
              />
            </motion.div>

          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-5xl lg:text-6xl tracking-tight mb-20 text-center"
          >
            Our <span className="text-[#8A8A8A]" style={{color:"#520052"}}>Journey</span>
          </motion.h2>

          <div className="space-y-12">
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -80 : 80 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                style={{
                  marginLeft: index % 2 === 0 ? '0' : 'auto',
                  maxWidth: '800px'
                }}
              >
                <FloatingCard>
                  <div className="flex items-start gap-8">
                    <div className="text-6xl tracking-tight text-[#D9D9D9] min-w-[120px]" style={{color:"#520052"}}>
                      {item.year}
                    </div>

                    <div className="flex-1 pt-2">
                      <h3 className="text-3xl mb-3 tracking-tight">{item.title}</h3>
                      <p className="text-xl text-[#8A8A8A] leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                  </div>
                </FloatingCard>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Values */}
      <section className="py-24 lg:py-32 bg-black text-white">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">

          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-5xl lg:text-6xl tracking-tight mb-20"
          >
            Our <span className="text-[#8A8A8A]" style={{color:"#520052"}}>Values</span>
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-[#1a1a1a] p-10 lg:p-12 hover:bg-[#2a2a2a] transition-colors group"
              >
                <value.icon
                  size={48}
                  className="mb-6 text-white group-hover:scale-110 transition-transform"
                />

                <h3 className="text-3xl mb-4 tracking-tight">{value.title}</h3>

                <p className="text-xl text-[#8A8A8A] leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
