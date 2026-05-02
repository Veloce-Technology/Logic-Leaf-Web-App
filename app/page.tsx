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
import CapabilitiesSection from "@/components/Capabilities/CapabilitiesSection";
import PortfolioSection from "@/components/Portfolio/PortfolioSection";
import TimelineSection from "@/components/Timeline/TimelineSection";
import TeamSection from "@/components/Team/TeamSection";
import ContactSection from "@/components/Contact/ContactSection";
import Footer from "@/components/Footer/Footer";
import MissionSection from "@/components/Mission/MissionSection";
import CarouselSection from "@/components/CarouselSection/CarouselSection";
import CTABanner from "@/components/CTABanner/CTABanner";
import BackToTop from "@/components/Navigation/BackToTop";
import Preloader from "@/components/Navigation/Preloader";




export default function Home() {
  useLenis();

  return (
    <main className="relative min-h-screen bg-black overflow-x-hidden">
      <Preloader />
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

        {/* Step 4: Core Identity & About Us */}
        <AboutSection />

        {/* Step 4.5: Philosophy & Mission */}
        <MissionSection />

        {/* Step 4.7: Interactive Service Carousel */}
        <CarouselSection />

        {/* Step 3: Service Offerings */}
        <ServicesSection />

        {/* Step 3.2: Specialized Capabilities */}
        <CapabilitiesSection />

        {/* Step 3.5: Project Portfolio */}
        <PortfolioSection />

        {/* Step 5: Value Proposition (Feature Cards) */}
        {/* <SecondSection /> */}

        {/* Step 6: Development Lifecycle */}
        <TimelineSection />

        {/* Step 7: The Team */}
        <TeamSection />

        {/* Step 8: Communication & Contact */}
        <ContactSection />

        {/* Step 8.5: Final CTA Banner */}
        <CTABanner />

        {/* Step 9: Final Navigation & Footer */}
        <Footer />
        <BackToTop />
      </div>


      {/* Subtle global edge vignette — soft so it doesn't block mobile model */}
      <div className="fixed inset-0 pointer-events-none z-[45] shadow-[inset_0_0_80px_rgba(0,0,0,0.55)]" />
    </main>
  );
}
