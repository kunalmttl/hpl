"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const FAQ_DATA = [
  {
    question: "What is a C&F agent (CFA) in pharma?",
    answer:
      "A C&F (Carrying & Forwarding) agent, also known as a CFA, warehouses and distributes pharmaceutical products on behalf of manufacturers. HPL handles inventory management, billing, and dispatch across Madhya Pradesh without taking ownership of the stock — the manufacturer retains ownership while HPL manages logistics.",
  },
  {
    question: "How is HPL different from a super stockist?",
    answer:
      "HPL operates as both. As a C&F agent (CFA), HPL manages manufacturer-owned inventory in its warehouse. As a super stockist, HPL purchases stock outright and redistributes it to sub-stockists, chemists, and pharmacies across Central India. This dual capability gives manufacturers flexible distribution models.",
  },
  {
    question: "What areas in Madhya Pradesh does HPL serve?",
    answer:
      "Based in Indore, Hindustan Pharma Logistics serves 60+ manufacturers across the entire state of Madhya Pradesh. Our distribution network covers 12+ districts including Indore, Bhopal, Ujjain, Dewas, Ratlam, Dhar, Khargone, Barwani, Khandwa, Burhanpur, and surrounding regions.",
  },
  {
    question: "How to appoint a C&F agent in Madhya Pradesh?",
    answer:
      "To appoint a C&F agent in Madhya Pradesh, manufacturers should evaluate warehouse capacity, distribution reach, GST compliance, ERP tracking capabilities, and the agent's existing distributor network. HPL offers all of these from its centrally located facility in Khajrana, Indore — serving as a single-point distribution hub for the entire state. Contact us to discuss a partnership.",
  },
  {
    question: "What is the difference between a C&F agent and a consignee agent?",
    answer:
      "A C&F agent stores manufacturer-owned stock in bulk and handles billing and dispatch to distributors. A consignee agent acts as the manufacturer's local representative — receiving goods, managing documentation, and coordinating dispatch to buyers without necessarily warehousing large quantities. HPL provides both services, allowing manufacturers to choose the model that suits their needs.",
  },
  {
    question: "Does HPL handle cold chain pharma logistics?",
    answer:
      "Yes. HPL maintains temperature-controlled storage areas within its warehouse facility in Indore to handle pharmaceutical products that require cold chain logistics, including vaccines and temperature-sensitive medications. All cold storage is monitored and batch-tracked through our ERP system.",
  },
  {
    question: "What documents are needed to partner with HPL as a manufacturer?",
    answer:
      "Manufacturers looking to appoint HPL as their C&F agent or super stockist in Madhya Pradesh typically need a valid drug license, GST registration, and a formal C&F agreement. HPL's team handles the complete onboarding process including ERP integration, distributor mapping, and route planning.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="py-20 px-4 md:px-12 bg-slate-50/60"
      aria-label="Frequently Asked Questions"
    >
      <div className="max-w-3xl mx-auto">
        {/* Section heading */}
        <p className="text-[12px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4 text-center font-subtext">
          FAQ
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight text-center mb-3">
          Frequently Asked Questions
        </h2>
        <p className="text-slate-500 text-center max-w-xl mx-auto mb-12 text-[15px] leading-relaxed font-subtext">
          Common questions about C&F agency, super stockist services, and pharma
          distribution in Madhya Pradesh.
        </p>

        {/* FAQ Items */}
        <div className="space-y-3">
          {FAQ_DATA.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-2xl border transition-all duration-200 ${
                  isOpen
                    ? "border-pharma-teal/20 bg-white shadow-sm"
                    : "border-slate-200/80 bg-white/60 hover:border-slate-300"
                }`}
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer group"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span
                    className={`text-[15px] font-semibold pr-4 transition-colors ${
                      isOpen ? "text-pharma-teal" : "text-slate-800 group-hover:text-slate-900"
                    }`}
                  >
                    {item.question}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="shrink-0"
                  >
                    <ChevronDown
                      size={18}
                      className={`transition-colors ${
                        isOpen ? "text-pharma-teal" : "text-slate-400"
                      }`}
                    />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5">
                        <p className="text-sm text-slate-600 leading-relaxed font-subtext">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
