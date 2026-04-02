"use client";

import { useEffect } from "react";
import { useNavbarLogoRef } from "@/contexts/NavbarLogoRef";
import Lenis from "lenis";

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

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    // Ensure hash links work with smooth scroll
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
    };
  }, [isIntroDone]);

  return null;
}
