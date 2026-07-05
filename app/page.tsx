import type { Metadata } from "next";
import { HomeContent } from "@/components/HomeContent";
import { DeferredFAQSchema } from "@/components/DeferredFAQSchema";

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

// Services schema — stays inline for immediate SEO indexing.
// FAQPage schema is deferred via DeferredFAQSchema component to reduce
// initial HTML payload size (removes ~3.5 KB from the critical path).
const servicesSchema = {
  "@context": "https://schema.org",
  "@graph": [
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />
      {/* FAQPage schema is injected after page becomes interactive to reduce HTML payload */}
      <DeferredFAQSchema />
      <HomeContent />
    </>
  );
}
