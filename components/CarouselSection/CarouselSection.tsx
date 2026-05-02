"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import {
  CAROUSEL_SECTION_CONTENT,
  PROJECT_IMAGES,
} from "./CarouselSectionConstants";
import Image from "next/image";

export default function CarouselSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Seamless Horizontal Loop
      const images = gsap.utils.toArray(".carousel-item");
      const totalWidth = trackRef.current!.scrollWidth / 2;

      gsap.to(trackRef.current, {
        x: -totalWidth,
        duration: 20,
        ease: "none",
        repeat: -1,
      });

      // 2. Scroll-Driven 3D Angle/Tilt Effect
      gsap.fromTo(
        carouselRef.current,
        { rotateY: 15, skewX: -5, scale: 0.9 },
        {
          rotateY: -15,
          skewX: 5,
          scale: 1.1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        },
      );

      // 3. Text Reveal
      gsap.from(".reveal-text", {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-black py-20 md:py-32 overflow-hidden font-dm"
      style={{ perspective: "2000px" }}
    >
      {/* Background Carousel */}
      <div
        ref={carouselRef}
        className="absolute inset-0 flex items-center opacity-30 z-0 pointer-events-none"
      >
        <div ref={trackRef} className="flex gap-8 whitespace-nowrap">
          {/* Double the images for seamless loop */}
          {[...PROJECT_IMAGES, ...PROJECT_IMAGES].map((img, i) => (
            <div
              key={i}
              className="carousel-item relative w-[400px] h-[150px] md:w-[600px] md:h-[300px] flex-shrink-0 rounded-2xl overflow-hidden transition-all duration-700 border border-white/10"
            >
              <Image
                src={img.url}
                alt={img.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 400px, 600px"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Overlay Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="max-w-4xl">
          {/* <span className="reveal-text text-white/60 font-medium tracking-widest uppercase text-xs md:text-sm block mb-6">
            {CAROUSEL_SECTION_CONTENT.subtitle}
          </span> */}

          <div className="space-y-2">
            {CAROUSEL_SECTION_CONTENT.items.map((item, i) => (
              <h2
                key={i}
                className="reveal-text text-[clamp(3.0rem,8vw,6rem)] font-medium text-white leading-[1] tracking-tight hover:text-green-primary hover:cursor-pointer transition-colors duration-500"
              >
                {item}
              </h2>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-10" />
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent z-10" />
    </section>
  );
}
