"use client";

import { motion, AnimatePresence } from "framer-motion";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { RoleBadge } from "@/components/admin/RoleBadge";


// ─── Types ────────────────────────────────────────────────────────────────────
export interface Enquiry {
  id: string;
  role: "manufacturer" | "distributor";
  companyName: string;
  contactName: string;
  phone: string;
  email?: string | null;
  drugLicense: string;
  productCategories: string[];
  monthlyVolume?: string | null;
  districtsNeeded?: string | null;
  gstNo?: string | null;
  yearsInOperation?: string | null;
  preferredCategories: string[];
  operatingDistricts?: string | null;
  message?: string | null;
  status: string;
  note?: string | null;
  createdAt: string; // ISO string from JSON serialization
}

interface EnquiriesTableProps {
  enquiries: Enquiry[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

function formatDistricts(districts: string | null | undefined): string {
  if (!districts) return "—";
  const parts = districts.split(",").map((s) => s.trim()).filter(Boolean);
  if (parts.length === 0) return "—";
  if (parts.length === 1) return parts[0];
  return `${parts[0]} +${parts.length - 1}`;
}


// ─── Status Badge ─────────────────────────────────────────────────────────────
const STATUS_STYLES: Record<string, { dot: string; pill: string; label: string }> = {
  new:       { dot: "bg-amber-400",  pill: "bg-amber-100 text-amber-700",       label: "New" },
  contacted: { dot: "bg-blue-400",   pill: "bg-blue-100 text-blue-700",         label: "Contacted" },
  converted: { dot: "bg-[#0e7c6e]", pill: "bg-teal-100 text-[#0e7c6e]",       label: "Converted" },
  rejected:  { dot: "bg-red-400",   pill: "bg-red-100 text-red-600",           label: "Rejected" },
};

// ─── Empty State ──────────────────────────────────────────────────────────────
function EmptyState({ isFiltered }: { isFiltered: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-20 text-center"
    >
      <div className="w-16 h-16 rounded-2xl bg-muted/60 flex items-center justify-center mb-4">
        <svg className="w-8 h-8 text-muted-foreground/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      </div>
      {isFiltered ? (
        <>
          <p className="text-sm font-semibold text-foreground">No results found</p>
          <p className="text-xs text-muted-foreground mt-1">Try adjusting your search or filters</p>
        </>
      ) : (
        <>
          <p className="text-sm font-semibold text-foreground">No enquiries yet</p>
          <p className="text-xs text-muted-foreground mt-1 max-w-xs">
            Share{" "}
            <span className="text-[#0e7c6e] font-medium">hplco.in</span>{" "}
            with manufacturers and distributors to start receiving leads
          </p>
        </>
      )}
    </motion.div>
  );
}

// ─── Table Row ────────────────────────────────────────────────────────────────
function TableRow({
  enquiry,
  selected,
  onClick,
  index,
}: {
  enquiry: Enquiry;
  selected: boolean;
  onClick: () => void;
  index: number;
}) {
  const districts =
    enquiry.role === "manufacturer"
      ? formatDistricts(enquiry.districtsNeeded)
      : formatDistricts(enquiry.operatingDistricts);

  return (
    <motion.tr
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.2 }}
      onClick={onClick}
      className={`border-b border-border/40 last:border-0 cursor-pointer transition-colors duration-150 group ${
        selected
          ? "bg-[#0e7c6e]/5"
          : "hover:bg-muted/30"
      }`}
    >
      {/* Date */}
      <td className="px-5 py-4 text-xs text-muted-foreground whitespace-nowrap">
        {formatDate(enquiry.createdAt)}
      </td>

      {/* Company */}
      <td className="px-5 py-4">
        <p className="text-sm font-semibold text-foreground leading-none">
          {enquiry.companyName}
        </p>
        {enquiry.drugLicense && (
          <p className="text-[11px] text-muted-foreground mt-1 font-mono">
            {enquiry.drugLicense}
          </p>
        )}
      </td>

      {/* Role */}
      <td className="px-5 py-4">
        <RoleBadge role={enquiry.role} />
      </td>

      {/* Contact */}
      <td className="px-10 py-4">
        <p className="text-sm text-foreground leading-none">{enquiry.contactName}</p>
        <p className="text-[11px] text-muted-foreground mt-1">{enquiry.phone}</p>
      </td>

      {/* Districts */}
      <td className="px-5 py-4 text-sm text-muted-foreground whitespace-nowrap">
        {districts}
      </td>

      {/* Status */}
      <td className="px-5 py-4">
        <StatusBadge status={enquiry.status} />
      </td>

      {/* Action arrow */}
      <td className="px-5 py-4 text-right">
        <span
          className={`inline-flex items-center justify-center w-7 h-7 rounded-lg transition-all duration-200 ${
            selected
              ? "bg-[#0e7c6e] text-white"
              : "bg-muted/60 text-muted-foreground group-hover:bg-[#0e7c6e]/10 group-hover:text-[#0e7c6e]"
          }`}
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </td>
    </motion.tr>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function EnquiriesTable({
  enquiries,
  selectedId,
  onSelect,
}: EnquiriesTableProps) {
  const isEmpty = enquiries.length === 0;

  return (
    <div className="bg-white rounded-2xl shadow-sm shadow-black/5 border border-border/40 overflow-hidden">
      {/* Table header */}
      {!isEmpty && (
        <div className="px-5 py-3 border-b border-border/40 bg-muted/20">
          <table className="w-full table-fixed">
            <colgroup>
              <col className="w-20" />
              <col className="w-[25%]" />
              <col className="w-20" />
              <col className="w-[22%]" />
              <col className="w-[15%]" />
              <col className="w-30" />
              <col className="w-12.5" />
            </colgroup>
            <thead>
              <tr>
                {["Date", "Company", "Role", "Contact", "Districts", "Status", ""].map((h) => (
                  <th
                    key={h}
                    className="px-5 py-1 text-left text-[11px] font-semibold uppercase tracking-widest text-muted-foreground first:pl-5"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
          </table>
        </div>
      )}

      {/* Table body */}
      {isEmpty ? (
        <EmptyState isFiltered={false} />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-fixed">
            <colgroup>
              <col className="w-20" />
              <col className="w-[25%]" />
              <col className="w-20" />
              <col className="w-[22%]" />
              <col className="w-[15%]" />
              <col className="w-30" />
              <col className="w-12.5" />
            </colgroup>
            <tbody>
              <AnimatePresence mode="popLayout">
                {enquiries.length > 0 ? (
                  enquiries.map((e, i) => (
                    <TableRow
                      key={e.id}
                      enquiry={e}
                      selected={e.id === selectedId}
                      onClick={() => onSelect(e.id)}
                      index={i}
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan={7}>
                      <EmptyState isFiltered={true} />
                    </td>
                  </tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
