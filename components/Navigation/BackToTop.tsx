"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down past 500px
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    // Cinematic scroll to top using GSAP
    gsap.to(window, {
      duration: 1.5,
      scrollTo: { y: 0, autoKill: false },
      ease: "power4.inOut",
      onStart: () => {
        // Disable scroll interaction during jump to prevent freezing
        document.body.style.pointerEvents = "none";
      },
      onComplete: () => {
        // Re-enable interactions and refresh ScrollTrigger
        document.body.style.pointerEvents = "auto";
        ScrollTrigger.refresh();
      },
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          whileHover={{ y: -5, scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          className="fixed bottom-10 right-6 md:right-12 z-[100] w-12 h-12 md:w-14 md:h-14 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white/50 hover:text-green-primary hover:border-green-primary/50 shadow-2xl group transition-all duration-300 cursor-pointer"
          aria-label="Back to top"
        >
          {/* Decorative Ring */}
          <div className="absolute inset-0 rounded-full border border-green-primary/0 group-hover:border-green-primary/20 group-hover:scale-125 transition-all duration-700 pointer-events-none" />
          
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-500 group-hover:-translate-y-1"
          >
            <path d="M18 15l-6-6-6 6" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
