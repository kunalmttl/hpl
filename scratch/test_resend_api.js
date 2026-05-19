const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env
dotenv.config({ path: path.join(__dirname, '../.env') });

const apiKey = process.env.RESEND_API_KEY;
const recipientEmail = process.env.CONTACT_RECIPIENT_EMAIL;

console.log('--- Environment Check ---');
console.log('RESEND_API_KEY present:', !!apiKey);
if (apiKey) {
  console.log('RESEND_API_KEY prefix:', apiKey.substring(0, 7) + '...');
}
console.log('CONTACT_RECIPIENT_EMAIL:', recipientEmail);
console.log('-------------------------\n');

async function testResend() {
  if (!apiKey) {
    console.error('Error: RESEND_API_KEY is not defined in .env');
    return;
  }

  try {
    console.log('Fetching domains from Resend to verify API Key and Domain verification status...');
    const response = await fetch('https://api.resend.com/domains', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('HTTP Status Code:', response.status);
    const data = await response.json();
    console.log('API Response:', JSON.stringify(data, null, 2));

    if (response.ok && data.data) {
      console.log('\n--- Verified Domains List ---');
      data.data.forEach(d => {
        console.log(`Domain: ${d.name} | Status: ${d.status} | Region: ${d.region}`);
      });
      console.log('------------------------------');
    } else {
      console.error('\nFailed to fetch domains or API key is invalid.');
    }
  } catch (error) {
    console.error('Error during Resend API test:', error);
  }
}

testResend();
