"use client";
import { motion } from "framer-motion";
import { ABOUT_CONTENT } from "../../constants/SiteConstants";

export default function AboutSection() {
  return (
    <section id="about" className="relative py-32 md:py-48 bg-black overflow-hidden font-dm">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex flex-col gap-24">
          
          {/* Main Content Header */}
          <div className="max-w-4xl">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-green-primary font-bold tracking-[0.3em] uppercase text-[10px] md:text-xs mb-6 block"
            >
              {ABOUT_CONTENT.subtitle}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-8xl font-medium text-white mb-10 leading-[0.9] tracking-tighter"
            >
              We craft software that feels alive.
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-end">
             {/* Left: Description */}
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.2 }}
               className="lg:col-span-5"
             >
                <p className="text-xl md:text-2xl text-white/40 leading-relaxed font-light">
                  {ABOUT_CONTENT.description}
                </p>
                
                <div className="flex flex-wrap gap-12 mt-16 pb-8 border-b border-white/5">
                  {ABOUT_CONTENT.stats.map((stat, i) => (
                    <div key={i} className="flex flex-col gap-2">
                      <span className="text-4xl font-light text-white tracking-tighter">{stat.value}</span>
                      <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">{stat.label}</span>
                    </div>
                  ))}
                </div>
             </motion.div>

             {/* Right: Modern Visual/Placeholder Container */}
             <motion.div
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 1, delay: 0.3 }}
               className="lg:col-span-7 aspect-[16/10] bg-white/[0.02] border border-white/5 rounded-[40px] relative overflow-hidden group"
             >
                <div className="absolute inset-0 bg-gradient-to-br from-green-primary/10 via-transparent to-transparent opacity-50" />
                
                {/* Floating Abstract Element */}
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="w-[1px] h-3/4 bg-gradient-to-b from-transparent via-green-primary/30 to-transparent absolute left-1/2 -translate-x-1/2" />
                   <div className="w-3/4 h-[1px] bg-gradient-to-r from-transparent via-green-primary/30 to-transparent absolute top-1/2 -translate-y-1/2" />
                   
                   <div className="w-48 h-48 rounded-full border border-green-primary/20 flex items-center justify-center animate-spin-slow">
                      <div className="w-32 h-32 rounded-full border border-green-primary/40 flex items-center justify-center">
                         <div className="w-4 h-4 bg-green-primary rounded-full shadow-[0_0_40px_#0DCD6A]" />
                      </div>
                   </div>
                </div>
                
                {/* Glass Tag */}
                <div className="absolute bottom-10 left-10 px-6 py-4 rounded-2xl bg-white/[0.03] backdrop-blur-3xl border border-white/10">
                   <span className="text-white/60 text-sm font-medium tracking-wide">Pioneering Next-Gen Tech</span>
                </div>
             </motion.div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
