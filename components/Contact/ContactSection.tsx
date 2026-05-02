"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { CONTACT_CONTENT } from "./ContactConstants";

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-reveal",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.1,
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
      id="contact"
      ref={sectionRef}
      className="relative bg-black py-20 overflow-hidden font-dm border-t border-white/5"
    >
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>
      <div className="absolute -top-24 -right-24 w-[500px] h-[500px] bg-green-primary/[0.05] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-[500px] h-[500px] bg-green-primary/[0.05] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        {/* Header - Aligned with TimelineSection */}
        <div className="mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-10">
          <div className="max-w-2xl">
            <span className="contact-reveal text-green-primary font-bold tracking-[0.3em] uppercase text-[10px] md:text-xs block mb-5">
              {CONTACT_CONTENT.subtitle}
            </span>
            <h2 className="contact-reveal text-[clamp(2.8rem,6vw,4rem)] font-bold text-white leading-[1.1] tracking-[-0.03em]">
              {CONTACT_CONTENT.title.split(" ").map((word, i) => (
                <span key={i}>
                  {word === "Extraordinary" ? (
                    <span className="text-green-primary">{word}</span>
                  ) : (
                    word
                  )}{" "}
                </span>
              ))}
            </h2>
          </div>
          <p className="contact-reveal text-base md:text-lg text-white/80 font-light max-w-sm md:mb-3 md:text-right leading-relaxed">
            {CONTACT_CONTENT.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">
          {/* Left Side: Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="contact-reveal group p-8 rounded-[32px] bg-white/[0.02] border border-white/5 hover:border-green-primary/30 transition-all duration-500 backdrop-blur-xl">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-2xl bg-green-primary/10 flex items-center justify-center text-green-primary group-hover:bg-green-primary group-hover:text-black transition-all duration-500">
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
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-white/60 uppercase tracking-[0.2em]">
                    Drop us a line
                  </span>
                  <p className="text-xl md:text-2xl font-bold text-white group-hover:text-green-primary transition-colors">
                    {CONTACT_CONTENT.email}
                  </p>
                </div>
              </div>
            </div>

            <div className="contact-reveal group p-8 rounded-[32px] bg-white/[0.02] border border-white/5 hover:border-green-primary/30 transition-all duration-500 backdrop-blur-xl">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-2xl bg-green-primary/10 flex items-center justify-center text-green-primary group-hover:bg-green-primary group-hover:text-black transition-all duration-500">
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
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-white/60 uppercase tracking-[0.2em]">
                    Give us a call
                  </span>
                  <p className="text-xl md:text-2xl font-bold text-white group-hover:text-green-primary transition-colors">
                    {CONTACT_CONTENT.phone}
                  </p>
                </div>
              </div>
            </div>

            <div className="contact-reveal group p-8 rounded-[32px] bg-white/[0.02] border border-white/5 hover:border-green-primary/30 transition-all duration-500 backdrop-blur-xl">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-2xl bg-green-primary/10 flex items-center justify-center text-green-primary group-hover:bg-green-primary group-hover:text-black transition-all duration-500">
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
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-white/60 uppercase tracking-[0.2em]">
                    Visit our studio
                  </span>
                  <p className="text-lg md:text-xl font-medium text-white group-hover:text-green-primary transition-colors leading-snug">
                    {CONTACT_CONTENT.address}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="lg:col-span-7">
            <div className="contact-reveal p-8 md:p-12 rounded-[40px] bg-white/[0.03] border border-white/10 backdrop-blur-3xl shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-primary/10 blur-[60px] pointer-events-none" />

              <form className="space-y-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="group space-y-3">
                    <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] ml-1 group-focus-within:text-green-primary transition-colors">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder={CONTACT_CONTENT.form.namePlaceholder}
                      className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/10 focus:outline-none focus:border-green-primary/50 focus:bg-white/[0.07] transition-all duration-300"
                    />
                  </div>
                  <div className="group space-y-3">
                    <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] ml-1 group-focus-within:text-green-primary transition-colors">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder={CONTACT_CONTENT.form.emailPlaceholder}
                      className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/10 focus:outline-none focus:border-green-primary/50 focus:bg-white/[0.07] transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="group space-y-3">
                  <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] ml-1 group-focus-within:text-green-primary transition-colors">
                    Project Subject
                  </label>
                  <input
                    type="text"
                    placeholder={CONTACT_CONTENT.form.subjectPlaceholder}
                    className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/10 focus:outline-none focus:border-green-primary/50 focus:bg-white/[0.07] transition-all duration-300"
                  />
                </div>

                <div className="group space-y-3">
                  <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] ml-1 group-focus-within:text-green-primary transition-colors">
                    Message Details
                  </label>
                  <textarea
                    rows={4}
                    placeholder={CONTACT_CONTENT.form.messagePlaceholder}
                    className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/10 focus:outline-none focus:border-green-primary/50 focus:bg-white/[0.07] transition-all duration-300 resize-none"
                  />
                </div>

                <button className="group relative w-full overflow-hidden rounded-2xl bg-green-primary py-5 text-black transition-all duration-500 hover:shadow-[0_0_30px_rgba(13,205,106,0.4)] cursor-pointer">
                  <span className="relative z-10 text-xs font-black uppercase tracking-[0.3em]">
                    {CONTACT_CONTENT.form.buttonText}
                  </span>
                  <div className="absolute inset-0 bg-white translate-y-full transition-transform duration-500 group-hover:translate-y-0" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
