"use client";
import { motion } from "framer-motion";

export default function ContactSection() {
  return (
    <section id="contact" className="relative py-24 md:py-32 bg-black overflow-hidden font-dm">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Contact Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-green-primary font-bold tracking-[0.2em] uppercase text-xs">
              Let's Build Something Great
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-8">
              Start Your Digital Transformation
            </h2>
            <p className="text-white/50 text-lg leading-relaxed mb-12">
              Ready to take your business to the next level? Our team is ready to discuss your project and provide a tailored solution that meets your needs.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-6">
                 <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-green-primary">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l2.19-2.19a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                 </div>
                 <div>
                    <h4 className="text-white font-bold text-sm uppercase tracking-wide mb-1">Phone</h4>
                    <p className="text-white/40">+1 (555) 000-0000</p>
                 </div>
              </div>
              <div className="flex items-start gap-6">
                 <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-green-primary">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                 </div>
                 <div>
                    <h4 className="text-white font-bold text-sm uppercase tracking-wide mb-1">Email</h4>
                    <p className="text-white/40">hello@logicleaf.tech</p>
                 </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="p-8 md:p-12 rounded-[2.5rem] bg-white/[0.02] border border-white/5 relative"
          >
            <div className="absolute inset-0 bg-green-primary/5 blur-[120px] rounded-full pointer-events-none" />
            
            <form className="relative z-10 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <label className="text-xs font-bold text-white/40 uppercase tracking-widest pl-2">Name</label>
                    <input type="text" className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-green-primary/50 transition-all" placeholder="John Doe" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-xs font-bold text-white/40 uppercase tracking-widest pl-2">Email</label>
                    <input type="email" className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-green-primary/50 transition-all" placeholder="john@example.com" />
                 </div>
              </div>
              <div className="space-y-2">
                 <label className="text-xs font-bold text-white/40 uppercase tracking-widest pl-2">Subject</label>
                 <select className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white/60 focus:outline-none focus:border-green-primary/50 transition-all appearance-none">
                    <option>Product Development</option>
                    <option>UI/UX Design</option>
                    <option>Consultation</option>
                    <option>Other</option>
                 </select>
              </div>
              <div className="space-y-2">
                 <label className="text-xs font-bold text-white/40 uppercase tracking-widest pl-2">Message</label>
                 <textarea rows={4} className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-green-primary/50 transition-all resize-none" placeholder="Tell us about your project..." />
              </div>
              
              <button type="submit" className="w-full py-5 bg-green-primary text-black rounded-full font-black uppercase tracking-[0.2em] hover:scale-[1.02] active:scale-[0.98] transition-all hover:shadow-[0_0_30px_rgba(13,205,106,0.4)]">
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
