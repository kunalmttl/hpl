"use client";

import { motion } from "framer-motion";
import { FormField } from "./FormField";
import { ContactInput } from "@/components/ContactInput";
import { ContactSelect } from "@/components/ContactSelect";
import { ContactTextarea } from "@/components/ContactTextarea";

interface ContactInfoStepProps {
  formData: any;
  onFieldUpdate: (field: string, value: unknown) => void;
  onNext: () => void;
  onBack: () => void;
}

export function ContactInfoStep({ 
  formData, 
  onFieldUpdate, 
  onNext, 
  onBack 
}: ContactInfoStepProps) {
  
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
            Tell us about your company
          </h2>
          <p className="text-sm text-slate-500">
            We'll use this to understand your requirements better.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <FormField label="Company Name" required>
            <ContactInput
              placeholder="e.g. Cipla Limited"
              value={formData.companyName}
              onChange={(e) => onFieldUpdate("companyName", e.target.value)}
            />
          </FormField>

          <FormField label="Contact Person" required>
            <ContactInput
              placeholder="Full name"
              value={formData.contactName}
              onChange={(e) => onFieldUpdate("contactName", e.target.value)}
            />
          </FormField>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <FormField label="Phone Number" required>
            <ContactInput
              placeholder="+91 XXXXX XXXXX"
              type="tel"
              value={formData.phone}
              onChange={(e) => onFieldUpdate("phone", e.target.value)}
            />
          </FormField>

          <FormField label="Email Address">
            <ContactInput
              placeholder="your@company.com"
              type="email"
              value={formData.email}
              onChange={(e) => onFieldUpdate("email", e.target.value)}
            />
          </FormField>
        </div>

        <FormField label="Additional Message">
          <ContactTextarea
            placeholder="Any specific requirements or questions..."
            value={formData.message}
            onChange={(e) => onFieldUpdate("message", e.target.value)}
            rows={3}
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
          Continue
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
}