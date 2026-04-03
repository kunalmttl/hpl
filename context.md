# Project Context: Hindustan Pharma Logistics (HPL) Website
Last updated: 2026-04-03

## Active Project
Hindustan Pharma Logistics (HPL) landing page and core platform.

## Current Goal
Refining individual landing page sections — Core Solutions cards done, navbar refined.

## Task History
- Created a high-fidelity landing page with Hero, Stats, Core Solutions, Workflow, Bento Grid, and Testimonials.
- Implemented a complex `BrandCarousel` component with dual-direction infinite rotation synced to scroll.
- Refined the Navbar into a compact, centered floating pill design.
- Implemented **Full-Page Section Snapping** using a custom Lenis-integrated wheel controller.
- Developed the **`TypewriterHeading`** component for bidirectional, scroll-aware text animations.
- Integrated high-fidelity logistics and pharma assets into the Brand Carousel.
- Removed all "boxes" and section backgrounds from the landing page to achieve a unified, minimal aesthetic.
- Implemented a complex `BrandCarousel` component with dual-sphere semi-circle orbits (6 cards each) centered at the viewport edges.
- Synchronized rotation using Framer Motion's `useTime` and `useScroll` for a persistent, interactive "vanishing sphere" effect.
- Maintained vertical rectangular portrait cards (32:44) with 4px white borders and deep shadows.
- Integrated ambient gradient overlays (#EDEDED) for smooth edge transitions.
- **Redesigned Core Solutions into premium cards** — 2×2 grid with AI-generated infographic images, floating accent icons, and staggered entrance animations.
- **Carousel Absolute Symmetry**: Unified card centering (`translateX: "-50%"`) and tuned radius to **240px** (Desktop) and **120px** (Mobile) for equal spacing between central text and viewport edges. Eliminated the left-side text overlap.
- **Testimonials Implementation**: Built a high-fidelity `TestimonialsCarousel` featuring a scroll-triggered 3D envelope intro and a curved "fan" layout for review cards.
- **Envelope Animation Refinement**: Orchestrated a complex three-layer PNG envelope animation (`back`, `card`, `front`) with precise scaling (950x860) and rising trajectories.
- **Carousel Symmetry**: Finalized the fan carousel geometry for the testimonials, ensuring 3D perspective and smooth auto-advance transitions.

## Technical Details
- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion (`motion/react`)
- **Icons**: Lucide React
- **Smooth Scroll**: Lenis (with custom snapping logic)
- **Dependencies**: `@chenglou/pretext` (Text measurement)
- **Assets**: Envelope PNGs (`open_envelope_back.png`, `open_envelope_front.png`)
- **Typography**: TT Neoris (Headings), Open Sans (Body), Clarity City (Subtext)
- **Primary Color**: Pharma Teal (#0F766E)
- **Background Color**: #EDEDED

## Design Principles
- Minimalist, premium, and professional pharma-tech aesthetic.
- Seamless layout sharing a single background.
- High-interactivity through scroll-triggered animations and snapping transitions.
- Compact, mobile-first navigation.

## Error Log
- Fixed syntax error in `app/page.tsx` caused by redundant closing tags.
- Resolved TypeScript Variants typing conflict in `TypewriterHeading` using explicit casting.
- **Hydration Mismatch**: Fixed in `BrandCarousel.tsx` by adding a `useEffect` mounted check to prevent server/client HTML attribute drift.
- **Static Animation Trigger**: Resolved issue where `TestimonialsCarousel` animation wouldn't start by refactoring to a declarative keyframe sequence with `useInView`.
