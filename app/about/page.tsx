"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  History, 
  Target, 
  Users2, 
  MapPin, 
  Warehouse, 
  Award, 
  Building2,
  TrendingUp
} from "lucide-react";

export default function About() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div className="flex flex-col w-full min-h-screen pt-24 bg-white">
      {/* Page Hero */}
      <section className="bg-slate-900 py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-pharma-teal/10 skew-x-12 transform translate-x-1/4" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6">Our Legacy, <br /><span className="text-pharma-teal text-glow">Your Reliability.</span></h1>
            <p className="text-xl text-slate-400 font-medium leading-relaxed">
              Hindustan Pharma Logistics (HPL) is a premier logistics powerhouse serving the medical and pharmaceutical industry. As a dedicated division of **HDH**, we bring decades of institutional trust to the heart of Central India.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core Values / Mission */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeIn}>
              <h2 className="text-pharma-teal font-bold uppercase tracking-widest mb-4">Who We Are</h2>
              <h3 className="text-4xl font-black text-slate-900 mb-6">A Vital Link in the Pharma Supply Chain</h3>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed font-medium">
                Established in Indore, HPL has grown from a local distributor to a sophisticated logistics partner for India's leading pharmaceutical companies. We specialize in navigating the complexities of temperature-sensitive storage and time-critical delivery.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-center space-x-3 text-slate-700">
                  <Award className="text-pharma-teal" size={24} />
                  <span className="font-bold">ISO 9001 Certified</span>
                </div>
                <div className="flex items-center space-x-3 text-slate-700">
                  <TrendingUp className="text-pharma-teal" size={24} />
                  <span className="font-bold">Scalable Capacity</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative rounded-3xl overflow-hidden shadow-2xl h-[400px] bg-slate-100 flex items-center justify-center border border-slate-200"
            >
              {/* Illustration Placeholder / Placeholder for an image */}
              <div className="text-center p-8 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/20">
                <Building2 size={64} className="text-pharma-teal mx-auto mb-4" />
                <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">Corporate Headquarters - Indore</p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-tr from-pharma-teal/20 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* The HDH Connection */}
      <section className="py-24 bg-slate-50 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-white rounded-[3rem] p-12 md:p-20 shadow-xl border border-slate-100 relative">
             <div className="absolute top-0 right-0 px-8 py-4 bg-slate-900 text-white rounded-bl-3xl font-black text-sm tracking-[0.2em]">
               PART OF HDH GROUP
             </div>
             
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
               <div className="lg:col-span-2">
                 <h3 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">Strengthened by the HDH Legacy</h3>
                 <p className="text-lg text-slate-600 font-medium leading-relaxed mb-8">
                   HPL operates as a strategic division of HDH, leveraging the group's vast experience in distribution and warehousing. This synergy allows us to offer unmatched stability, financial backing, and a deep-rooted network across Central India.
                 </p>
                 <div className="flex flex-wrap gap-4">
                    <span className="px-6 py-2 bg-slate-100 rounded-full text-slate-700 font-bold text-sm">Regional Reach</span>
                    <span className="px-6 py-2 bg-slate-100 rounded-full text-slate-700 font-bold text-sm">Market Intelligence</span>
                    <span className="px-6 py-2 bg-slate-100 rounded-full text-slate-700 font-bold text-sm">Tech-Infused Ops</span>
                 </div>
               </div>
               <div className="flex justify-center lg:justify-end">
                 <div className="w-48 h-48 rounded-full border-8 border-slate-50 flex items-center justify-center bg-slate-900 shadow-2xl">
                    <span className="text-4xl font-black text-white">HDH</span>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* Infrastructure Section */}
      <section className="py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-slate-900 mb-4">World-Class Infrastructure</h2>
            <div className="w-20 h-1.5 bg-pharma-teal mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: "Strategic Hub: Indore",
                desc: "Located at the geographical heart of India, our Indore operations provide lightning-fast access to multiple states.",
                icon: MapPin
              },
              {
                title: "Advanced Warehousing",
                desc: "100,000+ sq. ft. of clean-room standard storage with 24/7 power backup and security.",
                icon: Warehouse
              },
              {
                title: "Cold Chain Experts",
                desc: "Specialized handling for biologics and vaccines requiring strict 2°C to 8°C or sub-zero environments.",
                icon: Target
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                {...fadeIn}
                className="group"
              >
                <div className="mb-6 w-16 h-16 rounded-2xl bg-white border border-slate-100 shadow-lg flex items-center justify-center text-pharma-teal group-hover:bg-pharma-teal group-hover:text-white transition-all duration-300">
                  <item.icon size={32} />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-4">{item.title}</h4>
                <p className="text-slate-600 font-medium leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
