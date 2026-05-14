"use client";

import { motion } from "framer-motion";
import { FormField } from "./FormField";
import { ContactInput } from "@/components/ContactInput";
import { ContactSelect } from "@/components/ContactSelect";
import { ContactTextarea } from "@/components/ContactTextarea";

interface DistributorBusinessStepProps {
  formData: any;
  onFieldUpdate: (field: string, value: unknown) => void;
  onNext: () => void;
  onBack: () => void;
}

export function DistributorBusinessStep({ 
  formData, 
  onFieldUpdate, 
  onNext, 
  onBack 
}: DistributorBusinessStepProps) {
  
  const toggleCategory = (category: string) => {
    onFieldUpdate("preferredCategories", 
      formData.preferredCategories.includes(category)
        ? formData.preferredCategories.filter(c => c !== category)
        : [...formData.preferredCategories, category]
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
            Tell us about your distribution business
          </h2>
          <p className="text-sm text-slate-500">
            Help us match you with suitable manufacturers.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <FormField label="Drug License Number" required>
            <ContactInput
              placeholder="Form 20B / 21B"
              value={formData.drugLicense}
              onChange={(e) => onFieldUpdate("drugLicense", e.target.value)}
            />
          </FormField>

          <FormField label="GST Number" required>
            <ContactInput
              placeholder="23XXXXXXXXXXXZX"
              value={formData.gstNo}
              onChange={(e) => onFieldUpdate("gstNo", e.target.value)}
            />
          </FormField>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <FormField label="Years in Operation">
            <ContactSelect
              label=""
              value={formData.yearsInOperation}
              onChange={(e) => onFieldUpdate("yearsInOperation", e.target.value)}
              options={[
                { label: "Select", value: "" },
                ...["Less than 1 year", "1 – 3 years", "3 – 7 years", "7+ years"].map(y => ({ label: y, value: y }))
              ]}
            />
          </FormField>

          <FormField label="Operating Districts in MP">
            <ContactInput
              placeholder="e.g. Indore, Ujjain, Ratlam"
              value={formData.operatingDistricts}
              onChange={(e) => onFieldUpdate("operatingDistricts", e.target.value)}
            />
          </FormField>
        </div>

        <FormField label="Preferred Product Categories">
          <p className="text-sm text-slate-500 mb-2">
            Select all that apply
          </p>
          <div className="flex flex-wrap gap-2">
            {["Tablets & Capsules", "Injectables", "Syrups & Liquids", "Ointments & Creams", "FMCG / OTC", "Surgical"].map((category) => (
              <label key={category} className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 
                {formData.preferredCategories.includes(category)
                  ? 'bg-[#0e7c6e] border-[#0e7c6e] text-white'
                  : 'border-border text-muted-foreground hover:border-[#0e7c6e]/50 hover:text-foreground'}"
              >
                <input
                  type="checkbox"
                  checked={formData.preferredCategories.includes(category)}
                  onChange={() => toggleCategory(category)}
                  className="sr-only peer"
                />
                <span className="relative inline-block h-5 w-5 rounded border border-gray-300 peer-checked:bg-[#0e7c6e] peer-checked:border-[#0e7c6e]">
                  {formData.preferredCategories.includes(category) && (
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
          Continue
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
}