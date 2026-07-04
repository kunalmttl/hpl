import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ConditionalFooter from "@/components/ConditionalFooter";
import WhatsAppButton from "@/components/WhatsAppButton";
import SmoothScroller from "@/components/SmoothScroller";
import IntroAnimation from "@/components/IntroAnimation";
import { NavbarLogoRefProvider } from "@/contexts/NavbarLogoRef";
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';




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
      "image": "https://www.hplco.in/og-image.png",
      "@id": "https://www.hplco.in",
      "url": "https://www.hplco.in",
      "telephone": "+91-0731-6056001",
      "email": "hindustanpharma1@yahoo.com",
      "priceRange": "Contact for Quotes",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "First Floor, 3-4-5, MR 9 Road, opposite Mahek Vatika Garden, RamKrishna Bagh, Khajrana",
        "addressLocality": "Indore",
        "addressRegion": "Madhya Pradesh",
        "postalCode": "452010",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "22.740256",
        "longitude": "75.9083201"
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "10:00",
        "closes": "18:30"
      },
      "description": "Hindustan Pharma Logistics is a trusted C&F agent, super stockist and consignee agent for pharma manufacturers in Madhya Pradesh. Based in Indore since 2009, serving 60+ manufacturers across 12+ districts.",
      "foundingDate": "2009",
      "numberOfEmployees": {
        "@type": "QuantitativeValue",
        "minValue": 20
      },
      "areaServed": {
        "@type": "State",
        "name": "Madhya Pradesh"
      },
      "sameAs": [
        "https://www.linkedin.com/company/hindustanpharmalogistics/",
        "https://www.justdial.com/Indore/Hindustan-Pharma-Logistics-C-F-And-Consignee-Agent-Near-Robot-Square1314-Sunderbagh-Khajrana/0731PX731-X731-230208181640-F2C2_BZDET",
        "https://www.tradeindia.com/hindustan-pharma-logistics-8904499/",
        "https://maps.google.com/?cid=12952865769213892787"
      ]
    },
    {
      "@type": "Organization",
      "@id": "https://www.hplco.in/#organization",
      "name": "Hindustan Pharma Logistics",
      "alternateName": "HPL",
      "url": "https://www.hplco.in",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.hplco.in/logo.png",
        "width": 512,
        "height": 512
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-0731-6056001",
        "contactType": "customer service",
        "email": "hindustanpharma1@yahoo.com",
        "areaServed": "IN",
        "availableLanguage": ["English", "Hindi"]
      }
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
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
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
          <ConditionalFooter />
          <WhatsAppButton />
        </NavbarLogoRefProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
