"use client";

import { useEffect } from "react";
import { useNavbarLogoRef } from "@/contexts/NavbarLogoRef";
import Lenis from "lenis";

const SNAP_SECTIONS = [
  "#hero", 
  "#brands", 
  "#solutions", 
  "#workflow", 
  "#partners", 
  "#testimonials"
];

export default function SmoothScroller() {
  const { isIntroDone } = useNavbarLogoRef();

  useEffect(() => {
    // Only initialize Lenis after intro is done
    // Or at least start/stop it based on the state.
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    if (!isIntroDone) {
      lenis.stop();
    } else {
      lenis.start();
    }

    // SECTION SNAPPING LOGIC
    let isAnimating = false;
    
    // Cache elements and their offsets to avoid DOM query on every tick
    // We re-query only if the window is resized or initially
    let cachedSections: { element: HTMLElement; offset: number }[] = [];
    
    const updateCache = () => {
      cachedSections = SNAP_SECTIONS
        .map(id => document.querySelector(id) as HTMLElement)
        .filter(Boolean)
        .map(el => ({ element: el, offset: el.offsetTop }))
        .sort((a, b) => a.offset - b.offset);
    };

    updateCache();
    window.addEventListener("resize", updateCache);

    const handleWheel = (e: WheelEvent) => {
      // Prevent snapping if we are already moving to a section
      if (isAnimating || !isIntroDone) return;

      const delta = e.deltaY;
      const currentScroll = window.scrollY;
      
      // Threshold to avoid sensitive trackpads triggering jumping
      if (Math.abs(delta) < 20) return;

      if (delta > 0) {
        // Scroll Down -> Find first section that is below current scroll position
        const next = cachedSections.find(s => s.offset > currentScroll + 100);
        if (next) {
          e.preventDefault();
          isAnimating = true;
          lenis.scrollTo(next.element, {
            onComplete: () => {
              // Wait a bit before allowing next snap to prevent rapid firing
              setTimeout(() => { isAnimating = false; }, 400);
            }
          });
        }
      } else {
        // Scroll Up -> Find section that is above current scroll position
        const prev = [...cachedSections].reverse().find(s => s.offset < currentScroll - 100);
        if (prev) {
          e.preventDefault();
          isAnimating = true;
          lenis.scrollTo(prev.element, {
            onComplete: () => {
              setTimeout(() => { isAnimating = false; }, 400);
            }
          });
        }
      }
    };

    // Keyboard navigation snapping
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isAnimating || !isIntroDone) return;
      if (["ArrowDown", "ArrowUp", "Space"].includes(e.code)) {
        const fakeDelta = e.code === "ArrowUp" ? -100 : 100;
        handleWheel({ deltaY: fakeDelta, preventDefault: () => e.preventDefault() } as WheelEvent);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    // Ensure hash links work
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (
        anchor &&
        anchor.hash &&
        anchor.origin === window.location.origin &&
        anchor.pathname === window.location.pathname
      ) {
        e.preventDefault();
        const targetElement = document.querySelector(anchor.hash) as HTMLElement;
        if (targetElement) {
          lenis.scrollTo(targetElement);
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      document.removeEventListener("click", handleAnchorClick);
          window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", updateCache);
    };
  }, [isIntroDone]);

  return null;
}
