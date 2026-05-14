"use client";

import { useEffect, useRef } from "react";
import { animate } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Stats {
  total: number;
  newCount: number;
  manufacturers: number;
  distributors: number;
}

// ─── Animated Counter ─────────────────────────────────────────────────────────
function AnimatedNumber({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const controls = animate(0, value, {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        el.textContent = Math.round(v).toString();
      },
    });
    return () => controls.stop();
  }, [value]);

  return <span ref={ref}>0</span>;
}

// ─── Single Stat Card ─────────────────────────────────────────────────────────
function StatCard({
  label,
  value,
  sublabel,
  icon,
  highlight,
  separator,
}: {
  label: string;
  value: number;
  sublabel: string;
  icon: React.ReactNode;
  highlight?: boolean;
  separator?: boolean;
}) {
  return (
    <div className="relative flex items-center gap-4 px-6 py-5 flex-1">
      {/* Right separator (except last card) */}
      {separator && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 h-10 w-px bg-border/60" />
      )}

      {/* Icon bubble */}
      <div
        className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${
          highlight
            ? "bg-[#0e7c6e] text-white"
            : "bg-muted/60 text-muted-foreground"
        }`}
      >
        {icon}
      </div>

      {/* Text */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
          {label}
        </p>
        <p className="text-3xl font-bold text-foreground leading-none">
          <AnimatedNumber value={value} />
        </p>
        <p
          className={`text-[11px] mt-1.5 font-medium ${
            highlight && value > 0
              ? "text-[#0e7c6e]"
              : "text-muted-foreground"
          }`}
        >
          {sublabel}
        </p>
      </div>
    </div>
  );
}

// ─── Icons ────────────────────────────────────────────────────────────────────
const TotalIcon = (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
  </svg>
);

const NewIcon = (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
);

const MfrIcon = (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const DistIcon = (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
      d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
  </svg>
);

// ─── Main Component ───────────────────────────────────────────────────────────
export function StatsStrip({ stats }: { stats: Stats }) {
  const { total, newCount, manufacturers, distributors } = stats;

  const newSublabel =
    newCount === 0
      ? "All actioned"
      : newCount === 1
      ? "▲ 1 needs action"
      : `▲ ${newCount} need action`;

  return (
    <div className="bg-white rounded-2xl shadow-sm shadow-black/5 border border-border/40 overflow-hidden">
      <div className="flex divide-x divide-border/40">
        <StatCard
          label="Total Enquiries"
          value={total}
          sublabel="All time"
          icon={TotalIcon}
          separator
        />
        <StatCard
          label="New"
          value={newCount}
          sublabel={newSublabel}
          icon={NewIcon}
          highlight={newCount > 0}
          separator
        />
        <StatCard
          label="Manufacturers"
          value={manufacturers}
          sublabel="Pharma brands"
          icon={MfrIcon}
          separator
        />
        <StatCard
          label="Distributors"
          value={distributors}
          sublabel="Stockists"
          icon={DistIcon}
        />
      </div>
    </div>
  );
}
