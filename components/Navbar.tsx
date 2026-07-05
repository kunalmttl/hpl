"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useNavbarLogoRef } from "@/contexts/NavbarLogoRef";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", ids: ["hero", "brands"], href: "/#hero" },
  { name: "Services", ids: ["solutions", "workflow"], href: "/#solutions" },
  { name: "About", ids: ["team", "testimonials"], href: "/#team" },
];

const OBSERVER_IDS = [...navLinks.flatMap(l => l.ids), "footer"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");
  const pathname = usePathname();
  const { logoRef, isIntroDone } = useNavbarLogoRef();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer for scroll spy
  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection("");
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -40% 0px",
      threshold: 0,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const link = navLinks.find((l) => l.ids.includes(entry.target.id));
          if (link) {
            setActiveSection(link.name);
          } else if (entry.target.id === "footer") {
            setActiveSection("");
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    OBSERVER_IDS.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [pathname]);



  return (
    <>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={isIntroDone ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
        className="fixed top-4 md:top-6 w-full z-50 flex justify-center px-4 md:px-0 pointer-events-none"
      >
        <nav
          aria-label="Main Navigation"
          className={cn(
            "pointer-events-auto h-11 w-full max-w-[98%] sm:max-w-fit rounded-full px-3 md:px-4 transition-all duration-300 flex items-center justify-between sm:justify-center gap-x-2 md:gap-x-6",
            scrolled
              ? "bg-white/95 backdrop-blur-lg shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-slate-200/50"
              : "bg-white/70 backdrop-blur-md border border-white/40 shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
          )}
        >
          {/* Logo */}
          <Link 
            ref={logoRef} 
            href="/#hero" 
            className="flex items-center shrink-0 z-50"
            aria-label="HPL Home"
            onClick={(e) => {
              if (pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
          >
            <Image
              src="/logo.webp"
              alt="HPL Logistics"
              width={100}
              height={32}
              className="h-6 sm:h-7 md:h-8 w-auto object-contain"
              style={{ width: 'auto' }}
              priority
            />
          </Link>

          {/* Nav Links */}
          <div className="flex items-center gap-x-2 md:gap-x-5">
            {navLinks.map((link) => {
              const isActive = activeSection === link.name;
              
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  aria-label={`Navigate to ${link.name}`}
                  className={cn(
                    "text-[11px] sm:text-[12px] md:text-[13px] transition-colors relative py-1 hover:text-slate-900",
                    isActive
                      ? "text-slate-900 font-bold"
                      : "text-slate-500 font-semibold"
                  )}
                >
                  {link.name}
                  {isActive && (
                    <motion.div 
                      layoutId="navbar-underline"
                      className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-slate-900 rounded-full" 
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* CTA */}
          <div className="flex items-center shrink-0">
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
                aria-label="Contact us to partner"
                className="h-[30px] md:h-8 px-3.5 md:px-5 rounded-full bg-slate-900 border border-slate-800 text-white text-[11px] md:text-[13px] font-bold flex items-center justify-center hover:bg-slate-800 active:scale-95 transition-all shadow-md active:shadow-sm"
              >
                Partner With Us
              </Link>
            </motion.div>
          </div>
        </nav>
      </motion.div>
    </>
  );
}
