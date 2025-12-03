import nodemailer from 'nodemailer';

// Create email transporter
const createTransporter = () => {
  const port = parseInt(process.env.SMTP_PORT || '587');
  
  const config = {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: port,
    secure: port === 465, // true for 465 (SSL), false for 587 (STARTTLS)
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    },
    tls: {
      rejectUnauthorized: false
    },
    connectionTimeout: 10000, // 10 seconds
    greetingTimeout: 10000,
    socketTimeout: 10000
  };

  console.log('Email config:', {
    host: config.host,
    port: config.port,
    secure: config.secure,
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

// Generate beautiful HTML email template
const generateEmailTemplate = (userName, userEmail, company, service, message) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Form Submission</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
      <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
          <td align="center" style="padding: 40px 0;">
            <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
              
              <!-- Header -->
              <tr>
                <td style="padding: 0;">
                  <div style="background: linear-gradient(135deg, #520052 0%, #8B0066 100%); padding: 40px; text-align: center;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 300; letter-spacing: 2px;">
                      WVOMB<span style="color: #C96AE0;">.</span>
                    </h1>
                    <p style="margin: 10px 0 0 0; color: #ffffff; font-size: 14px; opacity: 0.9;">
                      New Contact Form Submission
                    </p>
                  </div>
                </td>
              </tr>

              <!-- Content -->
              <tr>
                <td style="padding: 40px;">
                  
                  <!-- Alert Badge -->
                  <div style="background-color: #FEF3C7; border-left: 4px solid #F59E0B; padding: 16px; margin-bottom: 30px; border-radius: 4px;">
                    <p style="margin: 0; color: #92400E; font-size: 14px; font-weight: 600;">
                      🔔 New inquiry received from your website
                    </p>
                  </div>

                  <!-- Contact Details -->
                  <h2 style="margin: 0 0 24px 0; color: #520052; font-size: 24px; font-weight: 600;">
                    Contact Information
                  </h2>

                  <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
                    <tr>
                      <td style="padding: 16px; background-color: #F9FAFB; border-radius: 8px;">
                        <table role="presentation" style="width: 100%; border-collapse: collapse;">
                          <tr>
                            <td style="padding: 8px 0; width: 140px; vertical-align: top;">
                              <strong style="color: #6B7280; font-size: 14px;">👤 Name:</strong>
                            </td>
                            <td style="padding: 8px 0; vertical-align: top;">
                              <span style="color: #111827; font-size: 16px; font-weight: 500;">${userName}</span>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 8px 0; width: 140px; vertical-align: top;">
                              <strong style="color: #6B7280; font-size: 14px;">📧 Email:</strong>
                            </td>
                            <td style="padding: 8px 0; vertical-align: top;">
                              <a href="mailto:${userEmail}" style="color: #520052; font-size: 16px; text-decoration: none; font-weight: 500;">${userEmail}</a>
                            </td>
                          </tr>
                          ${company ? `
                          <tr>
                            <td style="padding: 8px 0; width: 140px; vertical-align: top;">
                              <strong style="color: #6B7280; font-size: 14px;">🏢 Company:</strong>
                            </td>
                            <td style="padding: 8px 0; vertical-align: top;">
                              <span style="color: #111827; font-size: 16px; font-weight: 500;">${company}</span>
                            </td>
                          </tr>
                          ` : ''}
                          ${service ? `
                          <tr>
                            <td style="padding: 8px 0; width: 140px; vertical-align: top;">
                              <strong style="color: #6B7280; font-size: 14px;">🎯 Service:</strong>
                            </td>
                            <td style="padding: 8px 0; vertical-align: top;">
                              <span style="color: #111827; font-size: 16px; font-weight: 500;">${service}</span>
                            </td>
                          </tr>
                          ` : ''}
                        </table>
                      </td>
                    </tr>
                  </table>

                  <!-- Message -->
                  <h3 style="margin: 0 0 16px 0; color: #520052; font-size: 18px; font-weight: 600;">
                    💬 Message
                  </h3>
                  <div style="background-color: #F9FAFB; padding: 20px; border-radius: 8px; border-left: 4px solid #520052;">
                    <p style="margin: 0; color: #374151; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                  </div>

                  <!-- Action Button -->
                  <div style="margin-top: 32px; text-align: center;">
                    <a href="mailto:${userEmail}" style="display: inline-block; background: linear-gradient(135deg, #520052 0%, #8B0066 100%); color: #ffffff; padding: 14px 32px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 6px rgba(82, 0, 82, 0.3);">
                      Reply to ${userName}
                    </a>
                  </div>

                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="padding: 30px; background-color: #F9FAFB; border-top: 1px solid #E5E7EB;">
                  <table role="presentation" style="width: 100%; border-collapse: collapse;">
                    <tr>
                      <td style="text-align: center;">
                        <p style="margin: 0 0 8px 0; color: #6B7280; font-size: 13px;">
                          This email was sent from your website contact form
                        </p>
                        <p style="margin: 0; color: #9CA3AF; font-size: 12px;">
                          © ${new Date().getFullYear()} WVOMB Advisors. All rights reserved.
                        </p>
                        <div style="margin-top: 16px;">
                          <a href="https://wvomb.vercel.app" style="color: #520052; text-decoration: none; font-size: 13px; font-weight: 500;">
                            Visit Website →
                          </a>
                        </div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
};

// Generate auto-reply template
const generateAutoReplyTemplate = (userName) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Thank You for Contacting WVOMB</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
      <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
          <td align="center" style="padding: 40px 0;">
            <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
              
              <!-- Header -->
              <tr>
                <td style="padding: 0;">
                  <div style="background: linear-gradient(135deg, #520052 0%, #8B0066 100%); padding: 50px 40px; text-align: center;">
                    <h1 style="margin: 0 0 16px 0; color: #ffffff; font-size: 36px; font-weight: 300; letter-spacing: 2px;">
                      WVOMB<span style="color: #C96AE0;">.</span>
                    </h1>
                    <div style="width: 60px; height: 4px; background-color: #C96AE0; margin: 0 auto;"></div>
                  </div>
                </td>
              </tr>

              <!-- Content -->
              <tr>
                <td style="padding: 50px 40px;">
                  
                  <!-- Success Icon -->
                  <div style="text-align: center; margin-bottom: 30px;">
                    <div style="display: inline-block; width: 80px; height: 80px; background: linear-gradient(135deg, #10B981 0%, #059669 100%); border-radius: 50%; position: relative;">
                      <svg style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 40px; height: 40px;" fill="none" stroke="#ffffff" stroke-width="4" viewBox="0 0 24 24">
                        <path d="M5 13l4 4L19 7" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </div>
                  </div>

                  <h2 style="margin: 0 0 16px 0; color: #111827; font-size: 28px; font-weight: 600; text-align: center;">
                    Thank You for Reaching Out!
                  </h2>

                  <p style="margin: 0 0 24px 0; color: #6B7280; font-size: 16px; line-height: 1.6; text-align: center;">
                    Dear <strong style="color: #520052;">${userName}</strong>,
                  </p>

                  <div style="background-color: #F0FDF4; border-left: 4px solid #10B981; padding: 20px; margin-bottom: 30px; border-radius: 4px;">
                    <p style="margin: 0; color: #065F46; font-size: 15px; line-height: 1.6;">
                      ✓ We have successfully received your message and appreciate you taking the time to contact us.
                    </p>
                  </div>

                  <p style="margin: 0 0 16px 0; color: #374151; font-size: 15px; line-height: 1.6;">
                    Our team will carefully review your inquiry and get back to you within <strong>24 hours</strong>.
                  </p>

                  <p style="margin: 0 0 30px 0; color: #374151; font-size: 15px; line-height: 1.6;">
                    In the meantime, feel free to explore our services and learn more about how we can help elevate your business.
                  </p>

                  <!-- CTA Button -->
                  <div style="text-align: center; margin: 40px 0;">
                    <a href="https://wvomb.vercel.app/services" style="display: inline-block; background: linear-gradient(135deg, #520052 0%, #8B0066 100%); color: #ffffff; padding: 16px 40px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 6px rgba(82, 0, 82, 0.3);">
                      Explore Our Services
                    </a>
                  </div>

                  <!-- Contact Info -->
                  <div style="background-color: #F9FAFB; padding: 24px; border-radius: 8px; margin-top: 30px;">
                    <h3 style="margin: 0 0 16px 0; color: #520052; font-size: 16px; font-weight: 600;">
                      Need Immediate Assistance?
                    </h3>
                    <table role="presentation" style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td style="padding: 8px 0;">
                          <span style="color: #6B7280; font-size: 14px;">📧 Email:</span>
                          <a href="mailto:aashish.pande@wvomb.co" style="color: #520052; text-decoration: none; font-weight: 500; margin-left: 8px;">aashish.pande@wvomb.co</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0;">
                          <span style="color: #6B7280; font-size: 14px;">📞 Phone:</span>
                          <a href="tel:+919825592888" style="color: #520052; text-decoration: none; font-weight: 500; margin-left: 8px;">+91 98255 92888</a>
                        </td>
                      </tr>
                    </table>
                  </div>

                  <!-- Signature -->
                  <div style="margin-top: 40px; padding-top: 30px; border-top: 1px solid #E5E7EB;">
                    <p style="margin: 0 0 8px 0; color: #374151; font-size: 15px;">
                      Best regards,
                    </p>
                    <p style="margin: 0; color: #520052; font-size: 16px; font-weight: 600;">
                      WVOMB Advisors Team
                    </p>
                  </div>

                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="padding: 30px 40px; background-color: #F9FAFB; border-top: 1px solid #E5E7EB;">
                  <p style="margin: 0 0 12px 0; color: #9CA3AF; font-size: 12px; text-align: center; line-height: 1.5;">
                    This is an automated confirmation email. Please do not reply directly to this message.
                  </p>
                  <p style="margin: 0; color: #9CA3AF; font-size: 12px; text-align: center;">
                    © ${new Date().getFullYear()} WVOMB Advisors. All rights reserved.
                  </p>
                  <div style="margin-top: 16px; text-align: center;">
                    <a href="https://wvomb.vercel.app" style="color: #520052; text-decoration: none; font-size: 13px; font-weight: 500;">
                      wvomb.vercel.app
                    </a>
                  </div>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
};

// Send auto-reply to user
export const sendAutoReply = async (userEmail, userName) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"WVOMB Advisors" <${process.env.SMTP_USER}>`,
      to: userEmail,
      subject: 'Thank you for contacting WVOMB Advisors ✓',
      html: generateAutoReplyTemplate(userName)
    };

    await transporter.sendMail(mailOptions);
    console.log('Auto-reply sent to:', userEmail);
  } catch (error) {
    console.error('Auto-reply error:', error);
    // Don't throw - auto-reply failure shouldn't stop the process
  }
};

// Export the template generator for use in routes
export { generateEmailTemplate };
