import { Metadata } from "next";
import { ContactHero } from "@/components/ContactHero";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact HPL | CFA & C&F Agent Business Enquiries Indore",
  description: "Get in touch with Hindustan Pharma Logistics for C&F agency (CFA), super stockist distribution, and business partnerships in Indore and Madhya Pradesh.",
  alternates: {
    canonical: "https://www.hplco.in/contact",
  }
};

const contactSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "@id": "https://www.hplco.in/contact/#webpage",
      "url": "https://www.hplco.in/contact",
      "name": "Contact Hindustan Pharma Logistics",
      "description": "Business enquiry and contact details for HPL pharma logistics services.",
      "breadcrumb": { "@id": "https://www.hplco.in/#breadcrumb" }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.hplco.in/contact/#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.hplco.in"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Contact",
          "item": "https://www.hplco.in/contact"
        }
      ]
    }
  ]
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <main className="min-h-screen bg-background pt-0 overflow-x-hidden">
        <ContactHero />
        <section className="pb-24">
          <div className="container mx-auto px-8 md:px-16 lg:px-24">
            <ContactForm />
          </div>
        </section>
      </main>
    </>
  );
}
