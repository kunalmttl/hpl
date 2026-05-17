import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  // Auth is handled by proxy.ts middleware

  const { searchParams } = new URL(req.url);
  const role   = searchParams.get("role")   ?? undefined;
  const status = searchParams.get("status") ?? undefined;
  const search = searchParams.get("search") ?? undefined;

  try {
    const enquiries = await prisma.enquiry.findMany({
      where: {
        ...(role   && role   !== "all" ? { role }   : {}),
        ...(status && status !== "all" ? { status } : {}),
        ...(search
          ? {
              OR: [
                { companyName: { contains: search, mode: "insensitive" } },
                { contactName: { contains: search, mode: "insensitive" } },
              ],
            }
          : {}),
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ enquiries }, { status: 200 });
  } catch (err) {
    console.error("[Admin] GET /enquiries error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
