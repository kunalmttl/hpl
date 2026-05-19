import type { Metadata } from "next";
import { HomeContent } from "@/components/HomeContent";

export const metadata: Metadata = {
  title: "Hindustan Pharma Logistics | C&F Agent, Consignee & Super Stockist Indore",
  description: "HPL is Central India's leading C&F agent and super stockist. Trusted pharma logistics hub in Indore serving 60+ manufacturers since 2009.",
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
            "text": "Based in Indore, Hindustan Pharma Logistics serves 60+ manufacturers across the entire state of Madhya Pradesh, with a deep distribution network covering 12+ districts including Indore, Bhopal, Ujjain, Dewas, Ratlam, and Dhar."
          }
        },
        {
          "@type": "Question",
          "name": "How to appoint a C&F agent in Madhya Pradesh?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "To appoint a C&F agent in Madhya Pradesh, manufacturers should evaluate warehouse capacity, distribution reach, GST compliance, and ERP tracking capabilities. HPL offers all of these from its centrally located facility in Indore, serving as a single-point distribution hub for the entire state."
          }
        },
        {
          "@type": "Question",
          "name": "What is the difference between a C&F agent and a consignee agent?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A C&F agent stores manufacturer-owned stock and handles billing and dispatch. A consignee agent acts as the manufacturer's local representative, receiving goods, managing documentation, and coordinating dispatch to buyers — without necessarily warehousing large quantities. HPL provides both services."
          }
        },
        {
          "@type": "Question",
          "name": "Does HPL handle cold chain pharma logistics?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "HPL maintains temperature-controlled storage areas within its warehouse facility in Indore to handle pharmaceutical products that require cold chain logistics, including vaccines and temperature-sensitive medications."
          }
        },
        {
          "@type": "Question",
          "name": "What documents are needed to partner with HPL as a manufacturer?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Manufacturers looking to appoint HPL as their C&F agent or super stockist in Madhya Pradesh typically need a valid drug license, GST registration, and a formal C&F agreement. HPL's team handles onboarding, ERP integration, and distributor mapping."
          }
        }
      ]
    },
    {
      "@type": "Service",
      "name": "Pharmaceutical C&F Agency",
      "serviceType": "Carrying and Forwarding",
      "description": "Comprehensive Carrying & Forwarding (C&F) services for pharmaceutical manufacturers in Indore and Madhya Pradesh. Warehouse storage, inventory management, GST billing, and dispatch to distributors.",
      "provider": { "@id": "https://www.hplco.in" },
      "areaServed": "Madhya Pradesh"
    },
    {
      "@type": "Service",
      "name": "Pharma Super Stockist Distribution",
      "serviceType": "Distribution",
      "description": "High-capacity super stockist services — purchasing and redistributing pharmaceutical goods to sub-stockists and chemists across 12+ districts in Central India.",
      "provider": { "@id": "https://www.hplco.in" },
      "areaServed": "Madhya Pradesh"
    },
    {
      "@type": "Service",
      "name": "Pharma Consignee Agent Services",
      "serviceType": "Consignment",
      "description": "Consignee agent services for pharma manufacturers — receiving goods, managing documentation, and coordinating dispatch to buyers across Madhya Pradesh on behalf of the manufacturer.",
      "provider": { "@id": "https://www.hplco.in" },
      "areaServed": "Madhya Pradesh"
    },
    {
      "@type": "Service",
      "name": "Hindustan Drug House — Retail Pharma Distribution",
      "serviceType": "Retail Distribution",
      "description": "HPL's own distribution brand directly supplying chemists, pharmacies, and retail outlets in Indore's Dawa Bazaar and surrounding areas of Madhya Pradesh.",
      "provider": { "@id": "https://www.hplco.in" },
      "areaServed": "Indore, Madhya Pradesh"
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
