"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RoleSelector } from "./RoleSelector";
import { ContactInfoStep } from "./ContactInfoStep";
import { ManufacturerBusinessStep } from "./ManufacturerBusinessStep";
import { DistributorBusinessStep } from "./DistributorBusinessStep";
import { RequirementsStep } from "./RequirementsStep";
import { ReviewStep } from "./ReviewStep";
import { FormStepper } from "./FormStepper";
import { SubmitButton } from "./SubmitButton";

// Types
export type Role = "manufacturer" | "distributor" | null;

export interface FormData {
  role: Role;
  // Contact Info (universal)
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
  // Form state
  step: number;
  isSubmitting: boolean;
  submitted: boolean;
  error: string;
}

const INITIAL_FORM_DATA: FormData = {
  role: null,
  companyName: "",
  contactName: "",
  phone: "+91",
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
  step: 0,
  isSubmitting: false,
  submitted: false,
  error: "",
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

export function EnquiryFormV2() {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);

  const updateField = (field: string, value: unknown) => {
    setFormData(prev => ({ ...prev, [field as keyof FormData]: value }));
  };

  const nextStep = () => {
    setFormData(prev => ({ ...prev, step: prev.step + 1 }));
  };

  const prevStep = () => {
    setFormData(prev => ({ ...prev, step: prev.step - 1 }));
  };

  const handleRoleSelect = (role: Role) => {
    setFormData(prev => ({ ...prev, role, step: 1 }));
  };

    const handleSubmit = async () => {
      setFormData(prev => ({ ...prev, isSubmitting: true, error: "" }));
      
      try {
        const res = await fetch("/api/enquiry", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || "Server error");
        }
        
        setFormData(prev => ({ 
          ...prev, 
          isSubmitting: false, 
          submitted: true 
        }));
      } catch (error) {
        setFormData(prev => ({ 
          ...prev, 
          isSubmitting: false, 
          error: error instanceof Error ? error.message : "Something went wrong. Please call us directly at 0731-6056001." 
        }));
      }
    };

  const resetForm = () => {
    setFormData(INITIAL_FORM_DATA);
  };

  // Progress calculation
  const getProgressPercentage = () => {
    const totalSteps = 4; // Role, Contact Info, Business Details, Requirements/Review
    return Math.min(((formData.step || 0) / totalSteps) * 100, 100);
  };

  // Determine which business step to show
  const BusinessStep = formData.role === "manufacturer" 
    ? ManufacturerBusinessStep 
    : DistributorBusinessStep;

  if (formData.submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-2xl border border-[#0e7c6e]/30 bg-[#0e7c6e]/5 p-8 text-center"
      >
        <div className="w-16 h-16 rounded-full bg-[#0e7c6e] flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-2">Enquiry Received</h3>
        <p className="text-muted-foreground text-sm max-w-sm mx-auto leading-relaxed">
          Thank you, <strong>{formData.contactName}</strong>. Our team will review your enquiry
          and reach out within <strong>24 hours</strong>.
        </p>
        <div className="mt-6 flex flex-col items-center gap-3">
          <button
            onClick={resetForm}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0e7c6e] text-white text-sm font-semibold hover:bg-[#0b6b5e] transition-all duration-200"
          >
            Submit Another
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <a
            href="tel:+917316056001"
            className="text-sm text-[#0e7c6e] font-medium hover:underline"
          >
            Have questions? Call us directly
          </a>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className="rounded-2xl border border-border/60 bg-card/80 backdrop-blur-sm shadow-xl shadow-black/5 p-6 sm:p-8"
    >
      <FormStepper 
        currentStep={formData.step} 
        progress={getProgressPercentage()}
        role={formData.role}
      />
      
      <AnimatePresence mode="wait">
        <motion.div key={formData.step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.28, ease: "easeInOut" }}>
          {formData.step === 0 && (
            <RoleSelector 
              onRoleSelect={handleRoleSelect} 
            />
          )}
          {formData.step === 1 && (
            <ContactInfoStep 
              formData={formData} 
              onFieldUpdate={updateField}
              onNext={nextStep}
              onBack={prevStep}
            />
          )}
          {formData.step === 2 && (
            <BusinessStep 
              formData={formData} 
              onFieldUpdate={updateField}
              onNext={nextStep}
              onBack={prevStep}
            />
          )}
          {formData.step === 3 && (
            <ReviewStep 
              formData={formData} 
              onFieldUpdate={updateField}
              onNext={handleSubmit}
              onBack={prevStep}
              isSubmitting={formData.isSubmitting}
              error={formData.error}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}