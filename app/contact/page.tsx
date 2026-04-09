"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle2,
  Clock,
  Building,
  ArrowUpRight,
  MessageSquare,
  ShieldCheck,
  Zap,
  Globe
} from "lucide-react";
import { useNavbarLogoRef } from "@/contexts/NavbarLogoRef";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ContactInput } from "@/components/ContactInput";
import { ContactTextarea } from "@/components/ContactTextarea";
import { ContactSelect } from "@/components/ContactSelect";
import { TypewriterHeading } from "@/components/TypewriterHeading";

const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  company: z.string().min(2, { message: "Company name is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z.string().min(10, { message: "Valid phone number required." }),
  enquiryType: z.string().min(1, { message: "Please select an enquiry type." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
  const { isIntroDone } = useNavbarLogoRef();
  const [phase, setPhase] = useState<"form" | "success">("form");

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        setPhase("success");
      } else {
        alert("Submission failed: " + (result.error || "Unknown error"));
      }
    } catch (err) {
      console.error("Submission Error:", err);
      alert("An error occurred while sending your enquiry. Please try again later.");
    }
  };

  // Animation Variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemSlideUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }
    }
  };

  const itemPop = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { type: "spring" as const, stiffness: 100, damping: 15 }
    }
  };

  return (
    <main className="min-h-screen bg-background pt-0 overflow-x-hidden">
      {/* SECTION 1: THE DIRECT TERMINAL (HERO) */}
      <section className="relative pt-40 pb-16 overflow-hidden">
        {/* Background Network Detail */}
        <div className="absolute inset-0 -z-10 opacity-[0.03]">
          <svg width="100%" height="100%" viewBox="0 0 800 400">
             <path d="M0,100 Q200,50 400,100 T800,100" fill="none" stroke="currentColor" strokeWidth="1" />
             <path d="M0,300 Q200,250 400,300 T800,300" fill="none" stroke="currentColor" strokeWidth="1" />
             <circle cx="150" cy="120" r="2" fill="currentColor" />
             <circle cx="650" cy="280" r="2" fill="currentColor" />
          </svg>
        </div>

        <div className="container mx-auto px-8 md:px-16 lg:px-24 text-center max-w-7xl">
          <TypewriterHeading 
            text="How Can We Help?" 
            className="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tighter" 
          />
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isIntroDone ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl text-slate-600 font-medium font-subtext leading-relaxed px-4"
          >
            Our Indore HQ is at the heart of MP's pharmaceutical corridor. 
            Reach out for C&F services, super stockist distribution, and bulk supply operations.
          </motion.p>
        </div>
      </section>

      {/* SECTION 2: THE COMMAND CONSOLE (MAIN GRID) */}
      <section className="pb-24">
        <div className="container mx-auto px-8 md:px-16 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mt-8">
            
            {/* LEFT SIDE: OPERATIONAL HUB */}
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-6"
            >
              <motion.h3 variants={itemSlideUp} className="text-sm font-black text-pharma-teal uppercase tracking-[0.2em] mb-4">Get In Touch</motion.h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {[
                   { icon: Phone, title: "Phone", val: "0731 6056001", color: "bg-blue-50 text-blue-600" },
                   { icon: Mail, title: "Email", val: "hindustanpharma1@yahoo.com", color: "bg-teal-50 text-teal-600" },
                   { icon: Globe, title: "Location", val: "Khajrana, Indore", color: "text-pharma-teal", isBare: true },
                   { icon: MessageSquare, title: "WhatsApp", val: "+91 93000 01411", color: "bg-green-50 text-green-600" }
                 ].map((card, idx) => (
                   <motion.div 
                     key={idx}
                     variants={itemPop}
                     whileHover={{ y: -5, scale: 1.02 }}
                     className="p-6 rounded-[2rem] border border-slate-200 bg-white shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all group relative overflow-hidden"
                   >
                     {card.isBare ? (
                        <div className={`w-10 h-10 ${card.color} rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:rotate-6`}>
                           <card.icon size={24} />
                        </div>
                     ) : (
                        <div className={`w-10 h-10 ${card.color} rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:rotate-6`}>
                           <card.icon size={20} />
                        </div>
                     )}
                     <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{card.title}</p>
                     <p className="text-sm font-black text-slate-900 break-all">{card.val}</p>
                   </motion.div>
                 ))}
              </div>

              {/* INDORE HQ FOCUS CARD */}
              <motion.div 
                variants={itemPop}
                className="p-8 rounded-[2.5rem] bg-slate-900 text-white relative overflow-hidden group shadow-2xl"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-pharma-teal/20 blur-[80px] rounded-full -mr-20 -mt-20 group-hover:bg-pharma-teal/30 transition-colors" />
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <h4 className="text-2xl font-black mb-2 flex items-center">
                      <MapPin className="text-pharma-teal mr-2" /> Our Office
                    </h4>
                    <p className="text-slate-400 font-medium font-subtext max-w-xs">
                      First Floor, 3-4-5, MR 9 Rd, opp. Mahak Vatika, RamKrishna Bagh, Khajrana, Indore.
                    </p>
                  </div>
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <a 
                      href="https://maps.app.goo.gl/YivXcQ4iZ8qJ1ZhE8" 
                      target="_blank"
                      className="px-6 py-3 bg-pharma-teal text-white rounded-xl font-bold flex items-center shadow-lg shadow-pharma-teal/20"
                    >
                      Get Directions <ArrowUpRight size={18} className="ml-2" />
                    </a>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>

            {/* RIGHT SIDE: THE GATEWAY (FORM) */}
            <AnimatePresence mode="wait">
              {phase === "form" ? (
                <motion.div 
                  key="form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-white rounded-[3rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100"
                >
                  <div className="mb-8">
                    <h3 className="text-3xl font-black text-slate-900 mb-2">Send an Enquiry</h3>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <ContactInput 
                        label="Your Name" 
                        {...register("name")} 
                        error={errors.name?.message} 
                      />
                      <ContactInput 
                        label="Company Name" 
                        {...register("company")} 
                        error={errors.company?.message} 
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <ContactInput 
                        label="Email Address" 
                        {...register("email")} 
                        error={errors.email?.message} 
                      />
                      <ContactInput 
                        label="Phone Number" 
                        {...register("phone")} 
                        error={errors.phone?.message} 
                      />
                    </div>
                    <ContactSelect 
                      label="Enquiry Type"
                      {...register("enquiryType")}
                      error={errors.enquiryType?.message}
                      options={[
                        { label: "C&F Agency", value: "cfa" },
                        { label: "Super Stockist", value: "super-stockist" },
                        { label: "Consignee Agent", value: "consignee" },
                        { label: "Hindustan Drug House", value: "drug-house" },
                        { label: "Other", value: "other" }
                      ]}
                    />
                    <ContactInput 
                      label="Enquiry Subject" 
                      {...register("subject")} 
                      error={errors.subject?.message} 
                    />
                    <ContactTextarea 
                      label="Requirements / Details" 
                      {...register("message")} 
                      error={errors.message?.message} 
                      rows={4}
                    />

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={isSubmitting}
                      className="w-full py-5 bg-pharma-teal text-white rounded-[2rem] font-black text-xl flex items-center justify-center space-x-3 shadow-xl shadow-pharma-teal/20 transition-all disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div 
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                          />
                          <span>Transmitting...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Enquiry</span>
                          <Send size={20} className="group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </motion.button>
                  </form>
                </motion.div>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", damping: 20 }}
                  className="bg-white rounded-[3rem] p-12 md:p-20 shadow-2xl border border-teal-100 text-center flex flex-col items-center justify-center min-h-[500px]"
                >
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-32 h-32 bg-teal-50 rounded-full flex items-center justify-center text-pharma-teal mb-8 shadow-inner"
                  >
                    <CheckCircle2 size={64} />
                  </motion.div>
                  <h3 className="text-4xl font-black text-slate-900 mb-4 tracking-tighter">Enquiry Received</h3>
                  <p className="text-xl text-slate-500 font-medium font-subtext max-w-sm mb-12">
                    Your enquiry has been successfully sent. A representative from HPL will contact you within 24 hours.
                  </p>
                  <button 
                    onClick={() => { reset(); setPhase("form"); }}
                    className="group px-10 py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center hover:bg-slate-800 transition-all"
                  >
                    Start New Enquiry <ArrowUpRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>
      </section>

    </main>
  );
}
