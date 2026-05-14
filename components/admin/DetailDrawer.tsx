"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Enquiry } from "./EnquiriesTable";

// ─── Types ────────────────────────────────────────────────────────────────────
interface DetailDrawerProps {
  enquiry: Enquiry | null;
  enquiries: Enquiry[]; // full list for prev/next navigation
  onClose: () => void;
  onSelect: (id: string) => void;
  onStatusChange: (id: string, status: string) => void; // optimistic update callback
}

// ─── Constants ────────────────────────────────────────────────────────────────
const STATUSES = [
  { value: "new",       label: "New",       active: "bg-amber-500 text-white",  idle: "border-amber-200 text-amber-600 hover:bg-amber-50" },
  { value: "contacted", label: "Contacted", active: "bg-blue-500 text-white",   idle: "border-blue-200 text-blue-600 hover:bg-blue-50" },
  { value: "converted", label: "Converted", active: "bg-[#0e7c6e] text-white",  idle: "border-[#0e7c6e]/30 text-[#0e7c6e] hover:bg-teal-50" },
  { value: "rejected",  label: "Rejected",  active: "bg-red-500 text-white",    idle: "border-red-200 text-red-500 hover:bg-red-50" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric", month: "long", year: "numeric",
  });
}

function formatCategories(cats: string[]): string {
  if (!cats || cats.length === 0) return "—";
  return cats.join(", ");
}

// ─── Section heading ──────────────────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
      {children}
    </p>
  );
}

// ─── Detail row ───────────────────────────────────────────────────────────────
function DetailRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between items-start gap-4 py-2 border-b border-border/30 last:border-0">
      <span className="text-xs text-muted-foreground flex-shrink-0 w-28">{label}</span>
      <span className="text-xs text-foreground font-medium text-right flex-1">{value || "—"}</span>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function DetailDrawer({
  enquiry,
  enquiries,
  onClose,
  onSelect,
  onStatusChange,
}: DetailDrawerProps) {
  const [savingStatus, setSavingStatus] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const [noteSaved, setNoteSaved] = useState(false);
  const [savingNote, setSavingNote] = useState(false);

  // Sync note field when enquiry changes
  useEffect(() => {
    if (enquiry) {
      setNote(enquiry.note ?? "");
      setNoteSaved(false);
    }
  }, [enquiry?.id]);

  // Keyboard: Escape to close, ArrowLeft/Right to navigate
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!enquiry) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handleNav("prev");
      if (e.key === "ArrowRight") handleNav("next");
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [enquiry, enquiries]);

  const currentIndex = enquiry ? enquiries.findIndex((e) => e.id === enquiry.id) : -1;
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < enquiries.length - 1;

  const handleNav = useCallback((dir: "prev" | "next") => {
    if (!enquiry) return;
    const idx = enquiries.findIndex((e) => e.id === enquiry.id);
    if (dir === "prev" && idx > 0) onSelect(enquiries[idx - 1].id);
    if (dir === "next" && idx < enquiries.length - 1) onSelect(enquiries[idx + 1].id);
  }, [enquiry, enquiries, onSelect]);

  // Update status via API
  const handleStatusChange = async (newStatus: string) => {
    if (!enquiry || newStatus === enquiry.status) return;
    setSavingStatus(newStatus);
    try {
      await fetch(`/api/admin/enquiries/${enquiry.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      onStatusChange(enquiry.id, newStatus); // optimistic UI update
    } catch (err) {
      console.error("[DetailDrawer] Status update failed:", err);
    } finally {
      setSavingStatus(null);
    }
  };

  // Auto-save note on blur
  const handleNoteSave = async () => {
    if (!enquiry || note === (enquiry.note ?? "")) return;
    setSavingNote(true);
    try {
      await fetch(`/api/admin/enquiries/${enquiry.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ note }),
      });
      setNoteSaved(true);
      setTimeout(() => setNoteSaved(false), 2500);
    } catch (err) {
      console.error("[DetailDrawer] Note save failed:", err);
    } finally {
      setSavingNote(false);
    }
  };

  const isManufacturer = enquiry?.role === "manufacturer";
  const phone = enquiry?.phone ?? "";
  const waPhone = phone.replace(/\D/g, "").replace(/^0/, "91");

  return (
    <AnimatePresence>
      {enquiry && (
        <>
          {/* Backdrop (mobile only) */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 z-30 lg:hidden"
          />

          {/* Drawer panel */}
          <motion.aside
            key="drawer"
            initial={{ x: 320, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 320, opacity: 0 }}
            transition={{ type: "spring", stiffness: 380, damping: 36 }}
            className="fixed right-0 top-0 h-screen w-[320px] bg-white border-l border-border/40 shadow-2xl shadow-black/10 z-40 flex flex-col overflow-hidden"
          >
            {/* ── Header ──────────────────────────────────────────────────── */}
            <div className="px-5 pt-5 pb-4 border-b border-border/40 flex-shrink-0">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-base font-bold text-foreground leading-tight truncate">
                    {enquiry.companyName}
                  </p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                      isManufacturer
                        ? "bg-[#0e7c6e]/10 text-[#0e7c6e]"
                        : "bg-amber-50 text-amber-600"
                    }`}>
                      {isManufacturer ? "Manufacturer" : "Distributor"}
                    </span>
                    <span className="text-[11px] text-muted-foreground">
                      {formatDate(enquiry.createdAt)}
                    </span>
                  </div>
                </div>

                {/* Close button */}
                <button
                  onClick={onClose}
                  className="w-7 h-7 rounded-lg bg-muted/60 flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-colors flex-shrink-0"
                  aria-label="Close"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* ── Scrollable body ──────────────────────────────────────────── */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">

              {/* Contact section */}
              <div>
                <SectionLabel>Contact</SectionLabel>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{enquiry.contactName}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{phone}</p>
                    {enquiry.email && (
                      <p className="text-xs text-muted-foreground mt-0.5 truncate max-w-[160px]">
                        {enquiry.email}
                      </p>
                    )}
                  </div>
                  {/* Quick action buttons */}
                  <div className="flex gap-2">
                    <a
                      href={`tel:${phone}`}
                      className="w-9 h-9 rounded-xl bg-[#0e7c6e]/10 text-[#0e7c6e] flex items-center justify-center hover:bg-[#0e7c6e] hover:text-white transition-all duration-200"
                      title="Call"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </a>
                    <a
                      href={`https://wa.me/${waPhone}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-xl bg-green-50 text-green-600 flex items-center justify-center hover:bg-green-500 hover:text-white transition-all duration-200"
                      title="WhatsApp"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Business details */}
              <div>
                <SectionLabel>Business Details</SectionLabel>
                <div className="rounded-xl bg-muted/30 px-3 py-1 divide-y divide-border/30">
                  <DetailRow label="Drug License" value={enquiry.drugLicense} />
                  {isManufacturer ? (
                    <>
                      <DetailRow label="Volume / Month" value={enquiry.monthlyVolume} />
                      <DetailRow label="Districts" value={enquiry.districtsNeeded} />
                      <DetailRow label="Categories" value={formatCategories(enquiry.productCategories)} />
                    </>
                  ) : (
                    <>
                      <DetailRow label="GST Number" value={enquiry.gstNo} />
                      <DetailRow label="Years Active" value={enquiry.yearsInOperation} />
                      <DetailRow label="Districts" value={enquiry.operatingDistricts} />
                      <DetailRow label="Categories" value={formatCategories(enquiry.preferredCategories)} />
                    </>
                  )}
                  {enquiry.message && (
                    <DetailRow label="Message" value={enquiry.message} />
                  )}
                </div>
              </div>

              {/* Status section */}
              <div>
                <SectionLabel>Status</SectionLabel>
                <div className="grid grid-cols-2 gap-2">
                  {STATUSES.map((s) => {
                    const isActive = enquiry.status === s.value;
                    const isLoading = savingStatus === s.value;
                    return (
                      <button
                        key={s.value}
                        onClick={() => handleStatusChange(s.value)}
                        disabled={!!savingStatus}
                        className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all duration-200 ${
                          isActive ? s.active + " border-transparent" : "bg-white " + s.idle
                        } disabled:opacity-60 disabled:cursor-not-allowed`}
                      >
                        {isLoading ? (
                          <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                          </svg>
                        ) : isActive ? (
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : null}
                        {s.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Internal note */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <SectionLabel>Internal Note</SectionLabel>
                  <AnimatePresence>
                    {noteSaved && (
                      <motion.span
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-[11px] text-[#0e7c6e] font-medium"
                      >
                        Saved ✓
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  onBlur={handleNoteSave}
                  rows={4}
                  placeholder="Add a private note about this enquiry..."
                  className="w-full rounded-xl border border-border/60 bg-muted/20 px-3 py-2.5 text-xs text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-[#0e7c6e]/30 focus:border-[#0e7c6e] resize-none transition-all duration-200"
                />
                {savingNote && (
                  <p className="text-[11px] text-muted-foreground mt-1">Saving...</p>
                )}
              </div>
            </div>

            {/* ── Footer — Prev / Next navigation ─────────────────────────── */}
            <div className="px-5 py-4 border-t border-border/40 flex-shrink-0">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => handleNav("prev")}
                  disabled={!hasPrev}
                  className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                  </svg>
                  Prev
                </button>

                <span className="text-[11px] text-muted-foreground">
                  {currentIndex + 1} / {enquiries.length}
                </span>

                <button
                  onClick={() => handleNav("next")}
                  disabled={!hasNext}
                  className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              <p className="text-[10px] text-muted-foreground/50 text-center mt-2">
                ← → arrow keys to navigate · Esc to close
              </p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
