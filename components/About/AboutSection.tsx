"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { ABOUT_CONTENT } from "./AboutConstants";

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Reveal Heading and Paragraphs
      gsap.fromTo(
        ".reveal-item",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        },
      );

      // 2. Stats Counter Animation
      const counters = sectionRef.current!.querySelectorAll("[data-count]");
      counters.forEach((el) => {
        const target = parseInt((el as HTMLElement).dataset.count || "0", 10);
        const suffix = (el as HTMLElement).dataset.suffix || "";

        gsap.fromTo(
          el,
          { textContent: 0 },
          {
            textContent: target,
            duration: 2.5,
            ease: "power2.out",
            snap: { textContent: 1 },
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
            },
            onUpdate() {
              const currentVal = Math.round(
                parseFloat((el as HTMLElement).textContent || "0"),
              );
              (el as HTMLElement).textContent = currentVal + suffix;
            },
          },
        );
      });

      // 3. Floating Card Effect for Stats
      gsap.fromTo(
        ".stat-card",
        { opacity: 0, scale: 0.9, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: ".stats-grid",
            start: "top 85%",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative bg-black py-20 md:py-20 overflow-hidden font-dm"
    >
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-green-primary/[0.03] blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-green-primary/[0.02] blur-[120px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32">
          {/* Left Column: Content */}
          <div className="space-y-12">
            <div className="space-y-6">
              <span className="reveal-item text-green-primary font-bold tracking-[0.4em] uppercase text-[10px] md:text-xs block">
                {ABOUT_CONTENT.subtitle}
              </span>
              <h2 className="reveal-item text-[clamp(2.5rem,6vw,4rem)] font-bold text-white leading-[1.1] tracking-[-0.03em]">
                {ABOUT_CONTENT.heading.line1}
                <br />
                {ABOUT_CONTENT.heading.line2}
                <br />
                <span className="text-green-primary">
                  {ABOUT_CONTENT.heading.line3}
                </span>
              </h2>
            </div>

            <div className="space-y-8 max-w-xl">
              {ABOUT_CONTENT.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="reveal-item text-white/80 text-base md:text-lg leading-relaxed font-light"
                >
                  {p}
                </p>
              ))}
            </div>

            <div className="reveal-item pt-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-4 group text-white/30 hover:text-green-primary transition-all duration-500"
              >
                <span className="text-xs font-black uppercase tracking-[0.15em]">
                  Our Story
                </span>
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-green-primary transition-all">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </a>
            </div>
          </div>

          {/* Right Column: Stats Grid */}
          <div className="stats-grid grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 self-center">
            {ABOUT_CONTENT.stats.map((stat, i) => (
              <div
                key={i}
                className="stat-card group relative p-10 md:p-12 rounded-[32px] bg-white/[0.02] border border-white/10 backdrop-blur-3xl hover:bg-white/[0.04] hover:border-green-primary/30 transition-all duration-700 overflow-hidden"
              >
                {/* Background Pattern - Right aligned with mask */}
                <div className="absolute top-0 right-0 w-2/3 h-full z-0 opacity-[0.15] group-hover:opacity-[0.12] transition-all duration-1000 ease-out scale-105 group-hover:scale-110 pointer-events-none">
                  <img
                    src={stat.image}
                    alt={stat.label}
                    className="w-full h-full object-cover object-right"
                  />
                  {/* Glass-to-dark gradient blend */}
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/20 to-black/80" />
                </div>

                {/* Decorative glow */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-green-primary/10 blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                <div className="relative z-10 space-y-4">
                  <span
                    data-count={stat.value}
                    data-suffix={stat.suffix}
                    className="text-5xl md:text-6xl font-bold text-white tracking-tighter block"
                  >
                    0{stat.suffix}
                  </span>
                  <p className="text-white/50 text-xs md:text-sm font-bold uppercase tracking-[0.2em] leading-snug max-w-[120px]">
                    {stat.label}
                  </p>
                </div>

                {/* Bottom line accent */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-green-primary group-hover:w-full transition-all duration-700 ease-in-out" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
