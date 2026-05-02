"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { SERVICES, SERVICES_CONTENT } from "./ServicesConstants";
import Image from "next/image";

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !rightColRef.current) return;

    const ctx = gsap.context(() => {
      const rightHeight = rightColRef.current!.offsetHeight;
      const viewHeight = window.innerHeight;

      const scrollDistance = Math.max(0, rightHeight - viewHeight + 100);

      if (scrollDistance > 0) {
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

      // Initial reveal animations
      const label = sectionRef.current!.querySelector("[data-label]");
      const title = sectionRef.current!.querySelector("[data-title]");
      const desc = sectionRef.current!.querySelector("[data-desc]");
      const cards = sectionRef.current!.querySelectorAll("[data-svc-card]");

      gsap.fromTo(
        [label, title, desc],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        },
      );

      gsap.fromTo(
        cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative bg-black overflow-hidden font-dm w-full max-h-[1450px] md:max-h-screen"
    >
      {/* Subtle glow accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-primary/[0.02] blur-[120px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left Column: Pinned design matching AboutSection */}
          <div
            ref={leftColRef}
            className="flex flex-col gap-8 pt-30 lg:py-32 lg:h-screen lg:justify-start"
          >
            <div className="space-y-8">
              <span
                data-label
                className="text-green-primary font-bold tracking-[0.3em] uppercase text-[10px] md:text-xs block"
              >
                {SERVICES_CONTENT.subtitle}
              </span>

              <h2
                data-title
                className="text-[clamp(2.4rem,6vw,4rem)] font-bold text-white leading-[1.1] tracking-[-0.03em]"
              >
                {SERVICES_CONTENT.title.split(" ").map((word, i) => (
                  <span key={i}>
                    {word === "Sizes" ? (
                      <span className="text-green-primary">{word}</span>
                    ) : (
                      word
                    )}{" "}
                    {(i === 1 || i === 4) && <br />}
                  </span>
                ))}
              </h2>

              <p
                data-desc
                className="text-lg md:text-xl text-white/80 leading-relaxed font-light max-w-sm"
              >
                {SERVICES_CONTENT.description}
              </p>
            </div>

            <div className="pt-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-4 group text-white/50 hover:text-green-primary transition-all duration-500"
              >
                <span className="text-xs font-black uppercase tracking-[0.15em]">
                  {SERVICES_CONTENT.cta}
                </span>
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-green-primary group-hover:scale-105 transition-all">
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

          {/* Right Column: Glassmorphism Card Stack */}
          <div
            ref={rightColRef}
            className="flex flex-col gap-6 md:gap-8 lg:py-32"
          >
            {SERVICES.map((service, i) => (
              <div
                key={i}
                data-svc-card
                className="group relative rounded-3xl md:rounded-[32px] overflow-hidden bg-white/[0.03] border border-white/10 backdrop-blur-3xl p-8 md:p-12 min-h-[300px] md:min-h-[400px] flex flex-col justify-between transition-all duration-700 hover:bg-white/[0.06] hover:border-green-primary/30 shadow-2xl"
              >
                {/* Background Pattern - Highly visible and right-aligned */}
                <div className="absolute top-0 right-0 w-1/2 h-full z-0 opacity-[0.15] group-hover:opacity-[0.25] transition-all duration-1000 ease-out scale-105 group-hover:scale-110">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover object-right"
                  />
                  {/* Glass-to-dark gradient blend */}
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/20 to-black/80" />
                </div>

                {/* Glass reflective overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent pointer-events-none" />

                {/* Content */}
                <div className="relative z-10 space-y-4 max-w-[65%] transform group-hover:-translate-y-1 transition-transform duration-700">
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight tracking-tight group-hover:text-green-primary transition-colors duration-500">
                    {service.title}
                  </h3>
                </div>

                <div className="relative z-10 max-w-[75%] transform group-hover:translate-y-1 transition-transform duration-700">
                  <p className="text-white/60 text-base md:text-lg leading-relaxed font-light group-hover:text-white/70 transition-colors duration-500">
                    {service.description}
                  </p>
                </div>

                {/* Accent glow on hover */}
                <div
                  className="absolute bottom-0 right-0 w-64 h-64 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"
                  style={{
                    backgroundColor:
                      service.accent || "rgba(13, 205, 106, 0.05)",
                  }}
                />

                {/* Interactive Border accent */}
                <div className="absolute inset-0 rounded-3xl md:rounded-[32px] border border-white/0 group-hover:border-green-primary/10 transition-colors duration-700 pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
