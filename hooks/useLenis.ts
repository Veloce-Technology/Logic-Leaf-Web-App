// hooks/useLenis.ts
'use client';
import { useEffect } from 'react';
import Lenis from 'lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gsap } from '@/lib/gsap';

export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      syncTouch: true, // Crucial for trackpad/touch consistency
    });

    // Handle pointer events during scroll to prevent iframe "freezing"
    lenis.on('scroll', (e: any) => {
      ScrollTrigger.update();
      
      // If we're scrolling fast, temporarily disable pointer events on the iframe
      // This prevents the trackpad from "falling into" the 3D model container
      if (Math.abs(e.velocity) > 0.1) {
        document.body.classList.add('is-scrolling');
      } else {
        document.body.classList.remove('is-scrolling');
      }
    });

    const gsapTicker = gsap.ticker.add((time: number) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Global CSS to handle the scroll state
    const style = document.createElement('style');
    style.innerHTML = `
      .is-scrolling iframe { pointer-events: none !important; }
      .is-scrolling .pointer-events-auto { pointer-events: none !important; }
    `;
    document.head.appendChild(style);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(gsapTicker);
      document.head.removeChild(style);
    };
  }, []);
}
