import { Metadata } from "next";
import { ContactHero } from "@/components/ContactHero";
import { EnquiryForm } from "@/components/EnquiryForm";

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

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <main className="min-h-screen bg-background overflow-x-hidden">
        <ContactHero />

        {/* ── Enquiry Form Section ─────────────────────────────── */}
        <section className="pb-32 pt-4">
          <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24 max-w-5xl">
            <EnquiryForm />
          </div>
        </section>

        {/* ── Contact Info Strip ───────────────────────────────── */}
        <section className="border-t border-border/50 bg-muted/30 py-16">
          <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24 max-w-5xl">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-left">

              {/* Address */}
              <div className="flex flex-col items-center sm:items-start gap-2">
                <div className="w-10 h-10 rounded-full bg-[#0e7c6e]/10 flex items-center justify-center mb-1">
                  <svg
                    className="w-5 h-5 text-[#0e7c6e]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.8}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.8}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Office
                </p>
                <p className="text-sm text-foreground leading-relaxed">
                  RamKrishna Bagh, Khajrana
                  <br />
                  Indore, Madhya Pradesh 452016
                </p>
              </div>

              {/* Phone */}
              <div className="flex flex-col items-center sm:items-start gap-2">
                <div className="w-10 h-10 rounded-full bg-[#0e7c6e]/10 flex items-center justify-center mb-1">
                  <svg
                    className="w-5 h-5 text-[#0e7c6e]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.8}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Phone
                </p>
                <a
                  href="tel:+917316056001"
                  className="text-sm text-foreground hover:text-[#0e7c6e] transition-colors"
                >
                  0731-6056001
                </a>
                <a
                  href="tel:+919300001411"
                  className="text-sm text-foreground hover:text-[#0e7c6e] transition-colors"
                >
                  +91 93000 01411
                </a>
              </div>

              {/* Email + Hours */}
              <div className="flex flex-col items-center sm:items-start gap-2">
                <div className="w-10 h-10 rounded-full bg-[#0e7c6e]/10 flex items-center justify-center mb-1">
                  <svg
                    className="w-5 h-5 text-[#0e7c6e]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.8}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Email & Hours
                </p>
                <a
                  href="mailto:hindustanpharma1@yahoo.com"
                  className="text-sm text-foreground hover:text-[#0e7c6e] transition-colors"
                >
                  hindustanpharma1@yahoo.com
                </a>
                <p className="text-sm text-muted-foreground">
                  Mon – Sat, 10 am – 6 pm
                </p>
              </div>

            </div>
          </div>
        </section>
      </main>
    </>
  );
}
