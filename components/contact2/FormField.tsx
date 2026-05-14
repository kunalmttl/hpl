import React from "react";

interface FormFieldProps {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  error?: string;
  helperText?: string;
}

export function FormField({
  label,
  required = false,
  children,
  error,
  helperText,
}: FormFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
        {required && (
          <span className="text-[0e7c6e] ml-0.5">*</span>
        )}
      </label>
      <div className="space-y-1">
        {children}
        {error && (
          <p className="text-xs text-red-500">{error}</p>
        )}
        {!error && helperText && (
          <p className="text-xs text-muted-foreground">{helperText}</p>
        )}
      </div>
    </div>
  );
}