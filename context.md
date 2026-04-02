# Project Context: Hindustan Pharma Logistics (HPL) Website
Last updated: 2026-04-03

## Active Project
Hindustan Pharma Logistics (HPL) landing page and core platform.

## Current Goal
Finalizing the "seamless" landing page layout and the Brand Carousel section.

## Task History
- Created a high-fidelity landing page with Hero, Stats, Core Solutions, Workflow, Bento Grid, and Testimonials.
- Implemented a complex `BrandCarousel` component with dual-direction infinite rotation synced to scroll.
- Refined the Navbar into a compact, centered floating pill design.
- Implemented **Full-Page Section Snapping** using a custom Lenis-integrated wheel controller.
- Developed the **`TypewriterHeading`** component for bidirectional, scroll-aware text animations.
- Integrated high-fidelity logistics and pharma assets into the Brand Carousel.
- Removed all "boxes" and section backgrounds from the landing page to achieve a unified, minimal aesthetic.

## Technical Details
- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Smooth Scroll**: Lenis (with custom snapping logic)
- **Dependencies**: `@chenglou/pretext` (Text measurement)
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
