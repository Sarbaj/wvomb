# Email Deployment Fix for Render

## Issue Identified
The contact form emails were not working on Render because the message route was checking for old SMTP environment variables (`SMTP_USER` and `SMTP_PASS`) instead of the Brevo API key (`BREVO_API_KEY`).

## Fix Applied
Updated `backend/routes/messages.js` to check for `BREVO_API_KEY` instead of SMTP variables.

### Before:
```javascript
if (process.env.SMTP_USER && process.env.SMTP_PASS) {
```

### After:
```javascript
if (process.env.BREVO_API_KEY) {
```

## Required Environment Variables for Render

Make sure these environment variables are set in your Render dashboard:

### Essential Variables:
```
BREVO_API_KEY=your_brevo_api_key_here
ADMIN_EMAIL=aashish.pande@wvomb.co
JWT_SECRET=your_jwt_secret_here
MONGODB_URI=your_mongodb_connection_string
```

### Optional Variables:
```
NODE_ENV=production
PORT=5000
```

## How to Set Environment Variables in Render:

1. Go to your Render dashboard
2. Select your backend service
3. Go to "Environment" tab
4. Add the required environment variables
5. Deploy the service

## Brevo API Key Setup:

1. Go to [Brevo](https://www.brevo.com/) (formerly Sendinblue)
2. Sign up or log in to your account
3. Go to SMTP & API → API Keys
4. Create a new API key
5. Copy the key and add it to Render environment variables

## Email Flow:

1. **Contact Form Submission** → Saves to MongoDB
2. **If BREVO_API_KEY exists** → Sends notification email to admin
3. **Auto-reply** → Sends confirmation email to user
4. **Email Status** → Updates database with email sent status

## Testing Email Functionality:

After deployment, you can test by:
1. Submitting the contact form
2. Checking Render logs for email success/failure messages
3. Verifying emails are received at the admin email address
4. Checking the admin dashboard for message status

## Troubleshooting:

### If emails still don't work:
1. Check Render logs for error messages
2. Verify BREVO_API_KEY is correctly set
3. Ensure Brevo account is active and has sending quota
4. Check spam folder for received emails

### Log Messages to Look For:
- ✅ `Email sent via Brevo API: [messageId]`
- ✅ `Auto-reply sent to: [email]`
- ⚠️ `BREVO_API_KEY not configured`
- ❌ `Brevo API error: [error message]`

## Files Modified:
- `backend/routes/messages.js` - Fixed email configuration check
- `EMAIL_DEPLOYMENT_FIX.md` - This documentation

## Status:
✅ **FIXED** - Contact form emails should now work on Render deployment with proper Brevo API configuration.