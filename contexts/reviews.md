human analysis:
what is happening here is as someone scrolls to this section of words of appreciation, an envelope slides up with a card inside (that has review of the product), then the card slides out of envelope, envelope slides back down and fades away, and there is a carousel of other cards of reviews animated in a slight curve with centre somewhere above, there are arrow keys to scroll between review cards and by default each review stays from some time before another review card scrolls in and other scrolls away, like an infinite carousel animation. using our tech stack. perform research and understand the flow

Let me look at the existing home page testimonials section to understand what's currently there before planning.Good. I have full context. Now let me think through this deeply and produce the complete plan.Good. Now I have everything I need to produce a thorough plan.



---

## How to Build This: Complete Technical Plan

Looking at your 4 screenshots, here's what's actually happening:

**Screenshot 1:** Envelope slides up from the bottom, sealed, card partially visible peeking out the top.
**Screenshot 2:** Envelope flap opens, card begins sliding up and out.
**Screenshot 3:** Card fully out, standing upright, envelope gone. Two ghost cards on left and right at rotated angles — the "fan" carousel.
**Screenshot 4:** Next card has rotated in, same fan layout visible.

---

### Architecture: One Component

**`components/TestimonialsCarousel.tsx`** — replaces the current static testimonials section in `page.tsx`.

---

### Phase 1 — Envelope Intro (Scroll-Triggered, Plays Once)

**Trigger:** `useInView` from `motion/react` detects when the section enters the viewport.

**What's in the DOM during this phase:**

```
<section> (overflow: hidden)
  <div class="envelope-body">       ← the white envelope body (rounded rect)
    <div class="envelope-flap">     ← the triangular flap (CSS clip-path triangle)
    <div class="review-card">       ← the card sitting inside
```

**The 4-step sequence (imperative `useAnimate`):**

```
Step 1 — Section scrolls into view
  envelope-body: y: 200 → 0, opacity: 0 → 1
  ease: spring(stiffness:80, damping:18), duration: 0.7s

Step 2 — Flap opens
  envelope-flap: rotateX: 0 → -160deg (CSS 3D flip, perspective on parent)
  origin: top center
  duration: 0.5s, ease: easeInOut

Step 3 — Card slides up and out of envelope
  review-card: y: 60 → -200px (relative to envelope)
  duration: 0.55s, ease: [0.25, 0.1, 0.25, 1]
  Simultaneously: envelope-body + flap: y: 0 → 120px, opacity: 1 → 0
  duration: 0.4s, ease: easeIn (envelope drops away)

Step 4 — Card settles to final position + side fan cards appear
  review-card snaps to carousel centre position
  Left ghost: x: -280px, rotate: -12deg, scale: 0.88, opacity: 0.5
  Right ghost: x: +280px, rotate: +12deg, scale: 0.88, opacity: 0.5
  Both ghosts: opacity 0 → 0.5, duration: 0.35s
```

---

### Phase 2 — The Fan Carousel

**The geometry (from your screenshots):**

Cards are arranged on an arc — the "centre of rotation" is a point far above the viewport (around `y: -800px` from card centre). Each card is rotated around this distant centre, which creates the gentle perspective fan. This is achieved not with actual `transform-origin` tricks, but by calculating `x`, `y`, and `rotate` for each position mathematically:

```
Position offsets from centre:
  offset -2: x: -480, y: +20, rotate: -18deg, scale: 0.78, opacity: 0.25
  offset -1: x: -260, y: +8,  rotate: -10deg, scale: 0.88, opacity: 0.5   ← left ghost visible
  offset  0: x: 0,   y: 0,   rotate:   0deg, scale: 1.0,  opacity: 1.0   ← active card
  offset +1: x: +260, y: +8,  rotate: +10deg, scale: 0.88, opacity: 0.5   ← right ghost visible
  offset +2: x: +480, y: +20, rotate: +18deg, scale: 0.78, opacity: 0.25
```

Only positions -1, 0, +1 are visible (from your screenshots). Positions ±2 exist in the DOM but are outside the container's `overflow: hidden`.

**State:** `activeIndex` — a simple integer, wraps around (infinite carousel).

**Transition between cards:**
When the user clicks → or the timer fires, `activeIndex` increments. Each card's position is calculated as `cardIndex - activeIndex` which gives its offset slot. Motion animates `x`, `y`, `rotate`, `scale`, `opacity` with:

```
transition: { type: "spring", stiffness: 60, damping: 20 }
```

The spring gives that organic deceleration as the card sweeps into centre.

---

### Auto-Advance Timer

```ts
useEffect(() => {
	const id = setInterval(() => {
		setActiveIndex((i) => (i + 1) % testimonials.length);
	}, 4000); // 4 seconds per card
	return () => clearInterval(id);
}, []);
```

Timer resets when user manually clicks an arrow — clear and restart the interval.

---

### The Card Content

Each card matches your screenshot exactly:

- Avatar image (rounded square, 56px)
- Name (`font-black`, `text-slate-900`)
- Role (`font-subtext`, `text-slate-500`)
- 5 stars (amber) + rating number
- Quote text (centre aligned, `text-slate-600`)

For HPL, the content will be real testimonials from pharma manufacturers, distributors, CFA partners.

---

### What Replaces in `page.tsx`

The entire current `<section id="testimonials">` block gets replaced with:

```tsx
<TestimonialsCarousel />


```

No other files touched.

---

### Files to Create/Modify

| Action     | File                                       |
| ---------- | ------------------------------------------ |
| **Create** | `components/TestimonialsCarousel.tsx`      |
| **Modify** | `app/page.tsx` — swap testimonials section |

No new packages needed — `motion/react` (already installed) handles everything.

---

Ready to implement when you say go. The envelope animation and fan carousel are both self-contained in one component.
