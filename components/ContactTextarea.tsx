"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ContactTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const ContactTextarea = React.forwardRef<HTMLTextAreaElement, ContactTextareaProps>(
  ({ label, error, onFocus, onBlur, rows = 5, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(!!props.defaultValue || !!props.value);

    // Update hasValue when internal value changes
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setHasValue(!!e.target.value);
      props.onChange?.(e);
    };

    return (
      <div className="relative w-full group">
        {/* THE ACTIVE BEAM (Vertical indicator) */}
        <motion.div 
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ 
            scaleY: isFocused ? 1 : 0, 
            opacity: isFocused ? 1 : 0 
          }}
          className="absolute left-0 top-0 bottom-0 w-[2px] bg-pharma-teal z-20 origin-top"
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />

        <div className="relative">
          <textarea
            {...props}
            ref={ref}
            rows={rows}
            onFocus={(e) => {
              setIsFocused(true);
              onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              onBlur?.(e);
            }}
            onChange={handleChange}
            className={`
              w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl
              text-slate-900 font-medium placeholder-transparent outline-none
              transition-all duration-300 resize-none
              hover:bg-slate-100/80
              ${isFocused ? "border-transparent bg-white shadow-xl shadow-slate-200/50" : ""}
              ${error ? "border-red-500/50" : ""}
            `}
            placeholder={label}
          />

          {/* FLOATING LABEL */}
          <motion.label
            initial={false}
            animate={{
              y: (isFocused || hasValue) ? -28 : 0,
              scale: (isFocused || hasValue) ? 0.8 : 1,
              x: (isFocused || hasValue) ? -4 : 0,
              color: isFocused ? "var(--pharma-teal)" : "rgb(100, 116, 139)"
            }}
            className="absolute left-5 top-4 pointer-events-none font-bold tracking-tight text-slate-500 flex items-center"
          >
            {label}
          </motion.label>
        </div>

        {/* ERROR MESSAGE WITH SHAKE */}
        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="text-red-500 text-xs font-black mt-2 ml-1 uppercase tracking-wider"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

ContactTextarea.displayName = "ContactTextarea";
