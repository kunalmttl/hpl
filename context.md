# Project Context: Hindustan Pharma Logistics (HPL) Website
Last updated: 2026-04-05

## Active Project
Hindustan Pharma Logistics (HPL) landing page and core platform.

## Current Goal
Finalized high-fidelity motion design and robust, re-triggerable scroll animations across all core pages. Implementing staggered sequences where subtext and descriptions follow heading typewriter animations.

## Task History
- Created a high-fidelity landing page with Hero, Stats, Core Solutions, Workflow, Bento Grid, and Testimonials.
- Implemented a complex `BrandCarousel` component with dual-direction infinite rotation synced to scroll.
- Refined the Navbar into a compact, centered floating pill design.
- Implemented **Full-Page Section Snapping** using a custom Lenis-integrated wheel controller.
- Developed the **`TypewriterHeading`** component for bidirectional, scroll-aware text animations.
- Refined the **`IntroAnimation`** branding: replaced the three-line text wordmark with a high-fidelity `hpl_text.png` image for a more polished, professional entrance.
- Integrated high-fidelity logistics and pharma assets into the Brand Carousel.
- Removed all "boxes" and section backgrounds from the landing page to achieve a unified, minimal aesthetic.
- **Carousel Absolute Symmetry**: Unified card centering (`translateX: "-50%"`) and tuned radius to **240px** (Desktop) and **120px** (Mobile) for equal spacing between central text and viewport edges.
- **Testimonials Implementation**: Built a high-fidelity `TestimonialsCarousel` featuring a scroll-triggered 3D envelope intro and a curved "fan" layout for review cards.
- **Envelope Animation Refinement**: Orchestrated a complex three-layer PNG envelope animation (`back`, `card`, `front`) with precise scaling (950x860).
- **Footer Redesign**: Built a premium, white-card layout featuring a 5-column grid and a background watermark text.
- **Footer Optimization**: Optimized `Footer.tsx` performance by reducing expensive CSS blur filters (from 120px to 40px) and adding `will-change` hardware acceleration.
- **BrandCarousel Blending**: Refined OrbitCard image blending using a multi-stage white gradient transition.
- **Animation Standardization**: Unified animation variants (`itemPop`, `itemSlideUp`, `buttonZoom`, `staggerContainer`) across all pages. Integrated `isIntroDone` and `useInView` for consistent, scroll-aware re-triggering.
- **Dynamic Re-triggering**: Refactored `whileInView` to `animate` using `useInView` and `once: false` across major pages.
- **Staggered Content Sequence**: Refined "Core Solutions" and "Brand Carousel" to ensure subtext and paragraph elements wait for the heading typewriter to complete before appearing.
- **Exit Animations**: Implemented `staggerDirection: -1` for reverse-stagger exit transitions when section leaves the viewport.

## Technical Details
- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion (`motion/react`)
- **Icons**: Lucide React
- **Smooth Scroll**: Lenis (with custom snapping logic)
- **Typography**: TT Neoris (Headings), Open Sans (Body), Clarity City (Subtext)
- **Primary Color**: Pharma Teal (#0F766E)
- **Background Color**: #EDEDED

## Design Principles
- Minimalist, premium, and professional pharma-tech aesthetic.
- Seamless layout sharing a single background.
- High-interactivity through scroll-triggered animations and snapping transitions.

## Error Log
- Fixed syntax error in `app/page.tsx` caused by redundant closing tags.
- Resolved TypeScript Variants typing conflict in `TypewriterHeading` using explicit casting.
- **Hydration Mismatch**: Fixed in `BrandCarousel.tsx` by adding a `useEffect` mounted check.
- **Landing Page Refinements (2026-04-05)**: Standardized heading-first animation sequence. Subtext and descriptions now delay until the `TypewriterHeading` finishes typing.
- **Motion Performance & Re-triggering**: Implemented `staggerDirection: -1` for reverse-stagger exit animations when scrolling away.
- **Lucide Brand Icons**: Fixed "Missing export" errors by replacing `Instagram`, `Twitter`, and `Linkedin` from `lucide-react` with custom SVG implementations (removed in Lucide v1.0).
- **Carousel Color Mapping**: Fixed unblended image artifacts in `BrandCarousel` by switching from backdrop-blur masks to premium white-to-transparent gradients.
- **Project State Desync**: Resolved `multi_replace_file_content` failures by breaking down complex updates into separate, smaller edits.
