import { useEffect, useRef } from "react";
import { SECTION_CONTENT } from "./SectionConstants";
import FeatureCards from "./FeatureCards";
import { gsap } from "@/lib/gsap";

export default function SecondSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: 50, filter: "blur(8px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      },
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-black py-32 md:py-48 overflow-hidden z-[2] font-dm"
    >
      {/* Subtle green glow accent */}
      <div className="absolute top-[20%] -left-[10%] w-[800px] h-[800px] rounded-full bg-green-glow/[0.04] blur-[150px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-8 md:px-12 flex flex-col gap-24">
        {/* Header Grid */}
        <div
          ref={headerRef}
          className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 md:gap-24 items-start"
        >
          <div className="flex items-center gap-3 px-6 py-2.5 rounded-full border border-white/10 bg-white/[0.02] w-fit">
            <div className="w-1.5 h-1.5 rounded-full bg-green-primary shadow-[0_0_10px_rgba(13,205,106,0.8)] animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-green-primary">
              {SECTION_CONTENT.badge}
            </span>
          </div>

          <div className="flex flex-col gap-6 w-full max-w-xl">
            <h2 className="text-[clamp(2rem,5vw,4rem)] font-bold text-white leading-[0.95] tracking-tight">
              Modern{" "}
              <span className="text-green-primary">
                {SECTION_CONTENT.titleHighlight}
              </span>
              <br />
              <span className="text-white/20 select-none">
                {SECTION_CONTENT.titleSuffix}
              </span>
            </h2>
            <p className="text-base md:text-lg text-white/50 leading-relaxed font-light">
              {SECTION_CONTENT.description}
            </p>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <FeatureCards />
      </div>
    </section>
  );
}
