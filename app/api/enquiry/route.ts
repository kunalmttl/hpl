import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

// ─── Validation Schema ────────────────────────────────────────────────────────
const enquirySchema = z.object({
  role: z.enum(["manufacturer", "distributor"]),
  companyName: z.string().min(2, "Company name required"),
  contactName: z.string().min(2, "Contact name required"),
  phone: z.string().min(8, "Valid phone number required"),
  // FIX: accept valid email, empty string, or undefined
  email: z.union([z.string().email("Invalid email"), z.literal(""), z.undefined()]),
  drugLicense: z.string().min(3, "Drug license required"),
  // Manufacturer fields
  productCategories: z.array(z.string()).optional(),
  monthlyVolume: z.string().optional(),
  districtsNeeded: z.string().optional(),
  // Distributor fields
  gstNo: z.string().optional(),
  yearsInOperation: z.string().optional(),
  preferredCategories: z.array(z.string()).optional(),
  operatingDistricts: z.string().optional(),
  // Shared
  message: z.string().optional(),
});

// ─── Email helper (Resend) ────────────────────────────────────────────────────
async function sendEmails(data: z.infer<typeof enquirySchema>) {
  const RESEND_KEY = process.env.RESEND_API_KEY;
  if (!RESEND_KEY) return;

  const isManufacturer = data.role === "manufacturer";
  const roleLabel = isManufacturer ? "Manufacturer" : "Distributor";

  const ownerBody = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
      <div style="background:#0e7c6e;padding:20px 28px;border-radius:12px 12px 0 0">
        <h2 style="color:white;margin:0;font-size:18px">New ${roleLabel} Enquiry — HPL Website</h2>
      </div>
      <div style="background:#f9fafb;padding:24px 28px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px">
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          <tr><td style="padding:8px 0;color:#6b7280;width:40%">Company</td><td style="padding:8px 0;font-weight:600">${data.companyName}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280">Contact</td><td style="padding:8px 0">${data.contactName}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280">Phone</td><td style="padding:8px 0"><a href="tel:${data.phone}" style="color:#0e7c6e">${data.phone}</a></td></tr>
          <tr><td style="padding:8px 0;color:#6b7280">Email</td><td style="padding:8px 0">${data.email || "—"}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280">Drug License</td><td style="padding:8px 0">${data.drugLicense}</td></tr>
          ${isManufacturer ? `
          <tr><td style="padding:8px 0;color:#6b7280">Volume</td><td style="padding:8px 0">${data.monthlyVolume || "—"}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280">Districts Needed</td><td style="padding:8px 0">${data.districtsNeeded || "—"}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280">Categories</td><td style="padding:8px 0">${(data.productCategories || []).join(", ") || "—"}</td></tr>
          ` : `
          <tr><td style="padding:8px 0;color:#6b7280">GST No.</td><td style="padding:8px 0">${data.gstNo || "—"}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280">Years Active</td><td style="padding:8px 0">${data.yearsInOperation || "—"}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280">Districts</td><td style="padding:8px 0">${data.operatingDistricts || "—"}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280">Categories</td><td style="padding:8px 0">${(data.preferredCategories || []).join(", ") || "—"}</td></tr>
          `}
          ${data.message ? `<tr><td style="padding:8px 0;color:#6b7280;vertical-align:top">Message</td><td style="padding:8px 0">${data.message}</td></tr>` : ""}
        </table>
      </div>
    </div>
  `;

  const submitterBody = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
      <div style="background:#0e7c6e;padding:20px 28px;border-radius:12px 12px 0 0">
        <h2 style="color:white;margin:0;font-size:18px">Enquiry Received — Hindustan Pharma Logistics</h2>
      </div>
      <div style="background:#f9fafb;padding:24px 28px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;font-size:14px;color:#374151;line-height:1.6">
        <p>Dear <strong>${data.contactName}</strong>,</p>
        <p>Thank you for reaching out to <strong>Hindustan Pharma Logistics</strong>. We have received your ${roleLabel.toLowerCase()} enquiry and our team will review it shortly.</p>
        <p>We typically respond within <strong>24 hours</strong> on working days (Mon–Sat, 10am–6pm).</p>
        <p>If you need immediate assistance:</p>
        <ul style="padding-left:20px">
          <li>📞 <a href="tel:07316056001" style="color:#0e7c6e">0731-6056001</a></li>
          <li>📱 <a href="tel:+919300001411" style="color:#0e7c6e">+91 93000 01411</a></li>
        </ul>
        <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0"/>
        <p style="color:#6b7280;font-size:12px">Hindustan Pharma Logistics · RamKrishna Bagh, Khajrana, Indore MP 452016 · hplco.in</p>
      </div>
    </div>
  `;

  const basePayload = {
    from: "HPL Enquiry <noreply@hplco.in>",
    headers: { "X-Entity-Ref-ID": Date.now().toString() },
  };

  const recipient = process.env.CONTACT_RECIPIENT_EMAIL || "info@hplco.in";

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${RESEND_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      ...basePayload,
      to: [recipient],
      subject: `New ${roleLabel} Enquiry: ${data.companyName}`,
      html: ownerBody,
    }),
  });

  if (data.email) {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        ...basePayload,
        to: [data.email],
        subject: "Your enquiry to Hindustan Pharma Logistics",
        html: submitterBody,
      }),
    });
  }
}

// ─── Route Handler ────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = enquirySchema.safeParse(body);

    if (!parsed.success) {
      // Log exact field errors to terminal for debugging
      console.error("[Enquiry] Validation errors:", JSON.stringify(parsed.error.flatten(), null, 2));
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const d = parsed.data;

    // Save to Neon DB via Prisma
    await prisma.enquiry.create({
      data: {
        role: d.role,
        companyName: d.companyName,
        contactName: d.contactName,
        phone: d.phone,
        email: d.email || null,
        drugLicense: d.drugLicense,
        productCategories: d.productCategories ?? [],
        monthlyVolume: d.monthlyVolume ?? null,
        districtsNeeded: d.districtsNeeded ?? null,
        gstNo: d.gstNo ?? null,
        yearsInOperation: d.yearsInOperation ?? null,
        preferredCategories: d.preferredCategories ?? [],
        operatingDistricts: d.operatingDistricts ?? null,
        message: d.message ?? null,
      },
    });

    // Fire emails (non-blocking)
    sendEmails(d).catch(err =>
      console.error("[Enquiry] Email send failed:", err)
    );

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[Enquiry] Unexpected error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
