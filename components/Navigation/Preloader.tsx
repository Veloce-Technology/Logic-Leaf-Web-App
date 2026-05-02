"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "@/lib/gsap";
import { NAV_CONFIG } from "./NavConstants";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading progress with high-end pacing
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Small delay at 100% for the user to see completion
          setTimeout(() => setIsLoaded(true), 500);
          return 100;
        }
        // Varied increments for a more "organic" feel
        const diff = Math.random() * 15;
        return Math.min(prev + diff, 100);
      });
    }, 150);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "unset";
    };
  }, []);

  useEffect(() => {
    if (!isLoaded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isLoaded]);

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            y: "-100%",
            transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[10000] bg-black flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Background Ambient Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(13,205,106,0.05)_0%,transparent_70%)] pointer-events-none" />

          {/* Logo Container */}
          <div className="relative z-10 mb-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative"
            >
              <img
                src={NAV_CONFIG.logoUrl}
                alt="Logic Leaf"
                className="h-24 md:h-34 w-auto brightness-0 invert"
              />

              {/* Pulsing Light behind logo */}
              <motion.div
                animate={{
                  opacity: [0.1, 0.3, 0.1],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 bg-green-primary/20 blur-[40px] -z-10 rounded-full"
              />
            </motion.div>
          </div>

          {/* Progress Section */}
          <div className="relative z-10 w-full max-w-[280px] md:max-w-[400px]">
            {/* Counter */}
            <div className="flex justify-between items-end mb-4">
              <span className="text-[10px] font-black text-green-primary uppercase tracking-[0.4em]">
                System Initializing
              </span>
              <span className="text-4xl md:text-5xl font-bold text-white tracking-tighter font-mono">
                {Math.round(progress)}%
              </span>
            </div>

            {/* Progress Bar Container */}
            <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-green-primary shadow-[0_0_15px_rgba(13,205,106,0.8)]"
              />
            </div>

            {/* Moving Light Trail on Bar */}
            <motion.div
              animate={{ x: ["0%", "1000%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute top-[52px] left-0 w-20 h-[2px] bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-y-full"
            />
          </div>

          {/* Footer Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-10 left-0 right-0 text-center"
          >
            <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.5em]">
              Logic Leaf Technologies &copy; 2026
            </p>
          </motion.div>

          {/* Interactive Mouse Trail (Optional - subtle light follows mouse) */}
          <div
            className="fixed inset-0 z-0 pointer-events-none opacity-20"
            style={{
              background:
                "radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(13,205,106,0.1), transparent 40%)",
            }}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              e.currentTarget.style.setProperty(
                "--mouse-x",
                `${e.clientX - rect.left}px`,
              );
              e.currentTarget.style.setProperty(
                "--mouse-y",
                `${e.clientY - rect.top}px`,
              );
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
