# Project Context: Hindustan Pharma Logistics (HPL) Website
Last updated: 2026-04-06

## Active Project
Hindustan Pharma Logistics (HPL) landing page and core platform.

## Current Goal
**Landing page is COMPLETE.** All sections — Hero, Brand Carousel, Core Solutions, Workflow, Testimonials, and Footer — are fully built, polished, and committed. Next focus: inner pages polish (About, Services, Contact), mobile audit, and performance/accessibility.

## Task History
- Created a high-fidelity landing page with Hero, Stats, Core Solutions, Workflow, Team Section, Bento Grid, and Testimonials.
- Added **`TeamSection.tsx`**: Integrated an "Our Team" dual-card component following the 'How It Works' section. Features ultra-premium 4:5 aspect ratio portraits with CSS grid-based `[0fr]` to `[1fr]` bio reveal strictly upon hover, with high-fidelity `staggerContainer` entry synchronization.
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
- **Section Transitions (Latest Refinement)**:
    - **Background Unification**: All major sections in `app/page.tsx` and `components/BrandCarousel.tsx` now explicitly use `bg-background` (#EDEDED) to eliminate visual seams.
- **Copy Polish**: Updated Core Solutions section with localized, action-oriented text and increased container widths (`max-w-2xl+`) to prevent awkward line breaks in headings.
- **Section Spacing**: Standardized on `pt-12 pb-24` vertical padding to maintain a high-density, professional layout.
- **Density & Texture (Latest)**:
    - **Grid Patterns**: Integrated `radial-gradient` dot grids (opacity 3%) into 'Workflow' section to fill empty space.
    - **Decorative Background Elements**: Use floating icons (opacity 8%) and large background numbers to define section context without heavy backgrounds.
    - **Animated Connections**: Use `pathLength` and gradient defined masks for animated process flow lines between workflow cards.
    - **Distance Balancing**: Reduced horizontal spread for absolute elements to `10-15%` of screen width to ensure content density on wide displays.
- **TestimonialsCarousel Transition Fix (2026-04-06)**:
    - Diagnosed and fixed a double-card flash during the envelope → fan carousel phase transition.
    - Root cause: no exit animation on the envelope `AnimatePresence` unit + a coordinate-space mismatch where `y: -110` meant different things in the 950×860 envelope container vs. the full-width fan carousel container.
    - Fix: fade the rising card to `opacity: 0` (via `cardControls`) before calling `setPhase("carousel")`, and replaced the broken position-matching `initial` prop with `{ opacity: 0, y: -30 }` for a clean slide-down entrance.
- **Hero Section Premium Enhancement (2026-04-06)**:
    - Created `HeroNetworkMap.tsx` — an animated SVG hub-spoke distribution network, representing HPL's 12-district Central India coverage from an Indore center node.
    - Features: `pathLength` draw-in animation on 12 spokes (staggered 70ms), outer dashed connecting ring, looping ripple pulse rings, traveling data-flow dots along each spoke, and pulsing satellite nodes.
    - All animations gated on `isActive={isIntroDone && isHeroInView}` for performance.
    - Added **mouse parallax** to the 4 hero stat cards using `useMotionValue` + `useSpring` + `useTransform`. Left cards move with mouse, right cards move against (opposing depth layers). Returns to center on `mouseLeave`.
- **Navbar Tightening (2026-04-06)**:
    - Reduced section gap from `md:gap-x-12` → `md:gap-x-6`, horizontal pill padding from `md:px-6` → `md:px-4`, and nav link spacing from `gap-x-6` → `gap-x-5`.
    - Result: compact pill with equal breathing room, no dead space.
- **Footer Corrections (2026-04-06)** — 7 content errors fixed from `footer_correction.md`:
    - Brand statement: replaced SaaS template copy with real HPL description (C&F, super stockist, 60+ manufacturers, since 2009).
    - Contact: real address (Vijay Nagar, Indore 452010), real phone (+91 93000 01411), real email (hindustanpharma1@yahoo.com).
    - Solutions: replaced `3PL Logistics` + `Fulfillment Hub` with `Consignee Agent` + `Hindustan Drug House`.
    - Company: replaced broken links (Infrastructure, Compliance) with About / Services / Contact / Partner With Us.
    - Socials: removed Instagram + Twitter, added WhatsApp icon; label changed from "Follow Us" → "Reach Us"; `SocialIcon` upgraded from `<button>` to `<a>` with `href`.
    - Copyright: `HPL GROUP` → `Hindustan Pharma Logistics`; GDPR link removed.
    - Blank space: footer card padding reduced `p-10 md:p-24` → `p-8 md:p-16`, grid `pb-20` → `pb-8`, copyright `mt-16` → `mt-10`.

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
- **TestimonialsCarousel Flash Fix**: Resolved double-card frame during envelope→carousel phase switch. Cause: `AnimatePresence` held envelope alive for one extra frame while fan carousel mounted — both cards visible at mismatched positions. Fix: explicit `cardControls` fade-out before phase switch, and `initial={{ opacity: 0, y: -30 }}` on fan cards for a clean slide-down settlement.
- **Project State Desync**: Resolved `multi_replace_file_content` failures by breaking down complex updates into separate, smaller edits.
