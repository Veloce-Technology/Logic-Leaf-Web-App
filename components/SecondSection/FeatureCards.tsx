import { useEffect, useRef } from "react";
import { FEATURES } from "./SectionConstants";
import { gsap } from "@/lib/gsap";

export default function FeatureCards() {
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardsRef.current) return;
    const cards = cardsRef.current.querySelectorAll("[data-card]");

    gsap.fromTo(
      cards,
      { opacity: 0, y: 60, filter: "blur(8px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 85%",
        },
      },
    );

    // 3D tilt effect
    const handleMouseMove = (e: MouseEvent) => {
      cards.forEach((card) => {
        const rect = (card as HTMLElement).getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const rotX = (-y / rect.height) * 10;
        const rotY = (x / rect.width) * 10;
        gsap.to(card, {
          rotateX: rotX,
          rotateY: rotY,
          duration: 0.5,
          perspective: 1000,
        });
      });
    };

    const handleMouseLeave = () => {
      cards.forEach((card) => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.8,
          ease: "power2.out",
        });
      });
    };

    cardsRef.current.addEventListener("mousemove", handleMouseMove);
    cardsRef.current.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cardsRef.current?.removeEventListener("mousemove", handleMouseMove);
      cardsRef.current?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={cardsRef}
      className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full font-dm"
    >
      {FEATURES.map((f) => (
        <article
          key={f.number}
          className="group relative rounded-[32px] overflow-hidden bg-white/[0.02] backdrop-blur-2xl border border-white/10 transition-all hover:bg-white/[0.04] p-10 flex flex-col gap-6"
          data-card
        >
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-green-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

          <div className="flex items-center justify-between">
            <span className="text-3xl text-green-primary drop-shadow-[0_0_15px_rgba(13,205,106,0.3)]">
              {f.icon}
            </span>
            <span className="text-[10px] font-bold text-white/20 tracking-widest uppercase">
              {f.number}
            </span>
          </div>

          <h3 className="text-xl font-bold text-white tracking-tight leading-tight">
            {f.title}
          </h3>

          <p className="text-sm leading-relaxed text-white/40 flex-grow font-light">
            {f.description}
          </p>

          <div className="px-4 py-1.5 rounded-full border border-white/10 text-[10px] font-bold text-green-primary tracking-wider uppercase bg-green-primary/5 w-fit">
            {f.tag}
          </div>
        </article>
      ))}
    </div>
  );
}
