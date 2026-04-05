"use client";

import React from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { useNavbarLogoRef } from "@/contexts/NavbarLogoRef";

interface CoreSolutionCardProps {
  title: string;
  description: string;
  image: string;
  icon: LucideIcon;
  accentColor: string;
  accentBg: string;
  index: number;
}

export function CoreSolutionCard({
  title,
  description,
  image,
  icon: Icon,
  accentColor,
  accentBg,
  index,
}: CoreSolutionCardProps) {
  const { isIntroDone } = useNavbarLogoRef();

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

  return (
    <motion.div
      variants={cardVariants}
      className="group relative flex flex-col rounded-3xl bg-[#F4F4F5] overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
    >
      {/* Infographic Area */}
      <div className="relative h-[220px] md:h-[260px] w-full overflow-hidden flex items-center justify-center p-6 text-center">
        {/* Subtle radial gradient backdrop */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 80%, ${accentColor}, transparent 70%)`,
          }}
        />
 
        {/* Animated infographic image */}
        <motion.div
          variants={imageVariants}
          className="relative w-full h-full"
        >
          <Image
            src={image}
            alt={`${title} infographic`}
            fill
            className="object-contain drop-shadow-lg transition-transform duration-500 group-hover:scale-[1.04]"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </motion.div>
 
        {/* Floating accent icon */}
        <motion.div
          variants={itemVariants}
          animate={{
            y: [0, -6, 0],
          }}
          transition={{
            y: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.5,
            },
            opacity: { duration: 0.5, ease: "easeOut" },
            scale: { duration: 0.5, ease: "easeOut" }
          }}
          className="absolute top-5 right-5 w-10 h-10 rounded-xl flex items-center justify-center shadow-sm"
          style={{ backgroundColor: accentBg, color: accentColor }}
        >
          <Icon size={18} />
        </motion.div>
      </div>
 
      {/* Text Content */}
      <div className="px-7 pb-7 pt-2 flex flex-col">
        <motion.h4 
          variants={itemVariants}
          className="text-xl font-bold text-slate-900 mb-2 tracking-tight"
        >
          {title}
        </motion.h4>
        <motion.p 
          variants={itemVariants}
          className="text-[15px] text-slate-500 leading-relaxed font-subtext"
        >
          {description}
        </motion.p>
      </div>
    </motion.div>
  );
}
