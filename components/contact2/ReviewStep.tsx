"use client";

import { motion } from "framer-motion";

interface ReviewStepProps {
  formData: any;
  onFieldUpdate: (field: string, value: unknown) => void;
  onNext: () => void;
  onBack: () => void;
  isSubmitting: boolean;
  error: string;
}

export function ReviewStep({ 
  formData, 
  onFieldUpdate, 
  onNext, 
  onBack,
  isSubmitting,
  error
}: ReviewStepProps) {
  
  // Helper to get category labels
  const getCategoryLabels = (categories: string[] = []) => {
    const categoryMap: Record<string, string> = {
      "Tablets & Capsules": "Tablets & Capsules",
      "Injectables": "Injectables",
      "Syrups & Liquids": "Syrups & Liquids",
      "Ointments & Creams": "Ointments & Creams",
      "FMCG / OTC": "FMCG / OTC",
      "Surgical": "Surgical"
    };
    return categories.map(cat => categoryMap[cat] || cat).join(", ") || "Not specified";
  };

  // Helper to get yes/no
  const getYesNo = (value: string) => value ? "Yes" : "Not specified";

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
            Review Your Enquiry
          </h2>
          <p className="text-sm text-slate-500">
            Please review the information below before submitting.
          </p>
        </div>

        {/* Contact Information */}
        <div className="bg-slate-50 rounded-xl p-6">
          <h3 className="font-semibold text-slate-900 mb-3">Contact Information</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-slate-500">Company Name:</span>
              <span className="text-sm font-medium text-slate-900">{formData.companyName || "Not provided"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-slate-500">Contact Person:</span>
              <span className="text-sm font-medium text-slate-900">{formData.contactName || "Not provided"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-slate-500">Phone:</span>
              <span className="text-sm font-medium text-slate-900">{formData.phone || "Not provided"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-slate-500">Email:</span>
              <span className="text-sm font-medium text-slate-900">{formData.email || "Not provided"}</span>
            </div>
          </div>
        </div>

        {/* Role-Specific Information */}
        <div className="bg-slate-50 rounded-xl p-6">
          <h3 className="font-semibold text-slate-900 mb-3">
            {formData.role === "manufacturer" ? "Manufacturer Details" : "Distributor Details"}
          </h3>
          <div className="space-y-3">
            {formData.role === "manufacturer" ? (
              <>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">Drug License:</span>
                  <span className="text-sm font-medium text-slate-900">{formData.drugLicense || "Not provided"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">Product Categories:</span>
                  <span className="text-sm font-medium text-slate-900">{getCategoryLabels(formData.productCategories)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">Districts Needed:</span>
                  <span className="text-sm font-medium text-slate-900">{formData.districtsNeeded || "Not specified"}</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">Drug License:</span>
                  <span className="text-sm font-medium text-slate-900">{formData.drugLicense || "Not provided"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">GST Number:</span>
                  <span className="text-sm font-medium text-slate-900">{formData.gstNo || "Not provided"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">Years in Operation:</span>
                  <span className="text-sm font-medium text-slate-900">{formData.yearsInOperation || "Not specified"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">Operating Districts:</span>
                  <span className="text-sm font-medium text-slate-900">{formData.operatingDistricts || "Not specified"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">Preferred Categories:</span>
                  <span className="text-sm font-medium text-slate-900">{getCategoryLabels(formData.preferredCategories)}</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Requirements */}
        <div className="bg-slate-50 rounded-xl p-6">
          <h3 className="font-semibold text-slate-900 mb-3">Requirements</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-slate-500">Monthly Volume Needed:</span>
              <span className="text-sm font-medium text-slate-900">{formData.monthlyVolume || "Not specified"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-slate-500">Engagement Model:</span>
              <span className="text-sm font-medium text-slate-900">
                {formData.preferredCategories?.[0] || "Not specified"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-slate-500">Geographic Coverage:</span>
              <span className="text-sm font-medium text-slate-900">{formData.districtsNeeded || "Not specified"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-slate-500">Product Interests:</span>
              <span className="text-sm font-medium text-slate-900">{getCategoryLabels(formData.productCategories)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-slate-500">Timeline:</span>
              <span className="text-sm font-medium text-slate-900">{formData.yearsInOperation || "Not specified"}</span>
            </div>
          </div>
          {formData.message && (
            <div className="mt-3">
              <span className="text-sm text-slate-500 block mb-1">Additional Message:</span>
              <p className="text-sm text-slate-900">{formData.message}</p>
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

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
          disabled={isSubmitting}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0e7c6e] text-white text-sm font-semibold hover:bg-[#0b6b5e] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
        >
          {isSubmitting ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
              </svg>
              Submitting...
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
    </motion.div>
  );
}