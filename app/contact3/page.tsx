import { Metadata } from "next";
import { ContactHero } from "@/components/ContactHero";
import { EnquiryFormV2 } from "@/components/contact2/EnquiryFormV2";

export const metadata: Metadata = {
  title: "Partner With HPL | C&F Agent & Distributor Enquiries — Indore MP",
  description:
    "Submit a partnership enquiry to Hindustan Pharma Logistics. Whether you are a pharma manufacturer seeking a C&F agent or a distributor looking for verified stock, we respond within 24 hours.",
  alternates: {
    canonical: "https://www.hplco.in/contact",
  },
  openGraph: {
    title: "Partner With HPL | C&F Agent & Distributor Enquiries",
    description:
      "Connect with Hindustan Pharma Logistics for C&F agency, super stockist, and distributor partnerships across Madhya Pradesh.",
    url: "https://www.hplco.in/contact",
    type: "website",
  },
};

const contactSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "@id": "https://www.hplco.in/contact/#webpage",
      "url": "https://www.hplco.in/contact",
      "name": "Partner With Hindustan Pharma Logistics",
      "description":
        "Submit a manufacturer or distributor partnership enquiry to HPL. C&F agency, super stockist, and consignee agent services across Madhya Pradesh.",
      "breadcrumb": { "@id": "https://www.hplco.in/contact/#breadcrumb" },
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.hplco.in/contact/#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.hplco.in",
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Contact",
          "item": "https://www.hplco.in/contact",
        },
      ],
    },
  ],
};

export default function Contact3Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <main className="min-h-screen bg-background overflow-x-hidden">
        <ContactHero />
        <section className="pb-32 pt-4">
          <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24 max-w-5xl">
            <EnquiryFormV2 />
          </div>
        </section>
      </main>
    </>
  );
}