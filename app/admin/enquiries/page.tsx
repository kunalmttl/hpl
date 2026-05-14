import { prisma } from "@/lib/prisma";
import { EnquiriesClient } from "./EnquiriesClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Enquiries — HPL Admin",
};

async function getStats() {
  const [total, newCount, manufacturers, distributors] = await Promise.all([
    prisma.enquiry.count(),
    prisma.enquiry.count({ where: { status: "new" } }),
    prisma.enquiry.count({ where: { role: "manufacturer" } }),
    prisma.enquiry.count({ where: { role: "distributor" } }),
  ]);

  return { total, newCount, manufacturers, distributors };
}


async function getEnquiries() {
  return prisma.enquiry.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export default async function EnquiriesPage() {
  const [stats, enquiries] = await Promise.all([getStats(), getEnquiries()]);

  // Serialize dates to strings for client component
  const serialized = enquiries.map((e) => ({
    ...e,
    createdAt: e.createdAt.toISOString(),
    updatedAt: e.updatedAt.toISOString(),
  }));

  return <EnquiriesClient initialEnquiries={serialized} initialStats={stats} />;
}
