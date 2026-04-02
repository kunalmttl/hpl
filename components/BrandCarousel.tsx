"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTime, useTransform } from "framer-motion";
import Image from "next/image";
import { TypewriterHeading } from "./TypewriterHeading";

const images = [
  "/images/warehouse-shelves.png",
  "/images/delivery-truck.png",
  "/images/medicine-boxes.png",
  "/images/logistics-hub.png",
  "/images/inventory-tablet.png",
  "/images/supply-chain-abstract.png",
];

export const BrandCarousel = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 1. Initial baseline time-based rotation
  const time = useTime();
  
  // 2. Scroll-based progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // 3. Smooth spring for "smooth scroll" inertia feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 20,
    mass: 1,
    restDelta: 0.001
  });

  // 4. Combine baseline (infinite) + scroll (dynamic)
  // Slower speed for larger cards (10 degrees per second)
  const rotateCw = useTransform([time, smoothProgress], (latest) => {
    const [t, p] = latest as [number, number];
    return (t * 0.01) + (p * 360);
  });

  const rotateAcw = useTransform([time, smoothProgress], (latest) => {
    const [t, p] = latest as [number, number];
    return -((t * 0.01) + (p * 360));
  });

  // Responsive sizing
  const orbitRadius = typeof window !== 'undefined' && window.innerWidth < 768 ? 180 : 320;
  const carouselSize = typeof window !== 'undefined' && window.innerWidth < 768 ? 'w-[400px] h-[400px]' : 'w-[700px] h-[700px]';

  return (
    <section 
      id="brands"
      ref={containerRef}
      className="py-32 h-[600px] md:h-[850px] relative overflow-hidden flex items-center justify-center bg-[#EDEDED] snap-start"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(15,118,110,0.03)_0%,transparent_70%)]" />
      
      {/* Background Decor */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-slate-200/60 z-0" />

      {/* Left Carousel - Center at Left Edge */}
      <div className={`absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 ${carouselSize} group z-10`}>
        <motion.div 
          style={{ rotate: rotateCw }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div
              key={`left-${i}`}
              className="absolute"
              style={{
                transform: `rotate(${i * 60}deg) translateY(-${orbitRadius}px) rotate(-${i * 60}deg)`,
              }}
            >
              <motion.div 
                style={{ rotate: rotateAcw }}
                className="w-28 h-28 md:w-56 md:h-56 rounded-[2rem] overflow-hidden shadow-[0_15px_50px_rgba(0,0,0,0.12)] border border-white bg-white/90 backdrop-blur-md p-2 md:p-4 hover:scale-105 transition-transform duration-500"
              >
                <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden border border-slate-50">
                  <Image
                    src={images[i]}
                    alt={`Brand Image ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Right Carousel - Center at Right Edge */}
      <div className={`absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 ${carouselSize} group z-10`}>
        <motion.div 
          style={{ rotate: rotateAcw }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div
              key={`right-${i}`}
              className="absolute"
              style={{
                transform: `rotate(${i * 60}deg) translateY(-${orbitRadius}px) rotate(-${i * 60}deg)`,
              }}
            >
              <motion.div 
                style={{ rotate: rotateCw }}
                className="w-28 h-28 md:w-56 md:h-56 rounded-[2rem] overflow-hidden shadow-[0_15px_50px_rgba(0,0,0,0.12)] border border-white bg-white/90 backdrop-blur-md p-2 md:p-4 hover:scale-105 transition-transform duration-500"
              >
                <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden border border-slate-50">
                  <Image
                    src={images[(i + 3) % 6]}
                    alt={`Brand Image ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>
      
      {/* Central Content */}
      <div className="relative z-20 text-center px-8 max-w-2xl bg-[#EDEDED]/5 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none py-10 rounded-3xl">
        <TypewriterHeading 
          as="h3"
          className="text-3xl md:text-5xl font-semibold tracking-tight mb-6 text-[#1A1A1A] leading-[1.15]"
          segments={[
            { text: "Integrated Pharma", br: true },
            { text: "Logistics Ecosystem" }
          ]}
        />
        <p className="text-slate-500 text-base md:text-xl leading-relaxed tracking-wide font-light max-w-lg mx-auto">
          Redefining supply chain standards with precision temperature management 
          and end-to-end visibility for high-value pharmaceutical products.
        </p>
        
        <div className="mt-10 flex items-center justify-center gap-4">
          <div className="w-12 h-px bg-pharma-teal/30" />
          <span className="text-[10px] font-bold text-pharma-teal/60 uppercase tracking-[0.5em]">HPL Network</span>
          <div className="w-12 h-px bg-pharma-teal/30" />
        </div>
      </div>
    </section>
  );
};
