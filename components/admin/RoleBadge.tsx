"use client";

// ─── Types ────────────────────────────────────────────────────────────────────
export type Role = "manufacturer" | "distributor";

interface RoleBadgeProps {
  role: Role | string;
  size?: "sm" | "md";
  showIcon?: boolean;
}

// ─── Icons ────────────────────────────────────────────────────────────────────
const MfrIcon = ({ className }: { className: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
    />
  </svg>
);

const DistIcon = ({ className }: { className: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
    />
  </svg>
);

// ─── Config ───────────────────────────────────────────────────────────────────
const ROLE_CONFIG: Record<
  string,
  { pill: string; label: string; shortLabel: string; Icon: typeof MfrIcon }
> = {
  manufacturer: {
    pill:       "bg-[#0e7c6e]/10 text-[#0e7c6e]",
    label:      "Manufacturer",
    shortLabel: "Mfr",
    Icon:       MfrIcon,
  },
  distributor: {
    pill:       "bg-amber-50 text-amber-600",
    label:      "Distributor",
    shortLabel: "Dist",
    Icon:       DistIcon,
  },
};

const FALLBACK = {
  pill:       "bg-muted text-muted-foreground",
  label:      "Unknown",
  shortLabel: "—",
  Icon:       MfrIcon,
};

// ─── Component ────────────────────────────────────────────────────────────────
export function RoleBadge({
  role,
  size = "md",
  showIcon = true,
}: RoleBadgeProps) {
  const config = ROLE_CONFIG[role] ?? FALLBACK;

  const sizeClass =
    size === "sm"
      ? "px-2 py-0.5 text-[10px] gap-1"
      : "px-2 py-0.5 text-[11px] gap-1";

  const iconClass = size === "sm" ? "w-2.5 h-2.5" : "w-2.5 h-2.5";

  return (
    <span
      className={`inline-flex items-center rounded-full font-semibold ${sizeClass} ${config.pill}`}
    >
      {showIcon && <config.Icon className={iconClass} />}
      {size === "sm" ? config.shortLabel : config.label}
    </span>
  );
}
