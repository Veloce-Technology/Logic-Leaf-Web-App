"use client";
import { useEffect, useRef, Fragment } from "react";
import { motion } from "framer-motion";
import { HERO_CONTENT, HERO_ANIMATION } from "./HeroConstants";
import SplineRobot from "./SplineRobot";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const robotContainerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      !sectionRef.current ||
      !robotContainerRef.current ||
      !contentRef.current
    )
      return;

    const ctx = gsap.context(() => {
      // Create a specific timeline for this component's scroll effects
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });

      tl.to(
        robotContainerRef.current,
        {
          scale: HERO_ANIMATION.robotScale,
          opacity: 0,
          filter: `blur(${HERO_ANIMATION.robotBlur}px)`,
          duration: 1,
          ease: "power2.inOut",
        },
        0,
      );

      tl.to(
        contentRef.current,
        {
          opacity: 0,
          y: -80,
          duration: 0.6,
          ease: "power2.in",
        },
        0,
      );
    }, sectionRef);

    return () => ctx.revert(); // Safely revert ONLY this component's animations
  }, []);

  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      gsap.to(window, {
        duration: 1.5,
        scrollTo: { y: targetElement, offsetY: 80 },
        ease: "power4.inOut",
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden flex items-center justify-center font-dm"
    >
      {/* Absolute Dark Background Layer */}
      <div className="absolute inset-0 bg-black z-[-10]" />

      {/* Background Gradient / Glow behind model */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#0a0a10_0%,#000000_100%)] z-[-5]" />

      {/* Centered Robot & Portal - z-0 so content above is z-10 */}
      <div
        ref={robotContainerRef}
        className="absolute inset-0 z-[1] flex items-center justify-center translate-y-[8%] md:translate-y-10"
      >
        <div className="relative w-full h-full flex items-center justify-center pointer-events-auto">
          {/* Glowing Portal Orb */}
          <div className="absolute w-[80vw] h-[80vw] rounded-full bg-green-glow/[0.04] blur-[80px] md:blur-[100px] pointer-events-none z-[-2]" />
          <div className="absolute w-[80vw] md:w-[50vh] h-[80vw] md:h-[50vh] rounded-full border border-green-primary/[0.08] pointer-events-none z-[-2]" />

          {/* Scale 0.75 on mobile to give breathing room for the model */}
          <div className="w-full h-full flex items-center justify-center relative z-[1] scale-[0.75] md:scale-110 md:max-w-[1200px]">
            <SplineRobot />
          </div>
        </div>
      </div>

      {/* Main Content Layout - pointer-events-none so mouse passes through to iframe */}
      <div
        ref={contentRef}
        className="relative z-[10] w-full h-full max-w-[1400px] px-6 md:px-12 flex flex-col md:flex-row items-end justify-between pt-26 pb-10 md:pb-24 gap-8 md:gap-0 pointer-events-none"
      >
        {/* Left Bottom Corner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col gap-6 md:gap-8 w-full md:max-w-[50%] pointer-events-auto"
        >
          <h1 className="text-[clamp(2.2rem,9vw,4rem)] font-bold leading-[1.05] tracking-[-0.03em] text-white m-0 whitespace-pre-line">
            {HERO_CONTENT.headline.split("Software").map((part, i) =>
              i === 0 ? (
                <Fragment key={i}>{part}</Fragment>
              ) : (
                <Fragment key={i}>
                  <span className="text-green-primary">Software</span>
                  {part}
                </Fragment>
              ),
            )}
          </h1>

          <div className="flex flex-col gap-3">
            <span className="text-[9px] md:text-[11px] font-bold text-white/40 uppercase tracking-[0.2em]">
              {HERO_CONTENT.trustedText}
            </span>
          </div>
        </motion.div>

        {/* Right Bottom Corner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          className="flex flex-col gap-8 md:gap-10 w-full md:max-w-[400px] md:mb-4 pointer-events-auto"
        >
          <p className="text-[14px] md:text-base leading-relaxed text-white/80 font-light tracking-wide m-0">
            {HERO_CONTENT.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 md:gap-5">
            <a
              href="#contact"
              onClick={(e) => handleCtaClick(e, "#contact")}
              className="flex items-center justify-between gap-4 md:gap-5 bg-green-primary text-black pl-6 md:pl-8 pr-2.5 md:pr-3 py-2.5 md:py-3 rounded-full font-black group transition-all hover:scale-[1.05] hover:shadow-[0_0_30px_rgba(13,205,106,0.3)] active:scale-[0.98] text-sm md:text-base cursor-pointer"
            >
              <span>{HERO_CONTENT.ctaPrimary}</span>
              <div className="bg-black text-green-primary w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="md:w-4 md:h-4"
                >
                  <path
                    d="M6 12l4-4-4-4"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </a>

            <a
              href="#about"
              onClick={(e) => handleCtaClick(e, "#about")}
              className="px-6 md:px-8 py-3 md:py-4 rounded-full bg-white/[0.03] border border-white/10 text-white font-medium backdrop-blur-md transition-all hover:bg-white/[0.08] hover:border-green-primary/30 text-sm md:text-base cursor-pointer"
            >
              {HERO_CONTENT.ctaSecondary}
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 z-30 w-6 h-6 md:w-8 md:h-8 opacity-20 pointer-events-none">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v8M8 12h8" />
        </svg>
      </div>
    </section>
  );
}
