"use client";

import React, { useRef } from "react";
import { 
  motion, 
  useScroll, 
  useSpring, 
  useTime, 
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { TypewriterHeading } from "./TypewriterHeading";
import { useNavbarLogoRef } from "@/contexts/NavbarLogoRef";

const images = [
  "/carousel/warehouse.png",
  "/carousel/delivery.png",
  "/carousel/lab.png",
  "/carousel/medicine.png",
  "/carousel/logistics.png",
  "/carousel/cold-chain.png",
  "/carousel/worker.png",
  "/carousel/pharmacy.png",
];

const OrbitCard = ({ 
  src, 
  index, 
  total, 
  rotation, 
  side = "left", 
  radius = 450 
}: { 
  src: string, 
  index: number, 
  total: number, 
  rotation: any, 
  side?: "left" | "right", 
  radius?: number 
}) => {
  // Use math to calculate position on an arc
  const angleOffset = (index / total) * 360;
  
  // Final angle based on baseline rotation + index offset
  const angleResult = useTransform(rotation, (val: number) => {
    // Normalize angle within 0-360 range
    let raw = (val + angleOffset) % 360;
    if (raw < 0) raw += 360;
    return raw;
  });

  // Calculate X, Y, Z, Scale, Opacity based on the angle
  // We only show the "inward" half of the circle (0 to 180 or -90 to 90)
  const x = useTransform(angleResult, (angle) => {
    const rad = (angle - 90) * (Math.PI / 180);
    const val = radius * Math.cos(rad);
    return side === "left" ? val : -val;
  });

  const y = useTransform(angleResult, (angle) => {
    const rad = (angle - 90) * (Math.PI / 180);
    // Vertical centering will be handled by translate-y-1/2 on the motion div
    return radius * Math.sin(rad);
  });

  // Perspective-aware scale and Z-depth
  const scale = useTransform(angleResult, (angle) => {
    const rad = (angle - 90) * (Math.PI / 180);
    const cosVal = Math.cos(rad);
    // Slight perspective shrinkage: smaller at edges, peek at center
    return 0.75 + 0.25 * cosVal;
  });

  const z = useTransform(angleResult, (angle) => {
    const rad = (angle - 90) * (Math.PI / 180);
    // Move forward into screen for depth
    return 100 * Math.cos(rad);
  });

  const opacity = useTransform(angleResult, (angle) => {
    const rad = (angle - 90) * (Math.PI / 180);
    const cosVal = Math.cos(rad);
    // Smoother fade out at the edges
    if (cosVal < 0) return 0;
    return Math.pow(cosVal, 0.8); // Slightly non-linear for "popping" in
  });

  const zIndex = useTransform(angleResult, (angle) => {
    const rad = (angle - 90) * (Math.PI / 180);
    return Math.round(10 + 10 * Math.cos(rad));
  });

  return (
    <motion.div
      style={{ 
        x, 
        y, 
        z,
        scale, 
        opacity,
        zIndex,
        perspective: 1000,
        position: "absolute",
        // Centers the card relative to the orbit path (x, y)
        translateX: "-50%",
        translateY: "-50%"
      }}
      className="group"
    >
      <div className="relative w-28 h-40 md:w-[160px] md:h-[220px] rounded-[1.25rem] md:rounded-[2.5rem] overflow-hidden 
                    border-[4px] md:border-[6px] border-white shadow-[0_25px_60px_rgba(0,0,0,0.1)] bg-white
                    hover:scale-110 hover:shadow-[0_45px_100px_rgba(0,0,0,0.15)] transition-all duration-700 ease-[0.16,1,0.3,1] will-change-transform"
      >
        <Image
          src={src}
          alt="HPL Environment"
          fill
          sizes="(max-width: 768px) 112px, 160px"
          className="object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700 ease-out"
        />
        {/* Soft high-end blend: Multi-stage gradient from white to transparent to create a seamless fade into border */}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-700" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white to-transparent z-10" />
      </div>
    </motion.div>
  );
};

export const BrandCarousel = () => {
  const { isIntroDone } = useNavbarLogoRef();
  const [mounted, setMounted] = React.useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  React.useEffect(() => {
    setMounted(true);
  }, []);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 30,
    mass: 1,
  });

  const time = useTime();
  
  // Left: Clockwise 
  const leftRotation = useTransform([time, smoothProgress], (latest) => {
    const [t, p] = latest as [number, number];
    return (t * 0.008) + (p * 540); 
  });

  // Right: Counter-clockwise
  const rightRotation = useTransform([time, smoothProgress], (latest) => {
    const [t, p] = latest as [number, number];
    return -((t * 0.008) + (p * 540));
  });

  // Adjusted radius for better clearing and perfect symmetry
  const [radius, setRadius] = React.useState(240); 

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setRadius(120); 
      } else if (window.innerWidth < 1280) {
        setRadius(200); 
      } else {
        setRadius(240); 
      }
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section 
      id="brands"
      ref={containerRef}
      className="py-32 h-[800px] md:h-[1000px] relative overflow-hidden flex items-center justify-center bg-[#EDEDED] snap-start"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(15,118,110,0.03)_0%,transparent_80%)]" />

      {/* Left Sphere - Centered at Left Edge */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-0 z-10">
        {mounted && [0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <OrbitCard 
            key={`left-${i}`}
            src={images[i]} 
            index={i} 
            total={8} 
            rotation={leftRotation} 
            side="left"
            radius={radius}
          />
        ))}
      </div>

      {/* Right Sphere - Centered at Right Edge */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 z-10">
        {mounted && [0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <OrbitCard 
            key={`right-${i}`}
            src={images[(i + 4) % 8]} 
            index={i} 
            total={8} 
            rotation={rightRotation} 
            side="right"
            radius={radius}
          />
        ))}
      </div>
      
      {/* Central Content - Text sizes synced with Hero section */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={isIntroDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        whileInView={isIntroDone ? { opacity: 1, y: 0 } : {}}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-20 text-center px-10 max-w-xl md:max-w-3xl bg-[#EDEDED]/50 md:bg-transparent backdrop-blur-xl md:backdrop-blur-none py-16 rounded-[4rem] pointer-events-none"
      >
        <TypewriterHeading 
          as="h3"
          className="text-4xl md:text-6xl lg:text-[64px] font-bold tracking-tight mb-8 text-slate-900 leading-[1.1]"
          segments={[
            { text: "Integrated Pharma", br: true },
            { text: "Logistics Ecosystem" }
          ]}
        />
        <p className="text-slate-500 text-lg leading-relaxed tracking-tight font-subtext max-w-lg md:max-w-2xl mx-auto mb-12">
          Redefining supply chain standards with precision temperature management 
          and end-to-end visibility.
        </p>
        
        <div className="flex items-center justify-center gap-6 mt-12">
          <div className="w-16 h-px bg-pharma-teal/20" />
          <div className="flex flex-col items-center">
            <span className="text-[11px] font-bold text-pharma-teal/60 uppercase tracking-[0.6em] font-subtext">Premium Infrastructure</span>
            <span className="text-[9px] text-slate-400 uppercase tracking-[0.4em] mt-1 font-subtext">GDP Certified Network</span>
          </div>
          <div className="w-16 h-px bg-pharma-teal/20" />
        </div>
      </motion.div>

      {/* Edge Fades */}
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#EDEDED] to-transparent z-15 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#EDEDED] to-transparent z-15 pointer-events-none" />
    </section>
  );
};
