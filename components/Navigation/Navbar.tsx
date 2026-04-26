"use client";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS, NAV_CONFIG } from "./NavConstants";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!navRef.current) return;
      if (window.scrollY > 40) {
        navRef.current.classList.add("py-3", "bg-black/60", "backdrop-blur-xl");
        navRef.current.classList.remove("py-6");
      } else {
        navRef.current.classList.add("py-6");
        navRef.current.classList.remove(
          "py-3",
          "bg-black/60",
          "backdrop-blur-xl",
        );
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-[150] py-6 transition-all duration-500 ease-in-out font-dm"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Pure White Logo Upgrade */}
        <motion.div
          initial={{ opacity: 0, x: -25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-[160]"
        >
          <a
            href="/"
            className="transition-all hover:scale-110 active:scale-90"
          >
            <img
              src={NAV_CONFIG.logoUrl}
              alt={NAV_CONFIG.logoAlt}
              className="h-12 md:h-14 w-auto object-contain brightness-0 invert"
            />
          </a>
        </motion.div>

        {/* Desktop Links Pill */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="hidden md:block bg-white/[0.03] backdrop-blur-2xl border border-white/10 px-8 py-2.5 rounded-full"
        >
          <ul className="flex items-center gap-10 list-none m-0 p-0">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-[13px] font-medium text-white hover:text-green-primary transition-colors tracking-wide"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Desktop CTA & Mobile Toggle */}
        <div className="flex items-center gap-4 relative z-[160]">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="hidden sm:block"
          >
            <a
              href="#contact"
              className="flex items-center gap-3 px-1.5 py-1.5 pl-6 bg-green-primary rounded-full group transition-all hover:shadow-[0_0_20px_rgba(13,205,106,0.4)]"
            >
              <span className="text-[11px] font-black text-black uppercase tracking-wider">
                {NAV_CONFIG.ctaText}
              </span>
              <div className="flex items-center justify-center bg-black text-green-primary w-7 h-7 rounded-full transition-transform group-hover:rotate-45">
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M6 12l4-4-4-4"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </a>
          </motion.div>

          {/* Mobile Burger Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex md:hidden flex-col gap-1.5 p-2"
          >
            <motion.div
              animate={
                isMobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }
              }
              className="w-6 h-0.5 bg-white rounded-full"
            />
            <motion.div
              animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-6 h-0.5 bg-white rounded-full"
            />
            <motion.div
              animate={
                isMobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }
              }
              className="w-6 h-0.5 bg-white rounded-full"
            />
          </button>
        </div>
      </div>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-black z-[150] flex flex-col items-center justify-center pt-20 px-6 md:hidden"
          >
            <ul className="flex flex-col items-center gap-8 list-none p-0 m-0">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <a
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-2xl font-bold text-white hover:text-green-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-12"
            >
              <a
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-10 py-4 bg-green-primary text-black rounded-full font-black uppercase tracking-widest text-sm"
              >
                {NAV_CONFIG.ctaText}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
