"use client";

import React from "react";
import { motion, useInView } from "framer-motion";
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
import { useNavbarLogoRef } from "@/contexts/NavbarLogoRef";

export default function About() {
  const { isIntroDone } = useNavbarLogoRef();

  const staggerContainer: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemPop: any = {
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

  const itemSlideUp: any = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const buttonZoom: any = {
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

  // Section refs for re-triggering
  const aboutHeroRef = React.useRef(null);
  const whoWeAreRef = React.useRef(null);
  const hdhRef = React.useRef(null);
  const infraRef = React.useRef(null);

  const isAboutHeroInView = useInView(aboutHeroRef, { amount: 0.2, once: false });
  const isWhoWeAreInView = useInView(whoWeAreRef, { amount: 0.2, once: false });
  const isHdhInView = useInView(hdhRef, { amount: 0.2, once: false });
  const isInfraInView = useInView(infraRef, { amount: 0.2, once: false });

  return (
    <div className="flex flex-col w-full min-h-screen pt-24 bg-background">
      {/* Page Hero */}
      <section 
        ref={aboutHeroRef}
        className="bg-slate-900 py-24 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-1/2 h-full bg-pharma-teal/10 skew-x-12 transform translate-x-1/4" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div 
            initial="hidden"
            animate={isIntroDone && isAboutHeroInView ? "visible" : "hidden"}
            variants={{
              hidden: { opacity: 0, x: -30 },
              visible: { opacity: 1, x: 0 }
            }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-[1.1]">Our Legacy, <br /><span className="text-pharma-teal text-glow">Your Reliability.</span></h1>
            <p className="text-xl text-slate-400 font-medium leading-relaxed font-subtext">
              Hindustan Pharma Logistics (HPL) is a premier logistics powerhouse serving the medical and pharmaceutical industry. As a dedicated division of **HDH**, we bring decades of institutional trust to the heart of Central India.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core Values / Mission */}
      <section 
        ref={whoWeAreRef}
        className="py-24"
      >
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate={isIntroDone && isWhoWeAreInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
          >
            <motion.div variants={itemSlideUp}>
              <motion.h2 variants={itemPop} className="text-pharma-teal font-bold uppercase tracking-widest font-subtext mb-4">Who We Are</motion.h2>
              <motion.h3 variants={itemPop} className="text-4xl font-black text-slate-900 mb-6">A Vital Link in the Pharma Supply Chain</motion.h3>
              <motion.p variants={itemPop} className="text-lg text-slate-600 mb-6 leading-relaxed font-medium">
                Established in Indore, HPL has grown from a local distributor to a sophisticated logistics partner for India's leading pharmaceutical companies. We specialize in navigating the complexities of temperature-sensitive storage and time-critical delivery.
              </motion.p>
              <motion.div variants={itemPop} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-center space-x-3 text-slate-700">
                  <Award className="text-pharma-teal" size={24} />
                  <span className="font-bold">ISO 9001 Certified</span>
                </div>
                <div className="flex items-center space-x-3 text-slate-700">
                  <TrendingUp className="text-pharma-teal" size={24} />
                  <span className="font-bold">Scalable Capacity</span>
                </div>
              </motion.div>
            </motion.div>
            
            <motion.div 
              initial="hidden"
              animate={isIntroDone && isWhoWeAreInView ? "visible" : "hidden"}
              variants={{
                hidden: { opacity: 0, scale: 0.95 },
                visible: { opacity: 1, scale: 1 }
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative rounded-3xl overflow-hidden shadow-2xl h-[400px] bg-slate-100 flex items-center justify-center border border-slate-200"
            >
              <div className="text-center p-8 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/20">
                <Building2 size={64} className="text-pharma-teal mx-auto mb-4" />
                <p className="text-slate-500 font-bold uppercase tracking-widest text-sm font-subtext text-center">Corporate Headquarters - Indore</p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-tr from-pharma-teal/20 to-transparent" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* The HDH Connection */}
      <section 
        ref={hdhRef}
        className="py-24 bg-background overflow-hidden border-t border-slate-100"
      >
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate={isIntroDone && isHdhInView ? "visible" : "hidden"}
            className="bg-white rounded-[3rem] p-12 md:p-20 shadow-xl border border-slate-100 relative"
          >
             <motion.div variants={itemPop} className="absolute top-0 right-0 px-8 py-4 bg-slate-900 text-white rounded-bl-3xl font-black text-sm tracking-[0.2em] font-subtext">
                PART OF HDH GROUP
             </motion.div>
             
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
               <div className="lg:col-span-2">
                 <motion.h3 variants={itemSlideUp} className="text-3xl md:text-5xl font-black text-slate-900 mb-8 tracking-tight">Strengthened by the <br />HDH Legacy</motion.h3>
                 <motion.p variants={itemSlideUp} className="text-xl text-slate-600 font-medium leading-relaxed mb-10">
                   HPL operates as a strategic division of HDH, leveraging the group's vast experience in distribution and warehousing. This synergy allows us to offer unmatched stability, financial backing, and a deep-rooted network across Central India.
                 </motion.p>
                 <motion.div variants={itemSlideUp} className="flex flex-wrap gap-4">
                    {[ "Regional Reach", "Market Intelligence", "Tech-Infused Ops" ].map((tag, i) => (
                      <span key={i} className="px-6 py-2 bg-slate-50 rounded-full text-slate-700 font-bold text-sm font-subtext border border-slate-100 shadow-sm transition-transform hover:scale-105 select-none">{tag}</span>
                    ))}
                 </motion.div>
               </div>
               <motion.div variants={itemPop} className="flex justify-center lg:justify-end">
                 <motion.div 
                   whileHover={{ rotate: 12, scale: 1.05 }}
                   className="w-56 h-56 rounded-full border-8 border-slate-50 flex items-center justify-center bg-slate-900 shadow-2xl transition-transform duration-500 cursor-default"
                 >
                    <span className="text-5xl font-black text-white">HDH</span>
                 </motion.div>
               </motion.div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* Infrastructure Section */}
      <section 
        ref={infraRef}
        className="py-32"
      >
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate={isIntroDone && isInfraInView ? "visible" : "hidden"}
            className="text-center mb-24"
          >
            <motion.h2 variants={itemSlideUp} className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">World-Class Infrastructure</motion.h2>
            <motion.p variants={itemSlideUp} className="w-24 h-2 bg-pharma-teal mx-auto rounded-full" />
          </motion.div>

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
                variants={itemPop}
                initial="hidden"
                animate={isIntroDone && isInfraInView ? "visible" : "hidden"}
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
