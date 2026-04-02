"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";

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
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Smooth out the scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Map scroll progress to rotation (360 degrees for a full cycle)
  const rotateClockwise = useTransform(smoothProgress, [0, 1], [0, 360]);
  const rotateAntiClockwise = useTransform(smoothProgress, [0, 1], [0, -360]);

  return (
    <section 
      ref={containerRef}
      className="py-24 relative overflow-hidden"
    >
      <div className="max-w-[1240px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          
          {/* Left Carousel (Clockwise) */}
          <div className="relative aspect-square max-w-[450px] mx-auto w-full group">
            <motion.div 
              style={{ rotate: rotateClockwise }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div
                  key={`left-${i}`}
                  className="absolute"
                  style={{
                    transform: `rotate(${i * 60}deg) translateY(-160px) rotate(-${i * 60}deg)`,
                  }}
                >
                  <motion.div 
                    style={{ rotate: rotateAntiClockwise }} // Keep images upright
                    className="w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-slate-100 bg-white p-2"
                  >
                    <Image
                      src={images[i]}
                      alt={`Brand Image ${i + 1}`}
                      fill
                      className="object-cover rounded-xl"
                    />
                  </motion.div>
                </div>
              ))}
              
              {/* Center Decorative Element */}
              <div className="w-16 h-16 rounded-full bg-pharma-teal/5 flex items-center justify-center border border-pharma-teal/10">
                <div className="w-8 h-8 rounded-full bg-pharma-teal/20 animate-pulse" />
              </div>
            </motion.div>
            
            <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
               <span className="text-[10px] font-bold text-pharma-teal uppercase tracking-widest mt-32">Precision</span>
            </div>
          </div>

          {/* Right Carousel (Anti-clockwise) */}
          <div className="relative aspect-square max-w-[450px] mx-auto w-full group">
            <motion.div 
              style={{ rotate: rotateAntiClockwise }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div
                  key={`right-${i}`}
                  className="absolute"
                  style={{
                    transform: `rotate(${i * 60}deg) translateY(-160px) rotate(-${i * 60}deg)`,
                  }}
                >
                  <motion.div 
                    style={{ rotate: rotateClockwise }} // Keep images upright
                    className="w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-slate-100 bg-white p-2"
                  >
                    <Image
                      src={images[(i + 3) % 6]} // Offset by 3 for variety
                      alt={`Brand Image ${i + 1}`}
                      fill
                      className="object-cover rounded-xl"
                    />
                  </motion.div>
                </div>
              ))}

              {/* Center Decorative Element */}
              <div className="w-16 h-16 rounded-full bg-pharma-teal/5 flex items-center justify-center border border-pharma-teal/10">
                <div className="w-8 h-8 rounded-full bg-pharma-teal/20 animate-pulse" />
              </div>
            </motion.div>

            <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
               <span className="text-[10px] font-bold text-pharma-teal uppercase tracking-widest mt-32">Reliability</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
