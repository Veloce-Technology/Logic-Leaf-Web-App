# Logic Leaf — Developer Instructions

## Project Overview

**Logic Leaf** is a modern 3D website built with:
| Technology | Purpose |
|---|---|
| **Next.js 14** (App Router) | Framework, SSR, routing |
| **Three.js** | 3D particle field background |
| **GSAP + ScrollTrigger** | All animations and scroll transitions |
| **Lenis** | Smooth scrolling (synced with GSAP) |
| **Spline** | 3D robot model (iframe embed) |
| **CSS Modules** | Component-scoped styles |

---

## Setup & Installation

```bash
# 1. Make sure you're using Node.js v18+
node --version

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev

# 4. Open in browser
open http://localhost:3000
```

> **NVM users**: If `node` is not found, run:
> ```bash
> source ~/.nvm/nvm.sh && nvm use 22
> ```

---

## Project Structure

```
/
├── app/
│   ├── globals.css          ← Global CSS tokens, typography, resets
│   ├── layout.tsx           ← Root HTML layout, SEO metadata
│   ├── page.tsx             ← Main page (assembles all sections)
│   └── page.module.css
│
├── components/
│   ├── Navigation/
│   │   ├── Navbar.tsx       ← Fixed navbar, blur-on-scroll
│   │   └── Navbar.module.css
│   │
│   ├── ThreeBackground/
│   │   ├── ParticleField.tsx  ← Three.js 2500-particle canvas
│   │   └── ParticleField.module.css
│   │
│   ├── Hero/
│   │   ├── HeroSection.tsx  ← Main hero orchestrator (GSAP pin + zoom)
│   │   ├── HeroSection.module.css
│   │   ├── HeroText.tsx     ← Headline, subtitle, stats, CTA
│   │   ├── HeroText.module.css
│   │   ├── SplineRobot.tsx  ← Spline iframe + glow ring decorations
│   │   └── SplineRobot.module.css
│   │
│   ├── SecondSection/
│   │   ├── SecondSection.tsx    ← "Modern 3D Website" reveal section
│   │   ├── SecondSection.module.css
│   │   ├── FeatureCards.tsx     ← 3 glassmorphism feature cards w/ tilt
│   │   └── FeatureCards.module.css
│   │
│   └── ui/
│       ├── GlowButton.tsx       ← Reusable green glow CTA button
│       └── GlowButton.module.css
│
├── hooks/
│   └── useLenis.ts          ← Lenis smooth scroll + GSAP sync hook
│
├── lib/
│   └── gsap.ts              ← GSAP plugin registration (SSR-safe)
│
└── instructions.md          ← This file
```

---

## Key Interactions

### 1. Hero Scroll Zoom (the main animation)

**File:** `components/Hero/HeroSection.tsx`

```
User scrolls ↓
└── Hero section is PINNED (stays fixed while page "scrolls" through it)
     ├── Progress 0.00 → 0.40 : Hero text fades out + blurs
     ├── Progress 0.10 → 1.00 : Robot scales 1x → 4x with opacity 0
     └── Progress 0.65 → 1.00 : Black bridge overlay fades in
```

Controlled by:
```ts
gsap.timeline({
  scrollTrigger: {
    trigger: sectionRef.current,
    start: 'top top',
    end: '+=200%',  // 2 viewport heights of scroll travel
    pin: true,
    scrub: 1.8,     // Smoothness (higher = more lag / cinematic)
  }
})
```

**To adjust the zoom intensity**, change the `scale` value:
```ts
tl.to(robotRef.current, { scale: 4, ... })  // 4x = very dramatic
```

**To adjust scroll distance**, change `end: '+=200%'` (e.g. `+=150%` for shorter).

---

### 2. Smooth Scrolling

**File:** `hooks/useLenis.ts`

Lenis intercepts native scroll events and applies eased, smooth scrolling. It syncs with GSAP ScrollTrigger via the RAF ticker so all pin/scrub animations stay perfectly in sync.

```ts
// Duration of smooth scroll (seconds)
duration: 1.2
// Easing function (exponential decay)
easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
```

---

### 3. Three.js Particle Field

**File:** `components/ThreeBackground/ParticleField.tsx`

- 2,500 particles with additive blending (green glow)
- Custom GLSL vertex/fragment shaders
- Slow rotation + mouse parallax tracking
- `will-change: transform` on the canvas for GPU acceleration

To change particle count:
```ts
const count = 2500; // increase for denser, decrease for performance
```

To change particle color, edit the fragment shader:
```glsl
// R, G, B, Alpha  →  currently green
gl_FragColor = vec4(0.4, 1.0, 0.53, strength * 0.6);
```

---

## Customization Guide

### Changing the 3D Robot Model

1. Go to [spline.design](https://spline.design) and get your scene's share link
2. In `components/Hero/SplineRobot.tsx`, update `src`:
```tsx
<iframe
  src="https://my.spline.design/YOUR-SCENE-ID/"
  ...
/>
```

### Changing the Color Palette

All colors are defined as CSS custom properties in `app/globals.css`:
```css
:root {
  --green-primary: #a8ff78;    /* Main accent */
  --green-secondary: #78ffd6;  /* Secondary gradient */
  --green-glow: #00ff88;       /* Particle/shadow glow */
  --bg-primary: #080c0e;       /* Page background */
}
```

### Adding More Sections

1. Create `components/YourSection/YourSection.tsx`
2. Add scroll-triggered animation using:
```ts
import { gsap, ScrollTrigger } from '@/lib/gsap';

gsap.fromTo(element, 
  { opacity: 0, y: 60 },
  {
    opacity: 1, y: 0,
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      once: true,
    }
  }
);
```
3. Import and add it in `app/page.tsx` below `<SecondSection />`

---

## Build & Deployment

```bash
# Production build
npm run build

# Preview production build locally
npm start

# Deploy to Vercel (recommended)
npx vercel --prod
```

### Vercel Deployment Notes
- Set `Node.js` version to `18.x` or `20.x` in Vercel settings
- No environment variables required for the base setup
- The Three.js canvas and GSAP animations work in all modern browsers

---

## Browser Support

| Browser | Support |
|---------|---------|
| Chrome 90+ | ✅ Full |
| Firefox 88+ | ✅ Full |
| Safari 15+ | ✅ Full |
| Edge 90+ | ✅ Full |
| Mobile Chrome | ✅ Full |
| Mobile Safari | ⚠️ Spline may have limited performance |

---

## Performance Tips

1. **Particle count**: Reduce to `1500` on mobile for better FPS
2. **Spline**: The robot loads async — hero text appears immediately
3. **GSAP scrub**: Lower `scrub` value (e.g. `1.0`) for snappier feel
4. **DevTools**: Use Chrome's Performance panel to profile Three.js RAF

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| `npx not found` | Run `source ~/.nvm/nvm.sh && nvm use 22` |
| Spline robot not loading | Check internet connection — iframe loads from Spline CDN |
| Scroll animations stuttering | Ensure `lenis` and `gsap` versions are compatible |
| Three.js canvas missing | Check browser WebGL support at [webglreport.com](https://webglreport.com) |
| Build fails on `raw-loader` | Run `npm install raw-loader --save-dev` |
