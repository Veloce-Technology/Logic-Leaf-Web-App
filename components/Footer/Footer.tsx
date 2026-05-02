"use client";
import { FOOTER_CONTENT } from "./FooterConstants";
import { NAV_CONFIG } from "../Navigation/NavConstants";

export default function Footer() {
  const SOCIALS = [
    {
      name: "LinkedIn",
      icon: (
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
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
          <rect x="2" y="9" width="4" height="12"></rect>
          <circle cx="4" cy="4" r="2"></circle>
        </svg>
      ),
      href: "#",
    },
    {
      name: "Twitter",
      icon: (
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
          <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
        </svg>
      ),
      href: "#",
    },
    {
      name: "Instagram",
      icon: (
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
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      ),
      href: "#",
    },
    {
      name: "GitHub",
      icon: (
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
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
        </svg>
      ),
      href: "#",
    },
  ];

  return (
    <footer className="relative bg-black pt-20 pb-12 font-dm border-t border-white/5 overflow-hidden flex flex-col justify-between">
      {/* 3D Animated Waves Background - Absolute and behind content */}
      <div className="absolute bottom-0 left-0 w-full h-[200px] md:h-[300px] overflow-hidden pointer-events-none z-0">
        <svg
          className="absolute bottom-0 left-0 block w-[calc(160%+1.3px)] h-full opacity-60"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          {/* Layer 1: Deepest - Flipped path to grow from bottom */}
          <path
            d="M0,120V73.71c47.79-22.2,103.59-32.17,158-28,70.36,5.37,136.33,33.31,206.8,37.5,73.84,4.34,147.54-16.9,218.2-35.28,69.27-18,138.3-24.88,209.4-13.08,36.15,6,69.85,17.84,104.45,29.34C989.49,95,1113,134.29,1200,67.53V120Z"
            fill="rgba(13, 205, 106, 0.08)"
            className="animate-wave-slow"
          ></path>
          {/* Layer 2: Middle */}
          <path
            d="M0,120V104.19C13,83.08,27.64,63.14,47.69,47.95c51.72-39.22,117.31-38.95,176.89-19.53,31.15,10.15,60.09,26.07,89.67,39.8,40.92,19,84.73,46,130.83,49.67,36.26,2.85,70.9-9.42,98.6-31.56,31.77-25.39,62.32-62,103.63-73,40.44-10.79,81.35,6.69,119.13,24.28s75.16,39,116.92,43.05c59.73,5.85,113.28-22.88,168.9-38.84,30.2-8.66,59-6.17,87.09,7.5,22.43,10.89,48,26.93,60.65,49.24V120Z"
            fill="rgba(13, 205, 106, 0.12)"
            className="animate-wave-medium"
          ></path>
          {/* Layer 3: Front */}
          <path
            d="M0,120V114.37C149.93,61,314.09,48.68,475.83,77.43c43,7.64,84.23,20.12,127.61,26.46,59,8.63,112.48-12.24,165.56-35.4C827.93,42.78,886,24.76,951.2,30c86.53,7,172.46,45.71,248.8,84.81V120Z"
            fill="rgba(13, 205, 106, 0.18)"
            className="animate-wave-fast"
          ></path>
        </svg>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-24 mb-20">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-12">
            {/* Larger White Logo */}
            <div className="flex items-center gap-3">
              <img
                src={NAV_CONFIG.logoUrl}
                alt={NAV_CONFIG.logoAlt}
                className="h-16 md:h-20 w-auto object-contain brightness-0 invert"
              />
            </div>

            <p className="text-white/60 text-base leading-relaxed font-light max-w-sm">
              {FOOTER_CONTENT.tagline}
            </p>

            {/* Social Media Icons */}
            <div className="flex gap-5">
              {SOCIALS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-white/40 hover:text-green-primary hover:border-green-primary hover:bg-green-primary/5 transition-all duration-500"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-12">
            {FOOTER_CONTENT.sections.map((section) => (
              <div key={section.title} className="space-y-8">
                <h4 className="text-[10px] font-bold text-white/40 uppercase tracking-[0.3em]">
                  {section.title}
                </h4>
                <ul className="space-y-4">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-white/60 hover:text-green-primary transition-colors duration-300"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
            <p className="text-[10px] font-medium text-white/40 uppercase tracking-widest">
              {FOOTER_CONTENT.copyright}
            </p>
            <span className="hidden md:block w-1 h-1 rounded-full bg-white/10" />
            <p className="text-[10px] font-medium text-white/40 uppercase tracking-widest">
              Powered by{" "}
              <a
                href="https://www.veloce-technology.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-green-primary transition-colors duration-300"
              >
                Veloce Technology (PVT) LTD
              </a>
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes wave {
          0% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(-20%);
          }
          100% {
            transform: translateX(0);
          }
        }
        .animate-wave-slow {
          animation: wave 18s ease-in-out infinite;
        }
        .animate-wave-medium {
          animation: wave 12s ease-in-out infinite;
        }
        .animate-wave-fast {
          animation: wave 8s ease-in-out infinite;
        }
      `}</style>
    </footer>
  );
}
