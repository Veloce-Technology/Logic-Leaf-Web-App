"use client";
import { useLenis } from "@/hooks/useLenis";
import "@/lib/gsap";
import Navbar from "@/components/Navigation/Navbar";
import ParticleField from "@/components/ThreeBackground/ParticleField";
import HeroSection from "@/components/Hero/HeroSection";
import SecondSection from "@/components/SecondSection/SecondSection";
import AboutSection from "@/components/About/AboutSection";
import LogoCarousel from "@/components/Logos/LogoCarousel";
import ServicesSection from "@/components/Services/ServicesSection";
import TimelineSection from "@/components/Timeline/TimelineSection";
import TeamSection from "@/components/Team/TeamSection";
import ContactSection from "@/components/Contact/ContactSection";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  useLenis();

  return (
    <main className="relative min-h-screen bg-black overflow-x-hidden">
      {/* Background Layer: Three.js Particles */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-30">
        <ParticleField />
      </div>

      {/* Front Layer: Content */}
      <div className="relative z-10 w-full">
        <Navbar />
        
        {/* Step 1: Cinematic Hero & Zoom */}
        <HeroSection />

        {/* Step 2: Infinite Brand Partners */}
        <LogoCarousel />

        {/* Step 3: Core Identity & About Us */}
        <AboutSection />
        
        {/* Step 4: Value Proposition (Feature Cards) */}
        <SecondSection />

        {/* Step 5: Service Offerings */}
        <ServicesSection />

        {/* Step 6: Development Lifecycle */}
        <TimelineSection />

        {/* Step 7: The Team */}
        <TeamSection />

        {/* Step 8: Communication & Contact */}
        <ContactSection />

        {/* Step 9: Final Navigation & Footer */}
        <Footer />
      </div>
      
      {/* Subtle global edge vignette */}
      <div className="fixed inset-0 pointer-events-none z-50 shadow-[inset_0_0_250px_rgba(0,0,0,1)]" />
    </main>
  );
}
