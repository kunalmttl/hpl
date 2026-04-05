"use client";

import React from "react";
import Link from "next/link";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import { motion, AnimatePresence, Variants, useInView, useMotionValue, useTransform, useSpring } from "framer-motion";
import { 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Globe, 
  Warehouse, 
  Truck, 
  BarChart3,
  CheckCircle2,
  ChevronRight,
  Star,
  Package
} from "lucide-react";
import { BrandCarousel } from "@/components/BrandCarousel";
import { TypewriterHeading } from "@/components/TypewriterHeading";
import { CoreSolutionCard } from "@/components/CoreSolutionCard";
import { useNavbarLogoRef } from "@/contexts/NavbarLogoRef";
import { HeroNetworkMap } from "@/components/HeroNetworkMap";
import { TeamSection } from "@/components/TeamSection";

const cardVariantsLeft: Variants = {
  hidden: { opacity: 0, x: -40, rotate: -15, y: 40 },
  visible: { 
    opacity: 1, x: 0, rotate: -6, y: 20,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const cardVariantsCenter: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 0 },
  visible: { 
    opacity: 1, scale: 1, y: -20,
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
  hidden: { opacity: 0, x: 40, rotate: 15, y: 40 },
  visible: { 
    opacity: 1, x: 0, rotate: 6, y: 20,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export default function Home() {
  const { isIntroDone } = useNavbarLogoRef();

  const floatingVariant: Variants = {
    initial: { opacity: 0, scale: 0.8 },
    visible: (delay: number) => ({ 
      opacity: 1, 
      scale: 1,
      transition: { duration: 1, ease: "easeOut" as const, delay: isIntroDone ? delay : 999 }
    }),
    animate: (delay: number) => ({
      y: isIntroDone ? [0, -15, 0] : 0,
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut" as const,
        delay: delay + 1
      }
    })
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: isIntroDone ? 0.2 : 999
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

  const staggerContainer: Variants = {
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
        staggerChildren: 0.2,
        delayChildren: isIntroDone ? 0.2 : 999
      }
    }
  };

  // Sections refs for re-triggering animations
  const heroRef = React.useRef(null);
  const solutionsRef = React.useRef(null);
  const workflowRef = React.useRef(null);
  
  const isHeroInView = useInView(heroRef, { amount: 0.3, once: false });
  const isSolutionsInView = useInView(solutionsRef, { amount: 0.2, once: false });
  const isWorkflowInView = useInView(workflowRef, { amount: 0.2, once: false });

  // Mouse parallax for hero stat cards
  const mouseX = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const p1X = useTransform(springX, [-700, 700], [14, -14]);
  const p2X = useTransform(springX, [-700, 700], [8,  -8]);
  const p3X = useTransform(springX, [-700, 700], [-12, 12]);
  const p4X = useTransform(springX, [-700, 700], [-7,  7]);

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
  };
  const handleHeroMouseLeave = () => mouseX.set(0);

  return (
    <div className="flex flex-col w-full min-h-screen bg-background pt-16 pb-12">
      
      {/* HERO SECTION */}
      <section 
        id="hero" 
        ref={heroRef}
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={handleHeroMouseLeave}
        className="relative min-h-[85vh] flex flex-col items-center justify-center pt-6 pb-6 px-4 overflow-hidden snap-start"
      >
        {/* Hero distribution network map */}
        <HeroNetworkMap isActive={isIntroDone && isHeroInView} />

        {/* Floating Cards Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div 
            variants={floatingVariant} 
            custom={0.8}
            initial="initial"
            animate={isIntroDone && isHeroInView ? ["animate", "visible"] : "initial"}
            style={{ x: p1X }}
            className="absolute top-24 left-[8%] hidden lg:flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-full bg-pharma-teal/10 flex items-center justify-center text-pharma-teal shadow-[0_0_20px_rgba(15,118,110,0.1)]"><Globe size={18}/></div>
            <div><p className="text-[13px] font-bold text-slate-900 leading-tight">500+</p><p className="text-[11px] text-slate-500 font-subtext uppercase tracking-wider">Distributors</p></div>
          </motion.div>
          
          <motion.div 
            variants={floatingVariant} 
            custom={1.2}
            initial="initial"
            animate={isIntroDone && isHeroInView ? ["animate", "visible"] : "initial"}
            style={{ x: p2X }}
            className="absolute bottom-40 left-[10%] hidden md:flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.1)]"><ShieldCheck size={18}/></div>
            <div><p className="text-[13px] font-bold text-slate-900 leading-tight">GST Compliant</p><p className="text-[11px] text-slate-500 font-subtext uppercase tracking-wider">Secure</p></div>
          </motion.div>
          
          <motion.div 
            variants={floatingVariant} 
            custom={1}
            initial="initial"
            animate={isIntroDone && isHeroInView ? ["animate", "visible"] : "initial"}
            style={{ x: p3X }}
            className="absolute top-28 right-[8%] hidden lg:flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-full bg-amber-400/10 flex items-center justify-center text-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.1)]"><Warehouse size={18}/></div>
            <div><p className="text-[13px] font-bold text-slate-900 leading-tight">15+ Years</p><p className="text-[11px] text-slate-500 font-subtext uppercase tracking-wider">Experience</p></div>
          </motion.div>

          <motion.div 
            variants={floatingVariant} 
            custom={1.4}
            initial="initial"
            animate={isIntroDone && isHeroInView ? ["animate", "visible"] : "initial"}
            style={{ x: p4X }}
            className="absolute bottom-32 right-[12%] hidden md:flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.1)]"><Truck size={18}/></div>
            <div><p className="text-[13px] font-bold text-slate-900 leading-tight">60+ Clients</p><p className="text-[11px] text-slate-500 font-subtext uppercase tracking-wider">Pharma Brands</p></div>
          </motion.div>
        </div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate={isIntroDone && isHeroInView ? "visible" : "hidden"}
          className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto mt-[-12vh]"
        >
          <motion.div 
            variants={itemPop}
            className="relative mb-10"
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
                { text: "Pharma Partner", className: "text-pharma-teal" }
              ]}
            />
          </motion.div>
 
          <motion.p 
            variants={itemSlideUp}
            className="text-base md:text-lg text-slate-500 mb-10 max-w-2xl leading-relaxed font-subtext px-4"
          >
            Hindustan Pharam Logistics serves 60+ pharma manufacturers as a C&F agent, super stockist, consignee agent, and retail distributor — covering 12+ districts across Madhya Pradesh.
          </motion.p>
  
          <motion.div variants={buttonZoom}>
            <Link 
              href="/contact" 
              className="group h-12 px-8 bg-gradient-to-r from-pharma-teal to-pharma-teal-dark text-white rounded-[10px] font-medium text-[15px] flex items-center justify-center hover:opacity-90 shadow-[0_8px_24px_rgba(15,118,110,0.3)] transition-all"
            >
              Partner With Us
              <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* BRAND CAROUSEL SECTION */}
      <BrandCarousel />

      {/* SERVICES SECTION */}
      <section 
        id="solutions" 
        ref={solutionsRef}
        className="pt-12 pb-32 flex flex-col items-center px-4 md:px-12 relative overflow-hidden bg-background snap-start"
      >
        {/* Decorative Background Elements */}
        <div className="absolute top-40 right-[-5%] w-[500px] h-[500px] bg-pharma-teal/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-20 left-[-5%] w-[400px] h-[400px] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />
        
        {/* Intricate Dot Grid Texture (NEW) */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.04]" style={{ 
          backgroundImage: `radial-gradient(circle at 1.5px 1.5px, #0F766E 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }} />

        {/* Ambient Technical Icons (NEW) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <motion.div 
            variants={floatingVariant} custom={1.2} initial="initial" animate={isIntroDone && isSolutionsInView ? ["animate", "visible"] : "initial"}
            className="absolute top-[8%] left-[4%] opacity-[0.08] text-pharma-teal hidden lg:block"
          >
            <ShieldCheck size={140} strokeWidth={0.5} />
          </motion.div>
          <motion.div 
            variants={floatingVariant} custom={1.8} initial="initial" animate={isIntroDone && isSolutionsInView ? ["animate", "visible"] : "initial"}
            className="absolute bottom-[8%] right-[4%] opacity-[0.08] text-blue-500 hidden lg:block"
          >
            <Zap size={140} strokeWidth={0.5} />
          </motion.div>
        </div>

        <div className="absolute top-[15%] right-[5%] opacity-[0.06] text-amber-500 hidden xl:block">
           <motion.div variants={floatingVariant} custom={2.4} initial="initial" animate={isIntroDone && isSolutionsInView ? ["animate", "visible"] : "initial"}>
              <Package size={120} strokeWidth={0.5} />
           </motion.div>
        </div>
        <div className="absolute bottom-[15%] left-[5%] opacity-[0.06] text-rose-500 hidden xl:block">
           <motion.div variants={floatingVariant} custom={3.0} initial="initial" animate={isIntroDone && isSolutionsInView ? ["animate", "visible"] : "initial"}>
              <Truck size={120} strokeWidth={0.5} />
           </motion.div>
        </div>

        {/* Giant Watermark Backdrop */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center items-center opacity-[0.04] select-none pointer-events-none">
          <span className="text-[180px] md:text-[280px] font-black text-slate-900 tracking-[-0.05em] leading-none uppercase">
            Solutions
          </span>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isIntroDone && isSolutionsInView ? "visible" : "hidden"}
          className="flex flex-col items-center text-center w-full"
        >
          {/* Background SOLUTIONS text */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18vw] font-black text-teal-900/[0.08] select-none -z-20 pointer-events-none whitespace-nowrap overflow-hidden">
            SOLUTIONS
          </div>

          {/* Background Decorative Icons - Frame the content */}
          <motion.div className="absolute top-40 left-[-40px] md:left-4 text-teal-900/10 rotate-12 -z-10" variants={floatingVariant} custom={0.5}>
            <ShieldCheck size={260} />
          </motion.div>
          <motion.div className="absolute bottom-40 right-[-40px] md:right-4 text-teal-900/10 -rotate-12 -z-10" variants={floatingVariant} custom={1.2}>
            <Zap size={220} />
          </motion.div>
          <motion.div className="absolute top-1/2 right-[-20px] md:right-10 text-teal-800/10 rotate-45 -z-10" variants={floatingVariant} custom={0.8}>
            <Package size={200} />
          </motion.div>
          <motion.div className="absolute bottom-20 left-[-20px] md:left-10 text-teal-800/10 -rotate-6 -z-10" variants={floatingVariant} custom={1.5}>
            <Truck size={180} />
          </motion.div>

          {/* Animated Network Paths - Frames the structure */}
          <div className="absolute inset-0 pointer-events-none -z-10 opacity-60 overflow-visible">
            <svg className="w-full h-full" viewBox="0 0 1440 800" fill="none" preserveAspectRatio="none">
              {/* Primary framing path */}
              <motion.path
                d="M1380 50 Q 1420 400 1380 750 M60 750 Q 20 400 60 50"
                stroke="url(#gradient-core)"
                strokeWidth="2"
                strokeDasharray="12 12"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
              {/* Complementary data flow path */}
              <motion.path
                d="M1380 50 Q 1420 400 1380 750 M60 750 Q 20 400 60 50"
                stroke="#3B82F6"
                strokeWidth="3"
                strokeDasharray="0 100"
                initial={{ strokeDashoffset: 0, opacity: 0 }}
                animate={{ strokeDashoffset: -100, opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1 }}
              />
              <defs>
                <linearGradient id="gradient-core" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0F766E" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="#0F766E" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#0F766E" stopOpacity="0.2" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <motion.h2 
            variants={{
              hidden: { y: 30, opacity: 0 },
              visible: { 
                y: 0, 
                opacity: 1, 
                transition: { 
                  duration: 0.8, 
                  ease: [0.16, 1, 0.3, 1],
                  delay: 1.2 
                } 
              }
            }}
            className="text-[12px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4 font-subtext"
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
            variants={{
              hidden: { y: 30, opacity: 0 },
              visible: { 
                y: 0, 
                opacity: 1, 
                transition: { 
                  duration: 0.8, 
                  ease: [0.16, 1, 0.3, 1],
                  delay: 1.4 
                } 
              }
            }}
            className="text-slate-500 text-center max-w-2xl md:max-w-3xl mb-14 text-[16px] leading-relaxed font-subtext"
          >
            C&F agency, super stockist, consignee agent, and direct distribution — all from Indore's Dawa Bazaar.
          </motion.p>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate={isIntroDone && isSolutionsInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl w-full z-10 relative"
        >
          {[
            {
              title: "C&F Agency",
              desc: "We store, manage, and bill stock on behalf of pharma manufacturers. Your inventory, our warehouse, ERP-tracked.",
              image: "/infographics/cf-agency.png",
              icon: Warehouse,
              accentColor: "#0F766E",
              accentBg: "rgba(15, 118, 110, 0.1)",
            },
            {
              title: "Super Stockist",
              desc: "HPL buys and holds stock directly, then distributes to sub-stockists and chemists across 12+ districts of Madhya Pradesh.",
              image: "/infographics/super-stockist.png",
              icon: Truck,
              accentColor: "#3B82F6",
              accentBg: "rgba(59, 130, 246, 0.1)",
            },
            {
              title: "Consignee Agent",
              desc: "We act as the manufacturer's local representative — receiving goods, managing documentation, and coordinating dispatch to buyers in MP.",
              image: "/infographics/consignee-agent.png",
              icon: ShieldCheck,
              accentColor: "#F59E0B",
              accentBg: "rgba(245, 158, 11, 0.1)",
            },
            {
              title: "Hindustan Drug House",
              desc: "HPL's own distribution brand — directly supplying chemists and pharmacies in Indore's Dawa Bazaar and surrounding areas.",
              image: "/infographics/drug-house.png",
              icon: Zap,
              accentColor: "#F43F5E",
              accentBg: "rgba(244, 63, 94, 0.1)",
            },
          ].map((service, i) => (
            <CoreSolutionCard
              key={i}
              title={service.title}
              description={service.desc}
              image={service.image}
              icon={service.icon}
              accentColor={service.accentColor}
              accentBg={service.accentBg}
              index={i}
            />
          ))}
        </motion.div>
      </section>

      {/* WORKFLOW (HOW IT WORKS) */}
      <section 
        id="workflow" 
        ref={workflowRef}
        className="pt-12 pb-24 flex flex-col items-center px-4 overflow-hidden relative bg-background snap-start"
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isIntroDone && isWorkflowInView ? "visible" : "hidden"}
          className="flex flex-col items-center text-center w-full mb-10"
        >
          <motion.h2 variants={itemSlideUp} className="text-[12px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-3 font-subtext">How It Works</motion.h2>
          <motion.div variants={itemSlideUp}>
            <TypewriterHeading 
              text="From Manufacturer to Market"
              className="text-3xl md:text-4xl font-bold text-slate-900 mb-0 text-center tracking-tight"
            />
          </motion.div>
        </motion.div>

        {/* Ambient Glows Layer (Replaces Dot Grid) */}
        <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
          <div className="absolute top-[10%] left-[-5%] w-[400px] h-[400px] bg-pharma-teal/5 blur-[100px] rounded-full" />
          <div className="absolute bottom-[10%] right-[-5%] w-[500px] h-[500px] bg-blue-400/5 blur-[120px] rounded-full" />
        </div>

        {/* Decorative Background Elements (REFINED) - Animate on scroll */}
        <div className="absolute inset-x-0 top-[48%] translate-y-[-50%] hidden md:flex justify-between items-center px-[12%] opacity-10 pointer-events-none z-0">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            animate={isIntroDone && isWorkflowInView ? { opacity: 0.1, x: 0 } : { opacity: 0, x: -20 }}
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
            variants={floatingVariant} custom={1.5} initial="initial" animate={isIntroDone && isWorkflowInView ? ["animate", "visible"] : "initial"}
            className="absolute top-[20%] left-[15%] opacity-[0.08] text-pharma-teal hidden lg:block"
          >
            <BarChart3 size={40} strokeWidth={1} />
          </motion.div>
          <motion.div 
            variants={floatingVariant} custom={2} initial="initial" animate={isIntroDone && isWorkflowInView ? ["animate", "visible"] : "initial"}
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
                 <stop offset="50%" stopColor="#0F766E" stopOpacity="0.4" />
                 <stop offset="100%" stopColor="transparent" />
               </linearGradient>
             </defs>
             {/* Base faint path */}
             <path d="M 200 400 Q 720 150 1240 400" fill="none" stroke="#0F766E" strokeWidth="1" strokeDasharray="8,10" className="opacity-10" />
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
          initial="hidden"
          animate={isIntroDone && isWorkflowInView ? "visible" : "hidden"}
          className="flex flex-col md:flex-row items-center justify-center gap-6 max-w-6xl w-full relative min-h-[550px] md:min-h-[400px] z-10"
        >
          {/* Left Card */}
          <motion.div 
            variants={cardVariantsLeft}
            className="md:absolute md:left-[10%] lg:left-[15%] z-10 w-full md:w-[300px] p-8 hover:translate-y-[-5px] hover:rotate-0 hover:z-40 transition-all duration-300 bg-white/50 backdrop-blur-sm rounded-[24px] border border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.04)] cursor-default"
          >
            <motion.div variants={itemPop} className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-6 text-slate-600 shadow-sm border border-slate-100">
              <Truck size={24}/>
            </motion.div>
            <motion.h4 variants={itemSlideUp} className="font-bold text-slate-900 text-lg mb-2">1. Manufacturer Ships</motion.h4>
            <motion.p variants={itemSlideUp} className="text-[15px] text-slate-500 leading-relaxed font-subtext">The manufacturer dispatches stock to HPL's warehouse in Vijay Nagar, Indore — with all documentation and challans in order.</motion.p>
          </motion.div>

          {/* Center Card */}
          <motion.div 
            variants={cardVariantsCenter}
            className="md:absolute z-30 w-full md:w-[320px] p-8 hover:translate-y-[-30px] hover:scale-[1.02] transition-all duration-300 bg-white rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-50 cursor-default"
          >
            <motion.div variants={itemPop} className="w-14 h-14 rounded-full bg-pharma-teal/10 flex items-center justify-center mb-6 text-pharma-teal">
              <Warehouse size={28}/>
            </motion.div>
            <motion.h4 variants={itemSlideUp} className="font-bold text-slate-900 text-xl mb-3">2. We Store & Manage</motion.h4>
            <motion.p variants={itemSlideUp} className="text-[15px] text-slate-500 leading-relaxed font-subtext">Stock is received, batch-verified, and logged in ERP Software. Expiry dates and inventory levels tracked continuously.</motion.p>
          </motion.div>

          {/* Right Card */}
          <motion.div 
            variants={cardVariantsRight}
            className="md:absolute md:right-[10%] lg:right-[15%] z-10 w-full md:w-[300px] p-8 hover:translate-y-[-5px] hover:rotate-0 hover:z-40 transition-all duration-300 bg-white/50 backdrop-blur-sm rounded-[24px] border border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.04)] cursor-default"
          >
            <motion.div variants={itemPop} className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-6 text-slate-600 shadow-sm border border-slate-100">
              <Globe size={24}/>
            </motion.div>
            <motion.h4 variants={itemSlideUp} className="font-bold text-slate-900 text-lg mb-2">3. We Dispatch</motion.h4>
            <motion.p variants={itemSlideUp} className="text-[15px] text-slate-500 leading-relaxed font-subtext">GST-billed dispatches go out to sub-stockists, chemists, and distributors across 12+ districts of Madhya Pradesh.</motion.p>
          </motion.div>
        </motion.div>
      </section>

      {/* OUR TEAM */}
      <TeamSection />

      {/* WORDS OF APPRECIATION (HIGH-FIDELITY REVIEWS) */}
      <TestimonialsCarousel />

    </div>
  );
}
