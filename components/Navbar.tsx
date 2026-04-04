"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useNavbarLogoRef } from "@/contexts/NavbarLogoRef";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { logoRef, isIntroDone } = useNavbarLogoRef();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on path change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);


  return (
    <>
      <motion.div 
        initial={{ y: -100, opacity: 0 }}
        animate={isIntroDone ? { y: 0, opacity: 1 } : { y: -100, opacity: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="fixed top-4 md:top-6 w-full z-50 flex justify-center px-4 md:px-0 pointer-events-none"
      >
        <nav
          className={cn(
            "pointer-events-auto h-12 md:h-11 w-full max-w-[95%] md:w-fit rounded-full px-4 md:px-6 transition-all duration-300 flex items-center justify-between md:justify-center md:gap-x-12",
            scrolled
              ? "bg-white/95 backdrop-blur-lg shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-slate-200/50"
              : "bg-white/70 backdrop-blur-md border border-white/40 shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
          )}
        >
          {/* Logo */}
          <Link ref={logoRef} href="/" className="flex items-center shrink-0 z-50">
            <Image
              src="/logo.png"
              alt="HPL Logistics"
              width={100}
              height={32}
              className="h-5 md:h-8 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-[13px] transition-colors relative py-1 hover:text-slate-900",
                  pathname === link.href
                    ? "text-slate-900 font-bold"
                    : "text-slate-500 font-semibold"
                )}
              >
                {link.name}
                {pathname === link.href && (
                  <motion.div 
                    layoutId="navbar-underline"
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-slate-900 rounded-full" 
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center shrink-0">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={isIntroDone ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 200, 
                damping: 18, 
                delay: 0.8 
              }}
            >
              <Link
                href="/contact"
                className="h-8 px-5 rounded-full bg-slate-900 border border-slate-800 text-white text-[13px] font-bold flex items-center justify-center hover:bg-slate-800 active:scale-95 transition-all shadow-md active:shadow-sm"
              >
                Partner With Us
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            aria-label="Toggle Menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-900 z-50 pointer-events-auto"
          >
            <div className="w-5 h-4 relative flex flex-col justify-between">
              <motion.span 
                animate={mobileMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                className="w-full h-[2px] bg-current rounded-full origin-left transition-transform" 
              />
              <motion.span 
                animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-full h-[2px] bg-current rounded-full transition-opacity" 
              />
              <motion.span 
                animate={mobileMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                className="w-full h-[2px] bg-current rounded-full origin-left transition-transform" 
              />
            </div>
          </button>
        </nav>
      </motion.div>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "circOut" }}
            className="fixed inset-0 z-[45] bg-white pt-32 pb-12 px-8 flex flex-col justify-between md:hidden"
          >
            <div className="flex flex-col gap-y-8">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + idx * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "text-4xl font-bold transition-colors",
                      pathname === link.href ? "text-pharma-teal" : "text-slate-900"
                    )}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 200, damping: 15 }}
            >
              <Link
                href="/contact"
                className="w-full h-14 bg-slate-900 rounded-2xl text-white font-bold flex items-center justify-center text-lg shadow-xl"
              >
                Start a Conversation
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>

  );
}
