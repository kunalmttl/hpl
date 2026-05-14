import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const patchSchema = z.object({
  status: z.enum(["new", "contacted", "converted", "rejected"]).optional(),
  note:   z.string().optional(),
});

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  
  try {
    const enquiry = await prisma.enquiry.findUnique({
      where: { id },
    });
    if (!enquiry) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ enquiry }, { status: 200 });
  } catch (err) {
    console.error("[Admin] GET /enquiries/[id] error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  
  try {
    const body   = await req.json();
    const parsed = patchSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { status, note } = parsed.data;

    // Only update fields that were actually provided
    const updated = await prisma.enquiry.update({
      where: { id },
      data: {
        ...(status !== undefined ? { status } : {}),
        ...(note   !== undefined ? { note }   : {}),
      },
    });

    return NextResponse.json({ enquiry: updated }, { status: 200 });
  } catch (err) {
    console.error("[Admin] PATCH /enquiries/[id] error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
