const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env
dotenv.config({ path: path.join(__dirname, '../.env') });

const apiKey = process.env.RESEND_API_KEY;
const recipientEmail = process.env.CONTACT_RECIPIENT_EMAIL;

async function sendTestEmail(fromEmail, toEmail, subject) {
  console.log(`\nAttempting to send email...`);
  console.log(`From: ${fromEmail}`);
  console.log(`To: ${toEmail}`);
  console.log(`Subject: ${subject}`);

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        subject: subject,
        html: `<h3>Test Email</h3><p>This is a test from the HPL Resend diagnostics script.</p>`
      })
    });

    console.log('HTTP Status Code:', response.status);
    const data = await response.json();
    console.log('API Response:', JSON.stringify(data, null, 2));
    
    if (response.ok) {
      console.log('SUCCESS: Email sent successfully!');
      return true;
    } else {
      console.error('FAILURE: Resend API returned an error.');
      return false;
    }
  } catch (error) {
    console.error('Error during fetch:', error);
    return false;
  }
}

async function runDiagnostics() {
  if (!apiKey) {
    console.error('Error: RESEND_API_KEY is not defined in .env');
    return;
  }

  // Diagnostics 1: Try sending from onboarding@resend.dev (Sandbox sender)
  console.log('\n--- DIAGNOSTIC 1: Onboarding Sandbox Domain ---');
  await sendTestEmail('HPL Test <onboarding@resend.dev>', recipientEmail, 'HPL Test via onboarding@resend.dev');

  // Diagnostics 2: Try sending from noreply@hplco.in (Custom production domain)
  console.log('\n--- DIAGNOSTIC 2: Custom Domain noreply@hplco.in ---');
  await sendTestEmail('HPL Enquiry <noreply@hplco.in>', recipientEmail, 'HPL Test via noreply@hplco.in');
}

runDiagnostics();
