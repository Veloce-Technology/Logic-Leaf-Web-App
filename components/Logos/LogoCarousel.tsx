"use client";
import { motion } from "framer-motion";
import { LOGO_LIST } from "../../constants/SiteConstants";

export default function LogoCarousel() {
  // Duplicate for seamless scroll
  const items = [...LOGO_LIST, ...LOGO_LIST, ...LOGO_LIST, ...LOGO_LIST];

  return (
    <section className="relative py-32 bg-black overflow-hidden font-dm">
      {/* Background Section Glow */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-green-primary/20 to-transparent" />
      
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-16 text-center relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 10 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="inline-block px-4 py-1.5 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-md mb-6"
        >
          <span className="text-[10px] font-bold text-green-primary uppercase tracking-[0.4em]">
            Strategic Partners
          </span>
        </motion.div>
        <motion.h2 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ delay: 0.1 }}
           className="text-4xl md:text-5xl font-medium text-white tracking-tighter"
        >
          Powering the world's <br/> most ambitious teams.
        </motion.h2>
      </div>

      <div className="relative z-10 flex overflow-hidden">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ 
            duration: 40, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="flex gap-6 py-10 whitespace-nowrap"
        >
          {items.map((logo, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10, scale: 1.05 }}
              className="flex items-center justify-center px-12 py-8 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-sm transition-all duration-500 hover:bg-green-primary/5 hover:border-green-primary/30 group"
            >
              <div className="text-3xl md:text-5xl font-black text-white/30 group-hover:text-white transition-colors tracking-tighter">
                {logo.name}
              </div>
              
              {/* Internal Card Glow */}
              <div className="absolute inset-0 bg-green-primary/0 group-hover:bg-green-primary/5 blur-xl transition-all duration-500 rounded-3xl" />
            </motion.div>
          ))}
        </motion.div>

        {/* Edge Gradient Fades */}
        <div className="absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-black to-transparent z-20" />
        <div className="absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-l from-black to-transparent z-20" />
      </div>

      {/* Decorative Particle/Dot Background inside section */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
    </section>
  );
}
