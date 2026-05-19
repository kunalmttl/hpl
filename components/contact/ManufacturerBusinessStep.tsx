"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FormField } from "./FormField";
import { ContactInput } from "@/components/ContactInput";
import { ContactSelect } from "@/components/ContactSelect";
import { ContactTextarea } from "@/components/ContactTextarea";

interface ManufacturerBusinessStepProps {
  formData: any;
  onFieldUpdate: (field: string, value: unknown) => void;
  onNext: () => void;
  onBack: () => void;
}

export function ManufacturerBusinessStep({ 
  formData, 
  onFieldUpdate, 
  onNext, 
  onBack 
}: ManufacturerBusinessStepProps) {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleContinue = () => {
    const tempErrors: { [key: string]: string } = {};

    if (!formData.drugLicense || !formData.drugLicense.trim()) {
      tempErrors.drugLicense = "Drug license number is required";
    } else if (formData.drugLicense.trim().length < 3) {
      tempErrors.drugLicense = "Please enter a valid drug license number";
    }

    setErrors(tempErrors);

    if (Object.keys(tempErrors).length === 0) {
      onNext();
    }
  };
  
  const toggleCategory = (category: string) => {
    onFieldUpdate("productCategories", 
      formData.productCategories.includes(category)
        ? formData.productCategories.filter((c: string) => c !== category)
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
            Tell us about your manufacturing business
          </h2>
          <p className="text-sm text-slate-500">
            Help us understand your distribution needs.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <FormField label="Drug License Number" required error={errors.drugLicense}>
            <ContactInput
              label="e.g. MP/XX/XXXXX"
              value={formData.drugLicense}
              onChange={(e) => {
                onFieldUpdate("drugLicense", e.target.value);
                if (errors.drugLicense) setErrors(prev => ({ ...prev, drugLicense: "" }));
              }}
            />
          </FormField>

          <FormField label="Monthly Stock Volume">
            <ContactSelect
              label=""
              value={formData.monthlyVolume}
              onChange={(e) => onFieldUpdate("monthlyVolume", e.target.value)}
              options={[
                { label: "Select range", value: "" },
                ...["Under ₹10 Lakh / month", "₹10 – ₹50 Lakh / month", "₹50 Lakh – ₹1 Cr / month", "Above ₹1 Cr / month"].map(v => ({ label: v, value: v }))
              ]}
            />
          </FormField>
        </div>

        <FormField label="Product Categories">
          <p className="text-sm text-slate-500 mb-2">
            Select all that apply
          </p>
          <div className="flex flex-wrap gap-2">
            {["Tablets & Capsules", "Injectables", "Syrups & Liquids", "Ointments & Creams", "FMCG / OTC", "Surgical"].map((category) => (
              <label key={category} className={`relative flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border cursor-pointer transition-all duration-200 ${
                formData.productCategories.includes(category)
                  ? 'bg-[#0e7c6e] border-[#0e7c6e] text-white'
                  : 'border-border text-muted-foreground hover:border-[#0e7c6e]/50 hover:text-foreground'
              }`}
              >
                <input
                  type="checkbox"
                  checked={formData.productCategories.includes(category)}
                  onChange={() => toggleCategory(category)}
                  className="sr-only peer"
                />
                <span className="relative inline-block h-5 w-5 rounded border border-gray-300 peer-checked:bg-[#0e7c6e] peer-checked:border-[#0e7c6e]">
                  {formData.productCategories.includes(category) && (
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

        <FormField label="Districts Requiring Coverage">
          <ContactInput
            label="e.g. Ujjain, Dewas, Ratlam, Sehore"
            value={formData.districtsNeeded}
            onChange={(e) => onFieldUpdate("districtsNeeded", e.target.value)}
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
          onClick={handleContinue}
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