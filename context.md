# Hindustan Pharma Logistics — Project Context

> Read it completely before writing any code.

---

## Company Overview

**Company Name:** Hindustan Pharma Logistics (HPL)
**Also Operates As:** Hindustan Drug House (distributor, Dawa Bazaar, Indore)
**Location:** Vijay Nagar, Indore, MP (second branch: Khajrana, Indore)
**Registered Address:** 3-4-5, Ram Krishna Bagh Colony, MR-9 Main Road, Indore
**GST Number:** 23AAHFH0579E1ZM
**Phone:** +91 93000 01411
**Email:** hindustanpharma1@yahoo.com

---

## What HPL Does

HPL operates in multiple roles simultaneously within the pharma distribution chain:

| Role | What It Means |
|---|---|
| **C&F Agent (CFA)** | Receives stock from manufacturers, stores it in their warehouse, dispatches to distributors on behalf of the principal company. Stock is owned by the manufacturer — HPL earns a commission on billing value (2–5%). Low inventory risk. |
| **Super Stockist** | Buys bulk stock from manufacturers, sells and distributes to sub-distributors and retailers across a region. HPL owns the stock. Operates at regional level as the primary supply hub for MP. |
| **Consignee Agent** | Receives and manages consignments on behalf of pharma manufacturers, handles both distribution and sales. Commission-based, no stock ownership. |
| **Hindustan Drug House** | A separate distributor entity operating from Dawa Bazaar (wholesale medicine market), Indore. Supplies directly to retailers, chemists, and smaller distributors. |

---

## Current Technology

**ERP: Marg ERP** (desktop, Windows-based, used daily)

Marg currently handles:
- ✅ Billing & invoicing (GST-compliant, PDF)
- ✅ Stock & inventory management (batch-wise, multi-godown)
- ✅ Expiration alerts (near-expiry notifications in desktop app)
- ✅ Purchase/sales ledgers & accounting
- ✅ E-way bill, e-invoicing generation

**Do NOT rebuild any of the above.**

Current gaps (our build targets):
- ❌ No website / zero online presence
- ❌ No document vault (drug licences, agreements, challans)
- ❌ No intelligent WhatsApp automation beyond basic bill-sending
- ❌ Not discoverable on Google

---

## What We Are Building

### Phase 1 — Public Website (Current)
4-page static/SSG public website. Zero connection to Marg. Zero backend in this phase.

Pages:
- `/` — Home
- `/about` — About Us
- `/services` — Services (CFA + Super Stockist + Consignee Agent + Hindustan Drug House)
- `/contact` — Contact Us

### Phase 2 — WhatsApp Automation Bot
Intelligent automation on top of Marg's basic WhatsApp bill-sending.
Scheduled reports, conversational stock queries, near-expiry alerts bridged from Marg CSV exports.

### Phase 3 — Document Vault
Upload, store, and search compliance documents (drug licences, C&F agreements, CDSCO correspondence, return memos).

---

## Website Content Map

### Home Page Sections
1. Hero — tagline, sub-tagline, 2 CTAs, teal dot-grid background
2. Stats Bar — Years, Clients, Distributors, Warehouse Locations
3. Services Overview — 4 cards (CFA, Super Stockist, Consignee Agent, Distribution/Hindustan Drug House)
4. How It Works — 3-step flow
5. Why Choose Us — 6 value tiles
6. Testimonials — 3 cards

### About Page Sections
1. Page Hero Banner
2. Our Story (company history, both HPL and Hindustan Drug House roles)
3. Mission & Vision
4. Company Timeline
5. Core Values Grid
6. Team Section

### Services Page Sections
1. Page Hero Banner
2. Service Detail blocks × 4 (alternating layout, each with anchor `id`)
   - C&F Agency Services (`#cf-agency`)
   - Super Stockist Services (`#super-stockist`)
   - Consignee Agent Services (`#consignee-agent`)
   - Hindustan Drug House — Direct Distribution (`#drug-house`)
3. Coverage Area (Indore + MP focus)
4. FAQ Accordion

### Contact Page Sections
1. Page Hero Banner
2. Contact Form (left) + Contact Info (right)
3. Google Maps Embed

---

## Tech Stack

| Layer | Tech | Notes |
|---|---|---|
| Framework | **Next.js 16** (`npx create-next-app@latest`) | App Router, Turbopack stable, React 19.2, Node 20.9+ required |
| Styling | **Tailwind CSS v4** | Comes with Next.js 16 scaffold |
| Components | **shadcn/ui** | `npx shadcn@latest init` |
| Animation | **Motion** (`npm install motion`) | `import { motion } from "motion/react"` — replaces Framer Motion |
| Icons | **Lucide React** | `npm install lucide-react` |
| Language | **TypeScript** | Strict mode |
| Phase 2+ DB | **PostgreSQL + Prisma** | Not needed in Phase 1 |
| Phase 2+ Auth | **NextAuth.js** | Not needed in Phase 1 |

---

## Recent Changes
- **2026-03-31**: Initialized Next.js 16.2.1 + Tailwind v4 + shadcn project.
- **2026-03-31**: Configured `Pharma Teal` (#006868) brand color.
- **2026-03-31**: Connected repository to `https://github.com/kunalmttl/hpl.git` and pushed to `main`.
- **2026-03-31**: Implemented high-fidelity Home, About, Services, and Contact pages with Framer Motion.
- **2026-03-31**: Resolved hydration mismatch error caused by browser extensions (`suppressHydrationWarning`).
- **2026-03-31**: Implemented premium inertial smooth scrolling using **Lenis** and updated global CSS.
- **2026-03-31**: Integrated "Knowledge Base" on Services page with the provided research report content.
- **2026-03-31**: Added persistent WhatsApp floating button for real-time engagement.

## Next Steps
- [ ] Implement a full "Resource Center/Blog" system if requested.
- [ ] Set up a proper backend for the contact form (e.g., Supabase Edge Functions).
- [ ] Optimize images and add real industrial photography for Indore hub.
- [ ] Conduct lighthouse audit for performance as part of SEO best practices.

---

## Design Direction

- **Tone:** Professional, trustworthy, clean. B2B pharma — not consumer brand.
- **Colors:** Warm neutral surfaces + pharma teal primary (`#006868`). Deep teal footer.
- **Fonts:** General Sans (display, Fontshare) + Satoshi (body, Fontshare)
- **Animations:** Motion library — scroll reveals, count-up stats, staggered card entrances
- **Rules:** No gradient buttons. Left-align body content. No colored icon circles. No stock photo placeholders.

---

## Competitor Reference: Pharmacare Logistics (pharmacare.in)

Pharmacare is a larger Mumbai-based pharma 3PL (WHO-GDP certified, 51–200 staff).
Their website has: infrastructure numbers, team cards, certifications display, Vision/Mission sections, values with 1-word titles, process language.
HPL adaptations: ambient storage only (no cold chain), Indore/MP regional focus, C&F + Super Stockist + distributor positioning.


## Error Log
| Date | Error | Fix Applied |
|------|-------|-------------|
| 2026-03-31 | `CssSyntaxError: Can't resolve 'tailwindcss-animate'` | Installed package; commented out in `globals.css` temporarily to allow build. Need to investigate v4 resolution. |
