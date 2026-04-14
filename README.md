# Parakh Choudhary — Portfolio

An Awwwards-level portfolio built with **Next.js 14**, **GSAP**, and **Three.js**.

## ✦ Features

- **Three.js Interactive Background** — Particle field, floating wireframe torus & icosahedron, grid plane, all reacting to mouse movement
- **GSAP Animations** — SplitText hero entrance, scroll-triggered reveals, magnetic hover effects, infinite marquee
- **Lenis Smooth Scroll** — Buttery smooth scrolling throughout
- **Custom Cursor** — Dot + ring with lag, morphs on hover
- **Responsive** — Fully mobile-friendly
- **Performance** — Dynamic imports for Three.js canvas (SSR-safe), DPR capping

## ✦ Tech Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Animations | GSAP 3 (SplitText, ScrollTrigger) |
| 3D | Three.js + @react-three/fiber + @react-three/drei |
| Smooth Scroll | Lenis |
| Styling | CSS Modules + Google Fonts (Syne + Space Mono) |

## ✦ Directory Structure

```
parakh-portfolio/
├── app/
│   ├── globals.css          # CSS variables, noise, cursor, scrollbar
│   ├── layout.tsx           # Root layout with cursor + smooth scroll
│   └── page.tsx             # Main page assembling all sections
├── components/
│   ├── CustomCursor.tsx     # Dot + ring cursor with GSAP lag
│   ├── SmoothScroll.tsx     # Lenis wrapper
│   ├── Navbar.tsx           # Fixed nav with scroll state
│   ├── Navbar.module.css
│   ├── ThreeBackground.tsx  # Three.js canvas (particles, shapes, grid)
│   ├── HeroSection.tsx      # GSAP SplitText entrance animation
│   ├── HeroSection.module.css
│   ├── AboutSection.tsx     # Stats + bio with scroll reveals
│   ├── AboutSection.module.css
│   ├── SkillsSection.tsx    # Card grid + GSAP marquee
│   ├── SkillsSection.module.css
│   ├── WorkSection.tsx      # Hover-expand project list
│   ├── WorkSection.module.css
│   ├── ExperienceSection.tsx # Timeline with sticky education panel
│   ├── ExperienceSection.module.css
│   ├── ContactSection.tsx   # Magnetic email + social links
│   ├── ContactSection.module.css
│   ├── Footer.tsx
│   └── Footer.module.css
├── package.json
├── next.config.js
└── tsconfig.json
```

## ✦ Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Run dev server
npm run dev

# 3. Open http://localhost:3000
```

## ✦ Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Or push to GitHub and import the repo at vercel.com — zero config needed.

## ✦ Customisation Tips

- **Colors** — All CSS variables are in `app/globals.css` under `:root`
- **Three.js** — Edit `components/ThreeBackground.tsx` to adjust particle count, colors, or shapes
- **Projects** — Update the `projects` array in `components/WorkSection.tsx`
- **Content** — All copy is inline in each section component for easy editing

## ✦ Notes

- GSAP `SplitText` is used in `HeroSection` — it's part of GSAP's free tier as of v3.12
- Three.js canvas is loaded via `next/dynamic` with `ssr: false` to avoid hydration issues
- `lenis` smooth scroll is wrapped at layout level so it applies globally
