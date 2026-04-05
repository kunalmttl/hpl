"use client";

import React from "react";
import Link from "next/link";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import { motion, AnimatePresence, Variants, useInView } from "framer-motion";
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
  Star
} from "lucide-react";
import { BrandCarousel } from "@/components/BrandCarousel";
import { TypewriterHeading } from "@/components/TypewriterHeading";
import { CoreSolutionCard } from "@/components/CoreSolutionCard";
import { useNavbarLogoRef } from "@/contexts/NavbarLogoRef";

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

  return (
    <div className="flex flex-col w-full min-h-screen bg-background pt-20 pb-12">
      
      {/* HERO SECTION */}
      <section 
        id="hero" 
        ref={heroRef}
        className="relative min-h-[85vh] flex flex-col items-center justify-center pt-20 pb-6 px-4 overflow-hidden snap-start"
      >
        {/* Floating Cards Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div 
            variants={floatingVariant} 
            custom={0.8}
            initial="initial"
            animate={isIntroDone && isHeroInView ? ["animate", "visible"] : "initial"}
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
        className="py-24 flex flex-col items-center px-4 md:px-12 relative overflow-hidden snap-start"
      >
        <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-pharma-teal/5 blur-[100px] rounded-full pointer-events-none" />
        
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isIntroDone && isSolutionsInView ? "visible" : "hidden"}
          className="flex flex-col items-center text-center w-full"
        >
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
              text="Four ways HPL supports your business"
              className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 text-center max-w-xl tracking-tight"
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
            className="text-slate-500 text-center max-w-lg mb-14 text-[16px] leading-relaxed font-subtext"
          >
            End-to-end pharmaceutical supply chain services built for compliance, speed, and coverage across Central India.
          </motion.p>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate={isIntroDone && isSolutionsInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl w-full z-10 relative"
        >
          {[
            {
              title: "C&F Agency",
              desc: "Complete warehousing, inventory management, and billing solutions for national pharma brands.",
              image: "/infographics/cf-agency.png",
              icon: Warehouse,
              accentColor: "#0F766E",
              accentBg: "rgba(15, 118, 110, 0.1)",
            },
            {
              title: "Super Stockist",
              desc: "Regional distribution powerhouse ensuring seamless medicine reach across 12+ districts.",
              image: "/infographics/super-stockist.png",
              icon: Truck,
              accentColor: "#3B82F6",
              accentBg: "rgba(59, 130, 246, 0.1)",
            },
            {
              title: "Consignee Agent",
              desc: "Trusted partner for managing WHO-GSDP compliant storage and dispatches.",
              image: "/infographics/consignee-agent.png",
              icon: ShieldCheck,
              accentColor: "#F59E0B",
              accentBg: "rgba(245, 158, 11, 0.1)",
            },
            {
              title: "Hindustan Drug House",
              desc: "Our retail-focused distribution wing powering local chemist and pharmacy supply.",
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
        className="py-24 flex flex-col items-center px-4 overflow-hidden relative snap-start"
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isIntroDone && isWorkflowInView ? "visible" : "hidden"}
          className="flex flex-col items-center text-center w-full mb-16"
        >
          <motion.h2 variants={itemSlideUp} className="text-[12px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4 font-subtext">How It Works</motion.h2>
          <motion.div variants={itemSlideUp}>
            <TypewriterHeading 
              text="Seamless Logistics Arc"
              className="text-3xl md:text-4xl font-bold text-slate-900 mb-0 text-center tracking-tight"
            />
          </motion.div>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate={isIntroDone && isWorkflowInView ? "visible" : "hidden"}
          className="flex flex-col md:flex-row items-center justify-center gap-6 max-w-5xl w-full relative min-h-[500px] md:min-h-[400px]"
        >
          {/* Left Card */}
          <motion.div 
            variants={cardVariantsLeft}
            className="md:absolute md:left-[5%] lg:left-[10%] z-10 w-full md:w-[300px] p-8 hover:translate-y-[-5px] hover:rotate-0 hover:z-40 transition-all duration-300 bg-white/50 backdrop-blur-sm rounded-[24px] border border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.04)] cursor-default"
          >
            <motion.div variants={itemPop} className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-6 text-slate-600 shadow-sm border border-slate-100">
              <Truck size={24}/>
            </motion.div>
            <motion.h4 variants={itemSlideUp} className="font-bold text-slate-900 text-lg mb-2">1. Manufacturer Ships</motion.h4>
            <motion.p variants={itemSlideUp} className="text-[15px] text-slate-500 leading-relaxed font-subtext">Goods are securely transported to our state-of-the-art central hub.</motion.p>
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
            <motion.p variants={itemSlideUp} className="text-[15px] text-slate-500 leading-relaxed font-subtext">WHO-GSDP compliant warehousing and real-time inventory management.</motion.p>
          </motion.div>

          {/* Right Card */}
          <motion.div 
            variants={cardVariantsRight}
            className="md:absolute md:right-[5%] lg:right-[10%] z-20 w-full md:w-[300px] p-8 hover:translate-y-[-5px] hover:rotate-0 hover:z-40 transition-all duration-300 bg-white/50 backdrop-blur-sm rounded-[24px] border border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.04)] cursor-default"
          >
            <motion.div variants={itemPop} className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-6 text-slate-600 shadow-sm border border-slate-100">
              <Globe size={24}/>
            </motion.div>
            <motion.h4 variants={itemSlideUp} className="font-bold text-slate-900 text-lg mb-2">3. We Dispatch</motion.h4>
            <motion.p variants={itemSlideUp} className="text-[15px] text-slate-500 leading-relaxed font-subtext">Seamless delivery to retail and wholesale networks across Central India.</motion.p>
          </motion.div>
        </motion.div>
      </section>

      {/* WORDS OF APPRECIATION (HIGH-FIDELITY REVIEWS) */}
      <TestimonialsCarousel />

    </div>
  );
}
