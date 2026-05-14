"use client";

// ─── Types ────────────────────────────────────────────────────────────────────
export type RoleFilter = "all" | "manufacturer" | "distributor";
export type StatusFilter = "all" | "new" | "contacted" | "converted" | "rejected";

export interface FilterState {
  search: string;
  role: RoleFilter;
  status: StatusFilter;
}

interface FilterBarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  totalVisible: number;
  totalAll: number;
}

// ─── Constants ────────────────────────────────────────────────────────────────
const ROLE_OPTIONS: { value: RoleFilter; label: string }[] = [
  { value: "all", label: "All Roles" },
  { value: "manufacturer", label: "Manufacturer" },
  { value: "distributor", label: "Distributor" },
];

const STATUS_OPTIONS: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "All Status" },
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "converted", label: "Converted" },
  { value: "rejected", label: "Rejected" },
];

// Status pill colors for active filter chips
const STATUS_COLORS: Record<StatusFilter, string> = {
  all: "",
  new: "bg-amber-100 text-amber-700 border-amber-200",
  contacted: "bg-blue-100 text-blue-700 border-blue-200",
  converted: "bg-teal-100 text-[#0e7c6e] border-teal-200",
  rejected: "bg-red-100 text-red-600 border-red-200",
};

const ROLE_COLORS: Record<RoleFilter, string> = {
  all: "",
  manufacturer: "bg-[#0e7c6e]/10 text-[#0e7c6e] border-[#0e7c6e]/20",
  distributor: "bg-amber-50 text-amber-600 border-amber-200",
};

// ─── Select Dropdown ──────────────────────────────────────────────────────────
function FilterSelect<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T;
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className="appearance-none bg-white border border-border/60 rounded-xl px-4 py-2.5 pr-8 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[#0e7c6e]/30 focus:border-[#0e7c6e] cursor-pointer transition-all duration-200 min-w-35"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      {/* Custom chevron */}
      <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground">
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}

// ─── Active Filter Chip ───────────────────────────────────────────────────────
function FilterChip({
  label,
  colorClass,
  onRemove,
}: {
  label: string;
  colorClass: string;
  onRemove: () => void;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${colorClass}`}
    >
      {label}
      <button
        onClick={onRemove}
        className="hover:opacity-70 transition-opacity leading-none"
        aria-label={`Remove ${label} filter`}
      >
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </span>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function FilterBar({
  filters,
  onChange,
  totalVisible,
  totalAll,
}: FilterBarProps) {
  const { search, role, status } = filters;

  const hasActiveFilters = search !== "" || role !== "all" || status !== "all";
  const isFiltered = totalVisible !== totalAll;

  const clearAll = () =>
    onChange({ search: "", role: "all", status: "all" });

  return (
    <div className="space-y-3">
      {/* ── Main bar ──────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 flex-wrap">

        {/* Search */}
        <div className="relative flex-1 min-w-55">
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search company or contact..."
            value={search}
            onChange={(e) => onChange({ ...filters, search: e.target.value })}
            className="w-full bg-white border border-border/60 rounded-xl pl-9 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-[#0e7c6e]/30 focus:border-[#0e7c6e] transition-all duration-200"
          />
          {/* Clear search X */}
          {search && (
            <button
              onClick={() => onChange({ ...filters, search: "" })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Clear search"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Role filter */}
        <FilterSelect
          value={role}
          options={ROLE_OPTIONS}
          onChange={(v) => onChange({ ...filters, role: v })}
        />

        {/* Status filter */}
        <FilterSelect
          value={status}
          options={STATUS_OPTIONS}
          onChange={(v) => onChange({ ...filters, status: v })}
        />

        {/* Clear all — only shown when any filter is active */}
        {hasActiveFilters && (
          <button
            onClick={clearAll}
            className="text-xs font-medium text-muted-foreground hover:text-foreground underline underline-offset-2 transition-colors whitespace-nowrap"
          >
            Clear all
          </button>
        )}

        {/* Result count — pushed to the right */}
        <div className="ml-auto text-xs text-muted-foreground whitespace-nowrap">
          {isFiltered ? (
            <span>
              Showing <span className="font-semibold text-foreground">{totalVisible}</span>{" "}
              of {totalAll}
            </span>
          ) : (
            <span>
              <span className="font-semibold text-foreground">{totalAll}</span> enquiries
            </span>
          )}
        </div>
      </div>

      {/* ── Active filter chips ────────────────────────────────────────────── */}
      {hasActiveFilters && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Filters:
          </span>

          {search && (
            <FilterChip
              label={`"${search}"`}
              colorClass="bg-muted/60 text-foreground border-border/60"
              onRemove={() => onChange({ ...filters, search: "" })}
            />
          )}

          {role !== "all" && (
            <FilterChip
              label={role === "manufacturer" ? "Manufacturer" : "Distributor"}
              colorClass={ROLE_COLORS[role]}
              onRemove={() => onChange({ ...filters, role: "all" })}
            />
          )}

          {status !== "all" && (
            <FilterChip
              label={status.charAt(0).toUpperCase() + status.slice(1)}
              colorClass={STATUS_COLORS[status]}
              onRemove={() => onChange({ ...filters, status: "all" })}
            />
          )}
        </div>
      )}
    </div>
  );
}
