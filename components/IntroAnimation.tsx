"use client";

import { useEffect, useRef, useState } from "react";
import { useAnimate, easeInOut } from "framer-motion";
import Image from "next/image";
import { useNavbarLogoRef } from "@/contexts/NavbarLogoRef";

export default function IntroAnimation() {
  const { logoRef: navbarLogoRef, setIntroDone } = useNavbarLogoRef();
  const [scope, animate] = useAnimate();
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Only run once per session
    if (typeof window !== "undefined" && sessionStorage.getItem("hpl-intro-played")) {
      setDone(true);
      setIntroDone(true);
      return;
    }

    // Lock scroll while intro plays
    document.body.style.overflow = "hidden";

    const run = async () => {
      const logo = logoRef.current;
      const text = textRef.current;
      if (!logo || !text) return;

      // ── Step 1: Logo scales in from zero + spins ──────────────────────
      await animate(
        logo,
        { scale: [0, 1], rotate: [0, 360], opacity: [0, 1] },
        { duration: 0.75, ease: [0.34, 1.56, 0.64, 1] } // spring-like overshoot
      );

      // Brief pause after stabilising
      await new Promise((r) => setTimeout(r, 120));

      // ── Step 2: Logo slides left ───────────────────────────────────────
      await animate(logo, { x: -45 }, { duration: 0.4, ease: easeInOut });

      // ── Step 3: Text image slides in from right ─────────────────────────
      await animate(
        text,
        { x: [-60, 0], opacity: [0, 1] },
        { duration: 0.5, ease: "easeOut" }
      );

      // Hold for reading
      await new Promise((r) => setTimeout(r, 600));

      // ── Step 4: Text swipe down and fade ─────────────────────────────
      await animate(
        text,
        { y: [0, 40], opacity: [1, 0] },
        { duration: 0.35, ease: "easeIn" }
      );

      // ── Step 5: Logo slides back to centre ────────────────────────────
      await animate(logo, { x: 0 }, { duration: 0.35, ease: easeInOut });

      // ── Step 6: Logo flies to navbar position with smooth curve ────────
      const navEl = navbarLogoRef.current;
      if (navEl) {
        // ── IMAGE-TO-IMAGE PRECISION MAPPING ──
        // We measure the actual 'img' tags rather than their containers (div/a) 
        // to ignore internal padding differences between Intro and Navbar.
        const navImg = navEl.querySelector('img');
        const logoImg = logo.querySelector('img');

        if (!navImg || !logoImg) {
          // Fallback if images aren't found in DOM
          await animate(logo, { opacity: 0, scale: 0.3 }, { duration: 0.4 });
          return;
        }

        const navRect = navImg.getBoundingClientRect();
        const logoRect = logoImg.getBoundingClientRect();

        // ── ROBUST COORDINATE CALCULATION ──
        // The navbar starts at y: -100 (hidden). We need to target its RESTING position (y: 0).
        const navContainer = navEl.closest('.fixed');
        const style = window.getComputedStyle(navContainer || navEl);
        const transform = style.transform;
        
        let translateY = 0;
        if (transform && transform !== 'none') {
          const matrix = new DOMMatrix(transform);
          translateY = matrix.m42;
        }

        // Target: Center of the navbar logo image when it's at rest
        const targetX = navRect.left + navRect.width / 2;
        const targetY = (navRect.top - translateY) + navRect.height / 2;

        // Current: Center of the intro animation logo image
        const currentX = logoRect.left + logoRect.width / 2;
        const currentY = logoRect.top + logoRect.height / 2;

        const dx = targetX - currentX;
        const dy = targetY - currentY;

        // Scale factor: match the image width precisely
        const scaleTarget = navRect.width / logoRect.width;

        await animate(
          logo,
          {
            x: dx,
            y: dy,
            scale: scaleTarget,
            backgroundColor: "rgba(255, 255, 255, 0)",
            borderColor: "rgba(255, 255, 255, 0)",
            backdropFilter: "blur(0px)",
            boxShadow: "none",
          },
          {
            duration: 1.1,
            ease: [0.16, 1, 0.3, 1],
            x: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
            y: { duration: 1.1, ease: [0.45, 0, 0.55, 1] } 
          }
        );
      } else {
        // Fallback if ref not ready: just fade out
        await animate(logo, { opacity: 0, scale: 0.3 }, { duration: 0.4 });
      }

      // ── Step 7: Fade out the overlay background ──────────────────
      await animate(scope.current, { backgroundColor: "rgba(0,0,0,0)" }, { duration: 0.5 });

      // Signal completion early so the site reveals underneath the logo
      setIntroDone(true);
      document.body.style.overflow = "";

      // ── Step 8: Settle Buffer ───────────────────────────────────────
      // We keep the splash logo visible for an extra 2 seconds as a buffer
      // to ensure the navbar is fully opaque and stable before we remove it.
      await new Promise((r) => setTimeout(r, 2000));

      // Final Cleanup
      sessionStorage.setItem("hpl-intro-played", "1");
      setDone(true);
    };

    run();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (done) return null;

  return (
    <div
      ref={scope}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
      style={{ backgroundColor: "var(--background, #ffffff)" }}
      aria-hidden="true"
    >
      {/* Centred flex row: logo + wordmark side-by-side */}
      <div className="flex items-center gap-0">

        {/* ── Logo Image (Large Hero Size) ── */}
        <div
          ref={logoRef}
          className="flex items-center justify-center px-4 py-4 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10"
          style={{ opacity: 0, transform: "scale(0)" }}
        >
          <Image
            src="/logo.png"
            alt="HPL Logo Icon"
            width={140}
            height={48}
            className="w-[90px] md:w-[140px] h-auto object-contain"
            style={{ height: 'auto' }}
            priority
          />
        </div>

        {/* ── Wordmark Image (Hindustan Pharma Logistics) ── */}
        <div 
          ref={textRef}
          className="ml-[-40px] md:ml-[-64px] origin-left"
          style={{ 
            opacity: 0, 
            transform: "translateX(-30px)" 
          }}
        >
          <Image
            src="/hpl_text.png"
            alt="Hindustan Pharma Logistics"
            width={1330}
            height={419}
            className="w-[140px] md:w-[240px] h-auto object-contain mix-blend-multiply"
            style={{ height: 'auto' }}
            priority
          />
        </div>

      </div>
    </div>
  );
}

