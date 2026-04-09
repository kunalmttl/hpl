"use client";

import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import { 
  motion, 
  AnimatePresence, 
  useInView, 
  useAnimationControls,
  Variants 
} from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote, ShieldCheck, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { useNavbarLogoRef } from "@/contexts/NavbarLogoRef";

/**
 * 🏥 Pharmaceutical Testimonials Data
 */
const TESTIMONIALS = [
  {
    initials: "RM",
    name: "Rajesh Mehta",
    role: "Regional Manager",
    company: "Sun Pharmaceutical Industries",
    quote: "HPL's super stockist model has been instrumental in maintaining uninterrupted supply across Central India. Their compliance standards and on-time dispatch record is second to none in Madhya Pradesh.",
    rating: 5,
  },
  {
    initials: "AK",
    name: "Anita Kulkarni",
    role: "Supply Chain Head",
    company: "Cipla Limited",
    quote: "Working with HPL as our C&F agent in Indore has been a seamless experience. Their Marg-integrated dispatch system and real-time stock visibility has removed a lot of manual overhead from our regional ops.",
    rating: 5,
  },
  {
    initials: "VP",
    name: "Vinod Patel",
    role: "Distribution Director",
    company: "Alkem Laboratories",
    quote: "HPL's Hindustan Drug House arm ensures last-mile reliability to chemists across the Dawa Bazaar network. Rarely do we see a distributor that combines this level of coverage with clean ledger discipline.",
    rating: 5,
  },
];

type Testimonial = typeof TESTIMONIALS[0];
type Phase = "hidden" | "envelope-up" | "card-rising" | "carousel";

const RATING_ARRAY = Array(5).fill(0);

const buttonZoom: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 150,
      damping: 15,
      mass: 0.8
    }
  }
};

const trustBadgeVariants: Variants = {
  quoteLeft: {
    y: [0, -20, 0],
    rotate: [-15, -10, -15],
    transition: { duration: 8, repeat: Infinity }
  },
  quoteRight: {
    y: [0, 20, 0],
    rotate: [15, 20, 15],
    transition: { duration: 10, repeat: Infinity, delay: 1 }
  },
  shield: {
    scale: [1, 1.1, 1],
    opacity: [0.1, 0.2, 0.1],
    transition: { duration: 6, repeat: Infinity }
  },
  check: {
    scale: [1.1, 1, 1.1],
    opacity: [0.2, 0.1, 0.2],
    transition: { duration: 7, repeat: Infinity, delay: 2 }
  }
};

const headingContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const headingItemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.8 } }
};

export default function TestimonialsCarousel() {
  const { isIntroDone } = useNavbarLogoRef();
  const [phase, setPhase] = useState<Phase>("hidden");
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, amount: 0.4 });

  // Animation Controls for imperative flow
  const envelopeControls = useAnimationControls();
  const cardControls = useAnimationControls();
  const layersControls = useAnimationControls();
  
  // Handle Phase Transitions
  useEffect(() => {
    if (isIntroDone && inView && phase === "hidden") {
      runIntroSequence();
    }
  }, [isIntroDone, inView, phase]);


  const runIntroSequence = async () => {
    // 1. Envelope Up
    setPhase("envelope-up");
    await envelopeControls.start({
      y: 0,
      opacity: 1,
      scale: 0.65,
      transition: { type: "spring", stiffness: 80, damping: 18, duration: 0.7 }
    });

    // 2. Card Rising
    setPhase("card-rising");
    
    // Animate Card up OUT of envelope
    cardControls.start({
      y: -110,
      opacity: 1,
      rotate: -3,
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }
    });

    // Simultaneously SCALE EVERYTHING back to original size (1.0)
    // and then drop/fade the envelope away
    envelopeControls.start({
      scale: 1,
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }
    });

    // 2.3 Fade out only the envelope layers
    layersControls.start({
      opacity: 0,
      transition: { duration: 0.4 }
    });

    await envelopeControls.start({
      y: 80,
      transition: { duration: 0.5, ease: "easeIn", delay: 0.25 }
    });

    // 3. Carousel Phase — card stays at full opacity so fan card can
    // pick up from the exact same visual position with no gap
    setPhase("carousel");
  };

  // Auto-advance logic
  useEffect(() => {
    if (phase !== "carousel") return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [phase, activeIndex]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative w-full py-24 flex flex-col items-center justify-center overflow-hidden bg-background"
      aria-label="Client Testimonials"
    >
      {/* 🏙️ High-Fidelity Background Framing (NEW) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none" aria-hidden="true">
        {/* Large Centered Watermark */}


        {/* Ambient Corner Glows */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-pharma-teal/5 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full translate-x-1/2 translate-y-1/2" />

        {/* Floating Trust Network Elements */}
        {phase === "carousel" && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {/* Animated rays emanating from the center */}
            <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full" viewBox="0 0 1440 800" preserveAspectRatio="none">
              <defs>
                <radialGradient id="trust-ray" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                  <stop offset="0%" stopColor="#0F766E" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="transparent" />
                </radialGradient>
              </defs>
              <g className="opacity-15">
                {[...Array(12)].map((_, i) => (
                  <motion.line
                    key={i}
                    x1="720" y1="400"
                    x2={720 + Math.cos((i * 30) * Math.PI / 180) * 1000}
                    y2={400 + Math.sin((i * 30) * Math.PI / 180) * 1000}
                    stroke="url(#trust-ray)"
                    strokeWidth="1"
                    strokeDasharray="4 12"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 90 + i * 10, repeat: Infinity, ease: "linear" }}
                  />
                ))}
              </g>
            </svg>

            {/* Floating Icons with parallax-style motion */}
            <motion.div 
              className="absolute top-[15%] left-[8%] text-pharma-teal/10 rotate-[-15deg]"
              variants={trustBadgeVariants}
              animate="quoteLeft"
            >
              <Quote size={200} strokeWidth={0.5} />
            </motion.div>
            <motion.div 
              className="absolute bottom-[20%] right-[10%] text-blue-500/10 rotate-[15deg]"
              style={{ scaleX: -1 }}
              variants={trustBadgeVariants}
              animate="quoteRight"
            >
              <Quote size={240} strokeWidth={0.5} />
            </motion.div>

            {/* Smaller floating trust badges */}
            <motion.div 
              className="absolute top-[40%] right-[12%] text-slate-400/20"
              variants={trustBadgeVariants}
              animate="shield"
            >
              <ShieldCheck size={80} />
            </motion.div>
            <motion.div 
              className="absolute bottom-[40%] left-[12%] text-slate-400/20"
              variants={trustBadgeVariants}
              animate="check"
            >
              <CheckCircle2 size={60} />
            </motion.div>
          </motion.div>
        )}
      </div>
      {/* Section Heading */}
      <motion.div 
        variants={headingContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="text-center z-10 mb-6 px-4"
      >
        <motion.h2 
          variants={headingItemVariants}
          className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-3"
        >
          Words of Trust
        </motion.h2>
        <motion.h3 
          variants={headingItemVariants}
          className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 text-center"
        >
          What our partners say
        </motion.h3>
        <motion.p 
          variants={headingItemVariants}
          className="text-slate-500 text-sm text-center max-w-md mb-6 font-subtext mx-auto px-4"
        >
          Trusted by manufacturers, distributors, and chemist networks across Madhya Pradesh.
        </motion.p>
      </motion.div>

      <div 
        className="relative w-full h-[480px] flex items-center justify-center perspective-[1200px] mt-[-50px]"
        role="region"
        aria-roledescription="carousel"
        aria-label="Success Stories Carousel"
      >
        {/* ENVELOPE INTRO UNIT */}
        <AnimatePresence>
          {phase !== "carousel" && (
            <motion.div 
              className="absolute flex items-center justify-center"
              style={{ width: 950, height: 860 }}
              initial={{ y: 120, opacity: 0, scale: 0.6 }}
              animate={envelopeControls}
            >
              {/* Back Layer (Full envelope) */}
              <motion.div 
                className="absolute inset-0 z-0"
                initial={{ opacity: 1 }}
                animate={layersControls}
              >
                <Image 
                  src="/open_envelope_back.png" 
                  alt="" 
                  fill 
                  unoptimized 
                  className="object-contain"
                  aria-hidden="true" 
                />
              </motion.div>

              {/* The Rising Card (Sandwich Center) */}
              <motion.div 
                className="absolute z-10 w-[450px]"
                style={{ top: "auto", bottom: 140 }}
                initial={{ opacity: 1, y: 0, rotate: -3 }}
                animate={cardControls}
              >
                <TestimonialCard data={TESTIMONIALS[activeIndex]} />
              </motion.div>

              {/* Front Layer (Pocket Cover) */}
              <motion.div 
                className="absolute inset-0 z-20 pointer-events-none"
                initial={{ opacity: 1 }}
                animate={layersControls}
              >
                <Image 
                  src="/open_envelope_front.png" 
                  alt="" 
                  fill 
                  unoptimized 
                  className="object-contain"
                  aria-hidden="true" 
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* FAN CAROUSEL UNIT */}
        {phase === "carousel" && (
          <div className="absolute w-full h-full flex items-center justify-center">
            {TESTIMONIALS.map((t, idx) => {
              let offset = idx - activeIndex;
              if (offset > 1) offset -= TESTIMONIALS.length;
              if (offset < -1) offset += TESTIMONIALS.length;
              
              const isActive = offset === 0;

              if (Math.abs(offset) > 1) return null;

              return (
                <motion.div
                  key={idx}
                  // Active card: start at the exact visual position the envelope card
                  // was at (y:100 below container center, rotate:-3) so it continues
                  // seamlessly. Spring physics settle it to y:0.
                  // Ghost cards: fade + slide in normally.
                  initial={isActive 
                    ? { opacity: 1, y: 100, rotate: -3 } 
                    : { opacity: 0, y: -30 }
                  }
                  animate={{
                    x: offset * 300,
                    y: isActive ? 0 : 12,
                    rotate: offset * 10,
                    scale: isActive ? 1.0 : 0.88,
                    opacity: isActive ? 1.0 : 0.5,
                    zIndex: isActive ? 10 : 5,
                  }}
                  transition={{ type: "spring", stiffness: 55, damping: 20 }}
                  className="absolute"
                >
                  <TestimonialCard data={t} />
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Navigation Controls */}
        {phase === "carousel" && (
          <motion.div 
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.2
                }
              }
            }}
            initial="hidden"
            animate="visible"
            className="absolute bottom-[-60px] flex gap-4 z-50"
          >
            <motion.div variants={buttonZoom}>
              <button 
                onClick={handlePrev}
                className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:bg-pharma-teal hover:text-white hover:border-pharma-teal transition-colors shadow-sm"
                aria-label="Previous Testimonial"
              >
                <ChevronLeft size={20} aria-hidden="true" />
              </button>
            </motion.div>
            <motion.div variants={buttonZoom}>
              <button 
                onClick={handleNext}
                className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:bg-pharma-teal hover:text-white hover:border-pharma-teal transition-colors shadow-sm"
                aria-label="Next Testimonial"
              >
                <ChevronRight size={20} aria-hidden="true" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

const TestimonialCard = memo(({ data }: { data: Testimonial }) => {
  return (
    <div className="w-[450px] bg-white rounded-[2.5rem] p-12 shadow-2xl border border-slate-50 flex flex-col items-center text-center">
      {/* 60px Initials Avatar */}
      <div className="w-[60px] h-[60px] rounded-full bg-gradient-to-br from-pharma-teal to-pharma-teal-dark flex items-center justify-center text-white font-bold text-lg shadow-md mb-4 uppercase">
        {data.initials}
      </div>

      <h4 className="font-black text-slate-900 text-lg">{data.name}</h4>
      <p className="font-subtext text-slate-500 text-sm tracking-wide mt-1">
        {data.role} • {data.company}
      </p>

      {/* 5 Amber Stars */}
      <div className="flex text-amber-400 gap-0.5 mt-4" aria-label={`${data.rating} out of 5 stars`}>
        {RATING_ARRAY.map((_, i) => (
          <Star key={i} size={14} fill="currentColor" aria-hidden="true" />
        ))}
      </div>

      <p className="text-slate-600 text-sm leading-relaxed mt-4 italic font-body max-h-[4.5rem] overflow-hidden line-clamp-3">
        "{data.quote}"
      </p>
    </div>
  );
});

TestimonialCard.displayName = "TestimonialCard";
