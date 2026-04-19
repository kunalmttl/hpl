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
  metadataBase: new URL('https://www.hplco.in'),
  title: {
    default: "Hindustan Pharma Logistics | C&F Agent, Consignee & Super Stockist",
    template: "%s | HPL"
  },
  description: "Hindustan Pharma Logistics is a trusted C&F agent, super stockist and consignee agent for pharma manufacturers across Madhya Pradesh. Based in Indore since 2009.",
  keywords: ["C&F agent Indore", "CFA Indore", "CF agent pharma", "pharma super stockist Madhya Pradesh", 
             "consignee agent pharma MP", "pharmaceutical logistics Indore",
             "Hindustan Pharma Logistics", "pharma distributor Indore"],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.hplco.in',
    siteName: 'Hindustan Pharma Logistics',
    title: "Hindustan Pharma Logistics | C&F Agent, Consignee & Super Stockist",
    description: "Centrally located pharma logistics hub in Indore serving 60+ manufacturers across Madhya Pradesh.",
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: "Hindustan Pharma Logistics - Central India's Trusted Pharma Partner" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Hindustan Pharma Logistics | Pharma Logistics Hub in Indore",
    description: "Trusted C&F center and distribution network for 60+ pharma brands in Central India.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.hplco.in' }
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "name": "Hindustan Pharma Logistics",
      "alternateName": "HPL",
      "image": "/og-image.png",
      "@id": "https://www.hplco.in",
      "url": "https://www.hplco.in",
      "telephone": "+91-0731-6056001",
      "email": "hindustanpharma1@yahoo.com",
      "priceRange": "Contact for Quotes",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "RamKrishna Bagh, Khajrana, MR 9 Road",
        "addressLocality": "Indore",
        "addressRegion": "Madhya Pradesh",
        "postalCode": "452016",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "22.6826",
        "longitude": "75.8756"
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "10:00",
        "closes": "18:00"
      },
      "description": "C&F agent, super stockist and consignee agent for pharma manufacturers in Madhya Pradesh. Serving 60+ manufacturers since 2009.",
      "foundingDate": "2009",
      "areaServed": {
        "@type": "State",
        "name": "Madhya Pradesh"
      },
      "sameAs": [
        "https://www.linkedin.com/company/hindustanpharmalogistics/"
      ]
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.hplco.in/#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.hplco.in"
        }
      ]
    }
  ]
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
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
