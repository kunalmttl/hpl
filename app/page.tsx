"use client";

import React from "react";
import Link from "next/link";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import { motion, AnimatePresence, Variants } from "framer-motion";
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

export default function Home() {
  const floatingVariant: Variants = {
    animate: {
      y: [0, -15, 0],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-background pt-28 pb-12 px-4 sm:px-6 md:px-8">
      
      {/* HERO SECTION */}
      <section id="hero" className="relative min-h-[90vh] flex flex-col items-center justify-center py-20 px-4 overflow-hidden snap-start">
        {/* Floating Cards Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div 
            variants={floatingVariant} animate="animate" 
            className="absolute top-32 left-[8%] hidden lg:flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-full bg-pharma-teal/10 flex items-center justify-center text-pharma-teal"><Globe size={18}/></div>
            <div><p className="text-[13px] font-bold text-slate-900 leading-tight">500+</p><p className="text-[11px] text-slate-500 font-subtext uppercase tracking-wider">Distributors</p></div>
          </motion.div>
          
          <motion.div 
            variants={floatingVariant} animate="animate" style={{ animationDelay: "1s" }}
            className="absolute bottom-40 left-[10%] hidden md:flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500"><ShieldCheck size={18}/></div>
            <div><p className="text-[13px] font-bold text-slate-900 leading-tight">GST Compliant</p><p className="text-[11px] text-slate-500 font-subtext uppercase tracking-wider">Secure</p></div>
          </motion.div>
          
          <motion.div 
            variants={floatingVariant} animate="animate" style={{ animationDelay: "2s" }}
            className="absolute top-40 right-[8%] hidden lg:flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-full bg-amber-400/10 flex items-center justify-center text-amber-500"><Warehouse size={18}/></div>
            <div><p className="text-[13px] font-bold text-slate-900 leading-tight">15+ Years</p><p className="text-[11px] text-slate-500 font-subtext uppercase tracking-wider">Experience</p></div>
          </motion.div>

          <motion.div 
            variants={floatingVariant} animate="animate" style={{ animationDelay: "1.5s" }}
            className="absolute bottom-32 right-[12%] hidden md:flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500"><Truck size={18}/></div>
            <div><p className="text-[13px] font-bold text-slate-900 leading-tight">60+ Clients</p><p className="text-[11px] text-slate-500 font-subtext uppercase tracking-wider">Pharma Brands</p></div>
          </motion.div>
        </div>

        <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto mt-[-5vh]">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-20 h-20 bg-gradient-to-br from-pharma-teal to-pharma-teal-dark rounded-[20px] flex items-center justify-center text-white mb-10"
          >
            <Warehouse size={32} />
          </motion.div>
          
          <TypewriterHeading 
            as="h1"
            className="text-4xl md:text-6xl lg:text-[64px] font-bold text-slate-900 tracking-tight leading-[1.05] mb-6"
            segments={[
              { text: "Central India's Trusted", br: true },
              { text: "Pharma Partner", className: "text-pharma-teal" }
            ]}
          />

          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-slate-500 mb-10 max-w-2xl leading-relaxed"
          >
            Hindustan Pharma Logistics provides integrated supply chain solutions across Central India. Specializing in C&F, Super Stockist, and distribution services.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
            <Link href="/contact" className="h-12 px-8 bg-gradient-to-r from-pharma-teal to-pharma-teal-dark text-white rounded-[10px] font-medium text-[15px] flex items-center justify-center hover:opacity-90 shadow-[0_8px_16px_rgba(15,118,110,0.2)] transition-all transform hover:scale-[1.02]">
              Partner With Us
            </Link>
          </motion.div>
        </div>
      </section>

      {/* BRAND CAROUSEL SECTION */}
      <BrandCarousel />

      {/* SERVICES SECTION */}
      <section id="solutions" className="py-24 flex flex-col items-center px-4 md:px-12 relative overflow-hidden snap-start">
        <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-pharma-teal/5 blur-[100px] rounded-full pointer-events-none" />
        
        <h2 className="text-[12px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">Core Solutions</h2>
        <TypewriterHeading 
          text="Four ways HPL supports your business"
          className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 text-center max-w-xl"
        />
        <p className="text-slate-500 text-center max-w-lg mb-14 text-[16px] leading-relaxed">
          End-to-end pharmaceutical supply chain services built for compliance, speed, and coverage across Central India.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl w-full z-10 relative">
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
        </div>
      </section>

      {/* WORKFLOW (HOW IT WORKS) */}
      <section id="workflow" className="py-24 flex flex-col items-center px-4 overflow-hidden relative snap-start">
        <h2 className="text-[12px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">How It Works</h2>
        <TypewriterHeading 
          text="Seamless Logistics Arc"
          className="text-3xl md:text-4xl font-bold text-slate-900 mb-16 text-center"
        />

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 max-w-5xl w-full relative min-h-[500px] md:min-h-[400px]">
          {/* Left Card */}
          <motion.div 
            initial={{ opacity: 0, x: -60, rotate: -15, y: 40 }} 
            whileInView={{ opacity: 1, x: 0, rotate: -6, y: 20 }} 
            viewport={{ once: true, margin: "-100px" }} 
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="md:absolute md:left-[5%] lg:left-[10%] z-10 w-full md:w-[300px] p-8 hover:rotate-0 hover:z-40 transition-transform duration-300"
          >
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-6 text-slate-600 shadow-sm border border-slate-100"><Truck size={24}/></div>
            <h4 className="font-bold text-slate-900 text-lg mb-2">1. Manufacturer Ships</h4>
            <p className="text-[15px] text-slate-500 leading-relaxed">Goods are securely transported to our state-of-the-art central hub.</p>
          </motion.div>

          {/* Center Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: -20 }} 
            whileInView={{ opacity: 1, scale: 1, y: -20 }} 
            viewport={{ once: true, margin: "-100px" }} 
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="md:absolute z-30 w-full md:w-[320px] p-8 hover:scale-[1.02] transition-transform duration-300"
          >
            <div className="w-14 h-14 rounded-full bg-pharma-teal/10 flex items-center justify-center mb-6 text-pharma-teal"><Warehouse size={28}/></div>
            <h4 className="font-bold text-slate-900 text-xl mb-3">2. We Store & Manage</h4>
            <p className="text-[15px] text-slate-500 leading-relaxed">WHO-GSDP compliant warehousing and real-time inventory management.</p>
          </motion.div>

          {/* Right Card */}
          <motion.div 
            initial={{ opacity: 0, x: 60, rotate: 15, y: 40 }} 
            whileInView={{ opacity: 1, x: 0, rotate: 6, y: 20 }} 
            viewport={{ once: true, margin: "-100px" }} 
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            className="md:absolute md:right-[5%] lg:right-[10%] z-20 w-full md:w-[300px] p-8 hover:rotate-0 hover:z-40 transition-transform duration-300"
          >
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-6 text-slate-600 shadow-sm border border-slate-100"><Globe size={24}/></div>
            <h4 className="font-bold text-slate-900 text-lg mb-2">3. We Dispatch</h4>
            <p className="text-[15px] text-slate-500 leading-relaxed">Seamless delivery to retail and wholesale networks across Central India.</p>
          </motion.div>
        </div>
      </section>

      {/* WORDS OF APPRECIATION (HIGH-FIDELITY REVIEWS) */}
      <TestimonialsCarousel />

    </div>
  );
}
