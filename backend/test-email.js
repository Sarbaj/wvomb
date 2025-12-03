import dotenv from 'dotenv';
import { sendEmail } from './utils/email.js';

dotenv.config();

// Test email sending
async function testEmail() {
  console.log('Testing email configuration...');
  console.log('SMTP Host:', process.env.SMTP_HOST);
  console.log('SMTP Port:', process.env.SMTP_PORT);
  console.log('SMTP User:', process.env.SMTP_USER);
  console.log('Admin Email:', process.env.ADMIN_EMAIL);
  
  try {
    await sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject: 'Test Email from WVOMB Backend',
      html: `
        <h2>Email Configuration Test</h2>
        <p>This is a test email to verify your SMTP configuration is working correctly.</p>
        <p>If you received this email, your email setup is complete! ✅</p>
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
