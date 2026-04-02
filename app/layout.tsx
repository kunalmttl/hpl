import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SmoothScroller from "@/components/SmoothScroller";
import IntroAnimation from "@/components/IntroAnimation";
import { NavbarLogoRefProvider } from "@/contexts/NavbarLogoRef";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

const ttNeoris = localFont({
  src: "../fonts/TT Neoris Trial Medium.ttf",
  variable: "--font-tt-neoris",
  weight: "500",
});

const clarityCity = localFont({
  src: "../fonts/ClarityCity-Thin.ttf",
  variable: "--font-clarity-city",
  weight: "100",
});

export const metadata: Metadata = {
  title: "HPL | Hindustan Pharma Logistics",
  description: "A premier pharmaceutical logistics division of HDH, providing cutting-edge C&F, storage, and distribution services in Indore.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${openSans.variable} ${ttNeoris.variable} ${clarityCity.variable} antialiased font-body tracking-tight selection:bg-pharma-teal/10 selection:text-pharma-teal`}
        suppressHydrationWarning
      >
        <NavbarLogoRefProvider>
          <IntroAnimation />
          <SmoothScroller />
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <WhatsAppButton />
        </NavbarLogoRefProvider>
      </body>
    </html>
  );
}
