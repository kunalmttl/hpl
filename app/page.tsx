import type { Metadata } from "next";
import { HomeContent } from "@/components/HomeContent";

export const metadata: Metadata = {
  title: "Hindustan Pharma Logistics | Premium C&F Agent & Super Stockist Indore",
  description: "HPL is Central India's leading C&F agent (CFA) and super stockist. Trusted pharma logistics hub in Indore serving 60+ manufacturers since 2009.",
  keywords: [
    "C&F agent Indore", 
    "CFA Indore",
    "CF agents Madhya Pradesh",
    "pharma super stockist MP", 
    "consignee agent pharma", 
    "pharmaceutical logistics Indore", 
    "Hindustan Pharma Logistics", 
    "pharma distributor Indore"
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.hplco.in/",
    siteName: "Hindustan Pharma Logistics",
    title: "HPL — Hindustan Pharma Logistics | Central India's Premier C&F Agent",
    description: "Centrally located pharma logistics hub in Indore serving 60+ manufacturers across 12+ districts of Madhya Pradesh.",
    images: [{
      url: "/og-image.png",
      width: 1200,
      height: 630,
      alt: "Hindustan Pharma Logistics - Central India's Trusted Pharma Partner"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Hindustan Pharma Logistics | Pharma Logistics Hub in Indore",
    description: "Trusted C&F center and distribution network for 60+ pharma brands in Central India.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://www.hplco.in/",
  }
};

const homeSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FAQPage",
      "@id": "https://www.hplco.in/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is a C&F agent (CFA) in pharma?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A C&F (Carrying & Forwarding) agent, also known as a CFA, warehouses and distributes pharmaceutical products on behalf of manufacturers. HPL handles inventory management, billing, and dispatch across Madhya Pradesh without taking ownership of the stock."
          }
        },
        {
          "@type": "Question",
          "name": "How is HPL different from a super stockist?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "HPL operates as both. As a C&F agent (CFA), HPL manages manufacturer-owned inventory. As a super stockist, HPL purchases stock outright and redistributes it to sub-stockists and chemists across Central India."
          }
        },
        {
          "@type": "Question",
          "name": "What areas in Madhya Pradesh does HPL serve?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Based in Indore, Hindustan Pharma Logistics serves 60+ manufacturers across the entire state of Madhya Pradesh, with a deep distribution network covering 12+ districts including Indore, Bhopal, and Ujjain."
          }
        }
      ]
    },
    {
      "@type": "Service",
      "name": "Pharmaceutical C&F Agency",
      "serviceType": "Logistics",
      "description": "Comprehensive Carrying & Forwarding (C&F) services for pharmaceutical manufacturers in Indore and Madhya Pradesh.",
      "provider": { "@id": "https://www.hplco.in" },
      "areaServed": "Madhya Pradesh"
    },
    {
      "@type": "Service",
      "name": "Pharma Super Stockist Distribution",
      "serviceType": "Distribution",
      "description": "High-capacity super stockist services redistributing pharmaceutical goods to over 12 districts in Central India.",
      "provider": { "@id": "https://www.hplco.in" },
      "areaServed": "Madhya Pradesh"
    }
  ]
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }}
      />
      <HomeContent />
    </>
  );
}
