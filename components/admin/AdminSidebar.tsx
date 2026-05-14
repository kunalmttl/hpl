"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useClerk, useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";

// ─── Nav Items ────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  {
    label: "Overview",
    href: "/admin",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    label: "Enquiries",
    href: "/admin/enquiries",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

const BOTTOM_ITEMS = [
  {
    label: "Help",
    href: "/admin/help",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

// ─── Nav Link ─────────────────────────────────────────────────────────────────
function NavItem({
  label,
  href,
  icon,
  active,
}: {
  label: string;
  href: string;
  icon: React.ReactNode;
  active: boolean;
}) {
  return (
    <Link href={href}>
      <div
        className={`relative flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer group ${
          active
            ? "bg-[#0e7c6e]/8 text-[#0e7c6e]"
            : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
        }`}
      >
        {/* Active left border indicator */}
        {active && (
          <motion.div
            layoutId="activeNav"
            className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-[#0e7c6e] rounded-full"
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}
        <span className={active ? "text-[#0e7c6e]" : "text-muted-foreground group-hover:text-foreground transition-colors"}>
          {icon}
        </span>
        {label}
      </div>
    </Link>
  );
}

// ─── Main Sidebar ─────────────────────────────────────────────────────────────
export function AdminSidebar() {
  const pathname = usePathname();
  const { signOut } = useClerk();
  const { user } = useUser();

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-60 bg-white border-r border-border/40 flex flex-col z-40 select-none">

      {/* ── Logo / Brand ──────────────────────────────────────────────────── */}
      <div className="px-5 pt-6 pb-5 border-b border-border/40">
        <div className="flex items-center gap-3">
          {/* HPL icon — warehouse SVG matching site branding */}
          <div className="w-9 h-9 rounded-xl bg-[#0e7c6e] flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-bold text-foreground leading-none">HPL</p>
            <p className="text-[11px] text-muted-foreground mt-0.5 leading-none">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* ── Main Nav ──────────────────────────────────────────────────────── */}
      <nav className="flex-1 px-3 pt-4 space-y-0.5 overflow-y-auto">
        {NAV_ITEMS.map((item) => (
          <NavItem
            key={item.href}
            {...item}
            active={isActive(item.href)}
          />
        ))}
      </nav>

      {/* ── Bottom Section ────────────────────────────────────────────────── */}
      <div className="px-3 pb-4 space-y-0.5 border-t border-border/40 pt-3">
        {BOTTOM_ITEMS.map((item) => (
          <NavItem
            key={item.href}
            {...item}
            active={isActive(item.href)}
          />
        ))}

        {/* Sign Out */}
        <button
          onClick={() => signOut({ redirectUrl: "/" })}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:bg-red-50 hover:text-red-500 transition-all duration-200 group"
        >
          <svg className="w-4 h-4 group-hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Sign Out
        </button>

        {/* User identity strip */}
        {user && (
          <div className="mt-3 px-4 py-3 rounded-xl bg-muted/40 flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-[#0e7c6e] flex items-center justify-center shrink-0">
              <span className="text-white text-[11px] font-semibold">
                {user.firstName?.[0] ?? "A"}
              </span>
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-semibold text-foreground truncate leading-none">
                {user.firstName ?? "Admin"}
              </p>
              <p className="text-[11px] text-muted-foreground mt-0.5 truncate leading-none">
                {user.emailAddresses[0]?.emailAddress ?? ""}
              </p>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
