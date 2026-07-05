"use client";

import React, { useRef } from "react";
import { 
  motion,
  useScroll,
  useSpring,
  useTime, 
  useTransform,
  useInView,
  MotionValue,
} from "framer-motion";
import type { Variants } from "framer-motion";
import Image from "next/image";
import { TypewriterHeading } from "./TypewriterHeading";

// --- Animation Variants (Externalized) ---

const centralContentVariants: Variants = {
  hidden: { 
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1
    }
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const headingFadeUp: Variants = {
  hidden: { y: 60, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
};

const paragraphFadeUp: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1, 
    transition: { 
      duration: 0.8, 
      ease: "easeOut",
      delay: 1.4 
    } 
  }
};

const accentBadgeVariants: Variants = {
  hidden: { scale: 0.9, opacity: 0, y: 10 },
  visible: { 
    scale: 1, 
    opacity: 1, 
    y: 0,
    transition: { 
      type: "spring", 
      stiffness: 100,
      delay: 1.6 
    } 
  }
};

const images = [
  "/carousel/1.webp",
  "/carousel/2.webp",
  "/carousel/3.webp",
  "/carousel/4.webp",
  "/carousel/5.webp",
  "/carousel/6.webp",
  "/carousel/7.webp",
  "/carousel/8.webp",
  "/carousel/9.webp",
  "/carousel/10.webp",
  "/carousel/11.webp",
  "/carousel/12.webp",
];

const OrbitCard = ({ 
  src, 
  index, 
  total, 
  rotation, 
  side = "left", 
  radius = 450,
  isMobile = false
}: { 
  src: string, 
  index: number, 
  total: number, 
  rotation: MotionValue<number>, 
  side?: "left" | "right", 
  radius?: number,
  isMobile?: boolean
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
    // On mobile, use a slightly tighter power (1.8) to focus on the 'hero' image 
    // while maintaining the smooth fade preferred in the right carousel.
    return Math.pow(cosVal, isMobile ? 1.8 : 0.8); 
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
      <div className="relative w-24 h-32 md:w-[160px] md:h-[220px] rounded-[1rem] md:rounded-[2.5rem] overflow-hidden 
                    border-[3px] md:border-[4px] border-slate-700/10 shadow-[0_30px_70px_rgba(0,0,0,0.2)] bg-slate-950
                    group-hover:border-pharma-teal/30 hover:scale-110 hover:shadow-[0_50px_120px_rgba(0,0,0,0.25)] transition-all duration-700 ease-[0.16,1,0.3,1] will-change-transform"
      >
        <Image
          src={src}
          alt="Hindustan Pharma Logistics warehouse and operations facility in Indore, Madhya Pradesh"
          fill
          loading="lazy"
          sizes="(max-width: 768px) 112px, 160px"
          className="object-cover grayscale-[0.1] group-hover:grayscale-0 opacity-80 group-hover:opacity-100 transition-all duration-700 ease-out"
        />
        {/* Soft high-end blend: Deep vignette instead of light wash */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-0 transition-opacity duration-700" />
      </div>
    </motion.div>
  );
};

export const BrandCarousel = () => {
  const [mounted, setMounted] = React.useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "200px" });
  
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
        setRadius(200); 
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
      className="pt-12 pb-20 h-[650px] md:h-[800px] relative overflow-hidden flex items-center justify-center bg-background snap-start"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(15,118,110,0.03)_0%,transparent_80%)]" />

      {/* Left Sphere - Pushed far off-edge on mobile to stay clear of text */}
      <div className="absolute left-[-150px] md:left-0 top-1/2 -translate-y-1/2 w-0 h-0 z-10">
        {mounted && isInView && [0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <OrbitCard 
            key={`left-${i}`}
            src={images[i]} 
            index={i} 
            total={8} 
            rotation={leftRotation} 
            side="left"
            radius={radius}
            isMobile={radius <= 200}
          />
        ))}
      </div>

      {/* Right Sphere - Pushed far off-edge on mobile to stay clear of text */}
      <div className="absolute right-[-150px] md:right-0 top-1/2 -translate-y-1/2 w-0 h-0 z-10">
        {mounted && isInView && [0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <OrbitCard 
            key={`right-${i}`}
            src={images[(i + 8) % 12]} 
            index={i} 
            total={8} 
            rotation={rightRotation} 
            side="right"
            radius={radius}
            isMobile={radius <= 200}
          />
        ))}
      </div>
      
      {/* Central Content - Blur removed for cleaner mobile aesthetic */}
      <motion.div 
        variants={centralContentVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative z-20 text-center px-8 md:px-10 max-w-[95vw] md:max-w-5xl bg-transparent md:bg-transparent backdrop-blur-none py-4 md:py-16 rounded-none md:rounded-[4rem] pointer-events-none"
      >
        <motion.div variants={headingFadeUp}>
          <TypewriterHeading 
            as="h3"
            className="text-[21px] md:text-5xl lg:text-[56px] font-bold tracking-tight mb-4 md:mb-8 text-slate-900 leading-[1.3] md:leading-[1.1]"
            segments={[
              { text: "Rooted in Indore. Reaching", br: true },
              { text: "ALL", className: "text-pharma-teal" },
              { text: " of Madhya Pradesh." }
            ]}
          />
        </motion.div>
        
        <motion.p 
          variants={paragraphFadeUp}
          className="text-slate-600 md:text-slate-500 text-[14px] md:text-lg leading-relaxed tracking-tight font-subtext max-w-[260px] md:max-w-2xl mx-auto mb-8 md:mb-12 px-4 md:px-0"
        >
          From our base in Khajrana, Indore — HPL manages 
          warehousing, stock movement, and distribution for
          pharma brands. Every batch tracked. Every dispatch 
          GST-billed. Serving chemists and distributors across 
          12+ districts.
        </motion.p>
        
        <motion.div 
          variants={accentBadgeVariants}
          className="flex items-center justify-center gap-4 md:gap-6 mt-8 md:mt-12"
        >
          <div className="w-16 h-px bg-pharma-teal/20" />
          <div className="flex flex-col items-center">
            <span className="text-[11px] font-bold text-pharma-teal/60 uppercase tracking-[0.6em] font-subtext">MARG ERP Managed</span>
            <span className="text-[9px] text-slate-400 uppercase tracking-[0.4em] mt-1 font-subtext">Batch & Expiry Tracked</span>
          </div>
          <div className="w-16 h-px bg-pharma-teal/20" />
        </motion.div>
      </motion.div>

      {/* Edge Fades */}
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[var(--color-background)] to-transparent z-15 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[var(--color-background)] to-transparent z-15 pointer-events-none" />
    </section>
  );
};

export default BrandCarousel;
