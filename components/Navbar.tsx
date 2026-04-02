"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useNavbarLogoRef } from "@/contexts/NavbarLogoRef";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { logoRef } = useNavbarLogoRef();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-3 w-full z-50 flex justify-center px-3 pointer-events-none">
      <nav
        className={cn(
          "pointer-events-auto h-11 w-fit rounded-full px-4 transition-all duration-300 flex items-center justify-center gap-x-3 sm:gap-x-6 md:gap-x-12",
          scrolled
            ? "bg-white/95 backdrop-blur-lg shadow-[0_4px_24px_rgba(0,0,0,0.12)] border border-slate-200/50"
            : "bg-white/60 backdrop-blur-md border border-white/40 shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
        )}
      >
        {/* Logo — Link ref attached for IntroAnimation targeting */}
        <Link ref={logoRef} href="/" className="flex items-center shrink-0">
          <Image
            src="/logo.png"
            alt="HPL Logistics"
            width={120}
            height={38}
            className="h-6 md:h-8 w-auto object-contain"
            priority
          />
        </Link>

        {/* Nav Links — Ultra-compact layout */}
        <div className="flex items-center gap-x-2 sm:gap-x-3 md:gap-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "text-[10px] sm:text-[11px] md:text-[13px] font-semibold transition-colors relative py-1 hover:text-pharma-teal",
                pathname === link.href
                  ? "text-pharma-teal"
                  : "text-slate-600"
              )}
            >
              {link.name}
              {pathname === link.href && (
                <div className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-pharma-teal rounded-full" />
              )}
            </Link>
          ))}
        </div>

        {/* Action Button — Refined pill */}
        <div className="flex items-center shrink-0">
          <Link
            href="/contact"
            className="h-7 sm:h-8 px-3 sm:px-4 rounded-full bg-slate-900 border border-slate-800 text-white text-[9px] sm:text-[11px] md:text-[13px] font-bold flex items-center justify-center hover:bg-slate-800 active:scale-95 transition-all shadow-md active:shadow-sm"
          >
            Partner With Us
          </Link>
        </div>
      </nav>
    </div>
  );
}
