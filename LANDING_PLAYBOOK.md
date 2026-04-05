# HPL Landing Page Playbook
Standards for high-fidelity interactive development.

## 🎨 Color System
- **Background**: `#EDEDED` (Neutral Background)
- **Primary**: `#0F766E` (Pharma Teal)
- **Secondary**: `#3B82F6` (Data Flow Blue)
- **Accent**: `rgba(15, 118, 110, 0.1)` (Teal Glassmorphism)

## 🏗️ Core Components

### `IntroAnimation`
**File**: `components/IntroAnimation.tsx`  
**Standard**: Multi-stage Framer Motion sequence.
1. Center Logo Reveal (hpl_text.png)
2. Radial Expansion
3. Full Content Reveal
> ⚠️ **DO NOT** use browser default fonts or three-line text. Use the provided PNG branding.

### `TypewriterHeading`
**File**: `components/TypewriterHeading.tsx`  
**Standard**: Bidirectional character-by-character typing.
- **Trigger**: `useInView(ref, { amount: 0.5, once: false })`
- **Animation**: Staggered children reveal with reverse-exit.

---

## 🏗️ Animation & Motion Patterns

### 1. The Stagger Container
Always use a shared `variants` object for parent-child coordination.

```tsx
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};
```

### 2. Standard Variants
- **`itemPop`**: Scale 0.9 -> 1.0 + Spring Bounce. Good for icons/logos.
- **`itemSlideUp`**: Y: 30 -> 0 + Bezier Ease. Standard for body text.
- **`buttonZoom`**: Scale 0 -> 1.0 + Elastic Spring. For primary CTAs.

### 3. Dynamic Re-triggering
Animations must run EVERY time they enter the viewport unless explicitly set to `once: true`.
- Use `whileInView` sparingly. Preferred pattern:
```tsx
const ref = useRef(null);
const isInView = useInView(ref, { amount: 0.2, once: false });
// animate={isInView ? "visible" : "hidden"}
```

## 🔄 Section Transitions (Latest Refinement)
- **Background Unification**: All major sections in `app/page.tsx` and `components/BrandCarousel.tsx` now explicitly use `bg-background` (#EDEDED) to eliminate visual seams during scroll.
- **Exit Staggering**: Use `staggerDirection: -1` on the `containerVariants` when `isPresent` (AnimatePresence) or when manually triggered by scroll exit to reverse-reveal content for a smoother departure.

## 🖼️ Background Framing Strategy
When using decorative icons or SVG paths to frame central grid content:
- **Anchoring**: Use `absolute` with responsive offsets (e.g. `left-[-20px] md:left-4`) to ensure icons remain visible and framing-focused without overlapping core UI.
- **Opacity Profile**: Maintain a subtle but readable presence. Recommended opacity: `/10` for icons, `/0.08` for background watermark text, and `opacity-60` for dashed SVG paths.
- **Dynamic Scale**: Use `viewBox` and `preserveAspectRatio="none"` on background SVGs to ensure the "framing curve" adjusts correctly to wide viewports.
- **Layering**: Ensure `-z-10` or `-z-20` order to keep decorative elements behind content while maintaining visual depth.

### `CoreSolutionCard`
**File**: `components/CoreSolutionCard.tsx`  
- **Visuals**: One component per file. Functional only.
- **Interactions**:
  - `whileHover`: Corner brackets reveal (opacity 0 -> 0.4).
  - Background radar pulse: Infinite scale/opacity loop.
  - Large decorative index (01-04): Anchored to top-left.

```tsx
<motion.div 
  className="absolute -top-1 -right-1 w-8 h-8 border-t-2 border-r-2 border-teal-500/0"
  animate={{ borderColor: isHovered ? "rgba(20, 184, 166, 0.4)" : "rgba(20, 184, 166, 0)" }}
/>
```

> ⚠️ Do not pass `animate` directly to `CoreSolutionCard`. It inherits from parent stagger.

---

### `BrandCarousel`
**File**: `components/BrandCarousel.tsx`  
**Pattern**: Orbit-based rotation.
- **Sync**: `useScroll` transforms rotation value.
- **Dual Direction**: Column 1 (Clockwise), Column 2 (Anti-clockwise).
- **Responsive**: Reduced radius for mobile viewports (`hidden md:block` fallback).

### `FullPageSnap`
**File**: `components/FullPageSnap.tsx`  
**Pattern**: Lenis `scrollTo` interception.
- Prevents partial section views.
- Aligns `section` top to viewport top.

---

## 🛠️ Dev Guidelines
1. **Rule of 30**: Keep files under 300 lines. Refactor common logic to `utils`.
2. **Global Gating**: All entrance animations must wait for `isIntroDone`.
3. **No Boxes**: Never use `border`, `bg-slate-50`, or explicit borders to separate sections. Use spacing and depth (shadows/blur) instead.
4. **Hydration First**: Always wrap scroll-dependent logic in `useEffect`.
