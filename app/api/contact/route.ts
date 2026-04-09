import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  // Check for API Key immediately
  const apiKey = process.env.RESEND_API_KEY;
  
  if (!apiKey) {
    console.error("CRITICAL ERROR: RESEND_API_KEY is missing from environment variables.");
    return NextResponse.json(
      { 
        success: false, 
        error: "Server configuration error: RESEND_API_KEY is missing.",
        debug: "Please ensure .env.local exists and contains RESEND_API_KEY."
      },
      { status: 500 }
    );
  }

  const resend = new Resend(apiKey);

  try {
    const body = await req.json();
    const { name, company, email, phone, enquiryType, subject, message } = body;

    // Validate fields exist
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    console.log(`Attempting to send email from ${email} to hindustanpharma1@yahoo.com...`);

    const { data, error } = await resend.emails.send({
      from: "HPL Enquiry <onboarding@resend.dev>",
      to: ["kunalmittal.km@outlook.com"],
      subject: `New Business Enquiry: ${subject}`,
      replyTo: email,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #334155;">
          <h2 style="color: #0f766e; border-bottom: 2px solid #0f766e; padding-bottom: 10px;">New Enquiry from HPL Landing Page</h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin-top: 20px;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Company:</strong> ${company}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Enquiry Type:</strong> ${enquiryType}</p>
            <p><strong>Subject:</strong> ${subject}</p>
          </div>

          <div style="margin-top: 30px;">
            <h3 style="color: #0f766e;">Message / Requirements:</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
          </div>

          <footer style="margin-top: 50px; padding-top: 20px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8;">
            <p>This enquiry was sent from the Hindustan Pharma Logistics landing page contact form.</p>
          </footer>
        </div>
      `,
    });

    if (error) {
      console.error("Resend API Error:", error);
      return NextResponse.json(
        { success: false, error: error.message }, 
        { status: 500 }
      );
    }

    console.log("Email sent successfully:", data?.id);
    return NextResponse.json({ success: true, data });

  } catch (err: any) {
    console.error("API Route Crash:", err);
    return NextResponse.json(
      { 
        success: false, 
        error: "Internal Server Error", 
        details: err.message 
      },
      { status: 500 }
    );
  }
}
