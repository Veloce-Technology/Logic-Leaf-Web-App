"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { CAPABILITIES, CAPABILITIES_CONTENT } from "./CapabilitiesConstants";

export default function CapabilitiesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !rightColRef.current) return;

    const ctx = gsap.context(() => {
      // Pinning and Scrolling Logic (Matches ServicesSection pattern)
      const rightHeight = rightColRef.current!.offsetHeight;
      const viewHeight = window.innerHeight;
      const scrollDistance = Math.max(0, rightHeight - viewHeight + 100);

      if (window.innerWidth >= 1024 && scrollDistance > 0) {
        gsap.to(rightColRef.current, {
          y: -scrollDistance,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${scrollDistance}`,
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      }

      // Entrance Animations
      gsap.fromTo(
        ".cap-reveal",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        },
      );

      // List items reveal
      gsap.fromTo(
        ".cap-item",
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: rightColRef.current,
            start: "top 80%",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-black overflow-hidden font-dm w-full h-fit md:max-h-screen border-t border-white/5"
    >
      {/* Background accents */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-green-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-green-primary/5 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          {/* Left Column: Pinned Content */}
          <div
            ref={leftColRef}
            className="lg:col-span-5 pt-20 lg:py-32 lg:h-screen lg:justify-start flex flex-col"
          >
            <span className="cap-reveal text-green-primary font-bold tracking-[0.4em] uppercase text-[10px] md:text-xs block mb-8">
              {CAPABILITIES_CONTENT.subtitle}
            </span>
            <h2 className="cap-reveal text-[clamp(2.4rem,6vw,4rem)] font-bold text-white leading-[1.1] tracking-[-0.03em] mb-10">
              {CAPABILITIES_CONTENT.title.split(" ").map((word, i) => (
                <span key={i}>
                  {word === "With" || word === "You" ? (
                    <span className="text-green-primary">{word}</span>
                  ) : (
                    word
                  )}{" "}
                  {i === 2 && <br />}
                </span>
              ))}
            </h2>
            <p className="cap-reveal text-white/80 text-base md:text-lg leading-relaxed font-light max-w-sm">
              {CAPABILITIES_CONTENT.description}
            </p>

            <div className="cap-reveal pt-12 mt-auto hidden lg:block">
              <div className="flex items-center gap-4 text-white/60 text-xs font-bold uppercase tracking-widest">
                <span>Scroll to explore</span>
                <div className="w-12 h-px bg-white/60" />
              </div>
            </div>
          </div>

          {/* Right Column: Scrolling List */}
          <div
            ref={rightColRef}
            className="lg:col-span-7 cap-list space-y-1 lg:py-32"
          >
            {CAPABILITIES.map((item) => (
              <div
                key={item.id}
                className="cap-item group relative py-8 border-b border-white/5 hover:border-green-primary/30 transition-all duration-700 cursor-default overflow-hidden"
              >
                <div className="flex items-start gap-8 md:gap-12 relative z-20">
                  {/* ID */}
                  <span className="text-white/50 font-mono text-sm md:text-lg pt-1 group-hover:text-green-primary transition-colors duration-500">
                    {item.id}
                  </span>

                  {/* Text Content */}
                  <div className="space-y-4">
                    <h3 className="text-xl md:text-3xl font-bold text-white group-hover:text-green-primary transition-colors duration-500 tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-white/60 text-sm md:text-base leading-relaxed font-light max-w-xl group-hover:text-white/80 transition-all duration-700">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Hover Accent (Bottom progress line) */}
                <div className="absolute bottom-0 left-0 w-0 h-px bg-green-primary/50 group-hover:w-full transition-all duration-1000 ease-in-out z-30" />

                {/* Background Glow on Hover - Refined to not overlap text */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-primary/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
