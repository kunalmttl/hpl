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

        {/* ── Intro paragraph for SEO ─────────────────────────── */}
        <section className="pb-6">
          <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24 max-w-5xl">
            <div className="rounded-2xl border border-teal-500/10 bg-gradient-to-br from-teal-500/5 to-slate-500/5 p-6 md:p-8 backdrop-blur-sm shadow-sm max-w-3xl mx-auto text-center transition-all duration-300 hover:border-teal-500/20">
              <p className="text-sm md:text-[15px] text-slate-600 dark:text-slate-300 leading-relaxed font-subtext max-w-2xl mx-auto">
                For manufacturer partnerships, C&amp;F agency appointments, super stockist
                enquiries, and distributor registrations across Madhya Pradesh —
                contact Hindustan Pharma Logistics using the form below. We respond
                within 24 hours.
              </p>
            </div>
          </div>
        </section>

        <section className="pb-20 pt-4">
          <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24 max-w-5xl">
            <EnquiryFormV2 />
          </div>
        </section>

        {/* ── Contact Info Strip ───────────────────────────────── */}
        <section className="py-16 bg-gradient-to-b from-transparent to-muted/20 border-t border-border/50">
          <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24 max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              {/* Address Card */}
              <div className="group relative rounded-2xl border border-border/60 bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#0e7c6e]/40 hover:shadow-md">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#0e7c6e]/5 flex items-center justify-center shrink-0 transition-colors duration-300 group-hover:bg-[#0e7c6e]/10">
                    <svg className="w-6 h-6 text-[#0e7c6e] transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Office Address</p>
                    <p className="text-sm text-foreground leading-relaxed">
                      First Floor, 3-4-5, MR 9 Rd,<br />
                      Opp. Mahek Vatika Garden, RamKrishna Bagh,<br />
                      Khajrana, Indore, MP 452010
                    </p>
                  </div>
                </div>
              </div>

              {/* Phone Card */}
              <div className="group relative rounded-2xl border border-border/60 bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#0e7c6e]/40 hover:shadow-md">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#0e7c6e]/5 flex items-center justify-center shrink-0 transition-colors duration-300 group-hover:bg-[#0e7c6e]/10">
                    <svg className="w-6 h-6 text-[#0e7c6e] transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="space-y-1 flex flex-col items-start w-full">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Phone Support</p>
                    <a href="tel:+917316056001" className="text-sm font-medium text-foreground hover:text-[#0e7c6e] transition-colors">
                      0731-6056001
                    </a>
                    <a href="tel:+919300001411" className="text-sm font-medium text-foreground hover:text-[#0e7c6e] transition-colors">
                      +91 93000 01411
                    </a>
                  </div>
                </div>
              </div>

              {/* Email & Hours Card */}
              <div className="group relative rounded-2xl border border-border/60 bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#0e7c6e]/40 hover:shadow-md">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#0e7c6e]/5 flex items-center justify-center shrink-0 transition-colors duration-300 group-hover:bg-[#0e7c6e]/10">
                    <svg className="w-6 h-6 text-[#0e7c6e] transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="space-y-1 w-full">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email &amp; Hours</p>
                    <a href="mailto:hindustanpharma1@yahoo.com" className="text-sm font-medium text-foreground hover:text-[#0e7c6e] transition-colors break-all block mb-1">
                      hindustanpharma1@yahoo.com
                    </a>
                    <div className="flex items-center gap-1 text-[11px] font-medium text-muted-foreground bg-muted/60 px-2 py-0.5 rounded-md w-fit">
                      <svg className="w-3.5 h-3.5 text-[#0e7c6e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Mon – Sat, 10 am – 6:30 pm
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── Google Maps Embed ────────────────────────────────── */}
        <section className="pb-20" aria-label="HPL Office Location on Google Maps">
          <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24 max-w-5xl">
            <div className="relative rounded-3xl border border-border/80 bg-card p-2 shadow-lg overflow-hidden group hover:border-[#0e7c6e]/30 transition-all duration-300">
              <div className="absolute top-4 left-4 z-10 bg-background/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-border/50 shadow-sm pointer-events-none flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs font-semibold text-foreground">Verified Location</span>
              </div>
              
              {/* Get Directions Button */}
              <a
                href="https://maps.app.goo.gl/7MjNCYrdkNSgRuLr5"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-4 right-4 z-10 bg-[#0e7c6e] hover:bg-[#0d6b5f] text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md transition-all duration-300 flex items-center gap-2 group-hover:shadow-lg"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Get Directions
              </a>

              <iframe
                title="Hindustan Pharma Logistics - Office Location in Khajrana, Indore"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3679.540131495908!2d75.9083201!3d22.740256!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962e3d3b7a5bf57%3A0xb3a827560a8a6493!2sHindustan%20Pharma%20Logistics!5e0!3m2!1sen!2sin!4v1700000000000"
                width="100%"
                height="380"
                style={{ border: 0, borderRadius: "1.25rem" }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full grayscale contrast-[1.1] brightness-[0.98] transition-all duration-500 group-hover:grayscale-0"
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
