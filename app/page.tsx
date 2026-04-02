"use client";

import React from "react";
import Link from "next/link";
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
      {/* Outer Card Container */}
      <div className="max-w-[1240px] mx-auto w-full bg-card rounded-[32px] shadow-[0_10px_30px_rgba(0,0,0,0.04)] border border-slate-100 overflow-hidden relative">
        
        {/* HERO SECTION */}
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center py-20 px-4 overflow-hidden">
          {/* Floating Cards Background */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div 
              variants={floatingVariant} animate="animate" 
              className="absolute top-32 left-[8%] bg-white p-4 rounded-xl shadow-[0_8px_20px_rgba(0,0,0,0.06)] border border-slate-50 hidden lg:flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-pharma-teal/10 flex items-center justify-center text-pharma-teal"><Globe size={18}/></div>
              <div><p className="text-[13px] font-bold text-slate-900 leading-tight">500+</p><p className="text-[11px] text-slate-500 font-subtext uppercase tracking-wider">Distributors</p></div>
            </motion.div>
            
            <motion.div 
              variants={floatingVariant} animate="animate" style={{ animationDelay: "1s" }}
              className="absolute bottom-40 left-[10%] bg-white p-4 rounded-xl shadow-[0_8px_20px_rgba(0,0,0,0.06)] border border-slate-50 hidden md:flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500"><ShieldCheck size={18}/></div>
              <div><p className="text-[13px] font-bold text-slate-900 leading-tight">GST Compliant</p><p className="text-[11px] text-slate-500 font-subtext uppercase tracking-wider">Secure</p></div>
            </motion.div>
            
            <motion.div 
              variants={floatingVariant} animate="animate" style={{ animationDelay: "2s" }}
              className="absolute top-40 right-[8%] bg-white p-4 rounded-xl shadow-[0_8px_20px_rgba(0,0,0,0.06)] border border-slate-50 hidden lg:flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-amber-400/10 flex items-center justify-center text-amber-500"><Warehouse size={18}/></div>
              <div><p className="text-[13px] font-bold text-slate-900 leading-tight">15+ Years</p><p className="text-[11px] text-slate-500 font-subtext uppercase tracking-wider">Experience</p></div>
            </motion.div>

            <motion.div 
              variants={floatingVariant} animate="animate" style={{ animationDelay: "1.5s" }}
              className="absolute bottom-32 right-[12%] bg-white p-4 rounded-xl shadow-[0_8px_20px_rgba(0,0,0,0.06)] border border-slate-50 hidden md:flex items-center gap-3"
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
              className="w-20 h-20 bg-gradient-to-br from-pharma-teal to-pharma-teal-dark rounded-[20px] flex items-center justify-center text-white mb-10 shadow-[0_12px_24px_rgba(15,118,110,0.25)]"
            >
              <Warehouse size={32} />
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-[64px] font-bold text-slate-900 tracking-tight leading-[1.05] mb-6"
            >
              Central India's Trusted <br className="hidden md:block" />
              <span className="text-pharma-teal">Pharma Partner</span>
            </motion.h1>

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

        {/* SERVICES SECTION */}
        <section className="py-24 bg-[#F9FAFB] border-t border-slate-100 flex flex-col items-center px-4 md:px-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-pharma-teal/5 blur-[100px] rounded-full pointer-events-none" />
          
          <h2 className="text-[12px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">Core Solutions</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-16 text-center max-w-xl">
            Four ways HPL supports your business
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full z-10 relative">
            {[
              { title: "C&F Agency", desc: "Complete warehousing, inventory management, and billing solutions.", icon: Warehouse, color: "text-pharma-teal" },
              { title: "Super Stockist", desc: "Regional distribution powerhouse ensuring seamless medicine reach.", icon: Truck, color: "text-blue-500" },
              { title: "Consignee Agent", desc: "Trusted partner for managing compliant storage and dispatches.", icon: ShieldCheck, color: "text-amber-500" },
              { title: "Hindustan Drug House", desc: "Our retail-focused distribution wing powering local chemist supply.", icon: Zap, color: "text-rose-500" },
            ].map((service, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-[20px] shadow-[0_4px_16px_rgba(0,0,0,0.03)] border border-slate-100 hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] transition-all group flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-5 hover:-translate-y-1"
              >
                <div className={`w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 transition-colors ${service.color}`}>
                  <service.icon size={26} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">{service.title}</h4>
                  <p className="text-slate-500 text-[15px] leading-relaxed">{service.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* WORKFLOW (HOW IT WORKS) */}
        <section className="py-24 bg-white flex flex-col items-center px-4 overflow-hidden relative">
          <h2 className="text-[12px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">How It Works</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-16 text-center">Seamless Logistics Arc</h3>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 max-w-5xl w-full relative min-h-[500px] md:min-h-[400px]">
            {/* Left Card */}
            <motion.div 
              initial={{ opacity: 0, x: -60, rotate: -15, y: 40 }} 
              whileInView={{ opacity: 1, x: 0, rotate: -6, y: 20 }} 
              viewport={{ once: true, margin: "-100px" }} 
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="md:absolute md:left-[5%] lg:left-[10%] z-10 w-full md:w-[300px] bg-[#F7F7F8] border border-slate-200 p-8 rounded-[24px] shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:rotate-0 hover:z-40 transition-transform duration-300"
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
              className="md:absolute z-30 w-full md:w-[320px] bg-white border border-slate-100 p-8 rounded-[24px] shadow-[0_20px_40px_rgba(0,0,0,0.12)] hover:scale-[1.02] transition-transform duration-300"
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
              className="md:absolute md:right-[5%] lg:right-[10%] z-20 w-full md:w-[300px] bg-[#F7F7F8] border border-slate-200 p-8 rounded-[24px] shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:rotate-0 hover:z-40 transition-transform duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-6 text-slate-600 shadow-sm border border-slate-100"><Globe size={24}/></div>
              <h4 className="font-bold text-slate-900 text-lg mb-2">3. We Dispatch</h4>
              <p className="text-[15px] text-slate-500 leading-relaxed">Seamless delivery to retail and wholesale networks across Central India.</p>
            </motion.div>
          </div>
        </section>

        {/* BENTO GRID (WHO WE WORK WITH) */}
        <section className="py-24 bg-[#F9FAFB] border-t border-slate-100 px-4 md:px-12 text-center md:text-left">
          <div className="max-w-5xl mx-auto">
            <div className="mb-16">
              <h3 className="text-3xl font-bold text-slate-900 mb-4">Who we work with</h3>
              <p className="text-slate-500 max-w-xl text-lg">HPL connects the dots between national manufacturers and local pharmacies, serving every layer of the healthcare supply chain.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
              <motion.div whileHover={{ scale: 1.02 }} className="col-span-1 md:col-span-2 bg-white rounded-[24px] p-8 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)] relative overflow-hidden flex flex-col justify-center">
                <h4 className="text-2xl font-bold text-slate-900 mb-3 relative z-10">Pharma Manufacturers</h4>
                <p className="text-slate-500 relative z-10 text-[15px] max-w-sm leading-relaxed">Supporting national and multinational brands with reliable, compliant warehousing infrastructure.</p>
                <div className="absolute right-[-10%] bottom-[-20%] opacity-[0.03] text-pharma-teal pointer-events-none"><Globe size={280} /></div>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} className="col-span-1 bg-gradient-to-br from-pharma-teal to-pharma-teal-dark rounded-[24px] p-8 shadow-lg text-white flex flex-col justify-end relative overflow-hidden">
                <div className="absolute top-6 right-6 opacity-20"><Zap size={48} /></div>
                <h4 className="text-xl font-bold mb-2">FMCG Healthcare</h4>
                <p className="text-white/80 text-[15px] leading-relaxed">Robust FMCG distribution capabilities.</p>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} className="col-span-1 md:col-span-2 bg-[#F7F7F8] rounded-[24px] p-8 border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <h4 className="text-xl font-bold text-slate-900 mb-2">Chemists & Retailers</h4>
                  <p className="text-slate-500 text-[15px]">Trusted local supply lines via HDH.</p>
                </div>
                <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-amber-500"><ShieldCheck size={32}/></div>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} className="col-span-1 bg-white rounded-[24px] p-8 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)] flex flex-col justify-center">
                <h4 className="text-xl font-bold text-slate-900 mb-2">Regional Brands</h4>
                <p className="text-slate-500 text-[15px]">Deep local market penetration.</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS (WORDS OF TRUST) */}
        <section className="py-24 bg-white flex flex-col items-center px-4 overflow-hidden relative">
          <h2 className="text-[12px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">Words of Trust</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-16 text-center">Hear from our clients</h3>
          
          <div className="flex justify-center w-full max-w-3xl relative min-h-[300px]">
            <AnimatePresence>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="w-full bg-[#F7F7F8] rounded-[32px] p-10 md:p-14 shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-slate-200 text-center flex flex-col items-center relative overflow-hidden"
              >
                <div className="absolute top-6 left-6 opacity-5 text-pharma-teal"><svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg></div>
                
                <div className="flex justify-center mb-8 text-amber-400 gap-1">
                  {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={20} fill="currentColor" />)}
                </div>
                
                <p className="text-xl md:text-2xl text-slate-800 font-bold leading-relaxed mb-10 max-w-2xl">
                  "HPL's strict commitment to compliance and on-time delivery has completely transformed our supply chain reliability in Central India. Their super stockist model is quite unmatched in the region."
                </p>
                
                <div className="flex items-center justify-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pharma-teal to-pharma-teal-dark text-white flex items-center justify-center font-bold text-lg shadow-md">SM</div>
                  <div className="text-left">
                    <p className="text-[15px] font-bold text-slate-900 leading-tight">Distribution Manager</p>
                    <p className="text-[13px] text-slate-500">National Pharmaceutical Co.</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

      </div> {/* End outer card */}
      
    </div>
  );
}
