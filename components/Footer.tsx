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
const IconInstagram = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const IconTwitter = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M22 4s-1 2.17-2.09 3.42a8.18 8.18 0 0 1 0 10.16C21 18.83 22 21 22 21s-2.04 0-3.13-1.09a10.45 10.45 0 0 1-10.74 0C7.04 21 5 21 5 21s1-2.17 2.09-3.42a8.18 8.18 0 0 1 0-10.16C6 5.17 5 3 5 3s2.04 0 3.13 1.09a10.45 10.45 0 0 1 10.74 0C19.96 3 22 3 22 3z"></path>
  </svg>
);

const IconLinkedin = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
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
        className="relative w-full max-w-[1440px] mx-auto bg-white rounded-[4rem] md:rounded-[5.5rem] p-10 md:p-24 shadow-[0_45px_120px_rgba(0,0,0,0.03)] border border-slate-100/50 overflow-hidden will-change-transform"
      >
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isIntroDone && isFooterInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-8 relative z-10 pb-20"
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
            
            <p className="text-xl md:text-2xl font-bold text-slate-900 leading-[1.2] mb-10 max-w-sm tracking-tight">
              Core logistics platform <span className="text-pharma-teal">for building</span> the future of healthcare—all in one place.
            </p>

            <motion.div 
              variants={containerVariants}
              className="flex flex-col gap-5"
            >
              <motion.div variants={itemVariants}><ContactItem icon={<MapPin size={16} />} text="123 Pharma Hub, Logistics Park, Indore, MP 452001" /></motion.div>
              <motion.div variants={itemVariants}><ContactItem icon={<Phone size={16} />} text="+91 731 400 1234" /></motion.div>
              <motion.div variants={itemVariants}><ContactItem icon={<Mail size={16} />} text="connect@hplindia.co" /></motion.div>
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
              <motion.div variants={itemVariants}><FooterLink href="/services#cnf">C&F Agency</FooterLink></motion.div>
              <motion.div variants={itemVariants}><FooterLink href="/services#stockist">Super Stockist</FooterLink></motion.div>
              <motion.div variants={itemVariants}><FooterLink href="/services#3pl">3PL Logistics</FooterLink></motion.div>
              <motion.div variants={itemVariants}><FooterLink href="/services#hub">Fulfillment Hub</FooterLink></motion.div>
            </motion.div>
          </motion.div>

          {/* Links Column 2: Company */}
          <motion.div variants={itemVariants} className="lg:col-span-2 flex flex-col gap-7">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] font-subtext opacity-80">Company</h4>
            <motion.div 
              variants={containerVariants}
              className="flex flex-col gap-4"
            >
              <motion.div variants={itemVariants}><FooterLink href="/about">Our Story</FooterLink></motion.div>
              <motion.div variants={itemVariants}><FooterLink href="/infrastructure">Infrastructure</FooterLink></motion.div>
              <motion.div variants={itemVariants}><FooterLink href="/compliance">Compliance</FooterLink></motion.div>
              <motion.div variants={itemVariants}><FooterLink href="/contact">Get in Touch</FooterLink></motion.div>
            </motion.div>
          </motion.div>

          {/* Links Column 3: Resources */}
          <motion.div variants={itemVariants} className="lg:col-span-2 flex flex-col items-start lg:items-end gap-10">
            <div className="w-full flex flex-col items-start lg:items-end gap-7">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] font-subtext opacity-80">Follow us</h4>
              <div className="flex gap-4">
                <motion.div variants={buttonZoom}>
                  <SocialIcon icon={<IconInstagram />} label="Instagram" />
                </motion.div>
                <motion.div variants={buttonZoom}>
                  <SocialIcon icon={<IconTwitter />} label="Twitter" />
                </motion.div>
                <motion.div variants={buttonZoom}>
                  <SocialIcon icon={<IconLinkedin />} label="LinkedIn" />
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
          className="mt-16 pt-10 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10 text-[10px] md:text-[10px] text-slate-400 font-subtext tracking-widest uppercase font-semibold"
        >
          <div className="flex items-center gap-6">
            <span>&copy; {currentYear} HPL GROUP</span>
            <span className="w-1 h-1 bg-slate-200 rounded-full hidden md:block" />
            <span className="hidden md:inline">Quality Distribution Network</span>
          </div>
          <div className="flex gap-10">
            <Link href="/privacy" className="hover:text-pharma-teal transition-colors tracking-widest">Privacy</Link>
            <Link href="/terms" className="hover:text-pharma-teal transition-colors tracking-widest">Terms</Link>
            <Link href="/docs" className="hover:text-pharma-teal transition-colors tracking-widest">GDPR</Link>
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

function SocialIcon({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <motion.button 
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      aria-label={label}
      className="w-12 h-12 rounded-2xl flex items-center justify-center text-slate-600 bg-slate-50 border border-slate-100/50 hover:text-pharma-teal hover:border-pharma-teal/20 hover:bg-white hover:shadow-[0_15px_35px_rgba(15,118,110,0.06)] transition-all duration-300"
    >
      {icon}
    </motion.button>
  );
}
