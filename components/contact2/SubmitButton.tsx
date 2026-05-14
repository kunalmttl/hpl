"use client";

import { motion } from "framer-motion";

interface SubmitButtonProps {
  children: React.ReactNode;
  isLoading?: boolean;
  onClick: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
  className?: string;
}

export function SubmitButton({ 
  children, 
  isLoading = false, 
  onClick, 
  variant = "primary", 
  disabled = false,
  className = ""
}: SubmitButtonProps) {
  const baseClasses = "flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200";
  
  const variantClasses = variant === "primary"
    ? "bg-[#0e7c6e] text-white hover:bg-[#0b6b5e]"
    : "bg-white text-[#0e7c6e] border border-[#0e7c6e]/50 hover:bg-[#0e7c6e]/5";
    
  const disabledClasses = disabled
    ? "opacity-40 cursor-not-allowed"
    : "";
    
  const loadingIndicator = isLoading ? (
    <>
      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
      </svg>
    </>
  ) : null;
    
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${baseClasses} ${variantClasses} ${disabledClasses} ${className}`}
      whileHover={{ scale: !disabled && !isLoading ? 1.02 : 1 }}
      whileTap={{ scale: !disabled && !isLoading ? 0.98 : 1 }}
    >
      {loadingIndicator}
      <span>{children}</span>
    </motion.button>
  );
}