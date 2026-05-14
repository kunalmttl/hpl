"use client";

import { motion } from "framer-motion";
import { FormField } from "./FormField";
import { ContactInput } from "@/components/ContactInput";
import { ContactSelect } from "@/components/ContactSelect";
import { ContactTextarea } from "@/components/ContactTextarea";

interface RequirementsStepProps {
  formData: any;
  onFieldUpdate: (field: string, value: unknown) => void;
  onNext: () => void;
  onBack: () => void;
}

export function RequirementsStep({ 
  formData, 
  onFieldUpdate, 
  onNext, 
  onBack 
}: RequirementsStepProps) {
  
  const toggleCategory = (category: string) => {
    // For simplicity, we'll use the same categories for both roles in requirements
    onFieldUpdate("productCategories", 
      formData.productCategories.includes(category)
        ? formData.productCategories.filter(c => c !== category)
        : [...formData.productCategories, category]
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className="space-y-6"
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 mb-2 tracking-tight">
            What are you looking for?
          </h2>
          <p className="text-sm text-slate-500">
            Help us understand your specific requirements.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <FormField label="Required Monthly Volume">
            <ContactSelect
              label=""
              value={formData.monthlyVolume || ""}
              onChange={(e) => onFieldUpdate("monthlyVolume", e.target.value)}
              options={[
                { label: "Select range", value: "" },
                ...["Under ₹10 Lakh / month", "₹10 – ₹50 Lakh / month", "₹50 Lakh – ₹1 Cr / month", "Above ₹1 Cr / month"].map(v => ({ label: v, value: v }))
              ]}
            />
          </FormField>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <FormField label="Preferred Engagement Model">
            <ContactSelect
              label=""
              value={formData.preferredCategories?.[0] || ""} // Simplified for demo
              onChange={(e) => onFieldUpdate("preferredCategories", e.target.value ? [e.target.value] : [])}
              options={[
                { label: "Select model", value: "" },
                { label: "C&F Agency", value: "C&F Agency" },
                { label: "Super Stockist", value: "Super Stockist" },
                { label: "Consignee Agent", value: "Consignee Agent" },
                { label: "Contract Manufacturing", value: "Contract Manufacturing" },
                { label: "Loan License", value: "Loan License" }
              ].map(opt => ({ label: opt.label, value: opt.value }))}
            />
          </FormField>
        </div>

        <FormField label="Geographic Coverage Needed">
          <ContactInput
            placeholder="e.g. Madhya Pradesh, Chhattisgarh, Rajasthan"
            value={formData.districtsNeeded || ""}
            onChange={(e) => onFieldUpdate("districtsNeeded", e.target.value)}
          />
        </FormField>

        <FormField label="Specific Product Interests">
          <p className="text-sm text-slate-500 mb-2">
            Select all that apply
          </p>
          <div className="flex flex-wrap gap-2">
            {["Tablets & Capsules", "Injectables", "Syrups & Liquids", "Ointments & Creams", "FMCG / OTC", "Surgical"].map((category) => (
              <label key={category} className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 
                {formData.productCategories?.includes(category)
                  ? 'bg-[#0e7c6e] border-[#0e7c6e] text-white'
                  : 'border-border text-muted-foreground hover:border-[#0e7c6e]/50 hover:text-foreground'}"
              >
                <input
                  type="checkbox"
                  checked={formData.productCategories?.includes(category) || false}
                  onChange={() => toggleCategory(category)}
                  className="sr-only peer"
                />
                <span className="relative inline-block h-5 w-5 rounded border border-gray-300 peer-checked:bg-[#0e7c6e] peer-checked:border-[#0e7c6e]">
                  {formData.productCategories?.includes(category) && (
                    <span className="absolute inset-0 flex items-center justify-center text-white text-xs">
                      ✓
                    </span>
                  )}
                </span>
                <span className="ml-2">{category}</span>
              </label>
            ))}
          </div>
        </FormField>

        <FormField label="Timeline for Partnership">
          <ContactSelect
            label=""
            value={formData.yearsInOperation || ""} // Repurposing field for demo
            onChange={(e) => onFieldUpdate("yearsInOperation", e.target.value)}
            options={[
              { label: "Select timeline", value: "" },
              { label: "Immediate (0-3 months)", value: "Immediate" },
              { label: "Near-term (3-6 months)", value: "Near-term" },
              { label: "Mid-term (6-12 months)", value: "Mid-term" },
              { label: "Long-term (12+ months)", value: "Long-term" }
            ].map(opt => ({ label: opt.label, value: opt.value }))}
          />
        </FormField>

        <FormField label="Additional Requirements">
          <ContactTextarea
            placeholder="Any other details about your requirements..."
            value={formData.message || ""}
            onChange={(e) => onFieldUpdate("message", e.target.value)}
            rows={4}
          />
        </FormField>
      </div>

      <div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-200/50">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <button
          onClick={onNext}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0e7c6e] text-white text-sm font-semibold hover:bg-[#0b6b5e] transition-all duration-200"
        >
          Review & Submit
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
}