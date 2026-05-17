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
  const serialized = enquiries.map((e: typeof enquiries[number]) => ({
    ...e,
    createdAt: e.createdAt.toISOString(),
    updatedAt: e.updatedAt.toISOString(),
  })) as Array<{
    id: string;
    role: "manufacturer" | "distributor";
    companyName: string;
    contactName: string;
    phone: string;
    email: string | null;
    drugLicense: string;
    productCategories: string[];
    monthlyVolume: string | null;
    districtsNeeded: string | null;
    gstNo: string | null;
    yearsInOperation: string | null;
    preferredCategories: string[];
    operatingDistricts: string | null;
    message: string | null;
    status: string;
    note: string | null;
    createdAt: string;
    updatedAt: string;
  }>;

  return <EnquiriesClient initialEnquiries={serialized} initialStats={stats} />;
}
