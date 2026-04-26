"use client";
import { motion } from "framer-motion";
import { LOGO_LIST } from "../../constants/SiteConstants";

export default function LogoCarousel() {
  // Duplicate logos for seamless infinite loop
  const duplicatedLogos = [...LOGO_LIST, ...LOGO_LIST, ...LOGO_LIST];

  return (
    <section className="py-20 bg-black border-y border-white/5 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-10 text-center">
        <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em]">
          Partners in Digital Excellence
        </span>
      </div>

      <div className="relative flex overflow-hidden group">
        <div className="flex animate-marquee hover:pause whitespace-nowrap py-4">
          {duplicatedLogos.map((logo, i) => (
            <div
              key={i}
              className="flex items-center justify-center px-12 md:px-16"
            >
              <div className="text-2xl md:text-3xl font-black text-white/20 hover:text-green-primary transition-all duration-300 filter grayscale hover:grayscale-0 cursor-default select-none tracking-tighter">
                {logo.name}
              </div>
            </div>
          ))}
        </div>

        {/* Gradient Fades */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .hover\:pause:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
