"use client";

import React from "react";
import Link from "next/link";
import { 
  ArrowUpRight,
  Mail,
  Phone,
  MapPin,
  Warehouse
} from "lucide-react";
import { motion, Variants, useInView } from "framer-motion";
import { useNavbarLogoRef } from "@/contexts/NavbarLogoRef";

// Custom Brand Icons
const IconLinkedin = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const IconWhatsApp = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
  </svg>
);

export default function Footer() {
  const { isIntroDone } = useNavbarLogoRef();
  const currentYear = new Date().getFullYear();
  const footerRef = React.useRef(null);
  const isFooterInView = useInView(footerRef, { amount: 0.1, once: false });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const footerMainVariants: Variants = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 1, 
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

  return (
    <footer ref={footerRef} className="w-full bg-background px-4 md:px-10 pb-12 pt-24 font-body">
      <motion.div 
        variants={footerMainVariants}
        initial="hidden"
        animate={isIntroDone && isFooterInView ? "visible" : "hidden"}
        className="relative w-full max-w-[1440px] mx-auto bg-white rounded-[4rem] md:rounded-[5.5rem] p-8 md:p-16 shadow-[0_45px_120px_rgba(0,0,0,0.03)] border border-slate-100/50 overflow-hidden will-change-transform"
      >
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isIntroDone && isFooterInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-8 relative z-10 pb-8"
        >
          {/* Main Brand & Contact Info */}
          <motion.div variants={itemVariants} className="lg:col-span-4 flex flex-col items-start pr-0 lg:pr-12">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-9 h-9 bg-pharma-teal rounded-xl flex items-center justify-center p-1.5 shadow-lg shadow-pharma-teal/15 transition-transform hover:scale-105 duration-300">
                <Warehouse className="w-full h-full text-white" size={22} />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-slate-900 tracking-tight leading-none mb-0.5">HPL</span>
                <span className="text-[9px] font-bold text-pharma-teal uppercase tracking-[0.25em] font-subtext">Hindustan Pharma</span>
              </div>
            </div>
            
            <p className="text-base md:text-lg font-medium text-slate-600 leading-[1.6] mb-10 max-w-sm tracking-tight font-subtext">
              Hindustan Pharma Logistics — <span className="text-pharma-teal font-bold">Indore&apos;s trusted</span> C&amp;F agent, super stockist, and pharma distributor. Serving 60+ manufacturers across Madhya Pradesh since 2009.
            </p>

            <motion.div 
              variants={containerVariants}
              className="flex flex-col gap-5"
            >
              <motion.div variants={itemVariants}><ContactItem icon={<MapPin size={16} />} text="Vijay Nagar, Indore, Madhya Pradesh — 452010" /></motion.div>
              <motion.div variants={itemVariants}><ContactItem icon={<Phone size={16} />} text="+91 93000 01411" /></motion.div>
              <motion.div variants={itemVariants}><ContactItem icon={<Mail size={16} />} text="hindustanpharma1@yahoo.com" /></motion.div>
            </motion.div>
          </motion.div>

          {/* Spacer */}
          <div className="hidden lg:block lg:col-span-1" />

          {/* Links Column 1: Solutions */}
          <motion.div variants={itemVariants} className="lg:col-span-2 flex flex-col gap-7">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] font-subtext opacity-80">Solutions</h4>
            <motion.div 
              variants={containerVariants}
              className="flex flex-col gap-4"
            >
              <motion.div variants={itemVariants}><FooterLink href="/services#cfa">C&amp;F Agency</FooterLink></motion.div>
              <motion.div variants={itemVariants}><FooterLink href="/services#super-stockist">Super Stockist</FooterLink></motion.div>
              <motion.div variants={itemVariants}><FooterLink href="/services#consignee">Consignee Agent</FooterLink></motion.div>
              <motion.div variants={itemVariants}><FooterLink href="/services#drug-house">Hindustan Drug House</FooterLink></motion.div>
            </motion.div>
          </motion.div>

          {/* Links Column 2: Company */}
          <motion.div variants={itemVariants} className="lg:col-span-2 flex flex-col gap-7">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] font-subtext opacity-80">Company</h4>
            <motion.div 
              variants={containerVariants}
              className="flex flex-col gap-4"
            >
              <motion.div variants={itemVariants}><FooterLink href="/about">About</FooterLink></motion.div>
              <motion.div variants={itemVariants}><FooterLink href="/services">Services</FooterLink></motion.div>
              <motion.div variants={itemVariants}><FooterLink href="/contact">Contact</FooterLink></motion.div>
              <motion.div variants={itemVariants}><FooterLink href="/contact">Partner With Us</FooterLink></motion.div>
            </motion.div>
          </motion.div>

          {/* Links Column 3: Resources */}
          <motion.div variants={itemVariants} className="lg:col-span-2 flex flex-col items-start lg:items-end gap-10">
            <div className="w-full flex flex-col items-start lg:items-end gap-7">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] font-subtext opacity-80">Reach Us</h4>
              <div className="flex gap-4">
                <motion.div variants={buttonZoom}>
                  <SocialIcon icon={<IconLinkedin />} label="LinkedIn" href="https://linkedin.com" />
                </motion.div>
                <motion.div variants={buttonZoom}>
                  <SocialIcon icon={<IconWhatsApp />} label="WhatsApp" href="https://wa.me/919300001411" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Huge Blurred Background Text - Branding depth */}
        <div className="absolute -bottom-16 md:-bottom-32 lg:-bottom-48 left-0 w-full overflow-hidden pointer-events-none select-none flex items-end justify-center">
          <motion.span 
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 0.05 }
            }}
            initial="hidden"
            animate={isIntroDone && isFooterInView ? "visible" : "hidden"}
            transition={{ duration: 2, ease: "easeOut" }}
            className="text-[16rem] md:text-[24rem] lg:text-[40rem] font-bold text-pharma-teal/40 blur-[20px] md:blur-[30px] lg:blur-[40px] leading-none whitespace-nowrap transform translate-y-1/4 select-none will-change-transform will-change-opacity translate-z-0"
          >
            HindustanPharma
          </motion.span>
        </div>

        {/* Copyright Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-10 pt-8 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10 text-[10px] md:text-[10px] text-slate-400 font-subtext tracking-widest uppercase font-semibold"
        >
          <div className="flex items-center gap-6">
            <span>&copy; {currentYear} Hindustan Pharma Logistics</span>
            <span className="w-1 h-1 bg-slate-200 rounded-full hidden md:block" />
            <span className="hidden md:inline">Quality Distribution Network</span>
          </div>
          <div className="flex gap-10">
            <Link href="/privacy" className="hover:text-pharma-teal transition-colors tracking-widest">Privacy</Link>
            <Link href="/terms" className="hover:text-pharma-teal transition-colors tracking-widest">Terms</Link>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}

function ContactItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-4 text-slate-500 font-subtext group cursor-default">
      <div className="text-pharma-teal opacity-60 group-hover:opacity-100 transition-opacity">
        {icon}
      </div>
      <span className="text-sm font-medium tracking-tight group-hover:text-slate-900 transition-colors">
        {text}
      </span>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link 
      href={href} 
      className="text-[14px] text-slate-500 hover:text-pharma-teal transition-all flex items-center group font-medium"
    >
      <span className="group-hover:translate-x-1 transition-transform">
        {children}
      </span>
      <ArrowUpRight size={10} className="ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all transform" />
    </Link>
  );
}

function SocialIcon({ icon, label, href }: { icon: React.ReactNode; label: string; href?: string }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      aria-label={label}
      className="w-12 h-12 rounded-2xl flex items-center justify-center text-slate-600 bg-slate-50 border border-slate-100/50 hover:text-pharma-teal hover:border-pharma-teal/20 hover:bg-white hover:shadow-[0_15px_35px_rgba(15,118,110,0.06)] transition-all duration-300"
    >
      {icon}
    </motion.a>
  );
}
