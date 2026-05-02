"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { CTA_CONTENT } from "./CTAConstants";

export default function CTABanner() {
  const sectionRef = useRef<HTMLElement>(null);
  const magneticRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cta-reveal",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
          },
        },
      );
    }, sectionRef);

    // Magnetic effect for button
    const moveBtn = (e: MouseEvent) => {
      if (!magneticRef.current) return;
      const { clientX, clientY } = e;
      const { left, top, width, height } =
        magneticRef.current.getBoundingClientRect();
      const x = (clientX - (left + width / 2)) * 0.2;
      const y = (clientY - (top + height / 2)) * 0.2;

      gsap.to(magneticRef.current, {
        x: x,
        y: y,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const resetBtn = () => {
      gsap.to(magneticRef.current, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.3)",
      });
    };

    const btn = magneticRef.current;
    if (btn) {
      btn.addEventListener("mousemove", moveBtn);
      btn.addEventListener("mouseleave", resetBtn);
    }

    return () => {
      ctx.revert();
      if (btn) {
        btn.removeEventListener("mousemove", moveBtn);
        btn.removeEventListener("mouseleave", resetBtn);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-20 bg-black overflow-hidden font-dm border-t border-white/5"
    >
      {/* Subtle Generative Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "100px 100px",
          }}
        />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        <div className="relative bg-[#0c0c0e] border border-white/10 rounded-[32px] md:rounded-[40px] p-8 md:p-14 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10 group">
          {/* Ambient Glow */}
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-green-primary/5 blur-[80px] pointer-events-none group-hover:bg-green-primary/10 transition-colors duration-1000" />

          <div className="relative z-20 space-y-4 text-center md:text-left max-w-2xl">
            <h2 className="cta-reveal text-[clamp(2rem,4vw,3rem)] font-bold text-white leading-[1.1] tracking-tight">
              {CTA_CONTENT.title.split(" ").map((word, i) => (
                <span key={i}>
                  {word === "scale" ||
                  word === "digital" ||
                  word === "presence?" ? (
                    <span className="text-green-primary">{word}</span>
                  ) : (
                    word
                  )}{" "}
                </span>
              ))}
            </h2>
            <p className="cta-reveal text-white/60 text-base md:text-lg font-light leading-relaxed max-w-xl">
              {CTA_CONTENT.description}
            </p>
          </div>

          <div className="cta-reveal relative z-20 shrink-0">
            <a
              ref={magneticRef}
              href={CTA_CONTENT.buttonHref}
              className="inline-flex items-center gap-4 px-10 py-5 bg-white text-black rounded-full transition-all hover:bg-green-primary group/btn"
            >
              <span className="text-xs font-black uppercase tracking-[0.2em]">
                {CTA_CONTENT.buttonText}
              </span>
              <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center transition-transform group-hover/btn:-rotate-45">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14m-7-7 7 7-7 7" />
                </svg>
              </div>
            </a>
          </div>

          {/* Decorative Accent */}
          <div className="absolute left-0 top-0 w-1 h-full bg-green-primary/0 group-hover:bg-green-primary/40 transition-all duration-700" />
        </div>
      </div>
    </section>
  );
}
