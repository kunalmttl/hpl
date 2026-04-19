# Project Context: Hindustan Pharma Logistics (HPL) Website
Last updated: 2026-04-19 (RECAP)

## Active Project
Hindustan Pharma Logistics (HPL) landing page and core platform.

## Current Goal
**Advanced SEO Strategy & Branding Refinement COMPLETE.** Standardized all website titles for a premium feel (focusing on "C&F Agent" and "Consignee Agent"). Implemented deep structured data (JSON-LD) and high-fidelity branding assets including a premium circled favicon. Site is optimized for high-authority pharmaceutical distribution searches in Madhya Pradesh.

## Task History
- **SEO Title & Keyword Refinement (2026-04-19)**: 
    - Standardized all titles to remove redundancy between "CFA" and "C&F Agent".
    - Integrated "Consignee Agent" as a primary keyword across all metadata.
    - Updated OpenGraph and page-level descriptions for consistency.
- **Favicon & Branding (2026-04-19)**:
    - Replaced generic favicon with official `logo.png`.
    - Engineered a white circular background for the logo to ensure visibility in all UI modes (dark/light/search snippets).
    - Added `apple-icon.png` for iOS home screen support.
- **Brand Carousel Refined (2026-04-16)**: Replaced 8 legacy assets with 12 new premium `.webp` images. Engineered a wrapping loop logic (`(i + 8) % 12`) to provide 16 unique card views across dual orbital spheres.
- **GSC Verification & Indexing (2026-04-16)**: Successfully verified domain ownership on Google Search Console. Achieved 100% "Valid" status for structured data (LocalBusiness, Organization, FAQ, Breadcrumbs) and confirmed indexing of all core pages.
- **Advanced SEO Phase 2 (2026-04-16)**:
    - **Global Layout (`layout.tsx`)**: Implemented a comprehensive `@graph` schema combining `LocalBusiness`, `BreadcrumbList`, and `Organization`.
    - **Home Page (`page.tsx`)**: Injected `FAQPage` and `Service` schemas.
    - **Contact Page (`contact/page.tsx`)**: Added localized metadata and a 2-step `BreadcrumbList` schema.
- **UI/UX Engineering**:
    - Implemented a complex `BrandCarousel` with dual-direction infinite rotation.
    - Developed a compact centered floating pill Navbar with grouped scroll-spy logic.
    - Integrated full-page section snapping using a custom Lenis-integrated controller.
    - Developed bidirectional, scroll-aware `TypewriterHeading` animations.

## Key Architecture & Assets
### Core Branding
- `public/logo.png`: Original black logo asset.
- `app/icon.png`: Official site favicon (black logo on a white circular background).
- `app/apple-icon.png`: iOS home screen icon.

### Layout & SEO
- `app/layout.tsx`: Root layout with global metadata and JSON-LD structured data.
- `app/page.tsx`: Landing page with section-specific schemas.
- `app/contact/page.tsx`: B2B enquiry route.

## Error Log
- **Favicon Visibility**: Black logo was invisible in dark mode tabs. Resolved by programmatically generating a white circular mask behind the logo for the `icon.png` asset.
- **Turbopack Panic (2026-04-16)**: Resolved a compiler crash caused by a manual `<head>` tag in `layout.tsx` conflicting with the Metadata API. Relocated scripts to `<body>`.
- **Hydration Mismatch**: Fixed in `BrandCarousel.tsx` by adding a `useEffect` mounted check.
- **Lucide Brand Icons**: Fixed "Missing export" errors by replacing missing Social icons with custom SVG implementations.
