"use client";
import { useEffect, useRef } from "react";
import { LOGO_LIST } from "../../constants/SiteConstants";
import { gsap } from "@/lib/gsap";

export default function LogoCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Infinite marquee via GSAP — smoother than CSS animation
  useEffect(() => {
    if (!trackRef.current) return;
    const totalWidth = trackRef.current.scrollWidth / 2;

    const anim = gsap.to(trackRef.current, {
      x: -totalWidth,
      duration: 32,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: (x) => `${parseFloat(x) % totalWidth}px`,
      },
    });

    // Pause on hover
    const pauseAnim = () => anim.pause();
    const resumeAnim = () => anim.resume();
    trackRef.current.addEventListener("mouseenter", pauseAnim);
    trackRef.current.addEventListener("mouseleave", resumeAnim);

    return () => {
      anim.kill();
    };
  }, []);

  const allItems = [...LOGO_LIST, ...LOGO_LIST, ...LOGO_LIST, ...LOGO_LIST];

  return (
    <section
      ref={sectionRef}
      className="relative bg-black overflow-hidden font-dm"
    >
      {/* Hairline separator from hero */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Section label */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-20 pb-10">
        <p className="text-[10px] font-bold text-white/50 uppercase tracking-[0.4em] text-center">
          Trusted by ambitious teams worldwide
        </p>
      </div>

      {/* Marquee track */}
      <div className="relative overflow-hidden py-6">
        <div
          ref={trackRef}
          className="flex gap-5 will-change-transform"
          style={{ width: "max-content" }}
        >
          {allItems.map((logo, i) => (
            <div
              key={i}
              data-logo-item
              className="relative flex items-center justify-center px-14 py-8 rounded-3xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-md
                         transition-all duration-500 hover:bg-white/[0.05] hover:border-green-primary/30 group cursor-default select-none shrink-0 hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(13,205,106,0.15)]"
            >
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-green-primary/50 rounded-tl-xl opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-1 -translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-green-primary/50 rounded-br-xl opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0" />

              <span className="text-3xl md:text-4xl font-black text-white/40 group-hover:text-white transition-colors tracking-tighter whitespace-nowrap">
                {logo.name}
              </span>

              {/* Subtle inner glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-green-primary/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>

        {/* Edge fades */}
        <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
      </div>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent mt-10" />
    </section>
  );
}
