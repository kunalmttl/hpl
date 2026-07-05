import { Metadata } from "next";
import { ContactHero } from "@/components/ContactHero";
import { EnquiryFormV2 } from "@/components/contact/EnquiryFormV2";

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

        {/* ── Enquiry Form ─────────────────────────────────────── */}
        <section className="pb-24 pt-2">
          <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24 max-w-5xl">
            {/* Section label */}
            <div className="flex items-center gap-3 mb-8">
              <span className="w-5 h-[2px] bg-[#0F766E]" />
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0F766E] font-body">
                Partnership Enquiry
              </span>
            </div>
            <EnquiryFormV2 />
          </div>
        </section>

        {/* ── Contact Info Strip ──────────────────────────────── */}
        <section className="py-0 pb-24" aria-label="Contact information">
          <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24 max-w-5xl">

            {/* Dark filled header band */}
            <div className="rounded-t-2xl bg-[#042F2E] px-8 py-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#0F766E] font-body font-semibold mb-1">Reach us directly</p>
                <h2 className="font-heading text-2xl md:text-3xl text-white leading-tight">Hindustan Pharma Logistics</h2>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-emerald-300 font-body font-medium">Open · Mon–Sat, 10am–6:30pm</span>
              </div>
            </div>

            {/* Cards row */}
            <div className="grid grid-cols-1 md:grid-cols-3 rounded-b-2xl overflow-hidden border border-t-0 border-border/60 bg-card shadow-lg">

              {/* Address */}
              <div className="group p-6 border-b md:border-b-0 md:border-r border-border/60 transition-colors duration-300 hover:bg-[#0F766E]/[0.04]">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-9 h-9 rounded-lg bg-[#0F766E]/10 flex items-center justify-center shrink-0">
                    <svg className="w-4.5 h-4.5 text-[#0F766E]" width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground font-body">Office</span>
                </div>
                <p className="text-sm text-foreground leading-relaxed font-body">
                  First Floor, 3-4-5, MR 9 Rd,<br />
                  Opp. Mahek Vatika Garden,<br />
                  Khajrana, Indore, MP&nbsp;452010
                </p>
                <a
                  href="https://maps.app.goo.gl/7MjNCYrdkNSgRuLr5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-4 text-xs font-semibold text-[#0F766E] hover:underline font-body group-hover:gap-2.5 transition-all duration-200"
                >
                  View on map
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>

              {/* Phone */}
              <div className="group p-6 border-b md:border-b-0 md:border-r border-border/60 transition-colors duration-300 hover:bg-[#0F766E]/[0.04]">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-9 h-9 rounded-lg bg-[#0F766E]/10 flex items-center justify-center shrink-0">
                    <svg className="w-4.5 h-4.5 text-[#0F766E]" width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground font-body">Phone</span>
                </div>
                <div className="flex flex-col gap-2">
                  <a href="tel:+917316056001" className="text-sm font-semibold text-foreground hover:text-[#0F766E] transition-colors duration-200 font-body">
                    0731-6056001
                  </a>
                  <a href="tel:+919300001411" className="text-sm font-semibold text-foreground hover:text-[#0F766E] transition-colors duration-200 font-body">
                    +91 93000 01411
                  </a>
                </div>
                <a
                  href="tel:+917316056001"
                  className="inline-flex items-center gap-1.5 mt-4 text-xs font-semibold text-[#0F766E] hover:underline font-body group-hover:gap-2.5 transition-all duration-200"
                >
                  Call now
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>

              {/* Email */}
              <div className="group p-6 transition-colors duration-300 hover:bg-[#0F766E]/[0.04]">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-9 h-9 rounded-lg bg-[#0F766E]/10 flex items-center justify-center shrink-0">
                    <svg className="w-4.5 h-4.5 text-[#0F766E]" width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground font-body">Email</span>
                </div>
                <a
                  href="mailto:hindustanpharma1@yahoo.com"
                  className="text-sm font-semibold text-foreground hover:text-[#0F766E] transition-colors duration-200 break-all block font-body"
                >
                  hindustanpharma1@yahoo.com
                </a>
                <a
                  href="mailto:hindustanpharma1@yahoo.com"
                  className="inline-flex items-center gap-1.5 mt-4 text-xs font-semibold text-[#0F766E] hover:underline font-body group-hover:gap-2.5 transition-all duration-200"
                >
                  Send email
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>

            </div>
          </div>
        </section>

        {/* ── Google Maps Embed ────────────────────────────────── */}
        <section className="pb-24" aria-label="HPL Office Location on Google Maps">
          <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24 max-w-5xl">

            {/* Label row */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <span className="w-5 h-[2px] bg-[#0F766E]" />
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0F766E] font-body">Find Us</span>
              </div>
              <a
                href="https://maps.app.goo.gl/7MjNCYrdkNSgRuLr5"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#0F766E] hover:bg-[#0a5f58] text-white px-5 py-2.5 rounded-xl text-sm font-semibold font-body transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Get Directions
              </a>
            </div>

            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-border/60 group">
              {/* Verified pin badge */}
              <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full border border-border/40 shadow flex items-center gap-1.5 pointer-events-none">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-semibold text-foreground font-body">Verified Location · Khajrana, Indore</span>
              </div>

              <iframe
                title="Hindustan Pharma Logistics - Office Location in Khajrana, Indore"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3679.540131495908!2d75.9083201!3d22.740256!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962e3d3b7a5bf57%3A0xb3a827560a8a6493!2sHindustan%20Pharma%20Logistics!5e0!3m2!1sen!2sin!4v1700000000000"
                width="100%"
                height="420"
                style={{ border: 0, display: "block" }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full transition-all duration-500 grayscale-[0.2] group-hover:grayscale-0"
              />
            </div>

          </div>
        </section>
      </main>
    </>
  );
}
