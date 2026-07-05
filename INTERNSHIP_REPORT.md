# Internship Report

**Organisation:** Hindustan Pharma Logistics (HPL)  
**Duration:** February 2026 – June 2026 (4 Months)  
**Role:** Web Development Intern  
**Project:** Full-stack company website — design, development, SEO, and backend infrastructure  
**Website:** [www.hplco.in](https://www.hplco.in)

---

## Table of Contents

1. [Summary](#1-summary)
2. [Introduction](#2-introduction)
3. [Work](#3-work)
4. [Industry](#4-industry)
5. [Review](#5-review)
6. [Details of Work including Work Programme and Results](#6-details-of-work-including-work-programme-and-results)
7. [Conclusions and Future Scope](#7-conclusions-and-future-scope)
8. [References](#8-references)

---

## 1. Summary

This report documents four months of work undertaken as a Web Development Intern at Hindustan Pharma Logistics (HPL), a pharmaceutical Carrying & Forwarding (C&F) agency based in Indore, Madhya Pradesh. HPL had no digital presence at the start of the internship — no website, no search engine visibility, and no structured mechanism to receive B2B enquiries from pharmaceutical manufacturers or distributors.

The primary deliverable was the end-to-end design, development, and deployment of the company's official website at `www.hplco.in`. The project covered the full software lifecycle: requirements gathering, UI/UX design, frontend engineering, backend API development, database integration, email automation, Search Engine Optimisation (SEO), and a custom internal admin panel for lead management.

By the end of the internship, the website was live and indexed by Google, with 100% valid structured data across four schema types, a Neon PostgreSQL database capturing B2B leads, a Resend-powered transactional email pipeline, and an admin dashboard providing real-time insight into incoming enquiries. The codebase was shipped with zero TypeScript or ESLint errors, passing a production build cleanly.

---

## 2. Introduction

### 2.1 Background of the Organisation

Hindustan Pharma Logistics (HPL) was founded in 2009 and is headquartered at First Floor, 3-4-5, MR 9 Road, opposite Mahek Vatika Garden, RamKrishna Bagh, Khajrana, Indore, Madhya Pradesh — PIN 452010. The company operates as a C&F Agent and Consignee Agent serving pharmaceutical manufacturers, and also runs its own distribution brand, Hindustan Drug House, supplying chemists and pharmacies directly in and around Indore's Dawa Bazaar. HPL currently works with 60+ pharmaceutical brands and distributes across 12+ districts of Madhya Pradesh, employing over 20 staff.

HPL's core business lines are:

- **C&F Agency (Carrying & Forwarding):** Warehousing, inventory management, GST billing, and dispatching goods on behalf of pharmaceutical manufacturers to their distributor networks across Madhya Pradesh.
- **Super Stockist:** High-volume purchasing and redistribution of pharmaceutical goods to sub-stockists and retail chemists across Central India.
- **Consignee Agent:** Receiving goods in consignment, managing documentation and dispatch to buyers on the manufacturer's behalf.
- **Hindustan Drug House:** A proprietary retail distribution label supplying chemists and pharmacies directly.

### 2.2 Problem Statement

Despite operating for over 15 years and serving a significant portion of Madhya Pradesh's pharma supply chain, HPL had no digital presence at the beginning of the internship period. This created three distinct business problems:

1. **Discoverability:** Pharmaceutical manufacturers searching for C&F agents in Madhya Pradesh could not find HPL online. The company's Google Business Profile existed but was unverified and poorly optimised, meaning the company appeared nowhere in organic search results for queries like "C&F agent Indore" or "pharma super stockist MP."

2. **Lead Qualification:** Inbound enquiries arrived exclusively by phone or word of mouth. There was no structured mechanism to capture business details (company name, drug license, GST number, product categories), making lead qualification and follow-up labour-intensive.

3. **Credibility Signal:** In an industry where trust and scale are key differentiators, the absence of a professional web presence weakened HPL's standing relative to competitors who maintained even basic informational websites.

### 2.3 Objectives of the Internship

The internship was scoped to address these three problems through a single integrated deliverable — a production-grade company website — with the following measurable objectives:

- Build a professionally designed, fully responsive website representing HPL's services, team, and brand.
- Achieve Google indexing and structured data validation for core pages.
- Implement a B2B enquiry capture system storing leads to a persistent database.
- Deliver an internal admin panel enabling HPL staff to view and manage incoming enquiries without technical knowledge.
- Deploy the website to a production-grade hosting environment.

### 2.4 Scope of Work

The full scope included:

- UI/UX design decisions and implementation
- Frontend development (React, Next.js, Tailwind CSS, animation systems)
- Backend development (REST API routes, database schema, email automation)
- SEO (structured data, metadata, Google Search Console, sitemap, robots.txt)
- Admin panel development (authentication, dashboard, enquiries table, filtering)
- DevOps (Vercel deployment, environment variables, Turbopack build configuration)
- Performance optimisation (image compression, memoisation, Lighthouse audit)
- Accessibility audit (ARIA roles, keyboard navigation, reduced-motion support)

---

## 3. Work

### 3.1 Technologies Used

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js | 16.2.1 |
| Language | TypeScript | 5.x |
| UI Library | React | 19.2.4 |
| Styling | Tailwind CSS | 4.x |
| Component System | shadcn/ui | 4.x |
| Animation | Framer Motion | 12.38.0 |
| Smooth Scroll | Lenis | 1.3.21 |
| Database | Neon (PostgreSQL) | — |
| ORM | Prisma | 6.19.3 |
| Email | Resend | 6.10.0 |
| Form Validation | Zod | 4.3.6 |
| Form State | React Hook Form | 7.72.0 |
| Analytics | Vercel Analytics + Speed Insights | 2.0.x |
| Deployment | Vercel (Turbopack) | — |

Custom local fonts used: TT Neoris Trial Medium (headings) and Clarity City Thin (accent text), supplemented by Open Sans (Google Fonts) for body copy.

### 3.2 Role and Responsibilities

As the sole developer on this project, responsibilities spanned every stage of the product lifecycle:

- Translating business requirements from stakeholder discussions into technical specifications
- Designing the information architecture, page layout, and component hierarchy
- Writing all frontend, backend, and infrastructure code
- Liaising with the client to gather real assets (brand images, partner logos, team photographs, business details)
- Conducting SEO research and implementing structured data strategies
- Verifying the production build, fixing all warnings and errors, and managing deployment

### 3.3 Development Methodology

The project followed an iterative delivery methodology. Work was organised into discrete phases, each delivering a visible, testable increment:

- **Phase 1 (Foundation, March 2026):** Project scaffold, design system, Navbar, Hero section, core layout, intro animation.
- **Phase 2 (Content Sections, early April 2026):** Brand Carousel, Core Solutions grid, Workflow section, Team section, Testimonials Carousel, Footer.
- **Phase 3 (Performance & Polish, mid-April 2026):** Mobile responsiveness, accessibility audit, image optimisation, Lighthouse audit, animation stability.
- **Phase 4 (SEO & Indexing, late April 2026):** Advanced JSON-LD structured data, Google Search Console verification, sitemap submission, metadata refinement.
- **Phase 5 (Backend & Contact, May 2026):** Multi-step B2B enquiry form, Neon database integration via Prisma, Resend email API, Admin panel development.
- **Phase 6 (Production Hardening, late May 2026):** GBP alignment, NAP standardisation, OG image compression, Turbopack crash fix, ESLint/TypeScript clean sweep, final build verification.

A `project_state.md` file was maintained as a living changelog throughout the project, recording every architectural decision, bug fix, and completed milestone.

### 3.4 Work Log Summary

| Date | Key Work Completed |
|---|---|
| 2026-03-31 | Project kickoff. Next.js 16 scaffold, Tailwind v4, pharma teal theme, initial render verified. |
| 2026-04-03 | Hero section, full-page snap (Lenis), TypewriterHeading component, BrandCarousel 3D orbit. |
| 2026-04-03 | CoreSolutionCard component, Navbar active-tab styling, AI infographic images, staggered animations. |
| 2026-04-04 | Footer (CoreShift-inspired), unified background colour system, TestimonialsCarousel (envelope animation). |
| 2026-04-04 | IntroAnimation logo fly-away curve, Navbar coordinate alignment, animation sequencing. |
| 2026-04-05 | Performance: Footer GPU optimisation, scroll-animation timing, Hero layout tightening. |
| 2026-04-06 | TestimonialsCarousel transition bug fix (coordinate-space mismatch). |
| 2026-04-06 | HeroNetworkMap (animated SVG hub-spoke network, mouse parallax). |
| 2026-04-06 | Navbar tightening, Footer content corrections (7 issues). Landing page declared COMPLETE. |
| 2026-04-06 | TeamSection, SPA architecture, scroll-spy grouped navigation, Contact page B2B refactor. |
| 2026-04-08 | Global accessibility audit (ARIA landmarks, roles, aria-hidden, reduced-motion). |
| 2026-04-09 | Performance refactor: DOM caching, module-scoped data, memoisation. Contact integration (API). |
| 2026-04-11 | BrandConveyor (real 15+ pharma partner brands, infinite marquee, edge-fade masking). |
| 2026-04-16 | Brand Carousel asset refresh (12 WebP images). Advanced SEO Phase 2 (multi-entity JSON-LD). |
| 2026-04-16 | Google Search Console verification. 100% Valid structured data. Core URLs indexed. |
| 2026-04-19 | Favicon engineering (white circular background). Apple icon. SEO title refinement. |
| 2026-05-14 | Multi-step enquiry form wizard. Neon DB + Prisma integration. Data persistence verified. |
| 2026-05-17 | Browser console warning fixes. Auth system migration: Clerk removed, custom cookie auth. |
| 2026-05-19 | Admin Dashboard (`/admin/overview`): stats, recent leads, breakdown chart, channel status. |
| 2026-05-19 | Enquiry form validation: GST pattern, +91 phone pattern, email, required fields. |
| 2026-05-22 | GBP NAP alignment, maps CID embed, OG image compression (642 KB → 50 KB, 92% reduction). |
| 2026-05-22 | TypeScript/ESLint clean sweep — 0 errors/warnings. Production build verified (`exit 0`). |

---

## 4. Industry

### 4.1 The Indian Pharmaceutical Logistics Sector

India is the world's third-largest pharmaceutical market by volume and a leading exporter of generic drugs, supplying approximately 20% of global generic medicine exports. The domestic pharmaceutical supply chain is a complex, multi-tiered system connecting manufacturers (primarily based in hubs like Ahmedabad, Hyderabad, and Mumbai) to the end consumer through a network of national distributors, state-level C&F agents, super stockists, sub-stockists, and retail chemists.

Central India — encompassing Madhya Pradesh, Chhattisgarh, and parts of Rajasthan — presents a particularly fragmented logistics landscape. With a large geographic spread, variable road infrastructure, and a mix of urban and rural distribution requirements, the region relies heavily on locally-embedded logistics partners who understand both the regulatory environment and the distribution geography.

### 4.2 The Role of C&F Agents and Super Stockists

A Carrying & Forwarding (C&F) Agent occupies a critical node in India's pharmaceutical supply chain. Unlike a simple transporter, a C&F agent acts as the manufacturer's operational representative in a given state or region. Their responsibilities typically include:

- **Warehousing and inventory management** of the manufacturer's stock on their premises
- **Generating GST-compliant invoices** on behalf of the manufacturer when goods are dispatched
- **Managing documentation** including drug licences, GST filings, and consignment records
- **Distribution coordination** — ensuring timely dispatch to the manufacturer's approved distributor network

C&F agents are paid on a commission basis (typically a percentage of the net sales value) and are not considered buyers of the goods — the stock remains the manufacturer's asset until it reaches the distributor. This distinction makes them fundamentally different from super stockists, who actually purchase goods and resell them.

A Super Stockist, by contrast, purchases pharmaceutical goods in bulk and redistributes them to a network of sub-stockists, retail chemists, and pharmacies. Super stockists carry financial risk (as actual buyers of inventory) but benefit from higher margins and greater control over pricing at the redistribution level.

HPL uniquely operates across both models: functioning as a C&F agent for certain manufacturers while acting as a super stockist for others, in addition to running Hindustan Drug House as a direct retail distribution brand.

### 4.3 Regulatory Environment

The Indian pharma distribution chain is governed by:

- The **Drugs and Cosmetics Act, 1940** and its amendments, which mandate drug licences for storage and sale of pharmaceutical products
- **GST (Goods and Services Tax)** regulations covering inter-state and intra-state pharmaceutical transactions
- **Schedule H and H1 drugs** — prescription-only medicines requiring documented transaction trails through the distribution chain

C&F agents and distributors are required to maintain valid drug licences and are subject to state-level drug controller inspections. This regulatory complexity makes the trust relationships between manufacturers and their C&F partners especially important — a manufacturer cannot simply switch logistics partners without due diligence on licence validity and compliance history.

### 4.4 Digital Transformation in Pharma Logistics

Historically, pharma logistics in India has been highly relationship-driven. Manufacturer-distributor relationships were built through trade fairs, industry associations (such as AIOCD — All India Organisation of Chemists and Druggists), and personal referrals. Digital channels played a minimal role.

However, the post-pandemic landscape has accelerated a shift. Manufacturers — particularly those based outside Central India — increasingly use Google searches, B2B portals, and LinkedIn to identify and evaluate C&F partners in new geographies before making direct contact. This search-first discovery behaviour creates a meaningful first-mover advantage for logistics companies that establish credible digital presences early.

Key digital channels relevant to the sector include:

- **Google Search and Google Business Profile** — the primary discovery mechanism for local B2B services
- **Trade portals** such as TradeIndia, JustDial, and IndiaMART — secondary discovery channels
- **LinkedIn** — for credibility signals among larger pharmaceutical companies evaluating logistics partners

HPL's digital strategy was designed to capture this search-driven discovery opportunity.

### 4.5 Competitive Landscape

The C&F agent market in Indore is not heavily consolidated at the digital level. As of the internship period, most C&F agents in the region maintained either no web presence or minimal, outdated static HTML sites with no SEO optimisation. This created a clear opportunity: a well-structured, technically optimised website with proper structured data could rank prominently for high-intent queries from manufacturers within a relatively short indexing period.

---

## 5. Review

### 5.1 What Went Well

**Scope delivery:** All primary objectives were delivered within the four-month period. The website is live, indexed, and functional as a lead generation tool with a working backend pipeline.

**Technical depth:** The project covered a genuinely broad technical stack. Working across frontend animation systems, API route development, database schema design, email delivery, SEO structured data, and a custom admin dashboard in a single project provided practical experience across the full web development spectrum.

**SEO outcome:** Achieving 100% valid status across all four structured data schema types (LocalBusiness, Organisation, FAQPage, BreadcrumbList) within the first indexing cycle was a strong outcome, particularly given the relative complexity of multi-entity JSON-LD graph schemas.

**Code quality:** The final codebase passed a strict ESLint and TypeScript audit with zero errors or warnings (`npx eslint --quiet` outputting clean). The production build (`npm run build`) exits with code 0. This standard of code quality is meaningful for a project of this scope delivered by a single developer.

**Problem-solving under real constraints:** Several non-trivial bugs were encountered and resolved: a Turbopack filesystem watcher crash caused by a corrupted cache directory, a coordinate-space mismatch in the Testimonials Carousel causing a visual flash during phase transitions, a favicon visibility failure in dark mode (resolved by programmatically generating a white circular background for the icon), and a 100-pixel alignment error in the logo fly-away animation resolved through precise DOM coordinate calculation.

### 5.2 Challenges Encountered

**Asset dependency:** A significant portion of the schedule in the early phases was constrained by waiting for real assets from the client — team photographs, partner brand logos, and verified business details. This required building sections with placeholder content first and retrofitting real data, which occasionally created rework. In future projects, an asset checklist delivered to the client at kickoff would streamline this.

**Scope creep management:** The admin panel, multi-step enquiry form wizard, and full authentication system were not in the original scope but were added progressively as the value became apparent. While the additions strengthened the final product, they compressed the timeline for the final Phase 6 polish work. Clearer phase-gate checkpoints would help manage scope expansion more formally.

**Authentication system migration:** An initial integration with Clerk (a third-party authentication SaaS) was subsequently removed in favour of a custom cookie-based authentication implementation after evaluating maintenance complexity and dependency overhead. While the migration was completed cleanly, it represented rework that a more thorough initial architectural review might have avoided.

**No staging environment:** The project was developed and deployed to a single Vercel environment, meaning there was no formal staging-to-production promotion workflow. For a production website receiving real B2B enquiries, a staging branch with preview deployments would provide safer iteration.

### 5.3 Technical Decisions Rationale

**Next.js 16 with App Router:** Chosen for its built-in support for server-side rendering, the Metadata API (critical for SEO), route-level structured data injection, and seamless Vercel deployment. The App Router's server component architecture enabled inline JSON-LD schema injection without client-side JavaScript overhead — an important SEO consideration.

**Tailwind CSS v4:** Adopted for its design-token-first architecture, which maps naturally to maintaining a consistent brand colour system (pharma teal `#0e7c6e`, neutral grays, white) across a large component tree without stylesheet bloat.

**Framer Motion v12:** Selected for its declarative animation API and first-class support for scroll-triggered variants, layout animations, and AnimatePresence — all of which were required by the design brief's animation specifications.

**Lenis for smooth scrolling:** Chosen over CSS `scroll-behavior: smooth` because Lenis provides a programmable, easing-aware scroll bus that could be integrated with the full-page snap controller and the scroll-spy navigation logic simultaneously.

**Neon + Prisma for the database:** Neon's serverless PostgreSQL offering was selected for its Vercel-native integration, zero connection management overhead, and the ability to spin up a production-grade database without infrastructure provisioning. Prisma was used as the ORM for type-safe query generation and schema management.

**Resend for transactional email:** Chosen for its developer-centric API, reliable deliverability through verified sender domains, and straightforward integration within Next.js API routes. The email pipeline sends two messages per enquiry submission — a structured summary to the HPL operations team, and an automated acknowledgement to the submitting company.

---

## 6. Details of Work including Work Programme and Results

### 6.1 Phase 1 — Foundation and Design System (March 2026)

**Objective:** Establish the project scaffold, design language, and core layout infrastructure.

**Work Undertaken:**

The project was initialised using `create-next-app` with Next.js 16.2.1, Tailwind CSS v4, and TypeScript. A custom pharma-teal design system was configured in `globals.css` using Tailwind v4's `@theme` directive, defining semantic design tokens for the primary colour (`--color-pharma-teal: #0e7c6e`), background (`#EDEDED`), foreground, muted, and border values.

Three custom font families were configured in `app/layout.tsx`:

- **TT Neoris Trial Medium** (`--font-tt-neoris`): local `.ttf`, used for section headings
- **Clarity City Thin** (`--font-clarity-city`): local `.ttf`, used for accent and overline text
- **Open Sans** (`--font-open-sans`): Google Fonts, preloaded, used for body copy

The root layout (`app/layout.tsx`) was set up with:
- Full `Metadata` API configuration including OpenGraph, Twitter Card, canonical URLs, and `metadataBase`
- A multi-entity JSON-LD `@graph` schema (LocalBusiness, Organisation, BreadcrumbList) injected as an inline `<script type="application/ld+json">` in the document body
- `<link rel="preconnect">` and `<link rel="preload">` directives for the above-the-fold logo image, reducing perceived load time on initial visit
- Vercel Analytics and Speed Insights integrations

**Result:** A clean, compiling Next.js 16 project with a consistent design system, font stack, and global SEO/analytics infrastructure in place by end of March 2026.

---

### 6.2 Phase 2 — Landing Page Sections (April 2026, Weeks 1–2)

**Objective:** Build all visible content sections of the landing page to a production-ready standard.

**Work Undertaken:**

The landing page was architected as a Single-Page Application (SPA) with anchor-linked sections, rather than separate routes for Home, About, and Services. This decision was driven by the SEO objective of concentrating all authority onto a single canonical URL (`hplco.in/`) rather than distributing it across pages with thin content.

**Sections built:**

**Hero Section** — Featured a headline with a `TypewriterHeading` component (bidirectional, scroll-triggered character-by-character typing with configurable speed and delay), a tagline, a CTA button with spring-animated zoom-from-nothing entrance, and a `HeroNetworkMap` component.

`HeroNetworkMap` is a fully custom SVG component (600×470 viewBox) rendering an animated hub-spoke distribution network representing HPL's reach. It features: 12 spoke paths with staggered `pathLength` draw-in animations (70ms apart), an outer dashed connecting ring, 3 concentric ripple rings, 12 travelling data-flow dots moving along the spoke paths, pulsing satellite nodes at each spoke endpoint, and a central glow hub. Mouse parallax depth was added to the Hero stat cards using Framer Motion's `useMotionValue`, `useSpring` (stiffness: 40, damping: 20), and `useTransform` — left-side cards track mouse direction, right-side cards oppose it, creating a stereoscopic depth illusion.

**Brand Carousel (`BrandCarousel.tsx`)** — A dual-orbit 3D carousel rendering 16 card positions (8 per hemisphere) cycling through 12 real pharmaceutical partner brand WebP images using a modular loop index (`(i + 8) % 12`). Cards are positioned absolutely at orbit radii of 240px (desktop) and 120px (mobile) using trigonometric transforms. The component was wrapped in a `useEffect` mounted check to prevent hydration mismatch between SSR and client render.

**Brand Conveyor (`BrandConveyor.tsx`)** — A separate horizontal infinite marquee strip with CSS `@keyframes` scroll animation and symmetric edge-fade masking via `linear-gradient` masks. Listed 15+ real pharma partner brands in TT Neoris typography with individual hover-highlight states.

**Core Solutions** — A 2×2 card grid using a custom `CoreSolutionCard` component. Each card featured: an AI-generated infographic image area, a floating accent icon, radar pulse rings, decorative corner brackets, and staggered entrance animations coordinated through a Framer Motion `staggerContainer` parent. The four service cards covered C&F Agency, Super Stockist, Consignee Agent, and Hindustan Drug House.

**Workflow Section ("From Manufacturer to Market")** — Three-card layout illustrating the pharma supply chain steps: Manufacturer Ships → HPL Stores & Manages → Dispatch to Market. Cards used a responsive `md:flex-row` layout, colour-coded top-border accents (Blue, Teal, Amber), premium icon containers, Framer Motion `whileHover` spring animations (stiffness: 200, damping: 18), and staggered wave-curve entrance positioning.

**Team Section** — Dual portrait cards for the company directors (Anil Kumar Sen and Pradeep Artwani) using 4:5 aspect-ratio image crops with `object-top` positioning to prevent head clipping. Hidden text bios reveal on hover via CSS `grid-rows-[0fr]` to `grid-rows-[1fr]` transitions.

**Testimonials Carousel** — A high-fidelity multi-phase animated component. Phase 1 (envelope): a scaled-up envelope element (950×860) rises from below the viewport. Phase 2 (fan): cards fan out in a radial arc (450×300 each). A critical transition bug was diagnosed and fixed: the double-card flash was caused by (a) missing `exit` props on the `AnimatePresence` envelope unit and (b) a coordinate-space mismatch between the 950px envelope container and the full-width flex fan layout, causing a ~140px visual jump on transition. Fixed by fading the envelope card to opacity 0 before unmounting, and changing the fan card initial state to `{ opacity: 0, y: -30 }` for a clean entrance.

**IntroAnimation** — A branded entrance sequence showing the HPL wordmark image, followed by a logo fly-away animation that docks the logo precisely into the Navbar. The `isIntroDone` signal gates all section animation triggers to prevent premature reveal before the intro completes. The 100px alignment miss during fly-away was resolved by reading the Navbar's resting `boundingClientRect` accounting for its `-100px` hidden-state offset.

**Navbar** — A compact floating pill with grouped scroll-spy logic. Intersection Observer tracks which section group is in view (Hero+Brands, Solutions+Workflow, Team+Testimonials) and applies a bold underline accordingly. The pill hides when the Footer is visible, preventing double-navigation confusion.

**Footer** — A premium multi-column layout with HPL branding, real contact details, service links, and social tiles (LinkedIn, WhatsApp). Hardware acceleration was applied via `will-change-transform` to the watermark element to reduce GPU rasterisation cost.

**Result:** A complete, production-quality single-page landing website covering all of HPL's business content across 7 sections, with a cohesive animation system and consistent design language. Declared complete on 6 April 2026.

---

### 6.3 Phase 3 — Performance, Accessibility, and Mobile Polish (April 2026, Weeks 2–3)

**Objective:** Ensure the site meets production standards for performance, accessibility, and mobile responsiveness.

**Work Undertaken:**

**Performance Optimisations:**

- **SmoothScroller DOM caching:** The scroll-event handler in `SmoothScroller.tsx` was refactored to cache section DOM element references and pre-compute their offsets on mount, reducing the per-scroll-event computation from O(n) DOM queries to O(1) cached lookups.
- **Module-scope data externalisation:** Large static arrays (`TEAM_MEMBERS`, `SERVICES_DATA`, `WHATSAPP_CONFIG`) were moved from component-level declarations to module scope, eliminating heap allocation and garbage collection pressure during React re-renders.
- **HeroNetworkMap memoisation:** The `HeroNetworkMap` component was wrapped in `React.memo`, preventing expensive re-calculation of 12 animated SVG paths on parent state updates.
- **Event handler memoisation:** High-frequency handlers (mouse movement, scroll navigation) were wrapped in `useCallback` to maintain stable reference equality across renders.
- **Footer blur reduction:** The watermark blur radius was reduced from 120px to 40px, removing a significant GPU rasterisation cost that was causing frame drops on lower-end devices. The scale animation on the watermark was also removed to prevent re-rasterisation during movement.
- **Image optimisation:** All brand carousel images were converted to `.webp` format. The OG image was compressed from 642 KB to 50 KB (a 92% reduction) to improve page load time and social preview caching performance.

**Accessibility Audit:**

A comprehensive ARIA implementation was applied globally:
- Semantic HTML landmarks (`<main>`, `<header>`, `<footer>`, `<nav>`, `<section>`) with `aria-label` attributes on all major regions.
- `aria-hidden="true"` on all decorative motion elements (SVG paths, background icons, carousel orbit items) to prevent screen reader noise.
- Visible focus ring states for all interactive elements (buttons, links, form inputs) to support keyboard navigation.
- `prefers-reduced-motion` media query support: all Framer Motion variants were configured to respect the OS reduced-motion setting.

**Mobile Responsiveness:**

- Brand Carousel orbit radius reduced to 120px on mobile viewports to prevent card overlap on narrow screens.
- Core Solutions grid adjusted from `grid-cols-2` to `grid-cols-1` below the `md` breakpoint.
- Workflow section heading text scaled down (`text-2xl` on mobile vs `text-4xl` on desktop) to prevent horizontal overflow.
- Navigation pill link spacing reduced at mobile viewport to maintain density without overflow.

**Result:** The website passed Lighthouse audit with strong scores across Performance, Accessibility, Best Practices, and SEO categories. Zero ARIA violations detected in accessibility audit.

---

### 6.4 Phase 4 — SEO and Google Indexing (April 2026, Weeks 3–4)

**Objective:** Achieve Google indexing with maximum structured data validity and organic search presence.

**Work Undertaken:**

**Structured Data (JSON-LD):**

A multi-entity `@graph` schema was implemented across the site using Schema.org vocabulary:

*Global layout (`app/layout.tsx`):*
```json
{
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "LocalBusiness", ... },
    { "@type": "Organization", ... },
    { "@type": "BreadcrumbList", ... }
  ]
}
```

The `LocalBusiness` entity included: full NAP (Name, Address, Phone), geo-coordinates (22.740256, 75.9083201), opening hours, founding date (2009), employee count range, area served (Madhya Pradesh), and a `sameAs` array linking to verified external profiles on LinkedIn, JustDial, TradeIndia, and the Google Maps CID (`https://maps.google.com/?cid=12952865769213892787`).

*Home page (`app/page.tsx`):*
- A `Service` schema array covering all four service lines (C&F Agency, Super Stockist, Consignee Agent, Hindustan Drug House), each with `provider`, `areaServed`, and `serviceType` properties.
- A `FAQPage` schema with 6 question-answer pairs covering the most common manufacturer enquiries. To reduce the initial HTML payload, the FAQPage schema was injected via a `DeferredFAQSchema` client component that appends the `<script>` tag to the DOM after the page becomes interactive, removing approximately 3.5 KB from the critical rendering path.

*Contact page (`app/contact/page.tsx`):*
- A two-step `BreadcrumbList` (Home > Contact) for breadcrumb rich results in search.
- Localised metadata with city and service-specific title targeting.

**Metadata refinement:**

Page titles were standardised across routes to eliminate keyword redundancy and improve relevance:
- Home: "Hindustan Pharma Logistics | C&F Agent, Consignee & Super Stockist Indore"
- Contact: "Contact HPL — C&F Agent Enquiries, Indore | Hindustan Pharma Logistics"

Target keywords identified and distributed across metadata: "C&F agent Indore", "CFA Indore", "CF agent pharma", "pharma super stockist Madhya Pradesh", "consignee agent pharma MP", "pharmaceutical logistics Indore."

**Crawl directives:**

`app/sitemap.ts` was updated with production-grade priority and change frequency values. `app/robots.ts` was configured to allow all Googlebot crawling while blocking `/admin/` from search engine indexing.

**Google Search Console:**

Domain ownership for `hplco.in` was verified via the Google Search Console HTML meta tag method. The dynamically generated sitemap (`https://www.hplco.in/sitemap.xml`) was submitted and processed with zero errors.

**Result:** 100% "Valid" status achieved for all four schema types (LocalBusiness, Organisation, FAQPage, BreadcrumbList) as confirmed by the Rich Results Test. All core URLs confirmed as crawled and indexed by Googlebot. Google Business Profile aligned with full NAP consistency across all schema entities.

---

### 6.5 Phase 5 — Backend: B2B Enquiry System and Admin Panel (May 2026, Weeks 1–3)

**Objective:** Build a complete lead capture, storage, email, and management pipeline.

**Work Undertaken:**

**Contact Page — Multi-Step Enquiry Wizard:**

The contact page was developed as a multi-step form wizard with progressive disclosure, serving two distinct user types: pharmaceutical manufacturers and distributors. The form comprised the following steps:

1. **Role Selector:** The user selects their role (Manufacturer or Distributor), which determines the subsequent form steps.
2. **Contact Information:** Company name, contact person name, phone number, email address, drug licence number.
3. **Business Details (Manufacturer path):** Product categories (multi-select checkboxes: Tablets, Capsules, Injectables, Syrups, Ointments), monthly volume range, districts where distribution is needed.
4. **Business Details (Distributor path):** GST number, years in operation, preferred product categories, currently operating districts.
5. **Requirements:** Free-text message for additional context.
6. **Review Step:** A summary of all entered data before final submission, with an edit-back facility.

Client-side validation was implemented using Zod schema validation with the following custom patterns:
- Phone: must match the `+91XXXXXXXXXX` or `0XXXXXXXXXX` Indian format
- GST: must match the standard 15-character Indian GST format (`\d{2}[A-Z]{5}\d{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}`)
- Drug Licence: minimum 3 characters
- Email: valid email format or empty (optional field)

**API Route (`/api/enquiry`):**

The enquiry POST handler was implemented in `app/api/enquiry/route.ts` with:

1. **Zod server-side validation** — all fields re-validated on the server independent of client validation.
2. **Neon DB persistence via Prisma** — each submission creates a record in the `enquiry` table with role, company, contact, phone, email, drug licence, role-specific fields (product categories as array, monthly volume, districts, GST, years in operation), and a `status` field (defaulting to `"new"`).
3. **Dual Resend email dispatch** — two emails sent asynchronously per submission:
   - To the HPL operations team (`info@hplco.in`): an HTML-formatted summary table with all submitted fields.
   - To the submitting company (if email provided): an automated acknowledgement with response time expectation (24 hours) and direct contact details.

The email dispatch was made non-blocking (`sendEmails(d).catch(...)`) so that a Resend API failure does not cause the API to return a 500 error to the submitter.

**Admin Panel:**

An internal admin panel was built under the `/admin/` route prefix, protected by a cookie-based authentication middleware in `proxy.ts` (Next.js 16's middleware file). Authentication credentials are stored as `ADMIN_USERNAME` and `ADMIN_PASSWORD` environment variables.

The admin panel comprised:

- **`/admin/overview`** — A dashboard page with:
  - Four KPI stat cards (Total Enquiries, New/Unread, Manufacturers count, Distributors count)
  - A Recent B2B Enquiries table showing the 5 latest submissions with company name, role badge, contact details, date, and status badge
  - A Leads Breakdown visual bar chart showing manufacturer vs distributor ratio
  - A Channels & Routing panel showing live status indicators for Zoho Mailbox, Resend mailer, and Neon Database

- **`/admin/enquiries`** — A full enquiries management table with:
  - Filterable by status (New, Reviewed, Contacted, Closed) and role (Manufacturer, Distributor)
  - Sortable columns with paginated display
  - A Detail Drawer (`DetailDrawer.tsx`) showing the full submission data for a selected enquiry
  - Inline status update capability

An initial Clerk authentication integration was subsequently replaced with a lightweight custom cookie-based system, as Clerk introduced unnecessary dependency overhead for a single-admin internal tool.

**Result:** End-to-end lead capture pipeline operational. Enquiry submissions persist to Neon PostgreSQL, trigger formatted email notifications to both HPL staff and the submitting company, and are visible in real-time on the admin dashboard. Data persistence was verified directly against the Neon database console.

---

### 6.6 Phase 6 — Production Hardening (May 2026, Week 4)

**Objective:** Prepare the codebase and deployment for long-term production use with zero warnings or errors.

**Work Undertaken:**

**Google Business Profile (GBP) NAP Alignment:**

Full Name-Address-Phone (NAP) consistency was enforced across all surfaces:
- JSON-LD `LocalBusiness` schema in `app/layout.tsx`
- Footer address text in `components/Footer.tsx`
- Contact page location information strip
- Google Maps embed iframe CID (`0x3962e3d3b7a5bf57:0xb3a827560a8a6493`)

The verified GBP address (`First Floor, 3-4-5, MR 9 Road, opposite Mahek Vatika Garden, RamKrishna Bagh, Khajrana, Indore MP 452010`) was standardised identically across all three locations. NAP consistency is a significant local SEO signal — discrepancies between website data and the GBP listing reduce Google's confidence in the business entity and suppress local pack rankings.

**OG Image Compression:**

The Open Graph image (`public/og-image.png`) was resized and re-exported from 642 KB to 50 KB, a 92% file-size reduction. This image is fetched by social media platforms (WhatsApp, LinkedIn) and search engine crawlers when generating link previews. A large OG image delays social sharing previews and contributes to initial page weight.

**TypeScript and ESLint Clean Sweep:**

A comprehensive code quality pass resolved all remaining type violations:
- Replaced all `any` type casts in form step components (`ManufacturerBusinessStep`, `RequirementsStep`, `ReviewStep`) with the properly imported `FormData` interface.
- Typed Framer Motion `rotation` values as `MotionValue<number>` in `BrandCarousel.tsx`.
- Replaced `as any` casts in `ContactForm.tsx` with typed `as const` assertions.
- Fully typed query/filter callbacks in admin API routes to eliminate all `any` usage.

Running `npx eslint --quiet` returned zero warnings or errors.

**Production Build Verification:**

`npm run build` (Turbopack) was run and exited with code 0 — no compilation errors, type errors, or warnings. All routes pre-rendered or set to dynamic as appropriate. The Turbopack filesystem crash (caused by a corrupted `.next_old_corrupted` cache directory interfering with the file watcher) was resolved by relocating the directory outside the project workspace.

**Result:** Production-ready codebase with zero errors across TypeScript, ESLint, and the Next.js build pipeline. All SEO signals aligned between the codebase and the verified Google Business Profile.

---

### 6.7 Summary of Results

| Metric | Result |
|---|---|
| Website live and indexed | Yes — `www.hplco.in` |
| Google Search Console verified | Yes |
| Structured data validity | 100% Valid (LocalBusiness, Organisation, FAQPage, BreadcrumbList) |
| Core pages indexed by Googlebot | Yes |
| GBP NAP alignment | Full (address, phone, email, hours, coordinates) |
| OG image size | Reduced from 642 KB to 50 KB (92% reduction) |
| TypeScript errors | 0 |
| ESLint warnings/errors | 0 |
| Production build exit code | 0 |
| Enquiry form steps | 6-step wizard with role-based branching |
| Email notifications | Dual-send per submission (owner + submitter) |
| Database | Neon PostgreSQL — enquiries persisted and queryable |
| Admin panel routes | `/admin/overview` + `/admin/enquiries` |
| Total components built | 40+ React components across pages and admin |
| Animations built | 9 major animation systems (intro, fly-away, typewriter, carousel, conveyor, testimonials, network map, parallax, section snap) |

---

## 7. Conclusions and Future Scope

### 7.1 Conclusions

The internship project at Hindustan Pharma Logistics delivered a production-grade digital presence from a standing start — no prior website, no indexed pages, and no digital lead pipeline existed at the start of February 2026. By the end of June 2026, the company had a fully live website with verified Google indexing, rich results eligibility across four structured data types, a functional B2B enquiry system storing leads to a cloud database, transactional email notifications, and an internal admin dashboard enabling non-technical staff to manage incoming leads.

The project demonstrated the practical application of a broad technology stack — Next.js 16, Tailwind CSS v4, Framer Motion, Prisma ORM, Neon PostgreSQL, Resend, and Zod — in the context of a real business with real operational constraints, real assets, and real SEO objectives. The experience of working directly with a client, iterating on requirements, and shipping to production is meaningfully different from academic project work: asset delays, scope additions, authentication migrations, and production build crashes are not scenarios that appear in coursework.

### 7.2 Future Scope

The following enhancements would extend the platform's capabilities and business value in subsequent development cycles:

**Content Management System (CMS):** The team section and testimonials are currently hardcoded in component files. Integrating a headless CMS (such as Sanity or Contentful) would allow HPL staff to update team details, add case studies, and publish news articles without developer involvement.

**Blog / SEO Content Hub:** Long-form content (articles about pharma regulations, the C&F model, distribution economics in MP) would generate topical authority signals and increase organic search coverage beyond transactional queries. A blog section with proper article schema would be high-impact for SEO in the 6–18 month horizon.

**Analytics Dashboard Integration:** The admin panel could be extended to surface Vercel Analytics data (page views, top referrers, geographic distribution of visitors) alongside the lead data, giving HPL a unified view of both traffic and conversions.

**Enquiry Status Workflow:** The current admin panel shows enquiry status but updating it requires manual interaction. A lightweight CRM-style pipeline view (Kanban board with stages: New → Contacted → Meeting Scheduled → Closed) would improve sales workflow.

**WhatsApp Business API Integration:** HPL currently lists a WhatsApp number as a static link. Integrating the WhatsApp Business API would allow automated enquiry acknowledgement messages via WhatsApp in addition to email, improving response speed perception.

**Performance Monitoring and Alerting:** Setting up Vercel Speed Insights alerting thresholds and Core Web Vitals monitoring would ensure that future code changes do not regress the Lighthouse performance scores achieved at launch.

---

## 8. References

1. Next.js Documentation. Vercel Inc. https://nextjs.org/docs
2. Tailwind CSS Documentation. Tailwind Labs. https://tailwindcss.com/docs
3. Framer Motion Documentation. Framer. https://www.framer.com/motion
4. Schema.org Structured Data Vocabulary. W3C / Schema.org. https://schema.org
5. Google Search Central — Structured Data Guidelines. Google LLC. https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data
6. Prisma Documentation. Prisma Data Inc. https://www.prisma.io/docs
7. Neon Documentation. Neon Inc. https://neon.tech/docs
8. Resend Documentation. Resend Inc. https://resend.com/docs
9. Zod Documentation. Colin McDonnell. https://zod.dev
10. Lenis Documentation. Studio Freight. https://lenis.studiofreight.com
11. Vercel Analytics and Speed Insights. Vercel Inc. https://vercel.com/docs/analytics
12. Drugs and Cosmetics Act, 1940. Ministry of Health and Family Welfare, Government of India. https://cdsco.gov.in
13. AIOCD — All India Organisation of Chemists and Druggists. https://www.aiocd.net
14. Google Business Profile Help. Google LLC. https://support.google.com/business
15. Rich Results Test. Google LLC. https://search.google.com/test/rich-results
