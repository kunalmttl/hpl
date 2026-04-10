"use client";

import React from "react";
import { motion } from "framer-motion";
import { Pill } from "lucide-react";

const PHARMA_BRANDS = [
  "Pfizer",
  "Novartis",
  "Roche",
  "Merck",
  "GSK",
  "Sanofi",
  "AstraZeneca",
  "Abbott",
  "Cipla",
  "Sun Pharma",
];

export const BrandConveyor = () => {
  // Multiply the list to ensure it covers more than the screen width for seamless looping
  const duplicatedBrands = [...PHARMA_BRANDS, ...PHARMA_BRANDS, ...PHARMA_BRANDS];

  return (
    <div className="w-full bg-[#080808] py-12 mb-20 relative overflow-hidden flex items-center">
      {/* Edge Fades using CSS Mask */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: "linear-gradient(to right, #080808, transparent 15%, transparent 85%, #080808)",
        }}
      />

      <motion.div
        className="flex whitespace-nowrap gap-16 md:gap-24 items-center"
        animate={{
          x: [0, "-33.33%"],
        }}
        transition={{
          duration: 40, // Slightly slower for more premium feel
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {duplicatedBrands.map((brand, i) => (
          <div 
            key={i} 
            className="flex items-center gap-3 transition-all duration-500 grayscale opacity-30 hover:opacity-100 hover:grayscale-0 hover:scale-105 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-pharma-teal/10 flex items-center justify-center text-pharma-teal">
              <Pill size={18} />
            </div>
            <span className="text-white text-xl md:text-2xl font-bold tracking-tight font-heading">
              {brand}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};
