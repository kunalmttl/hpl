import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  // Auth is handled by proxy.ts middleware

  try {
    const rows = await prisma.enquiry.groupBy({
      by: ["role", "status"],
      _count: { _all: true },
    });

    const stats = {
      total:         rows.reduce((s, r) => s + r._count._all, 0),
      newCount:      rows.filter((r) => r.status === "new").reduce((s, r) => s + r._count._all, 0),
      manufacturers: rows.filter((r) => r.role === "manufacturer").reduce((s, r) => s + r._count._all, 0),
      distributors:  rows.filter((r) => r.role === "distributor").reduce((s, r) => s + r._count._all, 0),
    };

    return NextResponse.json({ stats }, { status: 200 });
  } catch (err) {
    console.error("[Admin] GET /stats error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
