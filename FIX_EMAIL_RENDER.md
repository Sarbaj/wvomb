# Fix Email Sending on Render

## 🔴 The Problem

Render (and most cloud hosting platforms) block outgoing SMTP connections on port 587 for security reasons. This causes "Connection timeout" errors.

## ✅ Solution Options

### Option 1: Use Port 465 (SSL) - Quick Fix

I've already updated the code to use port 465 with SSL instead of port 587.

**Update your Render environment variables:**

1. Go to Render Dashboard → Your Service → Environment
2. Update or add:
   ```
   SMTP_PORT=465
   ```
3. Save and redeploy

### Option 2: Use SendGrid (Recommended for Production)

SendGrid is free for 100 emails/day and works perfectly with Render.

#### Step 1: Create SendGrid Account

1. Go to https://sendgrid.com
2. Sign up for free account
3. Verify your email
4. Complete sender verification

#### Step 2: Create API Key

1. Go to Settings → API Keys
2. Click "Create API Key"
3. Name: "WVOMB Backend"
4. Permissions: "Full Access"
5. Copy the API key (you'll only see it once!)

#### Step 3: Update Render Environment Variables

```
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=465
SMTP_USER=apikey
SMTP_PASS=YOUR_SENDGRID_API_KEY_HERE
```

**Important:** The username is literally "apikey", not your email!

#### Step 4: Verify Sender Email

In SendGrid:
1. Go to Settings → Sender Authentication
2. Verify your email address (sarbajmalek3456@gmail.com)
3. Follow the verification link in your email

### Option 3: Use Gmail with App Password (Current Setup)

If you want to keep using Gmail, you need to:

#### Step 1: Enable 2-Factor Authentication

1. Go to https://myaccount.google.com/security
2. Enable 2-Step Verification

#### Step 2: Create App Password

1. Go to https://myaccount.google.com/apppasswords
2. Select "Mail" and "Other (Custom name)"
3. Name it "WVOMB Backend"
4. Copy the 16-character password

#### Step 3: Update Render Environment Variables

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=sarbajmalek3456@gmail.com
SMTP_PASS=YOUR_16_CHAR_APP_PASSWORD
```

**Note:** Use the app password, not your regular Gmail password!

## 🚀 Quick Fix Steps

### 1. Update Environment Variables on Render

Go to your Render service and update:

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=sarbajmalek3456@gmail.com
SMTP_PASS=your_app_password_here
```

### 2. Push Updated Code

```bash
git add backend/utils/email.js
git commit -m "Fix email sending on Render - use port 465"
git push
```

Render will automatically redeploy.

### 3. Test

Submit a form on your website and check:
- Render logs (should not show timeout errors)
- Your email inbox (should receive notification)
- User's email (should receive auto-reply)

## 🔍 Verify It's Working

### Check Render Logs

Look for:
```
✅ Email sent: <message-id>
✅ Auto-reply sent to: user@example.com
```

Instead of:
```
❌ Email error: Error: Connection timeout
```

### Test Email Sending

```bash
# From your local machine
curl -X POST https://wvomb-1.onrender.com/api/messages \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "your-email@example.com",
    "company": "Test Co",
    "service": "fractional-cfo",
    "message": "This is a test message"
  }'
```

Check your email inbox!

## 🐛 Troubleshooting

### Still Getting Timeout?

**Try SendGrid** - It's specifically designed for transactional emails and works perfectly with hosting platforms.

### Gmail App Password Not Working?

1. Make sure 2FA is enabled
2. Generate a new app password
3. Copy it exactly (no spaces)
4. Update Render environment variable
5. Redeploy

### Emails Going to Spam?

**For Gmail:**
1. Check "Not Spam" on first email
2. Add sender to contacts

**For Production:**
1. Set up SPF records
2. Set up DKIM
3. Use a custom domain
4. Use SendGrid or similar service

### SendGrid Setup Issues?

1. Verify sender email first
2. Wait 5-10 minutes after verification
3. Use "apikey" as username (not your email)
4. Use the API key as password
5. Check SendGrid activity logs

## 📊 Comparison

| Service | Free Tier | Setup | Reliability | Recommended |
|---------|-----------|-------|-------------|-------------|
| Gmail | Unlimited | Medium | Good | Development |
| SendGrid | 100/day | Easy | Excellent | ✅ Production |
| Mailgun | 100/day | Easy | Excellent | Production |
| AWS SES | 62,000/month | Hard | Excellent | Enterprise |

## 🎯 Recommended Setup

### For Development (Local):
- Gmail with app password
- Port 465 or 587

### For Production (Render):
- **SendGrid** (best option)
- Port 465
- Verified sender

## 📝 SendGrid Configuration

### Environment Variables:
```bash
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=465
SMTP_USER=apikey
SMTP_PASS=SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
ADMIN_EMAIL=aashish.pande@wvomb.co
```

### Benefits:
- ✅ Works on all hosting platforms
- ✅ Better deliverability
- ✅ Email analytics
- ✅ No daily limits (100 free)
- ✅ Professional service
- ✅ Easy setup

## 🔒 Security Best Practices

1. **Never commit credentials** to Git
2. **Use environment variables** for all secrets
3. **Rotate API keys** regularly
4. **Use app passwords** instead of real passwords
5. **Enable 2FA** on email accounts
6. **Monitor email logs** for suspicious activity

## 📧 Alternative Services

### Mailgun
- Free: 100 emails/day
- Setup: Similar to SendGrid
- URL: https://mailgun.com

### Postmark
- Free: 100 emails/month
- Best deliverability
- URL: https://postmarkapp.com

### AWS SES
- Free: 62,000 emails/month (if on AWS)
- Complex setup
- Best for high volume

## ✅ Final Checklist

- [ ] Updated code to use port 465
- [ ] Pushed changes to GitHub
- [ ] Updated Render environment variables
- [ ] Redeployed on Render
- [ ] Tested email sending
- [ ] Checked Render logs
- [ ] Verified emails received
- [ ] Checked spam folder
- [ ] Tested auto-reply

## 🆘 Still Not Working?

### Quick Debug:

1. **Check Render logs** for exact error
2. **Verify environment variables** are set correctly
3. **Test locally** first (should work)
4. **Try SendGrid** as alternative
5. **Check email service status** (Gmail, SendGrid, etc.)

### Contact Support:

- **Render Support:** https://render.com/docs/support
- **SendGrid Support:** https://support.sendgrid.com
- **Gmail Help:** https://support.google.com/mail

## 💡 Pro Tips

1. **Use SendGrid for production** - It's designed for this
2. **Keep Gmail for development** - Easy to set up
3. **Monitor email logs** - Catch issues early
4. **Test regularly** - Don't wait for users to report
5. **Have backup** - Configure multiple SMTP servers

---

**Current Status:**
- ✅ Code updated to use port 465
- ⏳ Waiting for Render redeploy
- 📝 Environment variables need updating

**Next Steps:**
1. Update SMTP_PORT=465 on Render
2. Or switch to SendGrid (recommended)
3. Test email sending
4. Monitor logs
