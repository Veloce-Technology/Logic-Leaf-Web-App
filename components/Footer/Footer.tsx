"use client";
import { FOOTER_CONTENT } from "../../constants/SiteConstants";
import { NAV_CONFIG } from "../Navigation/NavConstants";

export default function Footer() {
  return (
    <footer className="bg-black pt-24 pb-12 border-t border-white/5 font-dm">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-8 mb-20">
          
          {/* Logo & Info */}
          <div className="md:col-span-2">
            <a href="/" className="inline-block mb-8">
              <img
                src={NAV_CONFIG.logoUrl}
                alt={NAV_CONFIG.logoAlt}
                className="h-10 w-auto brightness-0 invert"
              />
            </a>
            <p className="text-white/40 text-sm leading-relaxed max-w-sm mb-10">
              Logic Leaf is at the forefront of digital innovation, building high-performance software that solves real-world problems.
            </p>
            <div className="flex items-center gap-6">
              {FOOTER_CONTENT.socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-white/30 hover:text-green-primary transition-colors text-sm font-medium"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-8">Navigation</h4>
            <ul className="space-y-4 list-none p-0">
              {FOOTER_CONTENT.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-white/40 hover:text-green-primary transition-colors text-sm">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-8">Contact</h4>
            <ul className="space-y-4 list-none p-0 text-white/40 text-sm">
              <li>hello@logicleaf.tech</li>
              <li>+1 (555) 000-0000</li>
              <li>123 Innovation Drive,<br/>Tech City, TC 10101</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="text-white/20 text-xs tracking-wide">
            {FOOTER_CONTENT.copyRight}
          </span>
          <div className="flex items-center gap-8">
             <a href="#" className="text-white/20 hover:text-white/40 text-xs transition-all">Privacy Policy</a>
             <a href="#" className="text-white/20 hover:text-white/40 text-xs transition-all">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
