"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────
type Role = "manufacturer" | "distributor" | null;

interface FormData {
  role: Role;
  // Shared
  companyName: string;
  contactName: string;
  phone: string;
  email: string;
  // Manufacturer-specific
  drugLicense: string;
  productCategories: string[];
  monthlyVolume: string;
  districtsNeeded: string;
  // Distributor-specific
  gstNo: string;
  yearsInOperation: string;
  preferredCategories: string[];
  operatingDistricts: string;
  // Shared optional
  message: string;
}

const INITIAL: FormData = {
  role: null,
  companyName: "",
  contactName: "",
  phone: "",
  email: "",
  drugLicense: "",
  productCategories: [],
  monthlyVolume: "",
  districtsNeeded: "",
  gstNo: "",
  yearsInOperation: "",
  preferredCategories: [],
  operatingDistricts: "",
  message: "",
};

const CATEGORIES = [
  "Tablets & Capsules",
  "Injectables",
  "Syrups & Liquids",
  "Ointments & Creams",
  "FMCG / OTC",
  "Surgical",
];

const VOLUMES = [
  "Under ₹10 Lakh / month",
  "₹10 – ₹50 Lakh / month",
  "₹50 Lakh – ₹1 Cr / month",
  "Above ₹1 Cr / month",
];

const YEARS = ["Less than 1 year", "1 – 3 years", "3 – 7 years", "7+ years"];

// ─── Step indicators ──────────────────────────────────────────────────────────
const steps = ["Select Role", "Business Details", "Submit"];

function StepBar({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-0 mb-10">
      {steps.map((label, i) => (
        <div key={i} className="flex items-center flex-1 last:flex-none">
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 ${
                i < current
                  ? "bg-[#0e7c6e] text-white"
                  : i === current
                  ? "bg-[#0e7c6e] text-white ring-4 ring-[#0e7c6e]/20"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {i < current ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                i + 1
              )}
            </div>
            <span
              className={`text-[11px] mt-1.5 font-medium whitespace-nowrap ${
                i === current ? "text-[#0e7c6e]" : "text-muted-foreground"
              }`}
            >
              {label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              className={`flex-1 h-px mx-2 mb-4 transition-all duration-500 ${
                i < current ? "bg-[#0e7c6e]" : "bg-border"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Toggle checkbox pill ─────────────────────────────────────────────────────
function Pill({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 ${
        selected
          ? "bg-[#0e7c6e] border-[#0e7c6e] text-white"
          : "border-border text-muted-foreground hover:border-[#0e7c6e]/50 hover:text-foreground"
      }`}
    >
      {label}
    </button>
  );
}

// ─── Input wrapper ────────────────────────────────────────────────────────────
function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
        {required && <span className="text-[#0e7c6e] ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-[#0e7c6e]/40 focus:border-[#0e7c6e] transition-all duration-200";

const selectCls = inputCls + " cursor-pointer";

// ─── Slide animation ──────────────────────────────────────────────────────────
const slide = {
  initial: { opacity: 0, x: 32 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -32 },
  transition: { duration: 0.28, ease: "easeInOut" as const },
};

// ─── Main Component ───────────────────────────────────────────────────────────
export function EnquiryForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>(INITIAL);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const set = (key: keyof FormData, value: unknown) =>
    setData((prev) => ({ ...prev, [key]: value }));

  const toggleCat = (field: "productCategories" | "preferredCategories", val: string) => {
    const arr = data[field] as string[];
    set(field, arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]);
  };

  // ── Step 0 — Role selection ─────────────────────────────────────────────────
  const Step0 = (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground tracking-tight">
          Who are you?
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          We tailor your enquiry so our team can respond with exactly the right information.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        {/* Manufacturer card */}
        <button
          type="button"
          onClick={() => { set("role", "manufacturer"); setStep(1); }}
          className={`group relative rounded-2xl border-2 p-6 text-left transition-all duration-200 hover:shadow-lg ${
            data.role === "manufacturer"
              ? "border-[#0e7c6e] bg-[#0e7c6e]/5"
              : "border-border bg-card hover:border-[#0e7c6e]/50"
          }`}
        >
          <div className="w-12 h-12 rounded-xl bg-[#0e7c6e]/10 flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-[#0e7c6e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h3 className="font-semibold text-foreground text-base">Pharma Manufacturer</h3>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
            Looking for a C&F agent, super stockist, or consignee in MP
          </p>
          <div className="absolute top-4 right-4 w-5 h-5 rounded-full border-2 border-border group-hover:border-[#0e7c6e] flex items-center justify-center transition-all duration-200">
            {data.role === "manufacturer" && (
              <div className="w-2.5 h-2.5 rounded-full bg-[#0e7c6e]" />
            )}
          </div>
        </button>

        {/* Distributor card */}
        <button
          type="button"
          onClick={() => { set("role", "distributor"); setStep(1); }}
          className={`group relative rounded-2xl border-2 p-6 text-left transition-all duration-200 hover:shadow-lg ${
            data.role === "distributor"
              ? "border-[#0e7c6e] bg-[#0e7c6e]/5"
              : "border-border bg-card hover:border-[#0e7c6e]/50"
          }`}
        >
          <div className="w-12 h-12 rounded-xl bg-[#0e7c6e]/10 flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-[#0e7c6e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </div>
          <h3 className="font-semibold text-foreground text-base">Distributor / Stockist</h3>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
            Looking to source verified pharmaceutical stock through HPL
          </p>
          <div className="absolute top-4 right-4 w-5 h-5 rounded-full border-2 border-border group-hover:border-[#0e7c6e] flex items-center justify-center transition-all duration-200">
            {data.role === "distributor" && (
              <div className="w-2.5 h-2.5 rounded-full bg-[#0e7c6e]" />
            )}
          </div>
        </button>
      </div>
    </div>
  );

  // ── Step 1 — Business details ───────────────────────────────────────────────
  const Step1Manufacturer = (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground tracking-tight">
          Tell us about your company
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          We'll use this to understand your distribution requirements.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Company Name" required>
          <input className={inputCls} placeholder="e.g. Cipla Limited" value={data.companyName}
            onChange={e => set("companyName", e.target.value)} />
        </Field>

        <Field label="Contact Person" required>
          <input className={inputCls} placeholder="Full name" value={data.contactName}
            onChange={e => set("contactName", e.target.value)} />
        </Field>

        <Field label="Phone Number" required>
          <input className={inputCls} placeholder="+91 XXXXX XXXXX" type="tel" value={data.phone}
            onChange={e => set("phone", e.target.value)} />
        </Field>

        <Field label="Email Address">
          <input className={inputCls} placeholder="your@company.com" type="email" value={data.email}
            onChange={e => set("email", e.target.value)} />
        </Field>

        <Field label="Drug License Number" required>
          <input className={inputCls} placeholder="e.g. MP/XX/XXXXX" value={data.drugLicense}
            onChange={e => set("drugLicense", e.target.value)} />
        </Field>

        <Field label="Monthly Stock Volume">
          <select className={selectCls} value={data.monthlyVolume}
            onChange={e => set("monthlyVolume", e.target.value)}>
            <option value="">Select range</option>
            {VOLUMES.map(v => <option key={v} value={v}>{v}</option>)}
          </select>
        </Field>
      </div>

      <Field label="Product Categories">
        <div className="flex flex-wrap gap-2 mt-1">
          {CATEGORIES.map(c => (
            <Pill key={c} label={c} selected={data.productCategories.includes(c)}
              onClick={() => toggleCat("productCategories", c)} />
          ))}
        </div>
      </Field>

      <Field label="Districts Requiring Coverage">
        <input className={inputCls} placeholder="e.g. Ujjain, Dewas, Ratlam, Sehore"
          value={data.districtsNeeded} onChange={e => set("districtsNeeded", e.target.value)} />
      </Field>

      <Field label="Additional Message">
        <textarea className={inputCls + " resize-none"} rows={3}
          placeholder="Any specific requirements or questions..." value={data.message}
          onChange={e => set("message", e.target.value)} />
      </Field>
    </div>
  );

  const Step1Distributor = (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground tracking-tight">
          Tell us about your business
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          We'll match you with suitable manufacturers from our network.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Business Name" required>
          <input className={inputCls} placeholder="e.g. Sharma Pharma Distributors" value={data.companyName}
            onChange={e => set("companyName", e.target.value)} />
        </Field>

        <Field label="Contact Person" required>
          <input className={inputCls} placeholder="Full name" value={data.contactName}
            onChange={e => set("contactName", e.target.value)} />
        </Field>

        <Field label="Phone Number" required>
          <input className={inputCls} placeholder="+91 XXXXX XXXXX" type="tel" value={data.phone}
            onChange={e => set("phone", e.target.value)} />
        </Field>

        <Field label="Email Address">
          <input className={inputCls} placeholder="your@business.com" type="email" value={data.email}
            onChange={e => set("email", e.target.value)} />
        </Field>

        <Field label="Drug License Number" required>
          <input className={inputCls} placeholder="Form 20B / 21B" value={data.drugLicense}
            onChange={e => set("drugLicense", e.target.value)} />
        </Field>

        <Field label="GST Number" required>
          <input className={inputCls} placeholder="23XXXXXXXXXXXZX" value={data.gstNo}
            onChange={e => set("gstNo", e.target.value)} />
        </Field>

        <Field label="Years in Operation">
          <select className={selectCls} value={data.yearsInOperation}
            onChange={e => set("yearsInOperation", e.target.value)}>
            <option value="">Select</option>
            {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </Field>
      </div>

      <Field label="Operating Districts in MP">
        <input className={inputCls} placeholder="e.g. Indore, Ujjain, Ratlam" value={data.operatingDistricts}
          onChange={e => set("operatingDistricts", e.target.value)} />
      </Field>

      <Field label="Preferred Product Categories">
        <div className="flex flex-wrap gap-2 mt-1">
          {CATEGORIES.map(c => (
            <Pill key={c} label={c} selected={data.preferredCategories.includes(c)}
              onClick={() => toggleCat("preferredCategories", c)} />
          ))}
        </div>
      </Field>

      <Field label="Additional Message">
        <textarea className={inputCls + " resize-none"} rows={3}
          placeholder="Any specific requirements or questions..." value={data.message}
          onChange={e => set("message", e.target.value)} />
      </Field>
    </div>
  );

  // ── Validate step 1 ─────────────────────────────────────────────────────────
  const canProceed = () => {
    if (!data.companyName.trim() || !data.contactName.trim() || !data.phone.trim()) return false;
    if (!data.drugLicense.trim()) return false;
    if (data.role === "distributor" && !data.gstNo.trim()) return false;
    return true;
  };

  // ── Submit ──────────────────────────────────────────────────────────────────
  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Server error");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please call us directly at 0731-6056001.");
    } finally {
      setLoading(false);
    }
  };

  // ── Success state ───────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-3xl border border-[#0e7c6e]/30 bg-[#0e7c6e]/5 p-10 text-center"
      >
        <div className="w-16 h-16 rounded-full bg-[#0e7c6e] flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-2">Enquiry Received</h3>
        <p className="text-muted-foreground text-sm max-w-sm mx-auto leading-relaxed">
          Thank you, <strong>{data.contactName}</strong>. Our team will review your enquiry
          and reach out within <strong>24 hours</strong>.
        </p>
        <div className="mt-6 text-xs text-muted-foreground">
          Questions in the meantime?{" "}
          <a href="tel:+917316056001" className="text-[#0e7c6e] font-semibold hover:underline">
            0731-6056001
          </a>
        </div>
      </motion.div>
    );
  }

  // ── Main render ─────────────────────────────────────────────────────────────
  return (
    <div className="rounded-3xl border border-border/60 bg-card/80 backdrop-blur-sm shadow-xl shadow-black/5 p-6 sm:p-10">
      <StepBar current={step} />

      <AnimatePresence mode="wait">
        <motion.div key={step} {...slide}>
          {step === 0 && Step0}
          {step === 1 && data.role === "manufacturer" && Step1Manufacturer}
          {step === 1 && data.role === "distributor" && Step1Distributor}
        </motion.div>
      </AnimatePresence>

      {/* ── Navigation buttons ─────────────────────────────────────────────── */}
      {step > 0 && (
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-border/50">
          <button
            type="button"
            onClick={() => setStep(s => s - 1)}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>

          <div className="flex flex-col items-end gap-1">
            {error && (
              <p className="text-xs text-red-500">{error}</p>
            )}
            <button
              type="button"
              disabled={!canProceed() || loading}
              onClick={handleSubmit}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#0e7c6e] text-white text-sm font-semibold hover:bg-[#0b6b5e] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-md shadow-[#0e7c6e]/20"
            >
              {loading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                  </svg>
                  Sending...
                </>
              ) : (
                <>
                  Submit Enquiry
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
