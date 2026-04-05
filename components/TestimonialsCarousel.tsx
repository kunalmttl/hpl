"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  motion, 
  AnimatePresence, 
  useInView, 
  useAnimationControls,
  Variants 
} from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useNavbarLogoRef } from "@/contexts/NavbarLogoRef";

/**
 * 🏥 Pharmaceutical Testimonials Data
 */
const testimonials = [
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

type Phase = "hidden" | "envelope-up" | "card-rising" | "carousel";

export default function TestimonialsCarousel() {
  const { isIntroDone } = useNavbarLogoRef();
  const [phase, setPhase] = useState<Phase>("hidden");
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: false, amount: 0.4 });

  // Animation Controls for imperative flow
  const envelopeControls = useAnimationControls();
  const cardControls = useAnimationControls();
  const layersControls = useAnimationControls();
  
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

  // Handle Phase Transitions
  useEffect(() => {
    if (isIntroDone && inView && phase === "hidden") {
      runIntroSequence();
    } else if (!inView && phase !== "hidden") {
      // Reset when scrolling away to allow re-triggering
      setPhase("hidden");
      envelopeControls.set({ y: 120, opacity: 0, scale: 0.6 });
      cardControls.set({ y: 0, opacity: 1, rotate: -3 });
      layersControls.set({ opacity: 1 });
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
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [phase, activeIndex]);

  const handleNext = () => setActiveIndex((prev) => (prev + 1) % testimonials.length);
  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section 
      ref={containerRef}
      className="relative w-full py-24 flex flex-col items-center justify-center overflow-hidden bg-background"
    >
      {/* Section Heading */}
      <motion.div 
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.15,
              delayChildren: 0.1
            }
          }
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-100px" }}
        className="text-center z-10 mb-6 px-4"
      >
        <motion.h2 
          variants={{
            hidden: { y: 20, opacity: 0 },
            visible: { y: 0, opacity: 1, transition: { duration: 0.8 } }
          }}
          className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-3"
        >
          Words of Trust
        </motion.h2>
        <motion.h3 
          variants={{
            hidden: { y: 20, opacity: 0 },
            visible: { y: 0, opacity: 1, transition: { duration: 0.8 } }
          }}
          className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 text-center"
        >
          What our partners say
        </motion.h3>
        <motion.p 
          variants={{
            hidden: { y: 20, opacity: 0 },
            visible: { y: 0, opacity: 1, transition: { duration: 0.8 } }
          }}
          className="text-slate-500 text-sm text-center max-w-md mb-6 font-subtext mx-auto px-4"
        >
          Trusted by manufacturers, distributors, and chemist networks across Madhya Pradesh.
        </motion.p>
      </motion.div>

      <div className="relative w-full h-[480px] flex items-center justify-center perspective-[1200px] mt-[-50px]">
        {/* ENVELOPE INTRO UNIT */}
        <AnimatePresence>
          {phase !== "carousel" && (
            <motion.div 
              className="relative flex items-center justify-center"
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
                  alt="Envelope Back" 
                  fill 
                  unoptimized 
                  className="object-contain" 
                />
              </motion.div>

              {/* The Rising Card (Sandwich Center) */}
              <motion.div 
                className="absolute z-10 w-[450px]"
                style={{ top: "auto", bottom: 140 }}
                initial={{ opacity: 1, y: 0, rotate: -3 }}
                animate={cardControls}
              >
                <TestimonialCard data={testimonials[activeIndex]} />
              </motion.div>

              {/* Front Layer (Pocket Cover) */}
              <motion.div 
                className="absolute inset-0 z-20 pointer-events-none"
                initial={{ opacity: 1 }}
                animate={layersControls}
              >
                <Image 
                  src="/open_envelope_front.png" 
                  alt="Envelope Front" 
                  fill 
                  unoptimized 
                  className="object-contain" 
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* FAN CAROUSEL UNIT */}
        {phase === "carousel" && (
          <div className="relative w-full h-full flex items-center justify-center">
            {testimonials.map((t, idx) => {
              let offset = idx - activeIndex;
              if (offset > 1) offset -= testimonials.length;
              if (offset < -1) offset += testimonials.length;
              
              const isActive = offset === 0;
              const isGhost = Math.abs(offset) === 1;

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
              >
                <ChevronLeft size={20} />
              </button>
            </motion.div>
            <motion.div variants={buttonZoom}>
              <button 
                onClick={handleNext}
                className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:bg-pharma-teal hover:text-white hover:border-pharma-teal transition-colors shadow-sm"
              >
                <ChevronRight size={20} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

function TestimonialCard({ data }: { data: any }) {
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
      <div className="flex text-amber-400 gap-0.5 mt-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={14} fill="currentColor" />
        ))}
      </div>

      <p className="text-slate-600 text-sm leading-relaxed mt-4 italic font-body max-h-[4.5rem] overflow-hidden line-clamp-3">
        "{data.quote}"
      </p>
    </div>
  );
}
