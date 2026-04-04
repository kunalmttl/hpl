# Project Context: Hindustan Pharma Logistics (HPL) Website
Last updated: 2026-04-04

## Active Project
Hindustan Pharma Logistics (HPL) landing page and core platform.

## Current Goal
Completed high-fidelity motion design and robust, re-triggerable scroll animations across all core pages (Home, About, Services, Contact, and Footer) using the `useInView` and `animate` pattern gated by `isIntroDone`.

## Task History
- Created a high-fidelity landing page with Hero, Stats, Core Solutions, Workflow, Bento Grid, and Testimonials.
- Implemented a complex `BrandCarousel` component with dual-direction infinite rotation synced to scroll.
- Refined the Navbar into a compact, centered floating pill design.
- Implemented **Full-Page Section Snapping** using a custom Lenis-integrated wheel controller.
- Developed the **`TypewriterHeading`** component for bidirectional, scroll-aware text animations.
- Refined the **`IntroAnimation`** branding: replaced the three-line text wordmark with a high-fidelity `hpl_text.png` image for a more polished, professional entrance.
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
- **IntroAnimation Alignment**: Fixed the branding fly-away to dock perfectly into the Navbar logo by compensating for the Navbar's initial -100px vertical offset.
- **Curved Branding Transition**: Refined the logo's exit curve with independent X/Y axis easing for a high-end, aerodynamic feel during the transition to the navigation state.
- **Footer Redesign**: Built a premium, white-card layout to match high-fidelity reference designs, featuring a 5-column grid and a background watermark text.
- **Footer Polish (CoreShift Inspiration)**: Refined the footer with individual social media tiles, a much larger blurred watermark ("HindustanPharma"), and an airy, minimal grid layout to match premium design standards.
- **BrandCarousel Blending**: Refined the OrbitCard image blending using a multi-stage white gradient transition to eliminate harsh edges and backdrop-blur artifacts.
- **Brand Icon Fixes**: Implemented custom SVG brand icons (Instagram, X, LinkedIn) in the Footer because Lucide-React removed them in version 1.0.
- Unify Background Colors: Set all landing page sections and the footer to use `#EDEDED` (the theme's `--background` color) for a consistent brand aesthetic. Updated `BrandCarousel`, `TestimonialsCarousel`, and `Footer` to use `bg-background`.
- Remove horizontal padding from the main wrapper in `app/page.tsx` to enable a seamless, edge-to-edge "no-box" layout while maintaining a unified background.
- Reduced vertical spacing between the Hero section and Brand Carousel.
- Refined the **Core Solutions** section: implemented a grid-level staggered entrance and synchronized internal card elements (images, text).
- **Staggered Workflow Entrance**: Updated "How It Works" to use `staggerContainer` for a coordinated, parent-driven section reveal.
- **Unified Button Animations**: Implemented a smooth `buttonZoom` (scale 0-1) variant for all primary CTAs across the landing page, navbar, footer, testimonials, and contact page.
- **Contact Page Polish**: Applied the premium animation system to the contact form and map sections.
## Task History
...
- **Animation Standardization**: Unified animation variants (`itemPop`, `itemSlideUp`, `buttonZoom`, `staggerContainer`) across all pages. Integrated `isIntroDone` and `useInView` for consistent, scroll-aware re-triggering. Fixed TypeScript Easing errors in `services/page.tsx`.
- **Dynamic Re-triggering**: Refactored `whileInView` to `animate` using `useInView` across all major pages (`page.tsx`, `about/page.tsx`, `services/page.tsx`, `contact/page.tsx`).
- **Standardized Card Entrance**: Replaced diverse entrance animations with a unified `itemPop` (scale 0.9 + y:30) and `staggerChildren` container pattern for a professional, cohesive UI.

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
- **Lucide Brand Icons**: Fixed "Missing export" errors by replacing `Instagram`, `Twitter`, and `Linkedin` from `lucide-react` with custom SVG implementations (removed in Lucide v1.0).
- **Carousel Color Mapping**: Fixed unblended image artifacts in `BrandCarousel` by switching from backdrop-blur masks to premium white-to-transparent gradients.
- **Project State Desync**: Resolved `multi_replace_file_content` failures by breaking down complex project documentation updates into separate, smaller edits.
