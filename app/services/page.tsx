"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Warehouse, 
  Truck, 
  BarChart3, 
  Settings, 
  CheckCircle, 
  BookOpen, 
  ArrowUpRight,
  ClipboardCheck,
  FileText
} from "lucide-react";

export default function Services() {
  const services = [
    {
      id: "cnf",
      title: "C&F Agency",
      desc: "Our Carrying and Forwarding (C&F) services are designed for seamless national distribution. We handle inventory, warehousing, and billing with uncompromising accuracy.",
      features: ["Full Inventory Traceability", "Customized Billing Solutions", "Regulatory Documentation", "Daily/Weekly Reporting"],
      icon: Warehouse,
      color: "bg-blue-500"
    },
    {
      id: "stockist",
      title: "Super Stockiest",
      desc: "As a premier Super Stockiest in Indore, we maintain high-velocity inventory management to ensure product availability across the entire pharmaceutical network.",
      features: ["Batch Management", "Cold Chain Mastery", "Secondary Distribution", "Emergency Logistics"],
      icon: Truck,
      color: "bg-pharma-teal"
    },
    {
      id: "3pl",
      title: "Third Party Logistics (3PL)",
      desc: "Providing end-to-end supply chain outsourcing, from storage to final mile delivery. Focused on efficiency and cost-optimization for high-growth pharma brands.",
      features: ["Multi-State Distribution", "Route Optimization", "Integrated Tracking", "Reverse Logistics"],
      icon: BarChart3,
      color: "bg-cyan-500"
    }
  ];

  return (
    <div className="flex flex-col w-full min-h-screen pt-24 bg-white">
      {/* Hero */}
      <section className="py-24 border-b border-slate-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6">Expert Logistics for <span className="text-pharma-teal">Critical Care.</span></h1>
            <p className="text-xl text-slate-600 font-medium leading-relaxed">
              We provide a robust infrastructure and specialized knowledge required to handle pharmaceutical supplies with the precision they deserve.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6 space-y-32">
          {services.map((service, i) => (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
            >
              <div className={i % 2 !== 0 ? 'lg:order-2' : ''}>
                <div className={`w-16 h-16 ${service.color} text-white rounded-2xl flex items-center justify-center mb-8 shadow-xl shadow-slate-200`}>
                  <service.icon size={32} />
                </div>
                <h3 className="text-4xl font-extrabold text-slate-900 mb-6">{service.title}</h3>
                <p className="text-lg text-slate-600 font-medium mb-8 leading-relaxed">
                  {service.desc}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.features.map((feature, j) => (
                    <div key={j} className="flex items-center space-x-3 text-slate-700 font-bold">
                      <CheckCircle className="text-pharma-teal" size={20} />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className={`h-80 bg-slate-50 border border-slate-200 rounded-[3rem] p-12 flex items-center justify-center relative overflow-hidden ${i % 2 !== 0 ? 'lg:order-1' : ''}`}>
                 <div className="absolute top-0 left-0 w-full h-full bg-grid-slate-200/50 [mask-image:linear-gradient(to_bottom,white,transparent)]" />
                 <service.icon size={120} className="text-slate-200 relative z-10" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Knowledge Base Section - Integrating "The Formal Research Report" */}
      <section className="py-32 bg-slate-900 text-white overflow-hidden relative" id="kb">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(0,104,104,0.15)_0%,transparent_70%)]" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 text-pharma-teal font-bold mb-8 font-subtext">
              <BookOpen size={20} />
              <span className="uppercase tracking-widest text-sm">Logistics Knowledge Base</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black mb-12">The Principles of Formal Reporting & Professional Documentation</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-slate-300">
              <div>
                <p className="text-lg leading-relaxed mb-6 font-medium italic">
                  "A formal research report is the pinnacle of professional communication in logistics, designed to present objective findings and rigorous observations to decision-makers."
                </p>
                <p className="mb-8">
                  At HPL, we believe in radical transparency. Our internal reporting systems adhere to the highest academic and professional standards to ensure data integrity across the supply chain.
                </p>
                <div className="p-6 bg-white/5 border border-white/10 rounded-2xl flex items-center space-x-4">
                  <FileText className="text-pharma-teal" size={32} />
                  <div>
                    <h5 className="font-bold text-white uppercase text-xs tracking-tight font-subtext">Full Framework Version</h5>
                    <p className="text-sm">Download the complete HPL Reporting Standards</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
                <h4 className="text-xl font-bold text-white mb-6 flex items-center"><ClipboardCheck className="mr-2 text-pharma-teal" /> Key Characteristics</h4>
                <ul className="space-y-4">
                  {[
                    "Objective Presentation: Neutral, unbiased data extraction.",
                    "Rigorous Documentation: Full traceability of every SKU.",
                    "Systematic Observation: Real-time cold-chain monitoring.",
                    "Actionable Insights: Findings ready for executive review."
                  ].map((char, i) => (
                    <li key={i} className="flex space-x-3 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-pharma-teal mt-2 shrink-0" />
                      <span>{char}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-8">Need a customized logistics strategy?</h2>
          <motion.div whileHover={{ scale: 1.05 }} className="inline-block">
            <Link href="/contact" className="px-10 py-4 bg-pharma-teal text-white rounded-full font-bold text-lg shadow-xl shadow-pharma-teal/20 hover:bg-pharma-teal-dark transition-all">
              Schedule a Consultation
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
