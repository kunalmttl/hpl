# HPL Project - Essential Agent Guidance

## Key Commands
- `npm run dev` - Start development server (http://localhost:3000)
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npx prisma studio` - View/edit database contents
- `npx prisma db pull` - Sync schema with Neon DB
- `npx prisma generate` - Update Prisma client after schema changes

## Database
- Uses PostgreSQL hosted on Neon.tech
- Connection string in `.env`: `DATABASE_URL`
- Prisma schema: `prisma/schema.prisma`
- Main model: `Enquiry` (id, role, companyName, contactName, phone, email, drugLicense, etc.)
- To check submissions: `npx prisma studio` → Enquiry table

## API Routes
- POST `/api/enquiry` - Handles contact2 form submissions (saves to DB, sends emails)
- POST `/api/contact` - Handles main contact form (email only)
- Both use Resend API for email notifications (`RESEND_API_KEY` in .env)

## Important Files
- `app/contact2/page.tsx` - Main enquiry form page
- `app/contact/page.tsx` - Simple contact form  
- `app/admin/enquiries/page.tsx` - Admin enquiry viewer
- `components/contact2/EnquiryFormV2.tsx` - Refactored enquiry form wizard
- `components/ContactHero.tsx` - Hero section used in both contact pages
- `app/layout.tsx` - Root layout with global metadata and scripts
- `app/icon.png` - Custom favicon with white background for dark mode visibility

## Styling Notes
- Tailwind CSS v4 with custom `@theme` extension
- Primary color: `--color-pharma-teal: #0F766E`
- Custom variants: `hover-glow`, `glass`, `font-subtext`
- CSS uses CSS variables for theming
- Hero sections use animated SVG network backgrounds

## Architecture
- App Router (Next.js 13+ pattern)
- Server components by default, client components marked with `"use client"`
- Admin section protected (redirects to `/admin/enquiries`)
- Form validation uses Zod + React Hook Form
- Animations handled with Framer Motion
- Environment variables loaded from `.env` and `.env.local`

## Gotchas
1. Favicon requires white background for dark mode visibility (`icon.png`)
2. API routes must handle both validation errors and database errors
3. Email sending is non-blocking but errors are logged to console
4. Form data is serialized (dates to ISO strings) before passing to client components
5. Admin enquiry page uses optimistic updates for status changes