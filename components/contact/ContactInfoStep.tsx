"use client";

import { useState } from "react";
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
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleContinue = () => {
    const tempErrors: { [key: string]: string } = {};

    // Validate Company Name
    if (!formData.companyName || !formData.companyName.trim()) {
      tempErrors.companyName = "Company name is required";
    }

    // Validate Contact Name
    if (!formData.contactName || !formData.contactName.trim()) {
      tempErrors.contactName = "Contact person name is required";
    }

    // Validate Phone Number
    let cleanPhone = (formData.phone || "").trim().replace(/[\s-]/g, "");
    
    // Auto prefix +91 if they typed just 10 digits starting with 6-9
    if (/^[6-9]\d{9}$/.test(cleanPhone)) {
      cleanPhone = "+91" + cleanPhone;
      onFieldUpdate("phone", cleanPhone);
    }

    if (!cleanPhone || cleanPhone === "+91") {
      tempErrors.phone = "Phone number is required";
    } else if (!/^\+91[6-9]\d{9}$/.test(cleanPhone)) {
      tempErrors.phone = "Must start with +91 followed by 10 digits (e.g. +919876543210)";
    }

    // Validate Email Address (optional field, but regex if provided)
    if (formData.email && formData.email.trim() !== "") {
      const trimmedEmail = formData.email.trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
        tempErrors.email = "Please enter a valid email address (e.g. name@company.com)";
      }
    }

    setErrors(tempErrors);

    if (Object.keys(tempErrors).length === 0) {
      onNext();
    }
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
            Tell us about your company
          </h2>
          <p className="text-sm text-slate-500">
            We'll use this to understand your requirements better.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <FormField label="Company Name" required error={errors.companyName}>
            <ContactInput
              label="e.g. Cipla Limited"
              value={formData.companyName}
              onChange={(e) => {
                onFieldUpdate("companyName", e.target.value);
                if (errors.companyName) setErrors(prev => ({ ...prev, companyName: "" }));
              }}
            />
          </FormField>

          <FormField label="Contact Person" required error={errors.contactName}>
            <ContactInput
              label="Full name"
              value={formData.contactName}
              onChange={(e) => {
                onFieldUpdate("contactName", e.target.value);
                if (errors.contactName) setErrors(prev => ({ ...prev, contactName: "" }));
              }}
            />
          </FormField>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <FormField label="Phone Number" required error={errors.phone}>
            <ContactInput
              label="+91 XXXXX XXXXX"
              type="tel"
              value={formData.phone}
              onChange={(e) => {
                onFieldUpdate("phone", e.target.value);
                if (errors.phone) setErrors(prev => ({ ...prev, phone: "" }));
              }}
            />
          </FormField>

          <FormField label="Email Address" error={errors.email}>
            <ContactInput
              label="your@company.com"
              type="email"
              value={formData.email}
              onChange={(e) => {
                onFieldUpdate("email", e.target.value);
                if (errors.email) setErrors(prev => ({ ...prev, email: "" }));
              }}
            />
          </FormField>
        </div>

        <FormField label="Additional Message">
          <ContactTextarea
            label="Any specific requirements or questions..."
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