"use client";

// ─── Types ────────────────────────────────────────────────────────────────────
export type Status = "new" | "contacted" | "converted" | "rejected";

interface StatusBadgeProps {
  status: Status | string;
  size?: "sm" | "md";
}

// ─── Config ───────────────────────────────────────────────────────────────────
const STATUS_CONFIG: Record<string, { dot: string; pill: string; label: string }> = {
  new: {
    dot:   "bg-amber-400",
    pill:  "bg-amber-100 text-amber-700",
    label: "New",
  },
  contacted: {
    dot:   "bg-blue-400",
    pill:  "bg-blue-100 text-blue-700",
    label: "Contacted",
  },
  converted: {
    dot:   "bg-[#0e7c6e]",
    pill:  "bg-teal-100 text-[#0e7c6e]",
    label: "Converted",
  },
  rejected: {
    dot:   "bg-red-400",
    pill:  "bg-red-100 text-red-600",
    label: "Rejected",
  },
};

// Fallback for unknown status values
const FALLBACK = {
  dot:   "bg-muted-foreground",
  pill:  "bg-muted text-muted-foreground",
  label: "Unknown",
};

// ─── Component ────────────────────────────────────────────────────────────────
export function StatusBadge({ status, size = "md" }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status] ?? FALLBACK;

  const sizeClass =
    size === "sm"
      ? "px-2 py-0.5 text-[10px] gap-1"
      : "px-2.5 py-1 text-[11px] gap-1.5";

  const dotSize =
    size === "sm" ? "w-1 h-1" : "w-1.5 h-1.5";

  return (
    <span
      className={`inline-flex items-center rounded-full font-semibold ${sizeClass} ${config.pill}`}
    >
      <span className={`rounded-full flex-shrink-0 ${dotSize} ${config.dot}`} />
      {config.label}
    </span>
  );
}
