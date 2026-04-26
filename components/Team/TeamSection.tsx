"use client";
import { motion } from "framer-motion";
import { TEAM_MEMBERS } from "../../constants/SiteConstants";

export default function TeamSection() {
  return (
    <section id="team" className="relative py-32 md:py-48 bg-black overflow-hidden font-dm">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Title */}
        <div className="max-w-4xl mb-24 md:mb-32">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-green-primary font-bold tracking-[0.3em] uppercase text-[10px] md:text-xs block mb-6"
          >
            The Culture
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-8xl font-medium text-white tracking-tighter"
          >
            Driven by <br/> craftsmanship.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
          {TEAM_MEMBERS.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="flex flex-col group"
            >
               {/* Minimalist Profile Block */}
               <div className="aspect-[4/5] bg-white/[0.02] border border-white/5 rounded-[40px] mb-8 relative overflow-hidden flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-700">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="text-9xl font-black text-white/5 group-hover:text-green-primary/10 transition-colors select-none">
                    {member.name.charAt(0)}
                  </span>
                  
                  {/* Glass Tag over image area */}
                  <div className="absolute bottom-8 left-8 right-8">
                     <span className="text-xs font-bold text-green-primary uppercase tracking-[0.2em]">{member.role}</span>
                  </div>
               </div>

               <h3 className="text-3xl font-medium text-white mb-4 tracking-tight">{member.name}</h3>
               <p className="text-lg text-white/30 font-light leading-relaxed max-w-xs">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
