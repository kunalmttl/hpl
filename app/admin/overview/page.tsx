import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { RoleBadge } from "@/components/admin/RoleBadge";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Overview — HPL Admin",
};

async function getDashboardData() {
  const [total, newCount, manufacturers, distributors, recentEnquiries] = await Promise.all([
    prisma.enquiry.count(),
    prisma.enquiry.count({ where: { status: "new" } }),
    prisma.enquiry.count({ where: { role: "manufacturer" } }),
    prisma.enquiry.count({ where: { role: "distributor" } }),
    prisma.enquiry.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ]);

  return { total, newCount, manufacturers, distributors, recentEnquiries };
}

function formatDate(date: Date) {
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default async function OverviewPage() {
  const { total, newCount, manufacturers, distributors, recentEnquiries } = await getDashboardData();
  
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const totalCount = total || 1;
  const mfrPercent = Math.round((manufacturers / totalCount) * 100);
  const distPercent = Math.round((distributors / totalCount) * 100);

  return (
    <div className="min-h-screen bg-[#f4f5f7] p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">
              Dashboard Overview
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">{today}</p>
          </div>
          <div className="flex items-center gap-3">
            <Link 
              href="/"
              target="_blank"
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border/60 bg-white text-xs font-medium text-muted-foreground hover:text-foreground hover:border-border transition-all duration-200"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              View Live Site
            </Link>
            <Link
              href="/admin/enquiries"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0e7c6e] text-white text-xs font-semibold hover:bg-[#0c6b5e] transition-all duration-200 shadow-sm shadow-[#0e7c6e]/10"
            >
              Manage Enquiries
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Card 1: Total */}
          <div className="bg-white rounded-2xl p-6 border border-border/40 shadow-sm flex items-center gap-4 hover:border-border/80 transition-colors duration-200">
            <div className="w-12 h-12 rounded-xl bg-[#0e7c6e]/8 text-[#0e7c6e] flex items-center justify-center shrink-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Total Enquiries</p>
              <h3 className="text-2xl font-bold text-foreground mt-0.5">{total}</h3>
              <p className="text-[11px] text-muted-foreground mt-0.5">All-time submissions</p>
            </div>
          </div>

          {/* Card 2: Pending Action */}
          <div className="bg-white rounded-2xl p-6 border border-border/40 shadow-sm flex items-center gap-4 hover:border-border/80 transition-colors duration-200">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${newCount > 0 ? 'bg-amber-50 text-amber-600' : 'bg-muted/60 text-muted-foreground'}`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">New / Unread</p>
              <h3 className="text-2xl font-bold text-foreground mt-0.5">{newCount}</h3>
              <p className={`text-[11px] font-medium mt-0.5 ${newCount > 0 ? 'text-amber-600' : 'text-muted-foreground'}`}>
                {newCount === 0 ? 'All actioned' : 'Requires attention'}
              </p>
            </div>
          </div>

          {/* Card 3: Manufacturers */}
          <div className="bg-white rounded-2xl p-6 border border-border/40 shadow-sm flex items-center gap-4 hover:border-border/80 transition-colors duration-200">
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-[#0e7c6e] flex items-center justify-center shrink-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Manufacturers</p>
              <h3 className="text-2xl font-bold text-foreground mt-0.5">{manufacturers}</h3>
              <p className="text-[11px] text-muted-foreground mt-0.5">Pharma brands</p>
            </div>
          </div>

          {/* Card 4: Distributors */}
          <div className="bg-white rounded-2xl p-6 border border-border/40 shadow-sm flex items-center gap-4 hover:border-border/80 transition-colors duration-200">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Distributors</p>
              <h3 className="text-2xl font-bold text-foreground mt-0.5">{distributors}</h3>
              <p className="text-[11px] text-muted-foreground mt-0.5">Stockists & agents</p>
            </div>
          </div>

        </div>

        {/* Dashboard Sections Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Recent Enquiries (2/3 width on desktop) */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-border/40 shadow-sm p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-border/40">
                <div>
                  <h3 className="text-base font-bold text-foreground">Recent B2B Enquiries</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">Latest 5 submissions from the enquiry wizard</p>
                </div>
                <Link 
                  href="/admin/enquiries" 
                  className="text-xs font-semibold text-[#0e7c6e] hover:text-[#0c6b5e] hover:underline flex items-center gap-1 transition-colors"
                >
                  View All
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              {recentEnquiries.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-12 h-12 rounded-xl bg-muted/60 flex items-center justify-center mb-3">
                    <svg className="w-6 h-6 text-muted-foreground/45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <p className="text-sm font-semibold text-foreground">No enquiries received yet</p>
                  <p className="text-xs text-muted-foreground mt-1">Submit enquiries on the contact forms to populate</p>
                </div>
              ) : (
                <div className="divide-y divide-border/30">
                  {recentEnquiries.map((enquiry) => (
                    <Link 
                      key={enquiry.id} 
                      href={`/admin/enquiries`}
                      className="flex flex-col sm:flex-row sm:items-center justify-between py-4 group -mx-2 px-2 hover:bg-muted/20 rounded-xl transition-all duration-150"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-bold text-foreground group-hover:text-[#0e7c6e] transition-colors leading-none">
                            {enquiry.companyName}
                          </p>
                          <RoleBadge role={enquiry.role} size="sm" showIcon={false} />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Contact: <span className="text-foreground/80 font-medium">{enquiry.contactName}</span> • {enquiry.phone}
                        </p>
                      </div>
                      <div className="flex items-center gap-4 mt-2 sm:mt-0 justify-between sm:justify-end">
                        <span className="text-[11px] text-muted-foreground">
                          {formatDate(enquiry.createdAt)}
                        </span>
                        <StatusBadge status={enquiry.status} size="sm" />
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            {recentEnquiries.length > 0 && (
              <div className="pt-4 border-t border-border/40 mt-4 text-center">
                <Link 
                  href="/admin/enquiries" 
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-muted/60 text-xs font-semibold text-foreground hover:bg-muted/80 transition-colors"
                >
                  Open Enquiries Manager
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            )}
          </div>

          {/* Quick Analytics & Integrations (1/3 width) */}
          <div className="space-y-6">
            
            {/* Breakdown Card */}
            <div className="bg-white rounded-2xl border border-border/40 shadow-sm p-6 space-y-5">
              <div>
                <h3 className="text-base font-bold text-foreground">Leads Breakdown</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Ratio of Manufacturers to Distributors</p>
              </div>

              {/* Custom Bar Graph */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
                  <span>Manufacturers</span>
                  <span>Distributors</span>
                </div>
                <div className="h-2 rounded-full bg-muted/70 overflow-hidden flex">
                  <div 
                    style={{ width: `${mfrPercent}%` }} 
                    className="h-full bg-[#0e7c6e] rounded-l-full transition-all duration-500" 
                  />
                  <div 
                    style={{ width: `${distPercent}%` }} 
                    className="h-full bg-amber-500 rounded-r-full transition-all duration-500" 
                  />
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="flex items-center gap-1 text-[#0e7c6e] font-semibold">
                    <span className="w-2 h-2 rounded-full bg-[#0e7c6e]" />
                    {mfrPercent}% ({manufacturers})
                  </span>
                  <span className="flex items-center gap-1 text-amber-600 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    {distPercent}% ({distributors})
                  </span>
                </div>
              </div>
            </div>

            {/* Platform & Mail Setup */}
            <div className="bg-white rounded-2xl border border-border/40 shadow-sm p-6 space-y-4">
              <div>
                <h3 className="text-base font-bold text-foreground">Channels & Routing</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Status of integrated communication pipelines</p>
              </div>

              <div className="space-y-3.5">
                
                {/* Zoho Row */}
                <a 
                  href="https://mail.zoho.in" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl border border-border/50 bg-muted/10 hover:bg-[#0e7c6e]/5 hover:border-[#0e7c6e]/20 transition-all duration-150 group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 font-bold text-sm">
                      Z
                    </div>
                    <div>
                      <p className="text-xs font-bold text-foreground group-hover:text-[#0e7c6e] transition-colors leading-none">Zoho Mailbox</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5 font-mono">info@hplco.in</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-600">
                    Access
                    <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </a>

                {/* Resend Status */}
                <div className="flex items-center justify-between p-3 rounded-xl border border-border/50 bg-muted/10">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-teal-50 text-[#0e7c6e] flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-foreground leading-none">Resend Mailer</p>
                      <p className="text-[10px] text-[#0e7c6e] font-semibold mt-0.5">Verified sender domain</p>
                    </div>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-teal-500 shadow-sm shadow-teal-500/30" />
                </div>

                {/* DB Status */}
                <div className="flex items-center justify-between p-3 rounded-xl border border-border/50 bg-muted/10">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-violet-50 text-violet-600 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.58 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.58 4 8 4s8-1.79 8-4M4 7c0-2.21 3.58-4 8-4s8 1.79 8 4m0 5c0 2.21-3.58 4-8 4s-8-1.79-8-4" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-foreground leading-none">Neon Database</p>
                      <p className="text-[10px] text-violet-600 font-semibold mt-0.5">PostgreSQL active</p>
                    </div>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-teal-500 shadow-sm shadow-teal-500/30" />
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
