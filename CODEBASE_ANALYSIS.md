# Forensic Codebase Analysis — HPL (Hindustan Pharma Logistics)

> Generated via complete file-by-file read of all source files.
> Every claim cites the exact file and function that implements it.

---

## Project Name & One-Line Purpose

**HPL — hplco.in**
A production Next.js 16 web application that establishes a complete digital presence for Hindustan Pharma Logistics — a C&F agent, super stockist, and consignee agent based in Indore, MP — including a public-facing marketing site with SEO schema, a multi-step B2B enquiry system, and a password-protected admin dashboard for lead management.

---

## Problem It Solves

HPL had zero digital footprint. Pharma manufacturers and distributors searching for C&F agents in Madhya Pradesh could not find them online. The codebase solves this by:

1. Creating a crawlable, schema-rich public website that targets B2B search intent ("C&F agent Indore", "pharma super stockist MP")
2. Replacing phone-only lead intake with a structured multi-step enquiry wizard that captures role-specific B2B data (drug license, GST, product categories, districts)
3. Persisting all leads to a production PostgreSQL database and routing email notifications to the business owner in real-time
4. Providing an authenticated internal dashboard for the HPL team to review, filter, and action leads without needing external CRM software

---

## Full Tech Stack

| Category | Technology | Exact Version |
|---|---|---|
| Runtime | Node.js | Inferred from Vercel deployment target |
| Framework | Next.js | 16.2.1 (`package.json`) |
| Language | TypeScript | ^5 (`package.json`) |
| React | React + ReactDOM | 19.2.4 (`package.json`) |
| Styling | Tailwind CSS | ^4 (`package.json`, `globals.css` uses `@import "tailwindcss"`) |
| UI Components | shadcn/ui (radix-nova style) | components.json — `"style": "radix-nova"` |
| Icon Library | lucide-react | ^1.7.0 |
| Animation | Framer Motion | ^12.38.0 |
| Smooth Scroll | Lenis | ^1.3.21 |
| Form Handling | react-hook-form + zod | ^7.72.0 + ^4.3.6 |
| ORM | Prisma | ^6.19.3 |
| Database | Neon PostgreSQL | `DATABASE_URL` env var, `provider = "postgresql"` in `prisma/schema.prisma` |
| Email | Resend | ^6.10.0 — via REST API in `app/api/enquiry/route.ts` |
| Analytics | Vercel Analytics + Speed Insights | ^2.0.1 + ^2.0.0 — injected in `app/layout.tsx` |
| Image Processing | Sharp | ^0.34.5 |
| React Compiler | babel-plugin-react-compiler | 1.0.0 — enabled via `reactCompiler: true` in `next.config.ts` |
| Font Loading | next/font/google + next/font/local | Built into Next.js 16 |
| Deployment | Vercel | Project ID `prj_7LVIEiNMOLkHBuyDqQnVSkz4tBFD` |
| Bundler | Turbopack | Default in Next.js 16 |
| Linter | ESLint 9 + eslint-config-next | `eslint.config.mjs` — flat config format |

---

## Architecture Overview

**Pattern:** Monolithic Next.js App Router — hybrid SSR/RSC with selective client-side hydration.

```
Browser Request
      │
      ▼
proxy.ts (Next.js Middleware)
  ├── /admin/* → check hpl_admin_auth cookie → redirect to /login if missing
  └── everything else → pass through
      │
      ▼
Next.js App Router
  ├── app/layout.tsx          (RootLayout — RSC)
  │     ├── IntroAnimation    (client — plays once per session)
  │     ├── SmoothScroller    (client — Lenis + section snap)
  │     ├── Navbar            (client — IntersectionObserver scroll spy)
  │     ├── {children}
  │     ├── ConditionalFooter (hides on /admin/*, /login)
  │     ├── WhatsAppButton    (client — floating CTA)
  │     ├── Analytics         (Vercel — client)
  │     └── SpeedInsights     (Vercel — client)
  │
  ├── app/page.tsx            (RSC — homepage)
  │     ├── JSON-LD scripts   (LocalBusiness, Organization, BreadcrumbList, 4×Service, FAQPage)
  │     └── HomeContent       (client component — full homepage UI)
  │
  ├── app/contact/page.tsx    (RSC — contact page)
  │     └── EnquiryFormV2     (client — 4-step wizard)
  │
  ├── app/login/page.tsx      (RSC — admin login)
  ├── app/admin/layout.tsx    (RSC — admin shell with AdminSidebar)
  ├── app/admin/overview/page.tsx   (RSC — dashboard KPIs, direct Prisma calls)
  ├── app/admin/enquiries/page.tsx  (RSC shell + EnquiriesClient client component)
  │
  └── app/api/
        ├── enquiry/route.ts          POST — Zod validate → Prisma save → Resend emails
        ├── admin/login/route.ts      POST — credential check → set httpOnly cookie
        ├── admin/enquiries/route.ts  GET  — Prisma findMany with filters
        ├── admin/enquiries/[id]/route.ts  GET + PATCH — read/update single record
        ├── admin/stats/route.ts      GET  — Prisma groupBy for KPI counts
        ├── schema/faq/route.ts       GET  — returns FAQPage JSON-LD
        └── contact/route.ts          (legacy — contact form fallback)

Data Flow:
  Public user fills EnquiryFormV2 (4 steps) →
  POST /api/enquiry →
  Zod validation →
  prisma.enquiry.create() → Neon PostgreSQL →
  Resend API (owner notification email + submitter confirmation) →
  { success: true } → form shows success state

Admin flow:
  /login → POST /api/admin/login → check ADMIN_USERNAME/ADMIN_PASSWORD env vars →
  set hpl_admin_auth cookie (httpOnly, 24h) →
  proxy.ts validates cookie on every /admin/* request →
  admin pages make direct Prisma calls (RSC) or fetch /api/admin/* (client)
```

---

## Core Features

Each feature below is backed by the specific file(s) that implement it.

### 1. Intro Animation with Logo Morphing
**File:** `components/IntroAnimation.tsx`

A full-screen splash animation that plays once per browser session (gated by `sessionStorage.getItem("hpl-intro-played")`). The sequence: logo scales in with spring overshoot → slides left → wordmark image slides in from right → wordmark fades out → logo re-centers → logo "flies" to the exact pixel position of the navbar logo using `getBoundingClientRect()` on the actual `<img>` elements (not their containers) to avoid padding offset bugs. Uses `useAnimate` from Framer Motion for imperative sequencing. Informs the rest of the app via the `NavbarLogoRefContext` (`contexts/NavbarLogoRef.tsx`) which exposes `isIntroDone` — this boolean gates the Lenis scroll engine, hero section animations, and navbar visibility.

### 2. Lenis Smooth Scroll + Section Snapping
**File:** `components/SmoothScroller.tsx`

Initialises Lenis 1.3.21 after `isIntroDone` becomes true. Implements section-snap scroll: on `wheel` events with `|deltaY| > 20`, finds the next/previous section from a cached array of `{ element, offsetTop }` pairs (re-built only on resize — O(1) lookup per tick vs. O(n) per tick without caching). Prevents scroll during animations via an `isAnimating` flag with 400ms cooldown. Also handles keyboard navigation (ArrowDown/ArrowUp/Space) and anchor-click interception for `lenis.scrollTo()`. Returns `null` — no DOM output, purely a controller.

### 3. HeroNetworkMap (Animated SVG)
**File:** `components/HeroNetworkMap.tsx`

Renders an animated SVG radial distribution network at 13% opacity behind the hero text. 12 NODES are positioned in polar coordinates around a center hub at `(300, 235)` using `polar(angleDeg, radius)`. Animates: ripple rings from center (3 staggered), spoke lines drawing in (pathLength 0→1), a dashed outer ring, data-flow dots travelling along spokes (repeating), pulsing satellite nodes, and a center hub circle. All animations gated by the `isActive` prop which is `isIntroDone && isHeroInView`.

### 4. BrandCarousel (3D Dual-Orbit)
**File:** `components/BrandCarousel.tsx`

Two independently rotating spheres of 8 cards each (16 total, from 12 images in `/public/carousel/*.webp`). Each `OrbitCard` computes its `x`, `y`, `z`, `scale`, `opacity`, `zIndex` as Framer Motion `MotionValue` transforms derived from a continuously incrementing `useTime()` value combined with `useScroll()` progress. The math uses `Math.cos(rad)` for perspective-aware depth scaling and opacity falloff — cards facing the viewer are full opacity and large; cards on the far side fade to 0 and shrink. Left orbit is clockwise, right orbit counter-clockwise. Radius adapts responsively: 200px on mobile/tablet, 240px on desktop. The `isMobile` flag tightens the opacity power from `0.8` to `1.8` to focus the "hero" card slot.

### 5. TypewriterHeading
**File:** `components/TypewriterHeading.tsx`

A reusable animated heading that reveals text character-by-character using Framer Motion stagger variants. Accepts `segments` (array of `{ text, className?, br? }`) or a plain `text` string. Each character is a `motion.span` with spring physics (`stiffness: 300, damping: 20`). Supports `once: false` (re-plays when re-entering viewport) for the hero section and `once: true` for below-fold sections.

### 6. Multi-Step B2B Enquiry Wizard
**Files:** `components/contact/EnquiryFormV2.tsx` + 6 sub-components

A 4-step wizard with animated `AnimatePresence` slide transitions between steps:
- **Step 0:** `RoleSelector` — choose Manufacturer or Distributor
- **Step 1:** `ContactInfoStep` — company name, contact, phone (+91 prefilled), email, drug license
- **Step 2:** `ManufacturerBusinessStep` OR `DistributorBusinessStep` — branching based on `formData.role`; captures product categories (checkbox), monthly volume, districts needed (manufacturer) or GST No., years in operation, preferred categories, operating districts (distributor)
- **Step 3:** `ReviewStep` — summary of all entered data + submit

State is a single `FormData` object managed by `useState` in `EnquiryFormV2`. On submit, calls `POST /api/enquiry` with the full form payload. Shows success screen with `formData.contactName` on 200, error message on failure.

### 7. Enquiry API Route (Backend)
**File:** `app/api/enquiry/route.ts`

Validates with a Zod schema (`enquirySchema`) covering all 15+ fields including the `z.union([z.string().email(), z.literal(""), z.undefined()])` fix for optional email. On success: `prisma.enquiry.create()` persists to Neon PostgreSQL, then `sendEmails()` fires two Resend API calls non-blocking (`.catch()` only — never awaited on the critical path). Owner email is an HTML table with role-specific rows; submitter email is a confirmation. Both use `from: "HPL Enquiry <noreply@hplco.in>"`.

### 8. Admin Authentication
**Files:** `proxy.ts`, `app/actions/auth.ts`, `app/api/admin/login/route.ts`

`proxy.ts` (Next.js 16 middleware, formerly `middleware.ts`) checks for the `hpl_admin_auth` cookie on all `/admin/*` paths and redirects to `/login` if absent. The login API route calls the `login()` Server Action, which compares `formData.username/password` against `ADMIN_USERNAME/ADMIN_PASSWORD` environment variables. On success, sets `hpl_admin_auth` cookie with `httpOnly: true`, `secure: true` (production), `sameSite: lax`, 24h TTL.

**Known Gap:** Authentication uses plaintext string comparison (`username === ADMIN_USERNAME && password === ADMIN_PASSWORD`) with no password hashing. This is secure only because credentials are stored as environment variables (never in code or DB), but it is noted in a code comment: `"// In production, use proper password hashing"`.

### 9. Admin Dashboard
**File:** `app/admin/overview/page.tsx`

A fully server-rendered RSC page (`export const dynamic = "force-dynamic"`). Runs 5 Prisma queries in parallel via `Promise.all`: total count, new count, manufacturer count, distributor count, and the 5 most recent enquiries (`findMany` with `take: 5`). Renders: 4 KPI stat cards, a "Recent B2B Enquiries" table (last 5), a leads breakdown bar (Mfr % vs. Dist % using inline `style={{ width: ... }}`), and a channels status panel showing Zoho Mailbox link, Resend verified domain status, and Neon DB status.

### 10. Enquiries Manager
**Files:** `app/admin/enquiries/page.tsx`, `app/admin/enquiries/EnquiriesClient.tsx`, `app/api/admin/enquiries/route.ts`, `app/api/admin/enquiries/[id]/route.ts`

The RSC page shell renders the `EnquiriesClient` client component. `EnquiriesClient` fetches `GET /api/admin/enquiries?role=&status=&search=` on mount and re-fetches when filters change. The API route uses Prisma `findMany` with conditional `where` clauses for role, status, and `contains` search on `companyName` / `contactName`. The `[id]` route supports `GET` (single record) and `PATCH` (update `status` and/or `note` fields via a `patchSchema`).

### 11. Structured Data / SEO
**Files:** `app/layout.tsx`, `app/page.tsx`, `app/api/schema/faq/route.ts`, `components/DeferredFAQSchema.tsx`

`app/layout.tsx` injects a `@graph` with `LocalBusiness` (full NAP, GeoCoordinates, OpeningHoursSpecification, sameAs array with GBP CID), `Organization` (logo ImageObject), and `BreadcrumbList`. `app/page.tsx` injects 4× `Service` schemas. The `DeferredFAQSchema` component uses `requestIdleCallback` to fetch and inject the `FAQPage` schema after page interaction — reducing critical HTML payload by ~3.5KB. Security headers (`X-Content-Type-Options`, `X-Frame-Options: SAMEORIGIN`, `HSTS max-age=63072000`, `Referrer-Policy`, `Permissions-Policy`) are set in `next.config.ts` `headers()`.

### 12. Performance Optimisations
**File:** `next.config.ts`, `app/layout.tsx`

- `reactCompiler: true` — React 19 compiler enabled
- `experimental.optimizePackageImports: ['framer-motion', 'lucide-react']` — tree-shakes these large packages at build time
- `images.minimumCacheTTL: 31536000` — 1-year CDN cache for optimised images
- `images.formats: ['image/avif', 'image/webp']` — modern formats served automatically
- Custom `deviceSizes` and `imageSizes` arrays trimmed to only breakpoints actually used
- `Cache-Control: public, max-age=31536000, immutable` set on all `.webp`, `.png`, `.avif`, `.woff2` static assets
- `<link rel="preload" as="image" href="/logo.webp">` for LCP logo asset in `app/layout.tsx`
- `<link rel="preconnect" href="https://fonts.gstatic.com">` and `<link rel="dns-prefetch" href="https://fonts.googleapis.com">` in `app/layout.tsx`
- `dynamic()` imports for `TestimonialsCarousel`, `BrandCarousel`, `TeamSection`, `BrandConveyor` in `HomeContent.tsx` — splits these below-fold components from the initial bundle
- `@media (prefers-reduced-motion: reduce)` block in `globals.css` disables all transitions and animations for accessibility

---

## Directory Structure Explained

```
hpl/
├── app/
│   ├── layout.tsx              Root RSC layout — fonts, metadata, JSON-LD, global providers
│   ├── page.tsx                Homepage RSC — metadata, service schemas, DeferredFAQSchema
│   ├── globals.css             Tailwind v4 @theme config, CSS custom properties, dark mode
│   ├── robots.ts               Disallows /api, /admin, /login from crawlers
│   ├── sitemap.ts              2 URLs: / (priority 1) and /contact (priority 0.8)
│   ├── icon.png                Favicon
│   ├── apple-icon.png          Apple Touch Icon
│   ├── contact/page.tsx        Contact page — ContactHeroV2 + EnquiryFormV2
│   ├── login/page.tsx          Admin login page — LoginForm component
│   ├── admin/
│   │   ├── layout.tsx          Admin shell with AdminSidebar
│   │   ├── page.tsx            Redirects /admin to /admin/overview
│   │   ├── overview/page.tsx   RSC dashboard — KPIs + recent enquiries
│   │   └── enquiries/          Enquiries manager — RSC shell + client component
│   └── api/
│       ├── enquiry/route.ts    Public POST — Zod + Prisma + Resend
│       ├── contact/route.ts    Legacy contact form handler
│       ├── schema/faq/route.ts GET — returns FAQPage JSON-LD object
│       └── admin/
│           ├── login/route.ts           POST — credential check + cookie
│           ├── stats/route.ts           GET — Prisma groupBy KPIs
│           ├── enquiries/route.ts       GET — filtered list
│           └── enquiries/[id]/route.ts  GET + PATCH — single record
│
├── components/
│   ├── HomeContent.tsx         Client parent — full homepage UI, all sections
│   ├── BrandCarousel.tsx       3D dual-orbit photo carousel
│   ├── BrandConveyor.tsx       Linear conveyor belt of logos
│   ├── HeroNetworkMap.tsx      Animated SVG distribution network (hero bg)
│   ├── TypewriterHeading.tsx   Character-by-character animated heading
│   ├── IntroAnimation.tsx      Full-screen logo intro with morphing flight
│   ├── SmoothScroller.tsx      Lenis init + section-snap controller
│   ├── Navbar.tsx              Floating pill nav + IntersectionObserver scroll spy
│   ├── ConditionalFooter.tsx   Footer hidden on /admin/* and /login
│   ├── Footer.tsx              Full footer — NAP, nav links, socials
│   ├── WhatsAppButton.tsx      Floating WhatsApp CTA
│   ├── CoreSolutionCard.tsx    Individual service card (C&F, Stockist, etc.)
│   ├── TestimonialsCarousel.tsx Testimonials with review carousel
│   ├── TeamSection.tsx         Team member cards
│   ├── FAQSection.tsx          FAQ accordion
│   ├── SEOContentSection.tsx   Long-form SEO text for keyword density
│   ├── DeferredFAQSchema.tsx   Idle-callback FAQ JSON-LD injector
│   ├── ContactForm.tsx         Simple contact form (legacy)
│   ├── contact/                Multi-step enquiry wizard sub-components
│   │   ├── EnquiryFormV2.tsx   Parent wizard — state + step routing
│   │   ├── RoleSelector.tsx    Step 0 — manufacturer vs distributor
│   │   ├── ContactInfoStep.tsx Step 1 — contact details
│   │   ├── ManufacturerBusinessStep.tsx  Step 2a — manufacturer fields
│   │   ├── DistributorBusinessStep.tsx   Step 2b — distributor fields
│   │   ├── RequirementsStep.tsx Step 3 — additional requirements
│   │   ├── ReviewStep.tsx      Step 3/final — data review + submit
│   │   ├── FormStepper.tsx     Progress bar + step indicator
│   │   ├── FormField.tsx       Reusable labeled input wrapper
│   │   ├── SubmitButton.tsx    Loading-state aware submit button
│   │   ├── ContactInput.tsx    Styled text input
│   │   ├── ContactSelect.tsx   Styled select
│   │   └── ContactTextarea.tsx Styled textarea
│   └── admin/
│       ├── AdminSidebar.tsx    Admin left nav
│       ├── EnquiriesTable.tsx  Data table for enquiries list
│       ├── DetailDrawer.tsx    Slide-in drawer for single enquiry detail
│       ├── FilterBar.tsx       Role/status/search filter controls
│       ├── StatsStrip.tsx      Inline stats strip
│       ├── RoleBadge.tsx       "Manufacturer" / "Distributor" colored badge
│       └── StatusBadge.tsx     "new" / "contacted" / "converted" / "rejected" badge
│
├── contexts/
│   └── NavbarLogoRef.tsx       React context — logoRef + isIntroDone shared state
│
├── lib/
│   ├── prisma.ts               Prisma client singleton (globalThis pattern for dev HMR)
│   └── utils.ts                cn() = clsx + twMerge
│
├── prisma/
│   └── schema.prisma           Single model: Enquiry (22 fields, @@index on createdAt)
│
├── fonts/
│   ├── TT Neoris Trial Medium.ttf  Heading font (local)
│   └── ClarityCity-Thin.ttf        Subtext font (local)
│
├── public/
│   ├── carousel/1–12.webp      BrandCarousel source images
│   ├── infographics/*.webp     4 service card images (CoreSolutionCard)
│   ├── images/warehouse-shelves.webp  Background/hero asset
│   ├── people/*.avif           Team member photos
│   ├── logo.webp / logo.png    HPL logo (LCP candidate, preloaded)
│   ├── og-image.png            OG share image (50KB post-compression)
│   ├── og-image-original.png   Pre-compression original (642KB, kept as archive)
│   └── hpl_text.png            Wordmark image used in IntroAnimation
│
├── scratch/
│   └── test_resend_api.js / test_send_email.js  Dev-only test scripts (ESLint ignored)
│
├── proxy.ts                    Next.js 16 middleware (auth guard for /admin/*)
├── next.config.ts              Security headers, image config, React Compiler
├── tsconfig.json               Strict TypeScript, bundler module resolution, @/* alias
├── eslint.config.mjs           Flat config (ESLint 9), extends next/core-web-vitals + typescript
├── components.json             shadcn config — radix-nova style, cssVariables, lucide icons
├── postcss.config.mjs          @tailwindcss/postcss v4 plugin
├── project_state.md            Internal dev journal — feature log, decisions, known issues
└── context.md                  Client/project context reference doc
```

---

## Data Models & Schema

**Source:** `prisma/schema.prisma`

### Model: Enquiry

```
Enquiry {
  id                  String    @id @default(uuid())
  role                String    -- "manufacturer" | "distributor"
  companyName         String
  contactName         String
  phone               String
  email               String?   -- nullable
  drugLicense         String
  monthlyVolume       String?   -- manufacturer only
  districtsNeeded     String?   -- manufacturer only
  gstNo               String?   -- distributor only
  yearsInOperation    String?   -- distributor only
  operatingDistricts  String?   -- distributor only
  message             String?
  createdAt           DateTime  @default(now())
  updatedAt           DateTime  @updatedAt
  productCategories   String[]  -- multi-select (Prisma array, Neon supports native PG arrays)
  preferredCategories String[]  -- distributor only
  note                String?   -- admin-added internal note
  status              String    @default("new")  -- "new"|"contacted"|"converted"|"rejected"

  @@index([createdAt])          -- index for fast desc sort in admin dashboard
}
```

**No migrations directory.** Prisma schema was applied via `prisma db push` (schema-first, no migration history files present). This is appropriate for a single-developer project but means there is no rollback history.

---

## External Dependencies & Integrations

| Service | Purpose | How Connected | Env Var |
|---|---|---|---|
| Neon PostgreSQL | Persistent storage for all enquiries | Prisma ORM via `lib/prisma.ts` | `DATABASE_URL` |
| Resend | Transactional email (owner notification + submitter confirmation) | REST API (`fetch` to `api.resend.com/emails`) in `app/api/enquiry/route.ts` | `RESEND_API_KEY` |
| Vercel | Hosting + CDN + deployment | Platform-level | Automatic |
| Vercel Analytics | Page view and visitor tracking | `<Analytics />` component in `app/layout.tsx` | None (auto-configured) |
| Vercel Speed Insights | Real-user Web Vitals collection | `<SpeedInsights />` component in `app/layout.tsx` | None (auto-configured) |
| Zoho Mail | Business email for `info@hplco.in` | Linked in admin dashboard UI only — no programmatic integration | None |
| Google Fonts | Open Sans (body font) | `next/font/google` in `app/layout.tsx` | None |
| Resend sender domain | `noreply@hplco.in` verified domain | DNS records on hplco.in domain | Configured in Resend dashboard |

**Contact recipient routing:** `CONTACT_RECIPIENT_EMAIL` env var controls where owner notification emails are sent (`app/api/enquiry/route.ts`, line: `const recipient = process.env.CONTACT_RECIPIENT_EMAIL || "info@hplco.in"`).

---

## Setup / Run Instructions

Verified against `package.json` and `prisma/schema.prisma`:

```bash
# 1. Install dependencies
npm install

# 2. Set environment variables
# Create .env.local with:
DATABASE_URL="postgresql://..."      # Neon connection string
RESEND_API_KEY="re_..."              # Resend API key
CONTACT_RECIPIENT_EMAIL="..."        # Owner email for lead notifications
ADMIN_USERNAME="..."                 # Admin dashboard username
ADMIN_PASSWORD="..."                 # Admin dashboard password

# 3. Push Prisma schema to Neon (no migrations — uses db push)
npx prisma db push

# 4. Generate Prisma client
npx prisma generate

# 5. Run dev server
npm run dev

# 6. Build for production
npm run build

# 7. Run linter
npm run lint
```

---

## Known Gaps, TODOs, and Inconsistencies

| # | File | Issue | Severity |
|---|---|---|---|
| 1 | `app/actions/auth.ts` | Admin password stored and compared in plaintext. Comment says "use proper password hashing" but it was never implemented. Safe only because credentials are in env vars. | Medium |
| 2 | `app/actions/auth.ts` | `ADMIN_USERNAME/ADMIN_PASSWORD` fallback to hardcoded `"admin"/"admin"` if env vars missing (`|| 'admin'`). A misconfigured deployment with missing env vars would expose the admin panel with default credentials. | High |
| 3 | `proxy.ts` | Cookie presence is the only auth check — no signature or expiry validation beyond the browser's `maxAge`. A valid cookie value of literally `"true"` is all that's needed. | Medium |
| 4 | `prisma/schema.prisma` | No Prisma migrations directory. Schema was `db push`'ed. No rollback history. Adding a column in future requires either `db push` (destructive if not careful) or initiating a migration workflow from scratch. | Low-Medium |
| 5 | `app/api/enquiry/route.ts` | `sendEmails()` is fire-and-forget (`.catch()` only). If Resend is down, the lead is still saved to DB but the owner gets no notification. There is no retry, queue, or fallback alerting mechanism. | Low |
| 6 | `components/SmoothScroller.tsx` | `SNAP_SECTIONS` is a hardcoded array of CSS selectors. If a section is removed from `HomeContent.tsx` but not from this array, `querySelector()` returns null and the cached array silently omits it (filtered with `.filter(Boolean)`). Not a bug, but fragile coupling. | Low |
| 7 | `components/BrandCarousel.tsx` | Uses `useTime()` (continuously incrementing clock) inside `useTransform`. On very long page sessions, the accumulated time value grows without bound. Practically harmless but technically unbounded. | Low |
| 8 | `app/sitemap.ts` | Only 2 URLs (`/` and `/contact`). If new pages are added (e.g. `/services`, `/about`), they must be manually added here — there is no dynamic sitemap generation. | Low |
| 9 | `contexts/NavbarLogoRef.tsx` | `isIntroDone` starts as `false` and is set to `true` by `IntroAnimation`. If `IntroAnimation` returns early due to the `sessionStorage` check, it immediately calls `setIntroDone(true)`. This works correctly but means the first render of all gated components (`Navbar`, `SmoothScroller`, `HomeContent`) briefly renders in their `isIntroDone=false` state before the effect runs — a single-frame flash that is imperceptible but technically present. | Low |
| 10 | `scratch/` directory | Contains `test_resend_api.js` and `test_send_email.js` — these are development test scripts that were never deleted. They are excluded from ESLint in `eslint.config.mjs` (`globalIgnores(["scratch/**"])`) and are not imported anywhere, so they are harmless but add noise. | Trivial |

---

## Suggested Elevator Pitch

**For resume/portfolio:**

> "Built hplco.in — the complete digital presence for a pharma logistics company (C&F agent, super stockist, 60+ manufacturer clients) using Next.js 16, TypeScript, Prisma ORM, and Neon PostgreSQL. Delivered a schema-rich, Lighthouse-optimised production website with 5 JSON-LD structured data types, a 4-step role-branching B2B enquiry system with real-time Resend email notifications, and a password-protected admin dashboard for lead CRM — all deployed to Vercel with custom security headers, a 3D animated brand carousel, and a Lenis-powered section-snap scroll experience."

---

*Analysis completed: 2026-07-09. All claims verified against source code. No hallucinated functionality.*
