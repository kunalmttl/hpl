"use client";

import React from "react";
import { motion } from "framer-motion";
import { useNavbarLogoRef } from "@/contexts/NavbarLogoRef";

export function ContactHero() {
  const { isIntroDone } = useNavbarLogoRef();
  // Always animate in — use isIntroDone as a delay hint, but cap the wait
  const [ready, setReady] = React.useState(false);
  React.useEffect(() => {
    if (isIntroDone) { setReady(true); return; }
    // Fallback: always show after 400ms regardless of intro state
    const t = setTimeout(() => setReady(true), 400);
    return () => clearTimeout(t);
  }, [isIntroDone]);

  return (
    <section className="relative pt-36 pb-20 overflow-hidden bg-background">
      {/* Teal filled top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#0F766E]" />

      {/* Decorative grid lines */}
      <div className="absolute inset-0 -z-10 opacity-[0.04]" aria-hidden="true">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="contact-grid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#0F766E" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#contact-grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-6 sm:px-10 md:px-16 lg:px-24 max-w-6xl">
        {/* Eyebrow label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2.5 mb-5"
        >
          <span className="inline-block w-6 h-[2px] bg-[#0F766E]" />
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0F766E] font-body">
            Get In Touch
          </span>
        </motion.div>

        {/* Heading row — large left-aligned heading + right column */}
        <div className="flex flex-col lg:flex-row lg:items-end gap-8 lg:gap-16">
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-[3.2rem] sm:text-[4rem] md:text-[5.5rem] lg:text-[6.5rem] leading-[0.92] tracking-tight text-foreground flex-1"
          >
            Let&apos;s<br />
            <span className="text-[#0F766E]">Partner</span><br />
            Together.
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:max-w-xs pb-2"
          >
            <p className="text-[15px] text-muted-foreground font-body leading-relaxed mb-6">
              Our Indore HQ sits at the heart of MP&apos;s pharmaceutical corridor. Reach out for C&amp;F agency services, super stockist distribution, and bulk supply operations.
            </p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#0F766E] flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-xs font-semibold text-foreground font-body">Response within <span className="text-[#0F766E]">24 hours</span></span>
            </div>
          </motion.div>
        </div>

        {/* Bottom divider with stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-14 pt-8 border-t border-border/60 grid grid-cols-3 gap-4"
        >
          {[
            { value: "60+", label: "Manufacturers Served" },
            { value: "12+", label: "Districts Covered" },
            { value: "24h", label: "Response Time" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col gap-0.5">
              <span className="font-heading text-2xl md:text-3xl text-[#0F766E]">{stat.value}</span>
              <span className="text-[11px] uppercase tracking-widest text-muted-foreground font-body">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
