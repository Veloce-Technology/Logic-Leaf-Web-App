"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "@/lib/gsap";
import { TEAM_MEMBERS, TEAM_CONTENT } from "./TeamConstants";
import Image from "next/image";

export default function TeamSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".team-reveal",
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="team"
      ref={sectionRef}
      className="relative bg-black py-20 overflow-hidden font-dm border-t border-white/5"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        {/* Header - Aligned with TimelineSection */}
        <div className="mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-10">
          <div>
            <span className="team-reveal text-green-primary font-bold tracking-[0.3em] uppercase text-[10px] md:text-xs block mb-5">
              {TEAM_CONTENT.subtitle}
            </span>
            <h2 className="team-reveal text-[clamp(3rem,6vw,4rem)] font-bold text-white leading-[1] tracking-[-0.03em]">
              {TEAM_CONTENT.title.split(" ").map((word, i) => (
                <span key={i}>
                  {word === "Innovators" ? (
                    <span className="text-green-primary">{word}</span>
                  ) : (
                    word
                  )}{" "}
                </span>
              ))}
            </h2>
          </div>
          <p className="team-reveal text-base md:text-lg text-white/80 font-light max-w-xs md:mb-3 md:text-right">
            {TEAM_CONTENT.description}
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {TEAM_MEMBERS.map((member, i) => (
            <div
              key={member.id}
              className="team-reveal h-[450px] [perspective:1000px] group"
            >
              <motion.div className="relative w-full h-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                {/* Front Side */}
                <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-[32px] overflow-hidden bg-white/[0.03] border border-white/10 p-2">
                  <div className="relative w-full h-full rounded-[24px] overflow-hidden bg-[#0c0c0e]">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover object-top opacity-80 transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                    <div className="absolute bottom-8 left-8 right-8">
                      <h3 className="text-xl font-bold text-white mb-1">
                        {member.name}
                      </h3>
                      <span className="text-green-primary text-[10px] font-bold uppercase tracking-widest">
                        {member.role}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Back Side */}
                <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-[32px] overflow-hidden bg-green-primary border border-green-primary p-8 flex flex-col justify-between">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-2xl font-black text-black">
                        {member.name}
                      </h3>
                      <span className="text-black/60 text-[10px] font-black uppercase tracking-widest">
                        {member.role}
                      </span>
                    </div>
                    <p className="text-black/80 text-sm leading-relaxed font-medium">
                      {member.bio}
                    </p>
                  </div>

                  <div className="flex gap-4">
                    {Object.entries(member.socials).map(([key, val]) => (
                      <a
                        key={key}
                        href={val}
                        className="w-10 h-10 rounded-full bg-black/10 flex items-center justify-center hover:bg-black hover:text-white transition-all text-black"
                      >
                        <span className="text-[10px] font-black uppercase">
                          {key[0]}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
