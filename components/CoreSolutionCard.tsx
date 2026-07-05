"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface CoreSolutionCardProps {
  title: string;
  description: string;
  image: string;
  icon: LucideIcon;
  accentColor: string;
  accentBg: string;
  index: number;
  altText?: string;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.05,
      delayChildren: 0.05
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const imageVariants: Variants = {
  hidden: { scale: 0.92, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

const pulseVariants: Variants = {
  animate: { 
    scale: [1, 1.4, 1], 
    opacity: [0.3, 0, 0.3],
    transition: { 
      duration: 2, 
      repeat: Infinity, 
      ease: "easeOut" 
    }
  }
};

export function CoreSolutionCard({
  title,
  description,
  image,
  icon: Icon,
  accentColor,
  accentBg,
  index,
  altText,
}: CoreSolutionCardProps) {

  return (
    <motion.div
      variants={cardVariants}
      className="group relative flex flex-col rounded-[32px] bg-white overflow-hidden transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_40px_80px_rgba(0,128,128,0.1)] border border-slate-100 will-change-transform"
    >
      {/* Decorative Index Number (Premium Detail) */}
      <div className="absolute top-8 left-8 z-20 pointer-events-none opacity-[0.12] group-hover:opacity-[0.22] group-hover:translate-x-2 transition-all duration-500">
        <span className="text-6xl font-black text-slate-900 leading-none">0{index + 1}</span>
      </div>

      {/* Tech Specifications Decor (Subtle Detail) */}
      

      {/* Hover Corner Brackets */}
      <div className="absolute bottom-6 left-6 w-4 h-4 border-b-2 border-l-2 border-pharma-teal/0 group-hover:border-pharma-teal/40 transition-all duration-500 ease-out z-30" />
      <div className="absolute bottom-6 right-6 w-4 h-4 border-b-2 border-r-2 border-pharma-teal/0 group-hover:border-pharma-teal/40 transition-all duration-500 ease-out z-30" />

      {/* Infographic Area */}
      <div className="relative h-[220px] md:h-[260px] w-full overflow-hidden flex items-center justify-center p-6 text-center">
        {/* Subtle radial gradient backdrop (Stronger on hover) */}
        <div
          className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.12] transition-opacity duration-700 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 80%, ${accentColor}, transparent 75%)`,
          }}
        />

        {/* Animated infographic image */}
        <motion.div
          variants={imageVariants}
          className="relative w-full h-[85%] mt-4"
        >
          <Image
            src={image}
            alt={altText || `${title} — pharmaceutical logistics service by Hindustan Pharma Logistics in Indore`}
            fill
            loading="lazy"
            className="object-contain drop-shadow-2xl transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.1] group-hover:-translate-y-4"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </motion.div>
 
        {/* Floating accent icon badge with Radar Pulse */}
        <div className="absolute top-6 right-6 z-20">
          <motion.div 
            variants={pulseVariants}
            animate="animate"
            className="absolute inset-0 rounded-2xl bg-pharma-teal/20 will-change-[transform,opacity]"
          />
          <motion.div
            variants={itemVariants}
            className="relative w-12 h-12 rounded-2xl flex items-center justify-center shadow-[0_8px_20px_rgba(0,0,0,0.06)] border border-white/50 backdrop-blur-md group-hover:scale-110 transition-transform duration-500"
            style={{ backgroundColor: accentBg, color: accentColor }}
          >
            <Icon size={22} className="group-hover:rotate-[15deg] transition-transform duration-500" />
          </motion.div>
        </div>
      </div>
 
      {/* Text Content */}
      <div className="px-8 pb-10 pt-4 flex flex-col relative z-20">
        <motion.h4 
          variants={itemVariants}
          className="text-2xl font-bold text-slate-900 mb-3 tracking-tight group-hover:text-pharma-teal transition-colors duration-500 flex items-center gap-2"
        >
          {title}
        </motion.h4>
        <motion.p 
          variants={itemVariants}
          className="text-[15px] text-slate-600 leading-relaxed font-subtext"
        >
          {description}
        </motion.p>
      </div>
    </motion.div>
  );
}
