import dotenv from 'dotenv';
import { sendEmail } from './utils/email.js';

dotenv.config();

// Test email sending
async function testEmail() {
  console.log('Testing Zoho SMTP configuration...');
  console.log('Zoho SMTP Host:', process.env.ZOHO_SMTP_HOST);
  console.log('Zoho SMTP Port:', process.env.ZOHO_SMTP_PORT);
  console.log('Zoho SMTP User:', process.env.ZOHO_SMTP_USER);
  console.log('Admin Email:', process.env.ADMIN_EMAIL);
  
  try {
    await sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject: 'Test Email from WVOMB Backend',
      html: `
        <h2>Zoho SMTP Configuration Test</h2>
        <p>This is a test email to verify your Zoho SMTP configuration is working correctly.</p>
        <p>If you received this email, your Zoho email setup is complete! ✅</p>
        <hr>
        <p><small>Sent at: ${new Date().toLocaleString()}</small></p>
      `
    });
    
    console.log('✅ Test email sent successfully!');
    console.log('Check your inbox at:', process.env.ADMIN_EMAIL);
  } catch (error) {
    console.error('❌ Email test failed:', error.message);
  }
  
  process.exit(0);
}

testEmail();
