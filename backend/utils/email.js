import nodemailer from 'nodemailer';

// Create email transporter
const createTransporter = () => {
  const config = {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    },
    tls: {
      rejectUnauthorized: false
    }
  };

  console.log('Email config:', {
    host: config.host,
    port: config.port,
    user: config.auth.user,
    passLength: config.auth.pass?.length
  });

  return nodemailer.createTransport(config);
};

// Send email function
export const sendEmail = async ({ to, subject, html }) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"WVOMB Contact Form" <${process.env.SMTP_USER}>`,
      to: to,
      subject: subject,
      html: html
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Email error:', error);
    throw error;
  }
};

// Send auto-reply to user
export const sendAutoReply = async (userEmail, userName) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"WVOMB Advisors" <${process.env.SMTP_USER}>`,
      to: userEmail,
      subject: 'Thank you for contacting WVOMB Advisors',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #520052;">Thank You for Reaching Out!</h2>
          <p>Dear ${userName},</p>
          <p>We have received your message and appreciate you taking the time to contact us.</p>
          <p>Our team will review your inquiry and get back to you within 24 hours.</p>
          <p>In the meantime, feel free to explore our services at <a href="https://wvomb.vercel.app">wvomb.vercel.app</a></p>
          <br>
          <p>Best regards,<br>
          <strong>WVOMB Advisors Team</strong></p>
          <hr style="border: 1px solid #f2f2f2; margin: 20px 0;">
          <p style="font-size: 12px; color: #8A8A8A;">
            This is an automated message. Please do not reply to this email.
          </p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Auto-reply sent to:', userEmail);
  } catch (error) {
    console.error('Auto-reply error:', error);
    // Don't throw - auto-reply failure shouldn't stop the process
  }
};
