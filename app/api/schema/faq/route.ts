import { NextResponse } from "next/server";

const faqSchema = {
  "@context": "https://schema.org",
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
};

export async function GET() {
  return NextResponse.json(faqSchema, {
    headers: {
      "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=3600",
    },
  });
}
