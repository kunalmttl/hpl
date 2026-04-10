"use client";

import React from "react";
import { motion } from "framer-motion";
import { useNavbarLogoRef } from "@/contexts/NavbarLogoRef";
import { TypewriterHeading } from "@/components/TypewriterHeading";

export function ContactHero() {
  const { isIntroDone } = useNavbarLogoRef();

  return (
    <section className="relative pt-40 pb-16 overflow-hidden">
      {/* Background Network Detail */}
      <div className="absolute inset-0 -z-10 opacity-[0.03]">
        <svg width="100%" height="100%" viewBox="0 0 800 400">
           <path d="M0,100 Q200,50 400,100 T800,100" fill="none" stroke="currentColor" strokeWidth="1" />
           <path d="M0,300 Q200,250 400,300 T800,300" fill="none" stroke="currentColor" strokeWidth="1" />
           <circle cx="150" cy="120" r="2" fill="currentColor" />
           <circle cx="650" cy="280" r="2" fill="currentColor" />
        </svg>
      </div>

      <div className="container mx-auto px-8 md:px-16 lg:px-24 text-center max-w-7xl">
        <TypewriterHeading 
          text="How Can We Help?" 
          className="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tighter" 
        />
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={isIntroDone ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-xl text-slate-600 font-medium font-subtext leading-relaxed px-4"
        >
          Our Indore HQ is at the heart of MP's pharmaceutical corridor. 
          Reach out for C&F services, super stockist distribution, and bulk supply operations.
        </motion.p>
      </div>
    </section>
  );
}
