"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "@/lib/gsap";
import { PROJECTS, PORTFOLIO_CONTENT } from "./PortfolioConstants";
import Image from "next/image";

export default function PortfolioSection() {
  const [selectedProject, setSelectedProject] = useState<
    (typeof PROJECTS)[0] | null
  >(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Scroll Lock
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedProject]);

  // Entrance Animations
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".portfolio-reveal",
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

  // Update active index based on scroll position
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const scrollLeft = scrollRef.current.scrollLeft;
    const cardWidth = scrollRef.current.offsetWidth / 2; // Approximate
    const newIndex = Math.round(scrollLeft / 480); // 450 card + 32 gap
    setActiveIndex(Math.min(Math.max(0, newIndex), PROJECTS.length - 1));
  };

  // Scroll to specific project
  const scrollToProject = (index: number) => {
    if (!scrollRef.current) return;
    const cardWidth = 532; // 500 card + 32 gap
    scrollRef.current.scrollTo({
      left: index * cardWidth,
      behavior: "smooth",
    });
    setActiveIndex(index);
  };

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="relative bg-black py-20 md:py-20 overflow-hidden font-dm"
    >
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-primary/[0.03] blur-[120px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        {/* Header - Aligned with TimelineSection style */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-10">
          <div className="max-w-2xl">
            <span className="portfolio-reveal text-green-primary font-bold tracking-[0.4em] uppercase text-[10px] md:text-xs block mb-5">
              {PORTFOLIO_CONTENT.subtitle}
            </span>
            <h2 className="portfolio-reveal text-[clamp(2.5rem,6vw,4rem)] font-bold text-white leading-[1] tracking-[-0.03em]">
              Our <span className="text-green-primary">Portfolio</span>
            </h2>
          </div>

          <p className="portfolio-reveal text-base md:text-lg text-white/80 font-light max-w-xs md:mb-3 md:text-right">
            {PORTFOLIO_CONTENT.description}
          </p>
        </div>

        {/* Carousel with Indicators */}
        <div className="relative group/carousel">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-8 overflow-x-auto pb-10 no-scrollbar snap-x snap-mandatory cursor-grab active:cursor-grabbing"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {PROJECTS.map((project) => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="relative flex-shrink-0 w-[320px] md:w-[500px] aspect-[16/10] snap-start rounded-[24px] overflow-hidden bg-black border border-white/10 transition-all duration-500 hover:border-green-primary/30 group"
              >
                {/* Image Container - Better fitting and black background */}
                <div className="absolute inset-0 z-0 bg-black">
                  <Image
                    src={project.url}
                    alt={project.title}
                    fill
                    className="object-contain opacity-70 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-60"
                    sizes="(max-width: 768px) 320px, 500px"
                  />
                  {/* Darker overlay for better readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
                  <span className="text-green-primary text-[10px] font-bold uppercase tracking-[0.3em] mb-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    {project.category}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    {project.title}
                  </h3>

                  <div className="flex items-center gap-3 text-white/60 text-[10px] font-bold uppercase tracking-widest group-hover:text-white transition-colors duration-500">
                    <span>View Project</span>
                    <div className="w-8 h-px bg-white/40 group-hover:w-12 group-hover:bg-green-primary transition-all duration-500" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Indicators */}
          <div className="flex items-center gap-3 mt-4 justify-center md:justify-start">
            {PROJECTS.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToProject(i)}
                className={`h-1.5 rounded-full transition-all duration-500 hover:bg-green-primary/50 ${
                  activeIndex === i
                    ? "w-12 bg-green-primary"
                    : "w-4 bg-white/10"
                }`}
                aria-label={`Go to project ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Improved Full-Screen Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/95 backdrop-blur-3xl"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-[95%] max-w-6xl bg-[#08080a] border border-white/10 rounded-[32px] overflow-hidden flex flex-col lg:flex-row h-auto max-h-[90vh] shadow-2xl"
            >
              {/* Image Side - Optimized for fitting */}
              <div className="relative w-full lg:w-[60%] bg-[#0c0c0e] flex items-center justify-center p-6 md:p-12 border-b lg:border-b-0 lg:border-r border-white/5">
                <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-black">
                  <Image
                    src={selectedProject.url}
                    alt={selectedProject.title}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

              {/* Content Side - Natural Height */}
              <div className="w-full lg:w-[40%] p-8 md:p-12 overflow-y-auto bg-gradient-to-br from-white/[0.02] to-transparent relative">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all z-20"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>

                <div className="space-y-10">
                  <div className="space-y-4">
                    <span className="text-green-primary text-xs font-bold uppercase tracking-[0.4em] block">
                      {selectedProject.category}
                    </span>
                    <h2 className="text-2xl md:text-4xl font-bold text-white leading-tight tracking-tight">
                      {selectedProject.title}
                    </h2>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-white/20 text-[10px] font-bold uppercase tracking-[0.2em]">
                      Project Overview
                    </h4>
                    <p className="text-white/70 text-sm md:text-base leading-relaxed font-light">
                      {selectedProject.description}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-white/20 text-[10px] font-bold uppercase tracking-[0.2em]">
                      Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tech.map((t, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/5 text-white/80 text-[10px] font-medium"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6">
                    <button className="w-full py-4 rounded-xl bg-white text-black font-black text-[11px] uppercase tracking-[0.2em] hover:bg-green-primary transition-all duration-500">
                      View Live Project
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
