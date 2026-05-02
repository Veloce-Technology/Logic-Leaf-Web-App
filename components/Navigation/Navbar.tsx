"use client";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS, NAV_CONFIG } from "./NavConstants";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (href.startsWith("#")) {
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        gsap.to(window, {
          duration: 1.2,
          scrollTo: {
            y: targetElement,
            offsetY: 80, 
          },
          ease: "power3.inOut",
        });
      }
    } else {
      window.location.href = href;
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-[5000] transition-all duration-500 ease-in-out font-dm ${
          isScrolled || isMobileMenuOpen 
            ? "py-4 bg-black/95 backdrop-blur-2xl shadow-2xl border-b border-white/5" 
            : "py-7 bg-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <div className="relative z-[5100]">
            <a
              href="/"
              className="transition-all hover:scale-110 active:scale-90 block"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <img
                src={NAV_CONFIG.logoUrl}
                alt={NAV_CONFIG.logoAlt}
                className="h-10 md:h-14 w-auto object-contain brightness-0 invert"
              />
            </a>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:block bg-white/[0.03] backdrop-blur-2xl border border-white/10 px-8 py-2.5 rounded-full">
            <ul className="flex items-center gap-10 list-none m-0 p-0">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-[13px] font-medium text-white hover:text-green-primary transition-colors tracking-wide"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-6 relative z-[5100]">
            <div className="hidden sm:block">
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
                className="flex items-center gap-3 px-1.5 py-1.5 pl-6 bg-green-primary rounded-full group transition-all hover:shadow-[0_0_20px_rgba(13,205,106,0.4)]"
              >
                <span className="text-[11px] font-black text-black uppercase tracking-wider">
                  {NAV_CONFIG.ctaText}
                </span>
                <div className="flex items-center justify-center bg-black text-green-primary w-7 h-7 rounded-full transition-transform group-hover:rotate-45">
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                    <path d="M6 12l4-4-4-4" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </a>
            </div>

            {/* Mobile Burger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex md:hidden flex-col gap-1.5 p-2 focus:outline-none"
              aria-label="Toggle Menu"
            >
              <motion.div
                animate={isMobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                className="w-6 h-0.5 bg-white rounded-full transition-colors"
              />
              <motion.div
                animate={isMobileMenuOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                className="w-6 h-0.5 bg-white rounded-full transition-colors"
              />
              <motion.div
                animate={isMobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                className="w-6 h-0.5 bg-white rounded-full transition-colors"
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-[4000] flex flex-col items-center justify-center px-6 md:hidden overflow-hidden"
          >
            {/* Background Decorative Element */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
                <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #0DCD6A 1px, transparent 0)', backgroundSize: '40px 40px' }} />
            </div>
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-primary/[0.05] rounded-full blur-[120px] pointer-events-none" />

            <ul className="flex flex-col items-center gap-10 list-none p-0 m-0 relative z-10">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-[12vw] font-bold text-white hover:text-green-primary transition-colors tracking-tighter"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-16 relative z-10 w-full max-w-[280px]"
            >
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
                className="flex items-center justify-center gap-4 py-5 bg-green-primary text-black rounded-full font-black uppercase tracking-[0.2em] text-xs hover:shadow-[0_0_30px_rgba(13,205,106,0.4)] transition-all"
              >
                {NAV_CONFIG.ctaText}
                <div className="w-8 h-8 rounded-full bg-black text-green-primary flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
                </div>
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
