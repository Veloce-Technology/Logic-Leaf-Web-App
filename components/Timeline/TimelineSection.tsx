"use client";
import { motion } from "framer-motion";
import { PROCESS_TIMELINE } from "../../constants/SiteConstants";

export default function TimelineSection() {
  return (
    <section id="process" className="relative py-32 md:py-48 bg-black overflow-hidden font-dm">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header Block */}
        <div className="max-w-3xl mb-32">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-green-primary font-bold tracking-[0.3em] uppercase text-[10px] md:text-xs block mb-6"
          >
            Digital Lifecycle
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-8xl font-medium text-white tracking-tighter"
          >
            From concept <br/> to deployment.
          </motion.h2>
        </div>

        <div className="relative">
          {/* Subtle Progression Line */}
          <div className="absolute left-0 md:left-[3.25rem] top-0 bottom-0 w-px bg-gradient-to-b from-green-primary/50 via-white/10 to-transparent" />

          <div className="space-y-32">
            {PROCESS_TIMELINE.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="relative flex items-start gap-12 md:gap-24"
              >
                {/* Visual Marker */}
                <div className="relative flex-shrink-0 w-8 md:w-24 flex justify-center pt-2">
                   <div className="w-4 h-4 rounded-full bg-black border-2 border-green-primary z-10 shadow-[0_0_15px_#0DCD6A]" />
                </div>

                {/* Content Area */}
                <div className="flex-1 max-w-2xl">
                   <span className="text-green-primary/40 font-black text-sm uppercase tracking-widest mb-4 block">Step {item.step}</span>
                   <h3 className="text-3xl md:text-5xl font-medium text-white mb-6 tracking-tight">{item.title}</h3>
                   <p className="text-lg md:text-xl text-white/30 font-light leading-relaxed">
                     {item.description}
                   </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
