# Advanced SEO Optimization Plan

The current site has good structural foundations, but to be "fully" optimized for production, we need to implement the "Search Engine Visibility Layer." This plan bridges the gap between a clean site and a high-ranking authority site.

## User Review Required

> [!IMPORTANT]
> **Home Page Structure**: Like the Contact page, I will split the Home page into `page.tsx` (Server) and `HomeContent.tsx` (Client). This is the only way to provide deep SEO tags for the most important page of the site.
>
> **Domain URL**: I need to know your intended production URL (e.g., `https://hplindore.com`) to generate valid sitemaps and canonical tags. I will use a placeholder if you're not sure yet.

## Proposed Changes

### 1. Social Sharing & Identity (OpenGraph)
- **Asset**: I have generated a premium OpenGraph (OG) image [hpl_og_image](file:///C:/Users/kunal/.gemini/antigravity/brain/2bbc03ef-60e1-41cf-91a9-0f7add87ff6c/hpl_og_image_1775759945859.png) that reflects the HPL brand.
- **Layout Update**: Update `app/layout.tsx` to include:
    - `og:type`, `og:site_name`.
    - `twitter:card` (summary_large_image).
    - `metadataBase` to ensure all social images resolve correctly.

### 2. Search Engine Communication (Core Files)
- **[NEW] [robots.ts](file:///d:/Internship/hpl/app/robots.ts)**: A dynamic file telling Google which parts of the site to crawl.
- **[NEW] [sitemap.ts](file:///d:/Internship/hpl/app/sitemap.ts)**: Automatically generates a list of all pages for search engines to index.

### 3. Trust & Authority (Structured Data)
- **JSON-LD**: Add `Organization` and `LogisticService` schema to `app/layout.tsx`. This helps Google show "Rich Snippets" (like your address and phone number) directly in search results.

### 4. Component Refactoring
- **[MODIFY] [page.tsx](file:///d:/Internship/hpl/app/page.tsx)**: Convert to Server Component.
- **[NEW] [HomeContent.tsx](file:///d:/Internship/hpl/components/HomeContent.tsx)**: Extract the existing client-side logic.

## Open Questions

1. **What is your target domain name?** (Required for Sitemap/Canonical tags)
2. **Do you want to target specific keywords?** (e.g., "Pharma Distribution Madhya Pradesh" or "Cold Chain Logistics Indore")

## Verification Plan

### Automated Tests
- **Sitemap Access**: Verify `http://localhost:3000/sitemap.xml` returns valid XML.
- **OG Checker**: Use the browser subagent to verify `<meta property="og:image">` points to our new asset.
- **Schema Validation**: Verify JSON-LD structure in the page source.
