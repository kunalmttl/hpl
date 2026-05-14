import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#f4f5f7]">
      <AdminSidebar />
      <main className="ml-[240px] flex-1 min-h-screen overflow-y-auto">
        {children}
      </main>
    </div>
  );
}