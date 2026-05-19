import Link from "next/link";
import {
  Warehouse,
  Truck,
  ShieldCheck,
  Zap,
  MapPin,
  Clock,
  BarChart3,
  CheckCircle2,
} from "lucide-react";

/**
 * Server-rendered SEO content section for the landing page.
 * Provides 800–1200 words of crawlable, structured text content
 * targeting Tier 1, 2, and 3 keywords for Google indexing.
 * 
 * This component is intentionally NOT a client component —
 * it renders as static HTML so search engine crawlers can
 * index the full text content without JavaScript execution.
 */
export function SEOContentSection() {
  return (
    <section
      id="about-hpl"
      className="py-20 px-4 md:px-12 bg-background"
      aria-label="About Hindustan Pharma Logistics"
    >
      <div className="max-w-4xl mx-auto">
        {/* ── Main Heading ──────────────────────────────────────── */}
        <p className="text-[12px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4 text-center font-subtext">
          About HPL
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight text-center mb-4">
          Pharma C&F Agent &amp; Super Stockist in Indore, Madhya Pradesh
        </h2>
        <p className="text-slate-500 text-center max-w-2xl mx-auto mb-14 text-[15px] leading-relaxed font-subtext">
          Since 2009, Hindustan Pharma Logistics has been Central India&apos;s
          trusted pharmaceutical distribution partner — connecting manufacturers
          with markets across Madhya Pradesh.
        </p>

        {/* ── Who We Are ────────────────────────────────────────── */}
        <div className="prose prose-slate max-w-none mb-14">
          <p className="text-[15px] text-slate-600 leading-relaxed font-subtext">
            <strong className="text-slate-800">
              Hindustan Pharma Logistics (HPL)
            </strong>{" "}
            is a pharmaceutical carrying &amp; forwarding (C&F) agent, super
            stockist, consignee agent, and retail distributor headquartered in{" "}
            <strong className="text-slate-800">Indore, Madhya Pradesh</strong>.
            Founded in 2009, HPL operates from its warehouse facility in
            Khajrana, near Indore&apos;s established Dawa Bazaar pharmaceutical
            market, serving as a critical logistics hub for pharma manufacturers
            seeking distribution coverage across Central India.
          </p>
          <p className="text-[15px] text-slate-600 leading-relaxed font-subtext mt-4">
            With over{" "}
            <strong className="text-slate-800">15 years of experience</strong>,{" "}
            <strong className="text-slate-800">
              60+ active manufacturer partnerships
            </strong>
            , and a network of{" "}
            <strong className="text-slate-800">500+ distributors</strong>, HPL
            provides end-to-end pharmaceutical supply chain services — from
            warehouse intake and batch verification to GST billing and last-mile
            dispatch across 12+ districts of Madhya Pradesh.
          </p>
        </div>

        {/* ── Services Grid ─────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
          <ServiceBlock
            icon={<Warehouse size={20} />}
            title="C&F Agency (Carrying & Forwarding)"
            description="HPL warehouses and distributes manufacturer-owned pharmaceutical stock across Madhya Pradesh. We handle inventory management, batch tracking, ERP integration, GST-compliant billing, and dispatch to sub-stockists and distributors — without taking ownership of the stock."
            accentColor="text-pharma-teal"
            accentBg="bg-pharma-teal/8"
          />
          <ServiceBlock
            icon={<Truck size={20} />}
            title="Super Stockist Distribution"
            description="As a super stockist, HPL purchases pharmaceutical stock outright from manufacturers and redistributes to sub-stockists, chemists, and pharmacy chains across 12+ districts. This model is ideal for brands seeking rapid market penetration in Central India."
            accentColor="text-blue-600"
            accentBg="bg-blue-500/8"
          />
          <ServiceBlock
            icon={<ShieldCheck size={20} />}
            title="Consignee Agent Services"
            description="HPL acts as the manufacturer's local representative in Madhya Pradesh — receiving goods, managing documentation, handling claims, and coordinating dispatch to buyers. Consignee services are ideal for manufacturers entering the MP market for the first time."
            accentColor="text-amber-600"
            accentBg="bg-amber-500/8"
          />
          <ServiceBlock
            icon={<Zap size={20} />}
            title="Hindustan Drug House — Retail Distribution"
            description="HPL's own distribution brand, Hindustan Drug House, directly supplies chemists and pharmacies in Indore's Dawa Bazaar and surrounding areas. This retail arm ensures last-mile availability for partner brands."
            accentColor="text-rose-600"
            accentBg="bg-rose-500/8"
          />
        </div>

        {/* ── Service Areas ─────────────────────────────────────── */}
        <div className="rounded-2xl border border-slate-200/80 bg-white/60 p-8 mb-14">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-full bg-pharma-teal/8 flex items-center justify-center text-pharma-teal">
              <MapPin size={18} />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Distribution Coverage Across Madhya Pradesh
            </h3>
          </div>
          <p className="text-[15px] text-slate-600 leading-relaxed font-subtext mb-5">
            Hindustan Pharma Logistics provides pharmaceutical distribution
            services across the entire state of Madhya Pradesh from its central
            hub in Indore. Our distribution network covers major pharmaceutical
            markets in the following districts:
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              "Indore",
              "Bhopal",
              "Ujjain",
              "Dewas",
              "Ratlam",
              "Dhar",
              "Khargone",
              "Barwani",
              "Khandwa",
              "Burhanpur",
              "Jhabua",
              "Alirajpur",
            ].map((district) => (
              <span
                key={district}
                className="px-3 py-1.5 text-xs font-medium rounded-full bg-slate-100 text-slate-700 border border-slate-200/60"
              >
                {district}
              </span>
            ))}
          </div>
        </div>

        {/* ── Why Partner With HPL ──────────────────────────────── */}
        <div className="mb-10">
          <h3 className="text-lg font-bold text-slate-900 mb-6 text-center">
            Why Manufacturers Choose HPL as Their C&F Partner
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <TrustPill icon={<Clock size={16} />} text="15+ years in pharma logistics" />
            <TrustPill icon={<BarChart3 size={16} />} text="60+ active manufacturer brands" />
            <TrustPill icon={<Truck size={16} />} text="500+ distributors in network" />
            <TrustPill icon={<MapPin size={16} />} text="12+ districts covered in MP" />
            <TrustPill icon={<CheckCircle2 size={16} />} text="Fully GST compliant operations" />
            <TrustPill icon={<ShieldCheck size={16} />} text="ERP-tracked inventory & billing" />
          </div>
        </div>

        {/* ── CTA ───────────────────────────────────────────────── */}
        <div className="text-center mt-10">
          <p className="text-sm text-slate-500 mb-4 font-subtext">
            Ready to expand your pharmaceutical distribution in Madhya Pradesh?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-pharma-teal to-pharma-teal-dark text-white rounded-xl font-medium text-sm hover:opacity-90 shadow-[0_8px_24px_rgba(15,118,110,0.25)] transition-all"
          >
            Partner With Hindustan Pharma Logistics
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── Sub-components ──────────────────────────────────────────────── */

function ServiceBlock({
  icon,
  title,
  description,
  accentColor,
  accentBg,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  accentColor: string;
  accentBg: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white/60 p-6">
      <div className="flex items-center gap-3 mb-3">
        <div
          className={`w-9 h-9 rounded-full ${accentBg} flex items-center justify-center ${accentColor}`}
        >
          {icon}
        </div>
        <h3 className="text-[15px] font-bold text-slate-900">{title}</h3>
      </div>
      <p className="text-sm text-slate-600 leading-relaxed font-subtext">
        {description}
      </p>
    </div>
  );
}

function TrustPill({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-white border border-slate-200/60">
      <span className="text-pharma-teal shrink-0">{icon}</span>
      <span className="text-sm text-slate-700 font-medium">{text}</span>
    </div>
  );
}
