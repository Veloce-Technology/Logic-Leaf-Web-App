"use client";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { PROCESS_TIMELINE } from "../../constants/SiteConstants";

export default function TimelineSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Heading reveal
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: 40, clipPath: "inset(100% 0 0 0)" },
      {
        opacity: 1,
        y: 0,
        clipPath: "inset(0% 0 0 0)",
        duration: 1.1,
        ease: "power4.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      },
    );

    // SVG line draw
    if (lineRef.current) {
      const length = lineRef.current.getTotalLength();
      gsap.set(lineRef.current, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });
      gsap.to(lineRef.current, {
        strokeDashoffset: 0,
        duration: 2.5,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: stepsRef.current,
          start: "top 75%",
          end: "bottom 20%",
          scrub: 1,
        },
      });
    }

    // Step reveals
    if (stepsRef.current) {
      const steps =
        stepsRef.current.querySelectorAll<HTMLElement>("[data-step]");
      steps.forEach((step, i) => {
        gsap.fromTo(
          step,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: step,
              start: "top 60%",
            },
          },
        );

        // Dot pulse
        const dot = step.querySelector<HTMLElement>("[data-dot]");
        if (dot) {
          gsap.fromTo(
            dot,
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.5,
              ease: "back.out(2)",
              scrollTrigger: { trigger: step, start: "top 80%" },
            },
          );
        }

        const label = step.querySelector<HTMLElement>("[data-step-label]");
        const bigNum = step.querySelector<HTMLElement>("[data-step-number]");
        if (label) {
          gsap.to(label, {
            color: "#0DCD6A",
            duration: 0.8,
            scrollTrigger: {
              trigger: step,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          });
        }
        if (bigNum) {
          gsap.to(bigNum, {
            webkitTextStrokeColor: "rgba(13, 205, 106, 0.4)",
            duration: 0.8,
            scrollTrigger: {
              trigger: step,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          });
        }
      });
    }
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative py-10 bg-black overflow-hidden font-dm"
    >
      {/* Ambient glow */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-green-primary/[0.04] blur-[150px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-24 md:mb-32 flex flex-col md:flex-row md:items-end md:justify-between gap-10">
          <div>
            <span className="text-green-primary font-bold tracking-[0.3em] uppercase text-[10px] md:text-xs block mb-5">
              Digital Lifecycle
            </span>
            <h2
              ref={headingRef}
              className="text-[clamp(3rem,6vw,4rem)] font-bold text-white leading-[1.1] tracking-[-0.03em]"
              style={{ opacity: 0 }}
            >
              From Concept
              <br />
              to <span className="text-green-primary">Deployment</span>
            </h2>
          </div>
          <p className="text-base md:text-lg text-white/80 font-light max-w-xs md:mb-3 md:text-right">
            A refined process built on precision, transparency, and creative
            rigor.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative" ref={stepsRef}>
          {/* SVG drawn line */}
          <svg
            className="absolute left-4 md:left-2.5 top-0 bottom-0 h-full w-px overflow-visible"
            style={{ width: 2 }}
            preserveAspectRatio="none"
          >
            {/* Background track */}
            <line
              x1="1"
              y1="0"
              x2="1"
              y2="100%"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="1"
            />
            {/* Animated fill line */}
            <path
              ref={lineRef}
              d={`M 1 3 L 1 1200`}
              stroke="#0DCD6A"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              opacity="0.6"
            />
          </svg>

          <div className="space-y-20 md:space-y-28 pl-16 md:pl-24">
            {PROCESS_TIMELINE.map((item, i) => (
              <div
                key={item.step}
                data-step
                className="relative flex flex-col gap-4"
                style={{ opacity: 0 }}
              >
                {/* Dot on the line */}
                <div
                  data-dot
                  className="absolute -left-14 md:-left-24 top-0.5 w-5 h-5 rounded-full bg-black border-2 border-green-primary z-10 flex items-center justify-center"
                  style={{
                    boxShadow: "0 0 12px rgba(13,205,106,0.7)",
                    scale: 0,
                  }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-green-primary" />
                </div>

                {/* Step label */}
                <div className="flex items-center gap-4">
                  <span
                    data-step-label
                    className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] transition-colors duration-500"
                  >
                    Step {item.step}
                  </span>
                  {/* Horizontal rule extending from step */}
                  <div className="flex-1 h-px bg-white/[0.04] max-w-[80px]" />
                </div>

                {/* Content */}
                <div className="max-w-2xl">
                  <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-base md:text-lg text-white/60 font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Decorative large number & line */}
                <div className="absolute -right-4 -top-8 md:-top-4 flex flex-col items-end pointer-events-none select-none">
                  <span
                    data-step-number
                    className="text-[10rem] md:text-[14rem] font-black font-mono text-transparent leading-[0.8] transition-all duration-700"
                    style={{ WebkitTextStroke: "2px rgba(255,255,255,0.05)" }}
                  >
                    {item.step}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
