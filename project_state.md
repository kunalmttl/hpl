# Project State: Hindustan Pharma Logistics (HPL) Website

Last updated: 2026-05-19 (RECAP)

## RECAP: 2026-05-19

1.  **Form Validation**:
    - Implemented progressive client-side input validation on the B2B enquiry multi-step form stepper.
    - Set default prefill of phone number to `+91` and added auto-prefixing from 10-digit raw numeric input. Enforced validation of exactly 10 digits after `+91`.
    - Added regex validation for standard Indian GSTIN format (15 characters) and email addresses.
    - Attached form errors inline dynamically to all fields under the `<FormField>` component.
2.  **Category Checkbox Scroll Fix**:
    - Added `relative` positioning context to checkboxes labels across `ManufacturerBusinessStep`, `DistributorBusinessStep`, and `RequirementsStep`.
    - Fixed absolute coordinates reference for screen-reader-only `<input>` elements, which previously caused the window viewport to scroll to the top on focus.
    - Cleaned up string template styling to apply active checkbox styles properly.
3.  **API Dynamic Routing & Email Setup**:
    - Configured dynamic recipient handling via `CONTACT_RECIPIENT_EMAIL` env variable with fallback to `info@hplco.in`.
    - Verified Resend domain onboarding for `hplco.in` and confirmed Zoho user setup for `info@hplco.in`.

## RECAP: 2026-04-11

1.  **Brand Conveyor Refinement**:
    - Integrated full list of 15+ real partner pharmaceutical and health care brands.
    - Implemented 3-line text wrapping with `text-center` alignment for balanced multi-line names.
    - Aesthetic Crop: Removed ellipsis (`...`) truncation in favor of a clean `max-height` crop (`3.3em`) for a more premium "Corridor" look.
    - Stability: Added `shrink-0` to brand icons to prevent layout shifting during text wraps.
2.  **Contact API Dynamic Routing**:
    - Refactored enquiry handler to use `CONTACT_RECIPIENT_EMAIL` environment variable, enabling easy recipient swaps without code changes.
    - Synchronized local environment with new variables.

## Current Task Status

- [x] Brand Conveyor Real Data & Wrapping
- [x] Contact API Env Variable Refactor
- [x] Advanced SEO Phase 2 (Verified, Indexing #3)
- [x] SEO Title & Keyword Refinement (Removed redundancy, added Consignee focus)
- [x] Branding: Circled Favicon & Apple Icon
- [x] Contact3 Page Development (Multi-step enquiry form wizard with improved UX)
- [x] Contact Enquiry Form Validation & Category Scroll Fix (Completed client-side validations and focused element layout context fixes)
- [x] API Endpoint Fix (Proper data persistence to Neon DB via Prisma)
- [x] Final Lighthouse Audit
      | Feature | Status | Notes |
      |---------|--------|-------|
      | Project Context Setup | ✅ Done | Context captured in `context.md` |
      | Project State Init | ✅ Done | `project_state.md` created |
      | Website Scaffold | ✅ Done | Next.js 16.2.1 + Tailwind v4 + shadcn |
      | Header & Footer | ✅ Done | Redesigned with premium white-card layout, 5-column grid, and 'CoreShift' inspired minimal aesthetics. Includes smart hide-on-footer logic. |
      | Home Page | ✅ Done | High-fidelity Single-Page Architecture (SPA) with Hero, Brands, Solutions, Workflow, Team, and Testimonials. |
      | About Page | ✅ Done | Integrated into main landing page with #team and #footer sections. |
      | Services Page | ✅ Done | Integrated into main landing page with #solutions and #workflow groups. |
      | Contact Page | ✅ Done | Standalone Page with Zod validation. Refined for B2B with Company, Phone, and Enquiry Type categories. Tone shifted from SaaS to Professional Pharma. |
      | Hydration Fix | ✅ Done | Resolved root-level attribute mismatches |
      | Smooth Scroll | ✅ Done | Implemented Lenis inertial scrolling |
      | Typography System | ✅ Done | Integrated Open Sans, TT Neoris, Clarity City |
      | Intro Animation | ✅ Done | Zero-gap branding lockup + precise centering |
      | Compact Navbar | ✅ Done | High-end floating pill with dynamic grouped scroll-spy logic. |
      | Brand Carousel Section | ✅ Done | Dual-sphere 16-card 3D orbit using 12 premium WebP images with infinite loop logic. |
      | Seamless Layout | ✅ Done | Removed all outlining boxes and section bgs |
      | Typewriter Headings | ✅ Done | Bidirectional scroll-triggered typing on all section headers |
      | Full-Page Snap | ✅ Done | Intercepted wheel for section-by-section landing |
      | Fidelity Assets | ✅ Done | Integrated AI-generated logistics/pharma imagery |
      | Core Solutions Cards | ✅ Done | 2×2 premium card grid with infographic images, radar pulses, corner brackets, and decorative index numbers. Refined background network to frame the cards. |
      | Navbar Active Style | ✅ Done | Bold black active tab + tighter underline (replaced teal) |
      | Testimonials Carousel | ✅ Done | High-fidelity envelope intro + 3D fan carousel. Transition flash fixed (coordinate-space mismatch resolved). |
      | Hero Network Map | ✅ Done | Animated SVG hub-spoke distribution network with mouse parallax on stat cards |
      | Navbar Tightening | ✅ Done | Reduced pill gap, padding, and link spacing — clean compact layout |
      | Footer Content Fix | ✅ Done | All 7 content errors corrected (real contact, real services, real socials, GDPR removed) |
      | Our Team Section | ✅ Done | High fidelity 4:5 image cards with hover grid-height bio expansion |
      | Single-Page Mode (SPA) | ✅ Done | Consolidated all core content into a single fluid landing page with anchor links and smart navigation. |
      | Accessibility Audit | ✅ Done | Implemented global ARIA landmarks, roles, and aria-hidden for motion elements. |
      | Mobile Polish | ✅ Done | Resolved Brand Carousel overlap and Core Solutions legibility fixes. |
      | Bug 002: WhatsApp Data | ✅ Done | Replaced placeholder with +91 9300001411 |
      | Bug 003: Heading Clipping | ✅ Done | Responsive text scaling for Workflow section |
      | Bug 004: Navbar Polish | ✅ Done | Verified navigation link density on mobile viewports. |
      | Bug 005: Code Smell | ✅ Done | Removed debug logs from contact page |
      | Brand Conveyor | ✅ Done | Infinite horizontal marquee with edge-fade masking. |
      | Team Update | ✅ Done | Replaced founders with Anil Kumar Sen & Pradeep Artwani (Company Directors). |
      | Performance Refactor | ✅ Done | Memoization, Static Data Externalization, Unified Variants |
      | **Advanced SEO Phase 2** | ✅ Done | Deep JSON-LD (FAQ, Service, Breadcrumbs), standardized meta, and crawl optimization. |

## Pending tasks

- [x] Phase 1: Carousel Card Refinement (Radius reduction & 3D Depth)
- [x] Phase 1: Fix BrandCarousel Mobile Overlap (Reduced radius for small viewports)
- [x] Phase 1: Implement new 'Who We Work With' section (Initial baseline implemented)
- [x] Staggered entrance for "How It Works" section
- [x] Button zoom-from-nothing animations for high-intent CTAs
- [x] Phase 1: Robust Scroll Re-triggering (Home, About, Services, Contact, Footer)
- [x] **Footer Optimization**: Optimize Footer performance (watermark blur reduction, hardware acceleration) (2026-04-05)
- [x] Standardize animation sequence for section headings and subtexts (Heading -> Subtext/Description delay) (2026-04-05)
- [x] Implement reverse-stagger exit animations for all major sections (2026-04-05)
- [x] **Advanced SEO Phase 2**: Structured Data, Metadata permutations, Sitemap tuning, and Google Search Console verification (2026-04-16)

## RECAP: 2026-04-16

1.  **Brand Carousel (Orbital Refresh)**:
    - **New Assets**: Replaced 8 generated images with 12 premium customer-provided `.webp` files.
    - **Loop Logic**: Orchestrated a 16-card system (8 left, 8 right) that loops through the 12 images without duplication between spheres.
    - **Cleanup**: Deleted 8 legacy library-generated `.png` files to optimize repository weight.
2.  **Advanced SEO (Phase 2)**:
    - **Structured Data**: Upgraded to multi-entity JSON-LD (LocalBusiness, BreadcrumbList, FAQPage, ServiceCatalog) for deep authority signal.
    - **Metadata Evolution**: Aligned titles/descriptions with industry permutations (CFA, CFA Agent, CF Agent) per manufacturer search intent.
    - **Crawl Directives**: Updated `sitemap.ts` and `robots.ts` with production-grade priorities.
    - **Entity Linking**: Integrated official LinkedIn presence into business schema group.
3.  **GSC Verification & Indexing**:
    - **Verified Ownership**: Confirmed `hplco.in` via Google Search Console.
    - **Sitemap Success**: Submitted dynamic sitemap; processed with zero errors.
    - **Rich Result Validation**: Achieved 100% Green Status for FAQ, LocalBusiness, Organisation, and Breadcrumb schemas.
    - **Indexing**: Confirmed core URLs are now live and crawled by Googlebot.
4.  **Branding Refinement**:
    - Standardized titles across the site to prioritize "C&F Agent" as the premium, logically-consistent term, ensuring a cleaner professional appearance.
5.  **Leadership Update**: Successfully updated the "People Behind HPL" section with real data for **Anil Kumar Sen** and **Pradeep Artwani**. Optimized portrait cropping using `object-top` to resolve head-clipping issues.
6.  **Brand Conveyor**: Added a new horizontal `BrandConveyor` section with:
    - Infinite "right-to-left" marquee animation for pharma partners.
    - Edge-fade transparency masking for a high-end transition.
    - Premium `TT Neoris` typography.
    - Individual brand hover-highlight states for improved interactivity.
7.  **UI Polish**: Balanced the vertical rhythm between the Hero, Brand sections, and Core Solutions grid.

- [x] **Hero Spacing Layout**: Tightened the Hero section layout by reducing
    - **Hero Top Space**: Reduced combined top padding (parent container + section) to 24-28 units (96-112px) to clear the fixed Navbar while avoiding excessive "blank space" before the title.
- [x] **Density & Texture (Latest)**:
    - **Grid Patterns**: Integrated `radial-gradient` dot grids (opacity 3%) into sections like 'Workflow' to eliminate 'empty void' feelings.
    - **Decorative Background Elements**: Added large background indicators (01, 02, 03) and floating workflow-themed icons to fill visual gaps.
    - **Premium Card Details**: Added high-fidelity radar pulses and corner brackets to Core Solution cards for a more reactive, tech-forward feel.
    - **Animated Connections**: Replaced static SVG connectors with animated gradient flow paths to guide user focus through the distribution chain.
    - **Variant Consolidation**: Reduced variant overhead by merging identical motion configurations across components.
- [x] **Performance Optimization (2026-04-09)**:
    - **SmoothScroller**: Implemented a high-performance DOM caching system for section offsets, reducing scroll-event calculation overhead from $O(n)$ to $O(1)$.
    - **Memory Management**: Externalized large static data arrays (Team Members, Services, Workflow data) to the module scope to reduce heap allocation and GC pressure during re-renders.
    - **SVG Efficiency**: Memoized the `HeroNetworkMap` component to prevent expensive re-calculation of 12 animated paths on parent state updates.
    - **EventHandler Memoization**: Wrapped high-frequency handlers (Mouse movement, Scroll navigation) in `useCallback` to maintain stable reference equality.
- [x] Refined Core Solutions section copy (Action-oriented & local context)
- [x] Fixed content wrapping issue on section headings
- [x] Mobile Responsiveness Audit (Complete)
- [ ] Image Optimization System
- [x] Accessibility (Aria Labels & Reduced Motion)
- [ ] Conduct performance (Lighthouse) audit.
- [x] **TestimonialsCarousel Transition Polish** — fixed double-card flash on envelope→fan phase switch (2026-04-06)
- [x] **Hero Premium Enhancement** — animated distribution network SVG + mouse parallax depth on stat cards (2026-04-06)
- [x] **Navbar Tightening** — reduced gap-x-12→gap-x-6, px-6→px-4, link gap-x-6→gap-x-5 (2026-04-06)
- [x] **Footer Content Corrections** — 7 issues fixed from footer_correction.md (2026-04-06)

## Current Task Status

- Copy & Layout Polish: **COMPLETE** [2026-04-05]
- Density Optimization & Workflow Refinement: **COMPLETE** [2026-04-05]
- Visual Seam & Background Detail Enhancement: **COMPLETE** [2026-04-05]
- TestimonialsCarousel Transition Bug Fix: **COMPLETE** [2026-04-06]
- Hero Section Premium Enhancement: **COMPLETE** [2026-04-06]
- Navbar Tightening: **COMPLETE** [2026-04-06]
- Footer Content Corrections: **COMPLETE** [2026-04-06]
- Core Solutions High-Fidelity Refinement: **COMPLETE** [2026-04-06]
- **🏁 LANDING PAGE: COMPLETE** [2026-04-06]
- **🏁 BUG RESOLUTION: COMPLETE** [2026-04-09]
- **🏁 CONTACT INTEGRATION: COMPLETE** [2026-04-09]

## Known issues

- **BrandCarousel Mobile Overlap:** The left/right carousel centers at 0 and 100% width causing image overlap on very narrow screens. Reverted to stable desktop version for now.

## RECAP log

- **2026-03-31**: Initial project kickoff. Read `context.md`, defined Phase 1 goals, and initialized `project_state.md`. Initialized Next.js 16.2.1 + Tailwind v4 project and configured Pharma Teal theme. Verified initial render via browser subagent. Committed to `feature/scaffolding-phase1`.

### RECAP — 2026-04-03 02:22

- **Built**: Full-Page Scroll Snapping logic (Lenis-integrated Wheel Controller). High-fidelity `TypewriterHeading` component.
- **Improved**: Replaced placeholder blank cards with AI-generated high-fidelity pharma/logistics imagery.
- **Refined**: Bidirectional text animations (un-typing on up-scroll).
- **Plan**: Tomorrow we'll refine the carousel cards: **vertical and rectangular** form factors.
- **Motion Shift**: Cards will only rotate/angle slightly, letting the 360-degree orbital carousel drive the spatial reveal.
- **Left off at**: `SmoothScroller.tsx` (Finalized Snap Logic).

### RECAP — 2026-04-03 15:55

- **Built**: `CoreSolutionCard.tsx` — premium card component with infographic image area, floating accent icon, staggered entrance animations.
- **Changed**: `app/page.tsx` — replaced flat icon+text Core Solutions with 2×2 card grid using `CoreSolutionCard`. Added subtitle paragraph.
- **Changed**: `Navbar.tsx` — active tab now bold black (`text-slate-900 font-bold`) instead of teal. Underline tightened from `-bottom-1` to `bottom-0`. Inactive tabs lighter gray.
- **Assets**: Generated 4 AI infographic images → `public/infographics/` (cf-agency, super-stockist, consignee-agent, drug-house).
- **Fixed**: Cleaned up duplicate header block in `project_state.md`.
- **Pending**: Carousel card refinement (vertical rectangular cards).
- **Left off at**: `Navbar.tsx` (Active tab styling).

### [RECAP — 2026-04-03 16:15]

**Progress:**

- Redesigned **Brand Carousel** from circular orbits to **4 vertical infinite-scroll columns** (2 strips LHS, 2 strips RHS).
- Switched to **vertical rectangular portrait cards** with premium white borders and 3D shadows.
- Generated **8 professional pharma/logistics portrait images** and integrated them into the infinite strips.
- Synchronized scroll speed to page progress using `framer-motion` for dynamic interactivity.
- Refined **TypewriterHeading** scale and **Navbar** active tab styles (bold black, tightened underline gap).
- Optimized layout to ensure no overlap between cards and central text on desktop/laptop views.
- **High-Fidelity Animations**:
    - Implemented staggered grid-level entrance for "Core Solutions."
    - Updated "How It Works" (Workflow) with parent-driven staggered card reveals.
    - Applied `buttonZoom` (scale 0 to 1) spring animations to all high-intent CTAs (Hero, Navbar, Footer, Testimonials, Contact).
    - Synchronized entrance timing to trigger after text/headings settle.

**Next Steps:**

- Mobile audit for the new vertical carousel (adjust column widths/opacity for smaller screens).
- Image optimization system implementation.
- Conduct performance (Lighthouse) audit.

### RECAP (2026-04-03)

### Brand Carousel Refinement: Absolute Symmetry & Spacing Balance

- **Symmetry Unified**: Replaced conditional logic with a single `translateX: "-50%"` centered anchor for both spheres. This ensures the left carousel is perfectly clear of the text and mirrors the right side exactly.
- **Tuned Radius**: Finalized the radius at **240px** (Desktop) and **120px** (Mobile) to
  create a centered, balanced "corridor" for the text with exactly equal margins to the carousel cards.
- **Visual Polish**: Verified text sizing consistency (64px heading) and high-fidelity 3D depth across the section.
- **Section Reset**: Cleared the "Who We Work With" bento grid section in `app/page.tsx`.
- **Testimonials Implementation**: Built the `TestimonialsCarousel.tsx` featuring the envelope-to-fan animation sequence. Successfully integrated into the main page. (Note: Baseline only, more work needed).

### RECAP — 2026-04-03 23:10

- **Built**: "Words of Trust" Testimonials Carousel with high-fidelity, multi-phase envelope animation.
- **Changed**: `TestimonialsCarousel.tsx` scaled up to **950x860** (envelope) and **450x300** (cards) for monumental visual impact.
- **Fixed**: Synchronized card and envelope entrance to arrive as a single unit. Calibrated rising trajectory to 540px.
- **Fixed**: Resolved hydration mismatch in `BrandCarousel.tsx` using a mounted state check.
- **Pending**: Responsive downsizing for mobile (current scale is desktop-maximized).
- **Left off at**: `TestimonialsCarousel.tsx` (Completed visual design and timing logic).
  → Pushed: feat: implement high-fidelity Testimonials Carousel with envelope animation and fix hydration mismatch at 23:10
- **Changed**: `IntroAnimation.tsx` — replaced the three-line text wordmark ("HINDUSTAN PHARMA LOGISTICS") with a single high-fidelity image `public/hpl_text.png`.
- **Fixed**: Restored the **Logo Fly-away Curve** by un-gating the `Navbar` component. It now stays mounted (but hidden) to provide a valid coordinate target for the `IntroAnimation`.
- **Improved**: Synchronized the branding handoff — the Navbar now slides down exactly as the flying logo reaches its final docking position.
- **Fixed**: Resolved the **100px alignment miss** in the intro fly-away by accurately calculating the Navbar's resting position (accounting for its -100px hidden state).
- **Refined**: Enhanced the exit curve with independent X/Y easing for a more professional 'docking' feel.
- **Left off at**: `IntroAnimation.tsx` (Finalized high-fidelity entrance sequence).

### RECAP — [2026-04-04 00:34]

- Built: Finalized CoreShift-inspired Footer with individual tiles and monumental branding.
- Changed: `components/Footer.tsx` — updated social links to discrete tiles and recalibrated watermark.
- Fixed: Resolved documentation sync issues across `context.md` and `project_state.md`.
- Pending: Mobile breakpoint audit for carousel, Accessibility audit.
- Left off at: `components/Footer.tsx` (Complete).

### RECAP — [2026-04-04 16:18]

- Unify Background Colors: Set all landing page sections and the footer to use `#EDEDED` (the theme's `--background` color) for a consistent brand aesthetic. Updated `BrandCarousel`, `TestimonialsCarousel`, and `Footer` to use `bg-background`.
- Remove horizontal padding from the main wrapper in `app/page.tsx` to enable a seamless, edge-to-edge "no-box" layout while maintaining a unified background.
- Reduced vertical spacing between the Hero section and Brand Carousel.
- **Refined**: `TestimonialsCarousel.tsx` — reduced rising peak to `-110px` and adjusted `bottom: 140` to ensure no heading overlap.
- **Improved**: Tightened layout spacing: `mb-6` on header and `mt-[-50px]` on carousel for a more unified block.
- **Enhanced**: Decoupled envelope/card opacity: card now stays fully visible at 1.0 opacity while the envelope fades away during the dropout.
- **Fixed**: Visual continuity during the transition from the rising card to the static carousel unit.
- **Pending**: Accessibility and Image Optimization.

### RECAP — [2026-04-04 16:42]

- **Refined the Core Solutions section**: implemented a grid-level staggered entrance and synchronized internal card elements (images, text).
- **Staggered Workflow Entrance**: Updated "How It Works" to use `staggerContainer` for a coordinated, parent-driven section reveal.
- **Animation Synchronization**: Refined `IntroAnimation.tsx` to delay the `isIntroDone` signal until the full sequence (fly-away + overlay fade) is complete, ensuring site content (Navbar, Hero) reveals sequentially.
- **Footer Optimization**: Optimized `Footer.tsx` performance by reducing expensive CSS blur filters on large watermark text (reduced from 120px to 40px), removing the scale animation to prevent re-paints, and adding `will-change` hardware acceleration hints.
- **Improved**: Parental inheritance for `whileInView` triggers, ensuring coordinated reveals across the 2x2 grid.
- **Changed**: `app/page.tsx` — wrapped the services grid in a motion container with `staggerContainer` variants.
- **Pending**: Accessibility and Image Optimization.
- **Left off at**: `app/page.tsx` (Core Solutions grid wrap).

### RECAP — [2026-04-04 17:15]

- **Standardized Animations**: Unified animation variants (`itemPop`, `itemSlideUp`, `buttonZoom`, `staggerContainer`) across `page.tsx`, `about/page.tsx`, `services/page.tsx`, and `contact/page.tsx`.
- **Entrance Safety**: Integrated `isIntroDone` checks across all major components and pages to prevent premature animation firing.
- **Improved Re-triggering**: Refined `useInView` logic for reliable "scroll-back" animation re-triggering across the entire site.
- **Fixed TypeScript Errors**: Resolved Easing type mismatches in `services/page.tsx`.
- **Refined CoreSolutionCard**: Added `isIntroDone` gate specifically to the Core Solutions grid to ensure sync with the global entrance.
- **UI Consistency**: Standardized item entrance (scale 0.9, y:30 with spring) for a cohesive, premium feel.

### RECAP — [2026-04-04 23:29]

- **Fixed**: Resolved `CoreSolutionCard.tsx` visibility issues by restoring animation state inheritance from the parent `staggerContainer`.
- **Improved**: Synchronized scroll-triggered reveals for all 4 cards in the Core Solutions grid.
- **Improved**: Verified re-triggerability (set `once: false` in `useInView`) to ensure dynamic animations on both up and down scroll.

### RECAP — [2026-04-05 16:22]

- **Optimized**: `Footer.tsx` performance. Reduced watermark blur radius from 120px to 40px to alleviate GPU load.
- **Refined**: Removed scale animation on the watermark to prevent costly re-rasterization during movement.
- **Performance**: Added `will-change-transform` and `will-change-opacity` as hardware acceleration hints to the footer container and watermark.
- **Synchronized**: Intro animation timing finalized (delayed `isIntroDone` signal until sequence completion).
- **Updated**: `app/page.tsx` Hero layout. Reduced global padding (`pt-28` to `pt-16`), section padding (`pt-20` to `pt-10`), and significantly pulled up main content (`mt-[-12vh]`).
- **Adjusted**: Decoration floating cards in Hero section were shifted higher to maintain visual balance with the new tighter layout.

**Next Steps**:

- Mobile breakpoint audit for carousels and grids.
- Image optimization system implementation.
- Accessibility and Lighthouse audit.
- Left off at: `app/page.tsx` (Hero layout refinement).

### RECAP — [2026-04-06 23:22]

- **Diagnosed**: `TestimonialsCarousel.tsx` double-card flash during envelope→carousel transition. Two root causes identified via frame-by-frame screenshot analysis:
    1. `AnimatePresence` on the envelope unit had no `exit` prop — held the envelope alive one extra render while the fan carousel mounted.
    2. The fan carousel's active card used `initial={{ y: -110 }}` to "match" the envelope card's position, but the coordinate spaces were different (950×860 envelope container vs. full-width flex fan container), causing a ~140px visual jump.
- **Fixed**: Added `await cardControls.start({ opacity: 0 })` before `setPhase("carousel")` to fade the card out before unmount. Changed fan card `initial` from the broken position-match to `{ opacity: 0, y: -30 }` for a clean slide-down entrance.
- **Left off at**: `components/TestimonialsCarousel.tsx` (transition polish complete).

### RECAP — [2026-04-06 23:59]

- **Built**: `components/HeroNetworkMap.tsx` — animated SVG hub-spoke network (600×470 viewBox, CX=300 CY=235). Features 12 spokes with `pathLength` draw-in (staggered 70ms), outer dashed connecting ring, 3 ripple rings, 12 traveling data-flow dots, pulsing satellite nodes, and a central hub with glow ring.
- **Added**: Mouse parallax to hero stat cards via `useMotionValue` + `useSpring` (stiffness:40, damping:20) + `useTransform`. Left cards track mouse direction, right cards oppose it (depth illusion). Handler on `onMouseMove`/`onMouseLeave` of hero section.
- **Improved**: `TestimonialsCarousel` seamless phase handoff — fan active card now starts at calculated envelope coordinate (`y:100, rotate:-3, opacity:1`) matching the envelope card's last position, then spring-settles to center.
- **Left off at**: `app/page.tsx` + `components/HeroNetworkMap.tsx` (hero premium enhancement).

### RECAP — [2026-04-06 00:11] — LANDING PAGE COMPLETE

- **Navbar**: Tightened pill gap (`gap-x-12`→`gap-x-6`), padding (`px-6`→`px-4`), link spacing (`gap-x-6`→`gap-x-5`). No dead space, equal rhythm.
- **Footer (7 fixes)**: Brand copy → real HPL description. Address → Khajrana 452016. Phone → 0731 605 6001. Email → hindustanpharma1@yahoo.com. Solutions → Consignee Agent + Hindustan Drug House (removed 3PL & Fulfillment Hub). Company links → About/Services/Contact/Partner With Us (removed Infrastructure/Compliance). Socials → LinkedIn + WhatsApp only (removed Instagram/Twitter). Copyright → "Hindustan Pharma Logistics". GDPR link removed. Footer padding reduced to eliminate blank space.
- **🏁 Landing page is done.** All sections complete: Hero, Brand Carousel, Core Solutions, Workflow, Team, Testimonials, Footer.
- **Next**: Mobile responsiveness audit → inner pages polish (About, Services, Contact) → Lighthouse audit → Accessibility.

### RECAP — [2026-04-06 00:25]

- **Documented**: Generated `LANDING_PLAYBOOK.md` detailing the entire animation system, components APIs, design tokens, mouse offsets, and pitfall checks.
- **Built**: `components/TeamSection.tsx` inserted between 'How It Works' and 'TestimonialsCarousel'.
- **Features**: Dual 4:5 tall portraits, with a hidden text bio that gracefully slides open via CSS `grid-rows-[0fr]` to `[1fr]` on group hover. Integrated Unsplash placeholders for testing layout. Gated all entrance animations perfectly using `isIntroDone` & `staggerContainer` template.

### RECAP — [2026-04-06 01:05]

- **Refined**: Core Solutions background elements. Repositioned `ShieldCheck`, `Zap`, `Package`, and `Truck` icons to the far left/right edges to prevent them from being obscured by the central 2x2 cards.
- **Improved**: Broadened the SVG network paths to `x=50` to `x=1390` coordinates, framing the main content area. Added a second color-coded data particle (`#3B82F6`) with a staggered delay for a more dynamic "supply chain flow" visual.
- **Fixed**: Missing `Package` icon import in `app/page.tsx`.
- **Result**: Icons and animation lines are now clearly visible on laptop/desktop viewports, framing the content instead of being trapped behind it.

---

## 📈 Recent Activity Recap

### [2026-04-06] - Core Solutions Visual Polish

Refined the "Core Solutions" section background to ensure decorative elements (icons and network paths) enhance the UI without being obscured or too faint.

- **Icon Positioning**: Moved icons inward (e.g. from `-60px` to `md:left-4`) to ensure full visibility on standard screens.
- **Opacity Tuning**: Increased icon and background text transparency (`/10` and `/0.08`) for a more balanced "high-end" look.
- **Scale & framing**: Expanded the SVG network's viewport mapping and set `preserveAspectRatio="none"` for better framing across full-screen widths.
- **Clean UI**: Removed "Integrated" and "Compliant" badges from `CoreSolutionCard.tsx` as requested. Verified removal of technical metadata and noisy arrows.
- **Status**: Section refined; proceeding to mobile responsiveness audit.
- **SPA & Scroll Spy Update (2026-04-06)**:
    - **Architecture**: Transitioned to Single-Page Architecture. Merged About and Services content into `app/page.tsx`.
    - **Navigation**: Implemented grouped scroll-spy logic in `Navbar.tsx`.
    - **Logic**: Underline now spans functional blocks (Hero+Brands, Solutions+Workflow, Team+Testimonials) and hides on Footer.
    - **Anchor Support**: Added `#brands`, `#workflow`, `#team`, and `#testimonials` anchors for internal jumps.
    - **Next Phase**: Finalizing mobile responsiveness for the unified flow and image asset optimization.
- **Contact Page B2B Refactor (2026-04-06)**:
    - **Optimization**: Added `Company Name`, `Phone Number`, and `Enquiry Type` dropdown to capture higher-quality B2B leads.
    - **Branding**: Cleaned up Hero subtext, icon styles, and success messaging (removed "SaaS/Node" jargon).
    - **Spacing**: Synchronized `px-24` horizontal padding across sections for better layout framing.
    - **Cleanup**: Removed the extraneous map section as per user feedback to maintain a conversion-focused flow.

### RECAP — [2026-04-06 18:05]

- **Implemented**: `ContactSelect.tsx` — premium, accessible custom dropdown for B2B lead categorization (C&F, Super Stockist, etc.).
- **Updated**: `app/contact/page.tsx` — Expanded Zod schema to include `company` and `phone` fields.
- **Refined**: Contact page tone. Replaced "Secure Gateway" with "Send an Enquiry" and removed "Encoded Transmission" references.
- **Adjusted**: Horizontal padding increased from `px-6` to `px-8 md:px-16 lg:px-24` for a more spacious, professional framing.
- **Fixed**: Corrected HPL office address and removed "HQ Node" terminology.
- **Removed**: "Strategic Location" map section per user request for a cleaner conversion flow.
- **Status**: Contact flow optimized for pharma logistics B2B; Proceeding to final responsive polish.

+### RECAP — [2026-04-08 17:45]
+- **Implemented**: Global Accessibility System. Added ARIA landmarks, roles, and descriptive labels across all components (`Navbar`, `Footer`, `Hero`, `Solutions`, `Workflow`, `Team`, `Testimonials`).
+- **Improved**: Mobile responsiveness for Brand Carousel. Adjusted orbit lanes and text width to ensure zero overlap on narrow screens.
+- **Refined**: Visual hierarchy in mobile view for 'Core Solutions' and 'Workflow' sections.
+- **Fixed**: Typo in Hero mission statement ("Pharam" → "Pharma").
+- **Verified**: Visible focus states for keyboard navigation and comprehensive layout audit via Puppeteer.
+- **Status**: Core development complete; site is now fully responsive and accessible.

### RECAP — [2026-04-09 17:35]

- **Optimized**: `SmoothScroller.tsx` logic with a persistent DOM element and offset cache.
- **Refined**: Memory footprint by externalizing `TEAM_MEMBERS`, `SERVICES_DATA`, and `WHATSAPP_CONFIG` to module scope.
- **Improved**: Rendering stability by memoizing `HeroNetworkMap` and high-frequency event handlers.
- **Fixed**: Restored broken build dependencies in `app/page.tsx`.
- **Status**: Runtime performance significantly improved; ready for final build and Lighthouse verification.
- **Left off at**: `app/page.tsx` (Complete).
- **Pushed**: `refactor: performance and clean code audit optimizations` at 17:35
- **Pushed**: `fix: testimonials-carousel hook stability and typescript typing` at 23:15

### RECAP — [2026-04-09 23:15]

- **Built**: N/A (Corrective Refactor)
- **Changed**: `TestimonialsCarousel.tsx` — Fixed incorrectly nested Framer Motion variants that were violating the `Variants` type.
- **Fixed**: Resolved `The final argument passed to useEffect changed size` React error by stabilizing the Hook dependency list.
- **Fixed**: Improved auto-advance UX by ensuring timer resets on user interaction.
- **Pending**: Final Lighthouse verification and Image optimization.
- **Left off at**: Project cleanup complete. Repository lean and production-ready.

### RECAP — [2026-04-09 23:45]

- **Pushed**: Synced all local performance and stability fixes to `main` branch.
- **Cleaned**: Removed legacy routes (`/about`, `/services`), redundant assets, and unused boilerplate.
- **Refined**: Updated `Footer.tsx` with smooth-scroll anchors for the unified SPA layout.
- **Verified**: Project structure is now lean and production-ready.
- **Status**: HPL Landing Page optimization and cleanup complete.
- **Next Steps**: Deploy to Vercel and conduct final production quality checks.

### RECAP — [2026-05-14] - Contact Page Development & API Fix

- **Developed**: Created `/contact` page with improved multi-step enquiry form wizard
- **Components**: Built reusable form components (RoleSelector, ContactInfoStep, ManufacturerBusinessStep, DistributorBusinessStep, RequirementsStep, ReviewStep, FormStepper)
- **UX Improvements**: Implemented progressive disclosure, better visual hierarchy, accessible checkboxes, and enhanced form validation
- **API Fix**: Corrected `/api/enquiry` endpoint to properly save enquiry data to Neon DB via Prisma
- **Validation**: Verified data persistence by checking neon.tech Prisma console dashboard
- **Status**: Contact page is functional and ready for use as the primary enquiry form
- **Next Steps**: Prepare for final production deployment

### RECAP — [2026-05-17] - Browser Console Warning Fixes

- **Fixed Warning 1**: Added `data-scroll-behavior="smooth"` attribute to `<html>` element in `app/layout.tsx` to signal intentional smooth scrolling and silence Next.js warning.
- **Fixed Warning 2**: Resolved image aspect ratio warning by adding explicit style props (`style={{ width: 'auto' }}` and `style={{ height: 'auto' }}`) to logo and hero images:
    - `components/Navbar.tsx`: Added `style={{ width: 'auto' }}` to logo Image
    - `components/IntroAnimation.tsx`: Added `style={{ height: 'auto' }}` to hero images (logo and text wordmark)
- **Result**: Both browser console warnings eliminated; site now provides clean developer experience.
- **Files Modified**: `app/layout.tsx`, `components/Navbar.tsx`, `components/IntroAnimation.tsx`
- **Status**: Console warnings resolved; site ready for deployment

### RECAP — [2026-05-17] - Auth System Migration (Clerk Removed)

- **Removed**: Clerk authentication package (`@clerk/nextjs`) and all associated imports from dependencies
- **Cleaned Up**: Removed Clerk auth calls from all admin API routes:
    - `app/api/admin/enquiries/route.ts`: Removed `auth()` import and userId check
    - `app/api/admin/enquiries/[id]/route.ts`: Removed Clerk auth middleware
    - `app/api/admin/stats/route.ts`: Removed Clerk auth middleware
- **Updated Components**:
    - `components/admin/AdminSidebar.tsx`: Removed `useClerk()` and `useUser()` hooks, replaced with custom logout action
    - Simplified user identity display to static "Admin" label (auth is now cookie-based via proxy.ts)
- **Authentication**: Admin routes now protected via:
    - `proxy.ts` middleware for cookie-based request validation
    - `app/actions/auth.ts` for login/logout server actions
    - Environment variables: `ADMIN_USERNAME` and `ADMIN_PASSWORD`
- **Files Updated**:
    - `package.json`: Removed @clerk/nextjs dependency
    - `.gitignore`: Removed `/lib/generated/prisma` entry (cleanup)
    - All admin API routes and AdminSidebar component
- **Status**: Custom auth system verified and working; Clerk completely removed from codebase; no build errors
