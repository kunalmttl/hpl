# HPL Landing Page — Animation & Component Playbook

> **Purpose**: Reference document for AI agents (and developers) resuming work on this codebase.
> Read this before touching any animation, component, or section layout.
> Last updated: 2026-04-06

---

## 1. Tech Stack Quick Reference

| Concern | Tool | Notes |
|---|---|---|
| Framework | Next.js 16 (App Router) | `"use client"` required for all animated components |
| Styling | Tailwind CSS v4 | Config-free; use CSS variables for tokens |
| Animations | `framer-motion` (imported as `motion/react` in some files) | Use `motion.div`, `AnimatePresence`, `useInView` |
| Smooth Scroll | Lenis | Custom wheel controller for section snapping |
| Icons | `lucide-react` | Instagram/Twitter/LinkedIn removed — use custom SVGs |
| State Bridge | `NavbarLogoRefContext` | Global `isIntroDone` flag — **always gate animations on this** |

---

## 2. The Golden Rule: `isIntroDone` Gate

Every single animated element on the page **must** be gated on `isIntroDone`.
Without this, animations fire before the intro sequence finishes.

```tsx
// ✅ CORRECT — always gate
const { isIntroDone } = useNavbarLogoRef();
animate={isIntroDone && isHeroInView ? "visible" : "hidden"}

// ❌ WRONG — fires too early
animate={isHeroInView ? "visible" : "hidden"}
```

Also gate `delayChildren` in stagger containers:
```tsx
delayChildren: isIntroDone ? 0.2 : 999  // 999 = effectively disabled
```

---

## 3. Scroll Re-triggering Pattern

Every section uses `useInView` with `once: false` so animations re-trigger when scrolling back.

```tsx
import { useInView } from "framer-motion";

const sectionRef = React.useRef(null);
const isSectionInView = useInView(sectionRef, { amount: 0.2, once: false });

// Then on the section element:
<section ref={sectionRef}>
  <motion.div
    variants={staggerContainer}
    initial="hidden"
    animate={isIntroDone && isSectionInView ? "visible" : "hidden"}
  >
    {/* children */}
  </motion.div>
</section>
```

- `amount: 0.3` → trigger when 30% visible (used for Hero)
- `amount: 0.2` → trigger when 20% visible (default for most sections)
- `amount: 0.1` → trigger on first pixel visible (used for Footer)

---

## 4. Reusable Animation Variants

These are the core variants used everywhere. **Copy these into any page/component.**

### `staggerContainer` — parent wrapper for sequential reveals
```tsx
const staggerContainer: Variants = {
  hidden: {
    opacity: 0,
    transition: { staggerChildren: 0.05, staggerDirection: -1 } // reverse-stagger on exit
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: isIntroDone ? 0.2 : 999
    }
  }
};
```
> `staggerDirection: -1` in `hidden` creates a reverse-cascade on scroll-away. Always include it.

### `itemSlideUp` — text/card slide from below
```tsx
const itemSlideUp: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0, opacity: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};
```
> The easing `[0.16, 1, 0.3, 1]` is the HPL standard ease — fast start, smooth overshoot.

### `itemPop` — scale-from-below for cards and icons
```tsx
const itemPop: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 30 },
  visible: {
    opacity: 1, scale: 1, y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15, mass: 0.8 }
  }
};
```

### `buttonZoom` — spring zoom-in for CTAs
```tsx
const buttonZoom: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1, opacity: 1,
    transition: { type: "spring", stiffness: 150, damping: 15, mass: 0.8 }
  }
};
```

### `floatingVariant` — looping float bob (hero stat cards)
```tsx
// Must be defined INSIDE component to capture isIntroDone closure
const floatingVariant: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  visible: (delay: number) => ({
    opacity: 1, scale: 1,
    transition: { duration: 1, ease: "easeOut", delay: isIntroDone ? delay : 999 }
  }),
  animate: (delay: number) => ({
    y: isIntroDone ? [0, -15, 0] : 0,
    transition: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: delay + 1 }
  })
};

// Usage: pass both "animate" and "visible" to trigger both states
<motion.div
  variants={floatingVariant}
  custom={0.8}                    // delay value passed to the factory function
  initial="initial"
  animate={isIntroDone && isHeroInView ? ["animate", "visible"] : "initial"}
/>
```

---

## 5. Standard Section Template

Every section follows this structure:

```tsx
<section
  id="section-name"
  ref={sectionRef}
  className="pt-12 pb-24 flex flex-col items-center px-4 md:px-12 relative overflow-hidden bg-background snap-start"
>
  {/* Optional decorative background (blobs, dot grids, etc.) */}
  <div className="absolute top-20 right-0 w-[40%] h-[40%] bg-pharma-teal/5 blur-[100px] rounded-full pointer-events-none" />

  {/* Animated content wrapper */}
  <motion.div
    variants={staggerContainer}
    initial="hidden"
    animate={isIntroDone && isSectionInView ? "visible" : "hidden"}
    className="flex flex-col items-center text-center w-full"
  >
    {/* Section label */}
    <motion.p variants={itemSlideUp} className="text-[12px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4 font-subtext">
      Section Label
    </motion.p>

    {/* Typewriter heading */}
    <motion.div variants={itemSlideUp}>
      <TypewriterHeading text="Section Heading Here" className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 tracking-tight" />
    </motion.div>

    {/* Subtext — always after heading */}
    <motion.p variants={itemSlideUp} className="text-slate-500 max-w-2xl mb-14 text-[16px] leading-relaxed font-subtext">
      Supporting description.
    </motion.p>

    {/* Content */}
  </motion.div>
</section>
```

**Key conventions:**
- Background: always `bg-background` (`#EDEDED`) — never white or other colors on sections
- Vertical padding: `pt-12 pb-24` standard; Hero uses `pt-6 pb-6`
- All sections have `snap-start` for scroll snapping

---

## 6. Component Catalog

### `TypewriterHeading`
**File**: `components/TypewriterHeading.tsx`  
**Purpose**: Bidirectional scroll-triggered typing animation for headings.

```tsx
// Simple string
<TypewriterHeading
  text="Four Ways HPL Serves Your Business"
  className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 tracking-tight"
/>

// Multi-segment with color accent and line break
<TypewriterHeading
  as="h1"
  className="text-6xl font-bold text-slate-900"
  segments={[
    { text: "Central India's Trusted", br: true },
    { text: "Pharma Partner", className: "text-pharma-teal" }
  ]}
/>
```

**How it works:**
- Each character is wrapped in a `motion.span` with `childVariants`
- `staggerChildren: 0.03` → 30ms per character = typing feel
- `staggerDirection: -1` on hidden → reverse-types on scroll-away
- Internally calls `useInView` + `isIntroDone` — no extra setup needed
- Always wrap in `<motion.div variants={itemSlideUp}>` if inside a stagger container

---

### `CoreSolutionCard`
**File**: `components/CoreSolutionCard.tsx`  
**Purpose**: 2×2 premium card for the Core Solutions section.  
**Pattern**: Inherits animation state from parent `staggerContainer` — do NOT add explicit `animate` prop on the card.

```tsx
// In parent, wrap grid in a stagger container
<motion.div
  variants={staggerContainer}
  initial="hidden"
  animate={isIntroDone && isSolutionsInView ? "visible" : "hidden"}
  className="grid grid-cols-1 md:grid-cols-2 gap-6"
>
  <CoreSolutionCard
    title="C&F Agency"
    description="..."
    icon={<Truck />}
    imageSrc="/infographics/cf-agency.png"
  />
</motion.div>
```

> ⚠️ Do not pass `animate` directly to `CoreSolutionCard`. It inherits from parent stagger.

---

### `BrandCarousel`
**File**: `components/BrandCarousel.tsx`  
**Purpose**: Two infinite-scroll columns of pharma/logistics brand logos — left column scrolls up, right scrolls down, speed synced to scroll position.

**How it works:**
- Uses `useScroll` + `useTransform` on page progress
- Two `motion.div` columns driven by `y` motion values
- Images are duplicated (array concat) for seamless infinite looping
- Background: `bg-background` to blend with page

**To add/swap images:** Add to `public/brand-logos/` and update the `brands` array in the component.

---

### `TestimonialsCarousel`
**File**: `components/TestimonialsCarousel.tsx`  
**Purpose**: High-fidelity "words of trust" section with a 3D envelope intro followed by an interactive fan card layout.

**Phase state machine:**
```
"hidden" → "envelope-up" → "card-rising" → "carousel"
```

**Phase transition rules:**
- `hidden → envelope-up`: triggered by `useInView` scroll entry
- `envelope-up → card-rising`: after envelope settle animation completes
- `card-rising → carousel`: after card rises to peak position; transition is seamless handoff
- Seamless handoff: fan active card `initial` = `{ opacity: 1, y: 100, rotate: -3 }` matching envelope card's last screen position, then spring-settles to `y: 0`

**Fan card layout:**
- 5 cards; active (index 2) centered, others angled left/right
- Rotate: `[-6, -3, 0, 3, 6]` degrees; Y-offset: `[40, 15, 0, 15, 40]`; Scale: `[0.85, 0.92, 1, 0.92, 0.85]`
- Click left/right arrows → rotate array → active card always index 2

**Ghost (non-active) cards entrance:**
```tsx
initial={{ opacity: 0, y: 60 }}
animate={{ opacity: 1, y: <fanY> }}
transition={{ type: "spring", stiffness: 50, damping: 18, delay: i * 0.08 }}
```

---

### `HeroNetworkMap`
**File**: `components/HeroNetworkMap.tsx`  
**Purpose**: Animated SVG hub-spoke distribution network in the hero background. Represents HPL's 12-district Central India coverage.

```tsx
<HeroNetworkMap isActive={isIntroDone && isHeroInView} />
```

**Features:**
- 12 spokes drawn with `pathLength: 0 → 1`, staggered 70ms each
- Outer dashed ring connecting all 12 nodes (delayed draw-in)
- 3 looping ripple rings from center hub (radius animation)
- 12 data-flow dots traveling from center to each node every ~4s
- Pulsing satellite nodes (radius keyframe animation)
- SVG is `opacity-[0.13]` — visible but unobtrusive
- ViewBox: `0 0 600 470`, center: `(300, 235)`
- Node positions: `polar(angleDeg, radius)` function, 30° intervals

**To customize coverage area:** Change `NODES` array in the component using the `polar()` function.

---

### `Navbar`
**File**: `components/Navbar.tsx`  
**Purpose**: Floating pill navbar, centered, glass-morphic.

**Key classes:**
```tsx
className="h-12 md:h-11 w-full max-w-[95%] md:w-fit rounded-full px-4 md:px-4 
           md:gap-x-6 flex items-center justify-between md:justify-center"
```
- **Mobile**: full-width pill with hamburger → fullscreen menu slide
- **Desktop**: `w-fit` = auto-shrinks to content width (no dead space)
- Scroll state: adds `shadow-[0_8px_32px_rgba(0,0,0,0.12)]` on scroll
- CTA button: `bg-slate-900 rounded-full h-8 px-5`

**Section gaps:** logo `→` nav links `→` CTA separated by `md:gap-x-6` (24px). Nav links inner gap: `gap-x-5` (20px).

---

### `Footer`
**File**: `components/Footer.tsx`  
**Purpose**: Premium white-card footer with watermark text.

**Layout**: `lg:grid-cols-12` — Brand col (4 spans) + spacer (1) + Solutions (2) + Company (2) + Reach Us (2)

**Real contact info (do not change):**
- Address: `Vijay Nagar, Indore, Madhya Pradesh — 452010`
- Phone: `+91 93000 01411`
- Email: `hindustanpharma1@yahoo.com`
- WhatsApp: `https://wa.me/919300001411`

**Socials:** LinkedIn + WhatsApp only. No Instagram, Twitter, or GDPR link.

**Background watermark:** `HindustanPharma` in massive blurred teal text at bottom, `opacity-[0.05]`.

**`SocialIcon` component:** Renders as `<motion.a>` with `href`, `target="_blank"`, `rel="noopener noreferrer"`.

---

## 7. Mouse Parallax Pattern (Hero)

Used in `app/page.tsx` for the 4 hero stat cards.

```tsx
import { useMotionValue, useTransform, useSpring } from "framer-motion";

// Setup (in component body)
const mouseX = useMotionValue(0);
const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });

// Depth layers — left cards move WITH mouse, right cards AGAINST
const p1X = useTransform(springX, [-700, 700], [14, -14]); // top-left card
const p2X = useTransform(springX, [-700, 700], [8,  -8]);  // bottom-left card
const p3X = useTransform(springX, [-700, 700], [-12, 12]); // top-right card
const p4X = useTransform(springX, [-700, 700], [-7,  7]);  // bottom-right card

// Handlers on section element
const handleHeroMouseMove = (e: React.MouseEvent<HTMLElement>) => {
  const rect = e.currentTarget.getBoundingClientRect();
  mouseX.set(e.clientX - rect.left - rect.width / 2);
};
const handleHeroMouseLeave = () => mouseX.set(0);

// Apply to each card (X only — don't touch Y, floatingVariant uses Y)
<motion.div style={{ x: p1X }} variants={floatingVariant} ... />
```

**Rule:** Only use `x` for parallax, never `y` — floatingVariant already animates `y` and they'd conflict.

---

## 8. SVG Path Animation Pattern

Used in `HeroNetworkMap` and Workflow section connector lines.

```tsx
// Draw-in effect on any SVG path
<motion.path
  d="M 300 235 L 415 235"
  stroke="#0F766E"
  strokeWidth={1}
  fill="none"
  initial={{ pathLength: 0, opacity: 0 }}
  animate={{ pathLength: 1, opacity: 1 }}
  transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
/>

// Ripple/pulse ring (animate radius directly — avoids transform-origin issues)
<motion.circle
  cx={300} cy={235}
  fill="none" stroke="#0F766E" strokeWidth={1}
  initial={{ r: 16, opacity: 0.7 }}
  animate={{ r: [16, 140], opacity: [0.7, 0] }}
  transition={{ duration: 3, delay: 0, repeat: Infinity, ease: "easeOut" }}
/>
```

> ⚠️ Never use `scale` on SVG circles for pulsing — use `r` directly. `scale` requires `transform-origin` in the SVG coordinate space.

---

## 9. Design Tokens

### Colors
```css
--pharma-teal: #0F766E        /* Primary brand teal */
--pharma-teal-dark: #0D6560   /* Darker shade for gradients */
--background: #EDEDED         /* Page background — ALL sections use this */
```

**Tailwind usage:**
- `text-pharma-teal`, `bg-pharma-teal`, `border-pharma-teal`
- `bg-background` — critical for section seamlessness

### Fonts
```css
font-body    → Open Sans    (body text, paragraphs)
font-subtext → Clarity City / Open Sans (labels, captions, nav)
/* Headings: TT Neoris (loaded as CSS @font-face, not a Tailwind class) */
```

### Standard Glows
```
shadow-[0_0_20px_rgba(15,118,110,0.1)]  → subtle teal glow (stat card icons)
shadow-[0_8px_24px_rgba(15,118,110,0.3)] → strong teal shadow (CTA buttons)
shadow-[0_20px_40px_rgba(15,118,110,0.3)] → warehouse icon deep shadow
```

---

## 10. File Architecture

```
app/
  page.tsx               ← Landing page (Hero, Solutions, Workflow, TestimonialsCarousel)
  layout.tsx             ← Root layout, Lenis smooth scroll setup
  about/page.tsx
  services/page.tsx
  contact/page.tsx

components/
  Navbar.tsx             ← Floating pill navbar
  Footer.tsx             ← White-card footer, 12-col grid
  IntroAnimation.tsx     ← Branding lockup sequence, sets isIntroDone
  BrandCarousel.tsx      ← Dual infinite-scroll logo strips
  TestimonialsCarousel.tsx ← Envelope intro + fan card layout
  TypewriterHeading.tsx  ← Per-character staggered heading
  CoreSolutionCard.tsx   ← 2×2 card (inherits parent stagger)
  HeroNetworkMap.tsx     ← Animated SVG distribution hub
  SmoothScroller.tsx     ← Lenis + section snap wheel controller

contexts/
  NavbarLogoRef.tsx      ← isIntroDone global state + logoRef for fly-away

public/
  logo.png
  hpl_text.png           ← Used in IntroAnimation
  infographics/          ← cf-agency, super-stockist, consignee-agent, drug-house
  brand-logos/           ← Pharma brand logos for BrandCarousel
```

---

## 11. Common Pitfalls

| Pitfall | Fix |
|---|---|
| Animation fires before intro | Always gate on `isIntroDone` |
| Card not visible in stagger | Don't add explicit `animate` to child — let parent stagger pass it down |
| SVG circle scale wrong origin | Use `r` animation instead of `scale` |
| Mouse parallax conflicts with float | Only apply `x` parallax, never `y` |
| Section has visual seam | Add `bg-background` to every section explicitly |
| `useTransform` on static value | Must use `useMotionValue` as input — never a plain number |
| Instagram/Twitter/LinkedIn icons missing | These are removed from lucide-react — use custom SVG components |
| `once: true` in `useInView` | Always use `once: false` for scroll-retriggering |
| `delayChildren` hardcoded | Must be `isIntroDone ? 0.2 : 999` to respect intro gate |

---

## 12. Adding a New Section — Checklist

- [ ] Add `ref` + `useInView` for the section
- [ ] Use `bg-background` on the section element  
- [ ] Add `snap-start` class
- [ ] Wrap content in `motion.div` with `staggerContainer` variant
- [ ] Gate `animate` on `isIntroDone && isSectionInView`
- [ ] Use `TypewriterHeading` for the main heading
- [ ] Section label above heading: `text-[12px] uppercase tracking-[0.2em] text-slate-400`
- [ ] CTA buttons: use `buttonZoom` variant
- [ ] Add section `ref` to `SmoothScroller.tsx` if snap is needed
