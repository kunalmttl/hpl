import { Metadata } from "next";
import { ContactHero } from "@/components/ContactHero";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact HPL | Business Enquiries & Logistics Support",
  description: "Get in touch with Hindustan Pharma Logistics for C&F agency, super stockist distribution, and cold chain services in Indore and Central India.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background pt-0 overflow-x-hidden">
      <ContactHero />
      <section className="pb-24">
        <div className="container mx-auto px-8 md:px-16 lg:px-24">
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
