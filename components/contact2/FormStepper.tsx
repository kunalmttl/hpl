"use client";

import { motion } from "framer-motion";

interface FormStepperProps {
  currentStep: number;
  progress: number;
  role: "manufacturer" | "distributor" | null;
}

export function FormStepper({ 
  currentStep, 
  progress, 
  role 
}: FormStepperProps) {
  const steps = [
    { label: "Select Role", description: "Tell us who you are" },
    { label: "Contact Info", description: "Your business details" },
    { label: "Business Details", description: "About your company" },
    { label: "Review & Submit", description: "Finalize your enquiry" }
  ];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className="mb-8"
    >
      <div className="space-y-4">
        {/* Step Indicator */}
        <div className="flex items-center gap-4 mb-4">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300">
            {currentStep === 0 ? (
              <>
                <svg className="w-4 h-4 fill-[#0e7c6e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </>
            ) : currentStep > 0 ? (
              <svg className="w-4 h-4 fill-[#0e7c6e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 bg-[#0e7c6e] text-white">
                1
              </div>
            )}
          </div>
          <div className="flex-1 border-t border-slate-200/50" />
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300">
            {currentStep === 1 ? (
              <>
                <svg className="w-4 h-4 fill-[#0e7c6e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </>
            ) : currentStep > 1 ? (
              <svg className="w-4 h-4 fill-[#0e7c6e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              currentStep === 0 ? (
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 bg-[#0e7c6e] text-white">
                  2
                </div>
              ) : ""
            )}
          </div>
          <div className="flex-1 border-t border-slate-200/50" />
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300">
            {currentStep === 2 ? (
              <>
                <svg className="w-4 h-4 fill-[#0e7c6e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </>
            ) : currentStep > 2 ? (
              <svg className="w-4 h-4 fill-[#0e7c6e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              currentStep <= 1 ? (
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 bg-[#0e7c6e] text-white">
                  3
                </div>
              ) : ""
            )}
          </div>
          <div className="flex-1 border-t border-slate-200/50" />
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300">
            {currentStep === 3 ? (
              <>
                <svg className="w-4 h-4 fill-[#0e7c6e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </>
            ) : (
              currentStep < 3 ? (
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 bg-[#0e7c6e] text-white">
                  4
                </div>
              ) : ""
            )}
          </div>
        </div>
        
        {/* Step Labels */}
        <div className="flex justify-between text-sm text-slate-500">
          <span>Select Role</span>
          <span>Contact Info</span>
          <span>Business Details</span>
          <span>Review & Submit</span>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-4">
          <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
            <div 
              className={`bg-[#0e7c6e] h-2.5 transition-all duration-500`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>{Math.round(progress)}%</span>
            <span>{steps[Math.min(currentStep, steps.length-1)].label}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}