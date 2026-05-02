"use client";
import { useEffect, useRef, useState, useMemo } from "react";
import { gsap } from "@/lib/gsap";
import { MISSION_CONTENT } from "./MissionConstants";

export default function MissionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const circleTextRef = useRef<SVGTextElement>(null);

  // Use a ref for the timeline so it persists across re-renders
  const tl = useRef<gsap.core.Tween | null>(null);

  const [repeatCount, setRepeatCount] = useState(5);

  useEffect(() => {
    const handleResize = () => {
      setRepeatCount(window.innerWidth < 768 ? 4 : 5);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const ctx = gsap.context(() => {
      // Reveal animation
      gsap.fromTo(
        [textRef.current, buttonRef.current],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        },
      );

      // 2. Assigning gsap.to() now matches the Tween type
      tl.current = gsap.to(circleTextRef.current, {
        rotation: -360,
        transformOrigin: "center center",
        duration: 10,
        repeat: -1,
        ease: "none",
        paused: true,
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getCircularText = (phrase: string, count: number) => {
    const formattedPhrase = phrase.replace(" ", "\u00A0");
    return new Array(count)
      .fill(formattedPhrase)
      .join("\u00A0\u00A0\u00A0\u00A0");
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-black py-20 overflow-hidden font-dm"
    >
      <div className="max-w-[1000px] mx-auto px-6 md:px-12">
        <div ref={textRef} className="max-w-4xl mb-12">
          <h2 className="text-[clamp(1.8rem,4.5vw,3.5rem)] font-semibold text-white leading-[1.1] tracking-[-0.03em]">
            {MISSION_CONTENT.heading.main}{" "}
            <span className="text-white/40 italic font-light">
              {MISSION_CONTENT.heading.highlight}
            </span>{" "}
            {MISSION_CONTENT.heading.suffix}
          </h2>
        </div>

        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-12 pt-8">
          <div
            ref={buttonRef}
            /* Use React Events instead of manual addEventListener for stability */
            onMouseEnter={() => tl.current?.play()}
            onMouseLeave={() => tl.current?.pause()}
            className="relative w-36 h-36 md:w-52 md:h-52 flex items-center justify-center cursor-pointer md:ml-12 group"
          >
            <div className="absolute inset-0 rounded-full border border-white/20 transition-all duration-700 ease-out group-hover:bg-white group-hover:border-white overflow-hidden">
              <svg
                viewBox="0 0 100 100"
                className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-110"
              >
                <defs>
                  <path
                    id="circlePath"
                    d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
                  />
                </defs>
                <text
                  ref={circleTextRef}
                  className="uppercase font-bold fill-black"
                  style={{ fontSize: "4.2px" }}
                >
                  <textPath
                    xlinkHref="#circlePath"
                    textLength="230"
                    startOffset="0"
                  >
                    {getCircularText("READ MORE", repeatCount)}
                  </textPath>
                </text>
              </svg>
            </div>

            <div className="relative z-10 w-full h-full flex items-center justify-center pointer-events-none">
              <svg
                className="w-10 h-10 md:w-14 md:h-14 text-white group-hover:text-black transition-colors duration-500 transform group-hover:translate-x-1 group-hover:-translate-y-1"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M3 13L13 3M13 3H5M13 3V11"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          <div className="max-w-lg">
            <p className="text-white/80 text-base md:text-lg leading-relaxed font-light">
              {MISSION_CONTENT.description}
            </p>
            <div className="mt-8 w-90% h-px bg-white/60" />
          </div>
        </div>
      </div>
    </section>
  );
}
