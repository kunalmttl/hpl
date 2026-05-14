"use client";

import React from "react";
import { motion } from "framer-motion";
import { useNavbarLogoRef } from "@/contexts/NavbarLogoRef";
import { TypewriterHeading } from "@/components/TypewriterHeading";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export function ContactHeroV2() {
  const { isIntroDone } = useNavbarLogoRef();

  return (
    <section className="relative pt-32 pb-24 overflow-hidden">
      {/* Enhanced Background Network Detail */}
      <div className="absolute inset-0 -z-10 opacity-[0.02]">
        <svg width="100%" height="100%" viewBox="0 0 1000 500" preserveAspectRatio="none">
          <defs>
            <linearGradient id="networkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#0e7c6e;stop-opacity:0.05" />
              <stop offset="100%" style="stop-color:#0e7c6e;stop-opacity:0.01" />
            </linearGradient>
          </defs>
          <!-- Main Network Lines -->
          <path d="M0,100 Q250,50 500,100 T1000,100" fill="none" stroke="url(#networkGradient)" strokeWidth="2" />
          <path d="M0,300 Q250,250 500,300 T1000,300" fill="none" stroke="url(#networkGradient)" strokeWidth="2" />
          <!-- Network Nodes -->
          <circle cx="150" cy="120" r="3" fill="url(#networkGradient)" />
          <circle cx="350" cy="180" r="2.5" fill="url(#networkGradient)" />
          <circle cx="500" cy="120" r="3" fill="url(#networkGradient)" />
          <circle cx="650" cy="180" r="2.5" fill="url(#networkGradient)" />
          <circle cx="850" cy="120" r="3" fill="url(#networkGradient)" />
          <circle cx="200" cy="280" r="2.5" fill="url(#networkGradient)" />
          <circle cx="400" cy="320" r="3" fill="url(#networkGradient)" />
          <circle cx="600" cy="280" r="2.5" fill="url(#networkGradient)" />
          <circle cx="800" cy="320" r="3" fill="url(#networkGradient)" />
          <!-- Connection Dots -->
          <circle cx="100" cy="150" r="1.5" fill="currentColor" opacity="0.3" />
          <circle cx="900" cy="350" r="1.5" fill="currentColor" opacity="0.3" />
        </svg>
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-16 text-center max-w-4xl">
        <TypewriterHeading 
          text="Partner With HPL" 
          className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter leading-snug"
        />
        <TypewriterHeading 
          text="C&F Agent & Distributor Enquiries" 
          className="text-2xl md:text-3xl font-semibold text-slate-600 mb-6 tracking-wider"
        />
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={isIntroDone ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-lg text-slate-500 font-medium font-subtext leading-relaxed px-4 max-w-2xl mx-auto"
        >
          Our Indore HQ is at the heart of MP's pharmaceutical corridor. 
          Reach out for C&F agency, super stockist distribution, and verified pharmaceutical partnerships.
        </motion.p>
        
        {/* Enhanced Trust Indicators */}
        <div className="flex flex-wrap justify-center items-center gap-4 mt-8">
          <div className="flex items-center gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
            <svg className="w-5 h-5 text-[#0e7c6e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3" />
            </svg>
            <span className="text-sm font-medium text-slate-700">24-Hour Response</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
            <svg className="w-5 h-5 text-[#0e7c6e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
            </svg>
            <span className="text-sm font-medium text-slate-700">Secure & Confidential</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
            <svg className="w-5 h-5 text-[#0e7c6e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="text-sm font-medium text-slate-700">Pan India Network</span>
          </div>
        </div>
        
        {/* Primary Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mt-10">
          <a 
            href="tel:+917316056001"
            className="flex items-center gap-3 px-6 py-3 bg-[#0e7c6e] text-white text-sm font-semibold rounded-xl hover:bg-[#0b6b5e] transition-all duration-200 shadow-md shadow-[#0e7c6e]/20"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Call Us Now
          </a>
          <WhatsAppButton 
            className="flex items-center gap-3 px-6 py-3 bg-[#25D366] text-white text-sm font-semibold rounded-xl hover:bg-[#1ebe5e] transition-all duration-200 shadow-md shadow-[#25D366]/20"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 6h8m0 0l-4 4m4-4l4-4m0 5h-3a2 2 0 00-2 2v1a2 2 0 002 2h3v-2a2 2 0 00-2-2zM2 12a2 2 0 012-2h8a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2v-2z" />
            </svg>
            WhatsApp Us
          </WhatsAppButton>
        </div>
      </div>
    </section>
  );
}