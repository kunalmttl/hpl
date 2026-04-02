"use client";

import { useEffect, useRef, useState } from "react";
import { useAnimate, easeInOut } from "framer-motion";
import Image from "next/image";
import { useNavbarLogoRef } from "@/contexts/NavbarLogoRef";

export default function IntroAnimation() {
  const { logoRef: navbarLogoRef, setIntroDone } = useNavbarLogoRef();
  const [scope, animate] = useAnimate();
  const logoRef = useRef<HTMLDivElement>(null);
  const wordHRef = useRef<HTMLDivElement>(null);
  const wordPRef = useRef<HTMLDivElement>(null);
  const wordLRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Only run once per session
    if (sessionStorage.getItem("hpl-intro-played")) {
      setDone(true);
      setIntroDone(true);
      return;
    }

    // Lock scroll while intro plays
    document.body.style.overflow = "hidden";

    const run = async () => {
      const logo = logoRef.current;
      const wordH = wordHRef.current;
      const wordP = wordPRef.current;
      const wordL = wordLRef.current;
      if (!logo || !wordH || !wordP || !wordL) return;

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

      // ── Step 3: Words slide in from right (staggered) ──────────────────
      await Promise.all([
        animate(wordH, { x: [-60, 0], opacity: [0, 1] }, { duration: 0.38, ease: "easeOut" }),
        animate(wordP, { x: [-60, 0], opacity: [0, 1] }, { duration: 0.38, ease: "easeOut", delay: 0.06 }),
        animate(wordL, { x: [-60, 0], opacity: [0, 1] }, { duration: 0.38, ease: "easeOut", delay: 0.12 }),
      ]);

      // Hold for reading
      await new Promise((r) => setTimeout(r, 480));

      // ── Step 4: Words swipe down and fade ─────────────────────────────
      await Promise.all([
        animate(wordH, { y: [0, 40], opacity: [1, 0] }, { duration: 0.32, ease: "easeIn" }),
        animate(wordP, { y: [0, 40], opacity: [1, 0] }, { duration: 0.32, ease: "easeIn", delay: 0.04 }),
        animate(wordL, { y: [0, 40], opacity: [1, 0] }, { duration: 0.32, ease: "easeIn", delay: 0.08 }),
      ]);

      // ── Step 5: Logo slides back to centre ────────────────────────────
      await animate(logo, { x: 0 }, { duration: 0.35, ease: easeInOut });

      // ── Step 6: Logo flies to navbar position with smooth curve ────────
      const navEl = navbarLogoRef.current;
      if (navEl) {
        const navRect = navEl.getBoundingClientRect();
        const logoRect = logo.getBoundingClientRect();

        // Delta from logo centre to navbar logo centre
        const dx = navRect.left + navRect.width / 2 - (logoRect.left + logoRect.width / 2);
        const dy = navRect.top + navRect.height / 2 - (logoRect.top + logoRect.height / 2);

        // Scale-down ratio: navbar logo is roughly 48px wide, intro logo is ~160px
        const scaleTarget = navRect.width / logoRect.width;

        await animate(
          logo,
          {
            x: dx,
            y: dy,
            scale: scaleTarget,
            // Fade out the intro-specific styling while moving
            backgroundColor: "rgba(255, 255, 255, 0)",
            borderColor: "rgba(255, 255, 255, 0)",
            backdropFilter: "blur(0px)",
          },
          {
            duration: 0.85,
            ease: [0.25, 0.1, 0.25, 1],
            // Asymmetric easing creates the curve: 
            // X moves fast early (easeIn), Y moves slow early (easeOut).
            x: { ease: "easeIn", duration: 0.85 },
            y: { ease: "easeOut", duration: 0.85 },
          }
        );
      } else {
        // Fallback if ref not ready: just fade out
        await animate(logo, { opacity: 0, scale: 0.3 }, { duration: 0.4 });
      }

      // ── Step 7: Fade out ONLY the overlay background ──────────────────
      // This reveals the homepage white/slate background behind the landing logo
      await animate(scope.current, { backgroundColor: "rgba(0,0,0,0)" }, { duration: 0.4 });

      // Cleanup
      document.body.style.overflow = "";
      sessionStorage.setItem("hpl-intro-played", "1");
      setIntroDone(true);
      setDone(true);
    };

    run();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (done) return null;

  return (
    <div
      ref={scope}
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{ backgroundColor: "var(--background, #ffffff)" }}
      aria-hidden="true"
    >
      {/* Centred flex row: logo + wordmark side-by-side */}
      <div className="flex items-center gap-0">

        {/* ── Logo Image (Large Hero Size) ── */}
        <div
          ref={logoRef}
          className="flex items-center justify-center pl-4 py-4 pr-1 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10"
          style={{ opacity: 0, transform: "scale(0)" }}
        >
          <Image
            src="/logo.png"
            alt="HPL Logo"
            width={140}
            height={48}
            className="w-[90px] md:w-[140px] h-auto object-contain"
            priority
          />
        </div>

        {/* ── Word stack: HINDUSTAN / PHARMA / LOGISTICS ── */}
        <div className="flex flex-col items-start leading-none ml-[-24px]" style={{ gap: 2 }}>
          <div
            ref={wordHRef}
            className="font-heading font-bold tracking-tight text-slate-900"
            style={{
              fontSize: "clamp(17px, 3.2vw, 26px)",
              lineHeight: 1.05,
              opacity: 0,
              transform: "translateX(-30px)",
            }}
          >
            HINDUSTAN
          </div>
          <div
            ref={wordPRef}
            className="font-heading font-bold tracking-tight text-slate-900"
            style={{
              fontSize: "clamp(17px, 3.2vw, 26px)",
              lineHeight: 1.05,
              opacity: 0,
              transform: "translateX(-30px)",
            }}
          >
            PHARMA
          </div>
          <div
            ref={wordLRef}
            className="font-subtext font-bold tracking-widest uppercase text-slate-500"
            style={{
              fontSize: "clamp(7px, 1vw, 11px)",
              letterSpacing: "0.22em",
              marginTop: 3,
              opacity: 0,
              transform: "translateX(-30px)",
            }}
          >
            LOGISTICS
          </div>
        </div>

      </div>
    </div>
  );
}
