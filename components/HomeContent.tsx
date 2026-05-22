"use client";

import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

const TestimonialsCarousel = dynamic(() => import("@/components/TestimonialsCarousel"), { ssr: false });
const BrandCarousel = dynamic(() => import("@/components/BrandCarousel"), { ssr: false });
const HeroNetworkMap = dynamic(() => import("@/components/HeroNetworkMap"), { ssr: false });
const TeamSection = dynamic(() => import("@/components/TeamSection"), { ssr: false });
const BrandConveyor = dynamic(() => import("@/components/BrandConveyor"), { ssr: false });

import { SEOContentSection } from "@/components/SEOContentSection";
import { FAQSection } from "@/components/FAQSection";

import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe,
  Warehouse,
  Truck,
  BarChart3,
  CheckCircle2,
  Package
} from "lucide-react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";
import { TypewriterHeading } from "@/components/TypewriterHeading";
import { CoreSolutionCard } from "@/components/CoreSolutionCard";
import { useNavbarLogoRef } from "@/contexts/NavbarLogoRef";

// --- Static Data ---

const SERVICES_DATA = [
  {
    title: "C&F Agency",
    desc: "We store, manage, and bill stock on behalf of pharma manufacturers. Your inventory, our warehouse, ERP-tracked.",
    image: "/infographics/cf-agency.png",
    icon: Warehouse,
    accentColor: "var(--color-pharma-teal)",
    accentBg: "rgba(15, 118, 110, 0.1)",
    altText: "C&F agency warehouse and inventory management for pharma manufacturers in Indore, Madhya Pradesh",
  },
  {
    title: "Super Stockist",
    desc: "HPL buys and holds stock directly, then distributes to sub-stockists and chemists across 12+ districts of Madhya Pradesh.",
    image: "/infographics/super-stockist.png",
    icon: Truck,
    accentColor: "var(--color-blue-500)",
    accentBg: "rgba(59, 130, 246, 0.1)",
    altText: "Pharma super stockist distribution network across 12+ districts of Madhya Pradesh",
  },
  {
    title: "Consignee Agent",
    desc: "We act as the manufacturer's local representative — receiving goods, managing documentation, and coordinating dispatch to buyers in MP.",
    image: "/infographics/consignee-agent.png",
    icon: ShieldCheck,
    accentColor: "var(--color-amber-500)",
    accentBg: "rgba(245, 158, 11, 0.1)",
    altText: "Consignee agent services — receiving and dispatching pharmaceutical products across Central India",
  },
  {
    title: "Hindustan Drug House",
    desc: "HPL's own distribution brand — directly supplying chemists and pharmacies in Indore's Dawa Bazaar and surrounding areas.",
    image: "/infographics/drug-house.png",
    icon: Zap,
    accentColor: "var(--color-rose-500)",
    accentBg: "rgba(244, 63, 94, 0.1)",
    altText: "Hindustan Drug House direct pharma supply to chemists in Dawa Bazaar, Indore",
  },
];

const cardVariantsLeft: Variants = {
  hidden: { opacity: 0, x: -40, rotate: -8, y: 40 },
  visible: {
    opacity: 1, x: 0, rotate: -1.5, y: 16,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const cardVariantsCenter: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 40 },
  visible: {
    opacity: 1, scale: 1, y: -16,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const cardVariantsRight: Variants = {
  hidden: { opacity: 0, x: 40, rotate: 8, y: 40 },
  visible: {
    opacity: 1, x: 0, rotate: 1.5, y: 16,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemPop: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      mass: 0.8
    }
  }
};

const itemSlideUp: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

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

const floatingVariant: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  },
  visible: (custom?: { isIntroDone?: boolean; delay?: number }) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
      delay: (custom?.isIntroDone ?? true) ? (custom?.delay || 0) : 0
    }
  }),
  animate: (custom?: { isIntroDone?: boolean; delay?: number }) => ({
    y: (custom?.isIntroDone ?? true) ? [0, -15, 0] : 0,
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut",
      delay: (custom?.delay || 0) + 1
    }
  })
};

const staggerContainer: Variants = {
  hidden: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1]
    }
  },
  visible: (isIntroDone: boolean = true) => ({
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: isIntroDone ? 0.2 : 0
    }
  })
};

const sectionSubtitleFade: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

export function HomeContent() {
  const { isIntroDone } = useNavbarLogoRef();

  // Sections refs for re-triggering animations
  const heroRef = React.useRef(null);
  const solutionsRef = React.useRef(null);
  const workflowRef = React.useRef(null);

  const isHeroInView = useInView(heroRef, { amount: 0.3, once: false });
  const isSolutionsInView = useInView(solutionsRef, { amount: 0.1, once: true });
  const isWorkflowInView = useInView(workflowRef, { amount: 0.1, once: true });

  // Mouse parallax for hero stat cards
  const mouseX = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const p1X = useTransform(springX, [-700, 700], [14, -14]);
  const p2X = useTransform(springX, [-700, 700], [8, -8]);
  const p3X = useTransform(springX, [-700, 700], [-12, 12]);
  const p4X = useTransform(springX, [-700, 700], [-7, 7]);

  const handleHeroMouseMove = React.useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
  }, [mouseX]);

  const handleHeroMouseLeave = React.useCallback(() => {
    mouseX.set(0);
  }, [mouseX]);

  return (
    <div className="relative flex flex-col w-full min-h-screen bg-background pt-24 pb-12">

      <section
        id="hero"
        ref={heroRef}
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={handleHeroMouseLeave}
        className="relative min-h-[85vh] flex flex-col items-center justify-center pt-6 pb-6 px-4 overflow-hidden snap-start"
        aria-label="Introduction Section"
      >
        {/* Hero distribution network map */}
        <HeroNetworkMap isActive={isIntroDone && isHeroInView} />

        {/* Floating Cards Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <motion.div
            variants={floatingVariant}
            custom={{ delay: 0.8, isIntroDone }}
            initial="hidden"
            animate={isIntroDone && isHeroInView ? ["animate", "visible"] : "hidden"}
            style={{ x: p1X }}
            className="absolute top-24 left-[8%] hidden lg:flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-full bg-pharma-teal/10 flex items-center justify-center text-pharma-teal shadow-[0_0_20px_rgba(15,118,110,0.1)]"><Globe size={18} /></div>
            <div><p className="text-[13px] font-bold text-slate-900 leading-tight">500+</p><p className="text-[11px] text-slate-500 font-subtext uppercase tracking-wider">Distributors</p></div>
          </motion.div>

          <motion.div
            variants={floatingVariant}
            custom={{ delay: 1.2, isIntroDone }}
            initial="hidden"
            animate={isIntroDone && isHeroInView ? ["animate", "visible"] : "hidden"}
            style={{ x: p2X }}
            className="absolute bottom-40 left-[10%] hidden md:flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.1)]"><ShieldCheck size={18} /></div>
            <div><p className="text-[13px] font-bold text-slate-900 leading-tight">GST Compliant</p><p className="text-[11px] text-slate-500 font-subtext uppercase tracking-wider">Secure</p></div>
          </motion.div>

          <motion.div
            variants={floatingVariant}
            custom={{ delay: 1, isIntroDone }}
            initial="hidden"
            animate={isIntroDone && isHeroInView ? ["animate", "visible"] : "hidden"}
            style={{ x: p3X }}
            className="absolute top-28 right-[8%] hidden lg:flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-full bg-amber-400/10 flex items-center justify-center text-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.1)]"><Warehouse size={18} /></div>
            <div><p className="text-[13px] font-bold text-slate-900 leading-tight">15+ Years</p><p className="text-[11px] text-slate-500 font-subtext uppercase tracking-wider">Experience</p></div>
          </motion.div>

          <motion.div
            variants={floatingVariant}
            custom={{ delay: 1.4, isIntroDone }}
            initial="hidden"
            animate={isIntroDone && isHeroInView ? ["animate", "visible"] : "hidden"}
            style={{ x: p4X }}
            className="absolute bottom-32 right-[12%] hidden md:flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500 shadow-[0_20px_40px_rgba(244,63,94,0.1)]"><Truck size={18} /></div>
            <div><p className="text-[13px] font-bold text-slate-900 leading-tight">60+ Clients</p><p className="text-[11px] text-slate-500 font-subtext uppercase tracking-wider">Pharma Brands</p></div>
          </motion.div>
        </div>

        <motion.div
          variants={staggerContainer}
          custom={isIntroDone}
          initial="hidden"
          animate={isIntroDone && isHeroInView ? "visible" : "hidden"}
          className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto mt-[-12vh]"
        >
          <motion.div
            variants={itemPop}
            className="relative mb-10"
            aria-hidden="true"
          >
            <div className="absolute inset-0 bg-pharma-teal/20 blur-[30px] rounded-full animate-pulse" />
            <div className="relative w-20 h-20 bg-gradient-to-br from-pharma-teal to-pharma-teal-dark rounded-[20px] flex items-center justify-center text-white shadow-[0_20px_40px_rgba(15,118,110,0.3)]">
              <Warehouse size={32} />
            </div>
          </motion.div>

          <motion.div variants={itemSlideUp}>
            <TypewriterHeading
              as="h1"
              className="text-3xl sm:text-4xl md:text-6xl lg:text-[64px] font-bold text-slate-900 tracking-tight leading-[1.05] mb-6"
              segments={[
                { text: "Central India's Trusted", br: true },
                { text: "C&F Agent", className: "text-pharma-teal" },
                { text: " & Pharma Partner" }
              ]}
              once={false}
            />
          </motion.div>

          <motion.p
            variants={itemSlideUp}
            className="text-base md:text-lg text-slate-500 mb-10 max-w-2xl leading-relaxed font-subtext px-4"
          >
            Hindustan Pharma Logistics serves 60+ pharma manufacturers as a C&F agent, super stockist, consignee agent, and retail distributor — covering 12+ districts across Madhya Pradesh.
          </motion.p>

          <motion.div variants={buttonZoom}>
            <Link
              href="/contact"
              aria-label="Contact us to partner with Hindustan Pharma Logistics"
              className="group h-12 px-8 bg-gradient-to-r from-pharma-teal to-pharma-teal-dark text-white rounded-[10px] font-medium text-[15px] flex items-center justify-center hover:opacity-90 shadow-[0_8px_24px_rgba(15,118,110,0.3)] transition-all"
            >
              Partner With Us
              <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <section id="brands">
        <BrandCarousel />
      </section>

      <BrandConveyor />

      {/* SERVICES SECTION */}
      <section
        id="solutions"
        ref={solutionsRef}
        className="pt-12 pb-32 flex flex-col items-center px-4 md:px-12 relative overflow-hidden bg-background snap-start"
        aria-label="Core Solutions"
      >
        {/* Decorative Background Elements */}
        <div className="absolute top-40 right-[-5%] w-[500px] h-[500px] bg-pharma-teal/5 blur-[60px] rounded-full pointer-events-none will-change-[filter,opacity]" aria-hidden="true" />
        <div className="absolute bottom-20 left-[-5%] w-[400px] h-[400px] bg-blue-500/5 blur-[50px] rounded-full pointer-events-none will-change-[filter,opacity]" aria-hidden="true" />

        {/* Large Background Text Watermark - Restored */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isSolutionsInView ? { opacity: 0.06, scale: 1 } : { opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0"
          aria-hidden="true"
        >
          <span className="text-[120px] md:text-[240px] font-bold text-pharma-teal tracking-tighter mix-blend-multiply opacity-15">SOLUTIONS</span>
        </motion.div>

        {/* Framing Network Paths SVG - Restored and Improved */}
        <div className="absolute inset-x-0 top-0 bottom-0 pointer-events-none z-0 overflow-hidden opacity-[0.4]" aria-hidden="true">
          <svg width="100%" height="100%" viewBox="0 0 1440 800" preserveAspectRatio="none" className="w-full h-full">
            {/* Main horizontal flow lines */}
            {[150, 400, 650].map((y, i) => (
              <motion.path
                key={`path-${i}`}
                d={`M 50 ${y} L 1390 ${y}`}
                stroke="var(--color-pharma-teal)"
                strokeWidth={1}
                strokeDasharray="4 8"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isSolutionsInView ? { pathLength: 1, opacity: 0.15 } : { pathLength: 0 }}
                transition={{ duration: 2, delay: i * 0.3 }}
              />
            ))}

            {/* Flowing particles */}
            {[150, 400, 650].map((y, i) => (
              <React.Fragment key={`group-${i}`}>
                <motion.circle
                  r={2}
                  fill="var(--color-pharma-teal)"
                  initial={{ cx: 50, cy: y, opacity: 0 }}
                  animate={isSolutionsInView ? { cx: [50, 1390], opacity: [0, 1, 0] } : {}}
                  transition={{ duration: 4, delay: i * 1, repeat: Infinity, ease: "linear" }}
                />
                <motion.circle
                  r={1.5}
                  fill="#3B82F6"
                  initial={{ cx: 50, cy: y, opacity: 0 }}
                  animate={isSolutionsInView ? { cx: [50, 1390], opacity: [0, 0.8, 0] } : {}}
                  transition={{ duration: 4, delay: i * 1 + 2, repeat: Infinity, ease: "linear" }}
                />
              </React.Fragment>
            ))}
          </svg>
        </div>

        {/* Subtly Animated Background Icons - Restored & Optimized */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
          <motion.div
            initial={{ opacity: 0, scale: 0.6, y: 40, rotate: -15 }}
            animate={isSolutionsInView ? { opacity: 0.08, scale: 1, y: 0, rotate: -10 } : { opacity: 0 }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="absolute top-[10%] left-[8%]"
          >
            <Warehouse size={280} className="text-pharma-teal" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.6, y: -40, rotate: 15 }}
            animate={isSolutionsInView ? { opacity: 0.06, scale: 1, y: 0, rotate: 12 } : { opacity: 0 }}
            transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="absolute bottom-[15%] right-[5%]"
          >
            <Truck size={240} className="text-blue-500" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.6, x: -40 }}
            animate={isSolutionsInView ? { opacity: 0.06, scale: 1, x: 0, rotate: -5 } : { opacity: 0 }}
            transition={{ duration: 2.0, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
            className="absolute bottom-[10%] left-[12%]"
          >
            <ShieldCheck size={180} className="text-amber-500" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.6, x: 40 }}
            animate={isSolutionsInView ? { opacity: 0.05, scale: 1, x: 0, rotate: 8 } : { opacity: 0 }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
            className="absolute top-[35%] right-[12%]"
          >
            <Package size={220} className="text-rose-500" />
          </motion.div>
        </div>

        <motion.div
          variants={staggerContainer}
          custom={isIntroDone}
          initial="hidden"
          animate={isSolutionsInView ? "visible" : "hidden"}
          className="flex flex-col items-center text-center w-full relative z-10"
        >
          <motion.h2
            variants={sectionSubtitleFade}
            className="text-[12px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4 font-subtext"
          >
            Core Solutions
          </motion.h2>
          <motion.div variants={itemSlideUp}>
            <TypewriterHeading
              text="Four Ways HPL Serves Your Business"
              className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 text-center max-w-2xl tracking-tight"
            />
          </motion.div>
          <motion.p
            variants={sectionSubtitleFade}
            className="text-slate-600 text-center max-w-2xl md:max-w-3xl mb-14 text-[16px] leading-relaxed font-subtext px-4"
          >
            C&F agency, super stockist, consignee agent, and direct distribution — all from Indore&apos;s Dawa Bazaar.
          </motion.p>
        </motion.div>



        <motion.div
          variants={staggerContainer}
          custom={isIntroDone}
          initial="hidden"
          animate={isSolutionsInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl w-full z-10 relative"
        >
          {SERVICES_DATA.map((service, i) => (
            <CoreSolutionCard
              key={i}
              title={service.title}
              description={service.desc}
              image={service.image}
              icon={service.icon}
              accentColor={service.accentColor}
              accentBg={service.accentBg}
              altText={service.altText}
              index={i}
            />
          ))}
        </motion.div>
      </section>

      {/* WORKFLOW (HOW IT WORKS) */}
      <section
        id="workflow"
        ref={workflowRef}
        className="pt-12 pb-24 flex flex-col items-center px-4 overflow-hidden relative bg-background snap-start scroll-mt-24"
        aria-label="Process Workflow"
      >
        <motion.div
          variants={staggerContainer}
          custom={isIntroDone}
          initial="hidden"
          animate={isWorkflowInView ? "visible" : "hidden"}
          className="flex flex-col items-center text-center w-full mb-10 px-4"
        >
          <motion.h2 variants={itemSlideUp} className="text-[12px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-3 font-subtext">How It Works</motion.h2>
          <motion.div variants={itemSlideUp} className="w-full">
            <TypewriterHeading
              text="From Manufacturer to Market"
              className="text-2xl md:text-4xl font-bold text-slate-900 mb-0 text-center tracking-tight"
            />
          </motion.div>
        </motion.div>

        {/* Ambient Glows Layer (Replaces Dot Grid) */}
        <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden" aria-hidden="true">
          <div className="absolute top-[10%] left-[-5%] w-[400px] h-[400px] bg-pharma-teal/5 blur-[100px] rounded-full" />
          <div className="absolute bottom-[10%] right-[-5%] w-[500px] h-[500px] bg-blue-400/5 blur-[120px] rounded-full" />
        </div>

        {/* Decorative Background Elements (REFINED) - Animate on scroll */}
        <div className="absolute inset-x-0 top-[48%] translate-y-[-50%] hidden md:flex justify-between items-center px-[12%] opacity-10 pointer-events-none z-0">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={isWorkflowInView ? { opacity: 0.1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-[220px] font-bold text-pharma-teal select-none font-sans"
          >
            01
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isIntroDone && isWorkflowInView ? { opacity: 0.1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 1, delay: 1 }}
            className="text-[220px] font-bold text-pharma-teal select-none font-sans"
          >
            02
          </motion.span>
          <motion.span
            initial={{ opacity: 0, x: 20 }}
            animate={isIntroDone && isWorkflowInView ? { opacity: 0.1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="text-[220px] font-bold text-pharma-teal select-none font-sans"
          >
            03
          </motion.span>
        </div>

        {/* Floating Workflow Icons (NEW) - Adds high-fidelity detail */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <motion.div
            variants={floatingVariant}
            custom={{ delay: 1.5, isIntroDone }}
            initial="hidden"
            animate={isIntroDone && isWorkflowInView ? ["animate", "visible"] : "hidden"}
            className="absolute top-[20%] left-[15%] opacity-[0.08] text-pharma-teal hidden lg:block"
          >
            <BarChart3 size={40} strokeWidth={1} />
          </motion.div>
          <motion.div
            variants={floatingVariant}
            custom={{ delay: 2, isIntroDone }}
            initial="hidden"
            animate={isIntroDone && isWorkflowInView ? ["animate", "visible"] : "hidden"}
            className="absolute bottom-[25%] right-[10%] opacity-[0.08] text-pharma-teal hidden lg:block"
          >
            <CheckCircle2 size={48} strokeWidth={1} />
          </motion.div>
        </div>

        {/* SVG Connecting Path (REFINED) - Animated 'Flow' gradient */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden hidden md:block">
          <svg className="w-full h-full" viewBox="0 0 1440 600" preserveAspectRatio="none">
            <defs>
              <linearGradient id="flow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="50%" stopColor="var(--color-pharma-teal)" stopOpacity="0.4" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
            {/* Base faint path */}
            <path d="M 200 400 Q 720 150 1240 400" fill="none" stroke="var(--color-pharma-teal)" strokeWidth="1" strokeDasharray="8,10" className="opacity-10" />
            {/* Animated pulse path */}
            <motion.path
              d="M 200 400 Q 720 150 1240 400"
              fill="none"
              stroke="url(#flow-gradient)"
              strokeWidth="3"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isIntroDone && isWorkflowInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 2.5, ease: "easeInOut", delay: 0.5 }}
            />
          </svg>
        </div>

        <motion.div
          variants={staggerContainer}
          custom={isIntroDone}
          initial="hidden"
          animate={isWorkflowInView ? "visible" : "hidden"}
          className="flex flex-col md:flex-row items-stretch justify-center gap-4 max-w-6xl w-full relative z-10 mt-10 px-4"
        >
          {/* Left Card */}
          <motion.div
            variants={cardVariantsLeft}
            whileHover={{ y: -10, rotate: 0, scale: 1.03, zIndex: 40 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            className="relative flex-1 w-full md:max-w-[340px] p-8 bg-white/80 backdrop-blur-sm rounded-[24px] border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.03)] cursor-default overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-full h-[6px] bg-blue-500" />
            <motion.div variants={itemPop} className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-6 text-blue-600 shadow-sm border border-blue-100/50">
              <Truck size={24} />
            </motion.div>
            <motion.h4 variants={itemSlideUp} className="font-bold text-slate-900 text-lg mb-2">1. Manufacturer Ships</motion.h4>
            <motion.p variants={itemSlideUp} className="text-[15px] text-slate-600 leading-relaxed font-subtext">The manufacturer dispatches stock to HPL&apos;s warehouse in Khajrana, Indore — with all documentation and challans in order.</motion.p>
          </motion.div>

          {/* Center Card */}
          <motion.div
            variants={cardVariantsCenter}
            whileHover={{ y: -26, scale: 1.05, zIndex: 40 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            className="relative flex-1 w-full md:max-w-[350px] p-8 bg-white rounded-[24px] border border-slate-200/80 shadow-[0_20px_50px_rgba(0,0,0,0.08)] cursor-default overflow-hidden group z-20"
          >
            <div className="absolute top-0 left-0 w-full h-[6px] bg-pharma-teal" />
            <motion.div variants={itemPop} className="w-14 h-14 rounded-xl bg-pharma-teal/10 flex items-center justify-center mb-6 text-pharma-teal shadow-sm border border-pharma-teal/20">
              <Warehouse size={28} />
            </motion.div>
            <motion.h4 variants={itemSlideUp} className="font-bold text-slate-900 text-xl mb-3">2. We Store & Manage</motion.h4>
            <motion.p variants={itemSlideUp} className="text-[15px] text-slate-600 leading-relaxed font-subtext">Stock is received, batch-verified, and logged in ERP Software. Expiry dates and inventory levels tracked continuously.</motion.p>
          </motion.div>

          {/* Right Card */}
          <motion.div
            variants={cardVariantsRight}
            whileHover={{ y: -10, rotate: 0, scale: 1.03, zIndex: 40 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            className="relative flex-1 w-full md:max-w-[340px] p-8 bg-white/80 backdrop-blur-sm rounded-[24px] border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.03)] cursor-default overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-full h-[6px] bg-amber-500" />
            <motion.div variants={itemPop} className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center mb-6 text-amber-500 shadow-sm border border-amber-100/50">
              <Globe size={24} />
            </motion.div>
            <motion.h4 variants={itemSlideUp} className="font-bold text-slate-900 text-lg mb-2">3. We Dispatch</motion.h4>
            <motion.p variants={itemSlideUp} className="text-[15px] text-slate-600 leading-relaxed font-subtext">GST-billed dispatches go out to sub-stockists, chemists, and distributors across 12+ districts of Madhya Pradesh.</motion.p>
          </motion.div>
        </motion.div>
      </section>

      {/* OUR TEAM */}
      <TeamSection />

      {/* WORDS OF APPRECIATION (HIGH-FIDELITY REVIEWS) */}
      <section id="testimonials">
        <TestimonialsCarousel />
      </section>

      {/* SEO CONTENT — Server-rendered text for Google indexing */}
      <SEOContentSection />

      {/* FAQ ACCORDION — Matches FAQPage JSON-LD schema */}
      <FAQSection />

    </div>
  );
}
