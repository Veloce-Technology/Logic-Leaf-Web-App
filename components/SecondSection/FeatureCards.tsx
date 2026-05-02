"use client";
import { useEffect, useRef } from "react";
import { FEATURES } from "./SectionConstants";
import { gsap } from "@/lib/gsap";

export default function FeatureCards() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapRef.current) return;
    const cards = Array.from(wrapRef.current.querySelectorAll<HTMLElement>("[data-card]"));

    // Stagger reveal with clip-path
    gsap.fromTo(
      cards,
      { opacity: 0, y: 60, clipPath: "inset(0 0 100% 0)" },
      {
        opacity: 1,
        y: 0,
        clipPath: "inset(0 0 0% 0)",
        duration: 0.9,
        stagger: 0.15,
        ease: "power4.out",
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top 80%",
        },
      }
    );

    // Per-card 3D magnetic tilt
    cards.forEach((card) => {
      const onMove = (e: MouseEvent) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) / (r.width / 2);
        const y = (e.clientY - r.top - r.height / 2) / (r.height / 2);
        gsap.to(card, {
          rotateX: -y * 12,
          rotateY: x * 12,
          transformPerspective: 800,
          duration: 0.4,
          ease: "power2.out",
        });
        // Move shine layer
        const shine = card.querySelector<HTMLElement>("[data-shine]");
        if (shine) {
          gsap.to(shine, {
            x: x * 30,
            y: y * 30,
            opacity: 0.15,
            duration: 0.4,
          });
        }
      };
      const onLeave = () => {
        gsap.to(card, {
          rotateX: 0, rotateY: 0, duration: 0.8, ease: "power3.out",
        });
        const shine = card.querySelector<HTMLElement>("[data-shine]");
        if (shine) {
          gsap.to(shine, { opacity: 0, duration: 0.5 });
        }
      };
      card.addEventListener("mousemove", onMove);
      card.addEventListener("mouseleave", onLeave);
    });
  }, []);

  return (
    <div
      ref={wrapRef}
      className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full font-dm"
    >
      {FEATURES.map((f, idx) => (
        <article
          key={f.number}
          data-card
          className="group relative rounded-[28px] overflow-hidden bg-white/[0.025] border border-white/[0.08] p-8 md:p-10 flex flex-col gap-7 cursor-default"
          style={{ transformStyle: "preserve-3d", willChange: "transform", opacity: 0 }}
        >
          {/* Roaming shine */}
          <div
            data-shine
            className="absolute w-40 h-40 rounded-full bg-green-primary blur-[60px] pointer-events-none opacity-0"
            style={{ top: "30%", left: "30%" }}
          />

          {/* Top accent line */}
          <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-green-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Number + Icon row */}
          <div className="flex items-center justify-between">
            <div
              className="w-12 h-12 rounded-2xl bg-green-primary/10 border border-green-primary/20 flex items-center justify-center text-xl text-green-primary"
              style={{ transform: "translateZ(24px)" }}
            >
              {f.icon}
            </div>
            <span className="text-[10px] font-black text-white/15 tracking-[0.25em] uppercase">
              {f.number}
            </span>
          </div>

          {/* Content */}
          <div className="flex flex-col gap-4" style={{ transform: "translateZ(16px)" }}>
            <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight leading-snug">
              {f.title}
            </h3>
            <p className="text-sm leading-relaxed text-white/40 font-light">
              {f.description}
            </p>
          </div>

          {/* Tag */}
          <div
            className="mt-auto px-4 py-1.5 rounded-full border border-green-primary/20 text-[10px] font-bold text-green-primary tracking-wider uppercase bg-green-primary/[0.05] w-fit"
            style={{ transform: "translateZ(8px)" }}
          >
            {f.tag}
          </div>

          {/* Bottom glow */}
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-20 bg-green-primary/[0.07] blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        </article>
      ))}
    </div>
  );
}
