"use client";

import { useState } from "react";
import { StatsStrip } from "@/components/admin/StatsStrip";
import { FilterBar, FilterState } from "@/components/admin/FilterBar";
import { EnquiriesTable, Enquiry } from "@/components/admin/EnquiriesTable";
import { DetailDrawer } from "@/components/admin/DetailDrawer";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Stats {
  total: number;
  newCount: number;
  manufacturers: number;
  distributors: number;
}

interface Props {
  initialEnquiries: Enquiry[];
  initialStats: Stats;
}

// ─── Component ────────────────────────────────────────────────────────────────
export function EnquiriesClient({ initialEnquiries, initialStats }: Props) {
  const [enquiries, setEnquiries] = useState<Enquiry[]>(initialEnquiries);
  const [stats, setStats]         = useState<Stats>(initialStats);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    role:   "all",
    status: "all",
  });

  // ── Client-side filtering ─────────────────────────────────────────────────
  const filtered = enquiries.filter((e) => {
    const q = filters.search.toLowerCase();
    const matchSearch =
      !q ||
      e.companyName.toLowerCase().includes(q) ||
      e.contactName.toLowerCase().includes(q);
    const matchRole   = filters.role   === "all" || e.role   === filters.role;
    const matchStatus = filters.status === "all" || e.status === filters.status;
    return matchSearch && matchRole && matchStatus;
  });

  // ── Optimistic status update (no re-fetch) ────────────────────────────────
  const handleStatusChange = (id: string, status: string) => {
    setEnquiries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status } : e))
    );
    // Update newCount in stats strip
    setStats((prev) => {
      const target = enquiries.find((e) => e.id === id);
      if (!target) return prev;
      const wasNew = target.status === "new";
      const isNow  = status === "new";
      return {
        ...prev,
        newCount: prev.newCount + (isNow ? 1 : 0) - (wasNew ? 1 : 0),
      };
    });
  };

  // ── Row select (toggle) ───────────────────────────────────────────────────
  const handleSelect = (id: string) =>
    setSelectedId((prev) => (prev === id ? null : id));

  const selectedEnquiry = filtered.find((e) => e.id === selectedId) ?? null;

  // ── Today's greeting ──────────────────────────────────────────────────────
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });

  return (
    <div className="flex h-screen overflow-hidden">
      {/* ── Main scrollable area ─────────────────────────────────────────── */}
      <div
        className={`flex-1 overflow-y-auto transition-all duration-300 ${
          selectedId ? "mr-[320px]" : ""
        }`}
      >
        <div className="p-8 space-y-6 max-w-6xl">

          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground tracking-tight">
                Enquiries 👋
              </h1>
              <p className="text-sm text-muted-foreground mt-0.5">{today}</p>
            </div>
            <div className="flex items-center gap-2">
              {/* Refresh button */}
              <button
                onClick={() => window.location.reload()}
                className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border/60 bg-white text-xs font-medium text-muted-foreground hover:text-foreground hover:border-border transition-all duration-200"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </button>
            </div>
          </div>

          {/* Stats strip */}
          <StatsStrip stats={stats} />

          {/* Filter bar */}
          <FilterBar
            filters={filters}
            onChange={setFilters}
            totalVisible={filtered.length}
            totalAll={enquiries.length}
          />

          {/* Table */}
          <EnquiriesTable
            enquiries={filtered}
            selectedId={selectedId}
            onSelect={handleSelect}
          />

        </div>
      </div>

      {/* ── Detail drawer (fixed right panel) ───────────────────────────── */}
      <DetailDrawer
        enquiry={selectedEnquiry}
        enquiries={filtered}
        onClose={() => setSelectedId(null)}
        onSelect={setSelectedId}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
}
