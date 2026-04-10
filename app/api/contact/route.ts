import { NextResponse } from "next/server";
import { Resend } from "resend";

const ENQUIRY_LABELS: Record<string, string> = {
  cfa: "C&F Agency",
  storage: "Storage & Distribution",
  coldchain: "Cold Chain Logistics",
  wholesale: "Wholesale Enquiry",
  other: "Other Business",
};

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const recipientEmail = process.env.CONTACT_RECIPIENT_EMAIL;
  
  if (!apiKey) {
    return NextResponse.json(
      { success: false, error: "RESEND_API_KEY is missing." },
      { status: 500 }
    );
  }

  const resend = new Resend(apiKey);

  try {
    const body = await req.json();
    const { name, company, email, phone, enquiryType, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const readableType = ENQUIRY_LABELS[enquiryType] || enquiryType;

    const { data, error } = await resend.emails.send({
      from: "HPL Enquiry <onboarding@resend.dev>",
      to: [recipientEmail || "kunalmittal.km@outlook.com"],
      subject: `Enquiry: ${subject} (${name})`,
      replyTo: email,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            .email-container {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              border: 1px solid #e2e8f0;
              border-radius: 12px;
              overflow: hidden;
            }
            .header {
              background-color: #0f766e;
              padding: 30px 40px;
              color: white;
            }
            .header h1 {
              margin: 0;
              font-size: 20px;
              letter-spacing: 0.05em;
              text-transform: uppercase;
            }
            .content {
              padding: 40px;
            }
            .section-title {
              font-size: 12px;
              text-transform: uppercase;
              letter-spacing: 0.1em;
              color: #64748b;
              margin-bottom: 20px;
              border-bottom: 1px solid #f1f5f9;
              padding-bottom: 8px;
            }
            .grid {
              display: table;
              width: 100%;
              border-collapse: collapse;
            }
            .grid-row {
              display: table-row;
            }
            .grid-label {
              display: table-cell;
              padding: 12px 0;
              color: #64748b;
              font-size: 14px;
              width: 140px;
            }
            .grid-value {
              display: table-cell;
              padding: 12px 0;
              color: #0f172a;
              font-size: 15px;
              font-weight: 600;
            }
            .message-box {
              background-color: #f8fafc;
              padding: 24px;
              border-radius: 8px;
              margin-top: 20px;
              border-left: 4px solid #0f766e;
            }
            .footer {
              background-color: #f8fafc;
              padding: 24px 40px;
              font-size: 12px;
              color: #94a3b8;
              text-align: center;
              border-top: 1px solid #e2e8f0;
            }
          </style>
        </head>
        <body style="background-color: #f1f5f9; padding: 20px;">
          <div class="email-container">
            <div class="header">
              <h4 style="margin: 0; opacity: 0.8; font-weight: normal; font-size: 12px;">Hindustan Pharma Logistics</h4>
              <h1>New Business Enquiry</h1>
            </div>
            
            <div class="content">
              <div class="section-title">Sender Information</div>
              <div class="grid">
                <div class="grid-row">
                  <div class="grid-label">Name</div>
                  <div class="grid-value">${name}</div>
                </div>
                <div class="grid-row">
                  <div class="grid-label">Company</div>
                  <div class="grid-value">${company || "N/A"}</div>
                </div>
                <div class="grid-row">
                  <div class="grid-label">Email</div>
                  <div class="grid-value">${email}</div>
                </div>
                <div class="grid-row">
                  <div class="grid-label">Phone</div>
                  <div class="grid-value">${phone || "Not provided"}</div>
                </div>
              </div>

              <div class="section-title" style="margin-top: 32px;">Enquiry Details</div>
              <div class="grid">
                <div class="grid-row">
                  <div class="grid-label">Type</div>
                  <div class="grid-value" style="color: #0f766e;">${readableType}</div>
                </div>
                <div class="grid-row">
                  <div class="grid-label">Subject</div>
                  <div class="grid-value">${subject}</div>
                </div>
              </div>

              <div class="section-title" style="margin-top: 32px;">Requirements</div>
              <div class="message-box">
                <p style="margin: 0; white-space: pre-wrap; line-height: 1.6; color: #334155;">${message}</p>
              </div>
            </div>

            <div class="footer">
              <p>This automated message was generated by the HPL Landing Page.</p>
              <p>&copy; 2026 Hindustan Pharma Logistics. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
