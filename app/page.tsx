"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Globe, 
  Warehouse, 
  Truck, 
  BarChart3,
  CheckCircle2
} from "lucide-react";

export default function Home() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-32 pb-20 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-pharma-teal/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-cyan-400/5 blur-[100px] rounded-full" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-pharma-teal/10 border border-pharma-teal/20 text-pharma-teal text-sm font-bold mb-6"
            >
              <ShieldCheck size={16} />
              <span>Indore's Trusted Pharma Logistics Partner</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-extrabold leading-[1.1] text-slate-900 mb-8"
            >
              Driving the Future of <span className="text-pharma-teal">Pharmaceutical</span> Logistics
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl font-medium"
            >
              HPL (Hindustan Pharma Logistics) provides integrated supply chain solutions across Central India. A division of HDH, specializing in C&F, Super Stockist, and 3PL services.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link 
                href="/services" 
                className="px-8 py-4 bg-pharma-teal text-white rounded-xl font-bold text-lg flex items-center justify-center hover:bg-pharma-teal-dark shadow-xl hover:shadow-pharma-teal/30 transition-all group"
              >
                Our Services <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/contact" 
                className="px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-xl font-bold text-lg flex items-center justify-center hover:bg-slate-50 transition-all shadow-sm"
              >
                Get a Quote
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-slate-50 border-y border-slate-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Years Excellence", value: "15+", icon: Zap },
              { label: "Pharma Clients", value: "500+", icon: Globe },
              { label: "Tons Monthly", value: "2.5k+", icon: BarChart3 },
              { label: "Hub Cities", value: "10+", icon: Warehouse },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center text-center p-6 rounded-2xl bg-white shadow-sm border border-slate-100 hover-glow"
              >
                <div className="w-12 h-12 bg-pharma-teal/10 rounded-lg flex items-center justify-center text-pharma-teal mb-4">
                  <stat.icon size={24} />
                </div>
                <h3 className="text-3xl font-black text-slate-900 mb-1">{stat.value}</h3>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Summary */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-pharma-teal font-bold uppercase tracking-[0.2em] mb-4">What we do</h2>
            <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">Mastering the Supply Chain</h3>
            <p className="text-lg text-slate-600 font-medium leading-relaxed">
              From sophisticated warehousing to last-mile delivery, we provide end-to-end pharmaceutical logistics with a focus on regulatory compliance and temperature control.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "C&F Agency",
                desc: "Complete warehousing, inventory management, and billing solutions for national pharma giants.",
                icon: Warehouse,
              },
              {
                title: "Super Stockist",
                desc: "Regional distribution powerhouse ensuring medicine reach even the remotest pharmacies.",
                icon: Truck,
              },
              {
                title: "3PL Logistics",
                desc: "Advanced third-party logistics with real-time tracking and specialized cold-chain management.",
                icon: Zap,
              }
            ].map((service, i) => (
              <motion.div 
                key={i}
                {...fadeIn}
                whileHover={{ y: -10 }}
                className="p-8 rounded-3xl bg-white border border-slate-100 shadow-xl shadow-slate-200/40 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-pharma-teal/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
                <div className="w-14 h-14 bg-pharma-teal text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-pharma-teal/20">
                  <service.icon size={28} />
                </div>
                <h4 className="text-2xl font-bold text-slate-900 mb-4">{service.title}</h4>
                <p className="text-slate-600 mb-8 leading-relaxed font-medium">
                  {service.desc}
                </p>
                <Link href="/services" className="text-pharma-teal font-bold flex items-center hover:translate-x-2 transition-transform">
                  Learn More <ArrowRight className="ml-2" size={18} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-32 bg-slate-900 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div {...fadeIn}>
              <h2 className="text-pharma-teal font-bold uppercase tracking-[0.2em] mb-4">Why Choose HPL</h2>
              <h3 className="text-4xl md:text-5xl font-black text-white mb-8">Unmatched Reliability in Healthcare Logistics</h3>
              <p className="text-lg text-slate-400 mb-12 font-medium leading-relaxed">
                We understand that every shipment can save a life. Our systems are built around the strict requirements of pharmaceutical handling.
              </p>
              
              <div className="space-y-6">
                {[
                  "WHO-GSDP Compliant Infrastructure",
                  "Real-time Temperature Monitoring",
                  "Direct Access to Indore Industrial Hub",
                  "Dedicated 24/7 Logistics Support Team"
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <CheckCircle2 className="text-cyan-400 shrink-0" size={24} />
                    <span className="text-white font-bold text-lg">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-12">
                <Link href="/about" className="inline-block px-8 py-4 bg-white text-slate-900 rounded-xl font-bold hover:bg-pharma-teal hover:text-white transition-all shadow-xl">
                  More About Our Commitment
                </Link>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square bg-pharma-teal/20 rounded-[4rem] rotate-6 absolute inset-0 blur-2xl" />
              <div className="relative rounded-[3rem] border border-white/10 bg-white/5 backdrop-blur-3xl overflow-hidden shadow-2xl p-8">
                <div className="grid grid-cols-1 gap-6">
                  {/* Mock UI Element */}
                  <div className="p-6 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-1">Cold Chain Status</p>
                      <h5 className="text-xl font-bold text-white tracking-tight">Active - 4.2°C</h5>
                    </div>
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-[0_0_10px_#4ade80]" />
                  </div>
                  <div className="p-6 rounded-2xl bg-white/10 border border-white/10">
                    <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-3">Shipment Progress</p>
                    <div className="w-full bg-white/10 h-2 rounded-full mb-4">
                      <div className="bg-pharma-teal h-full w-[85%] rounded-full shadow-[0_0_10px_rgba(0,104,104,0.5)]" />
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-white font-medium">Batch #HPL8492</span>
                      <span className="text-cyan-400 font-bold">85% Delivered</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-pharma-teal">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-[3rem] p-12 md:p-20 shadow-2xl"
          >
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8">Ready to Optimize Your Pharma Supply Chain?</h2>
            <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto font-medium">
              Join 500+ pharmaceutical companies who trust HPL for their central India distribution needs.
            </p>
            <Link href="/contact" className="px-12 py-5 bg-white text-pharma-teal rounded-full font-black text-xl hover:bg-slate-50 shadow-2xl hover:scale-105 transition-all inline-block">
              Consult with Our Experts
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
