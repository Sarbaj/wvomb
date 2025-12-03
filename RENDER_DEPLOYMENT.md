# Render Deployment Guide

## ✅ Fixed: Added Build Script

I've added the `build` script to `package.json`. Render requires this even though Node.js backends don't need a build step.

## 🚀 Deploy Backend to Render

### Step 1: Create Render Account
1. Go to https://render.com
2. Sign up with GitHub

### Step 2: Create Web Service
1. Click **"New +"** button
2. Select **"Web Service"**
3. Connect your GitHub repository
4. Click **"Connect"** next to your repository

### Step 3: Configure Service

**Basic Settings:**
- **Name:** `wvomb-backend` (or any name you prefer)
- **Region:** Choose closest to you
- **Branch:** `main` (or your default branch)
- **Root Directory:** `backend`
- **Runtime:** `Node`

**Build & Deploy:**
- **Build Command:** `npm install`
- **Start Command:** `npm start`

### Step 4: Add Environment Variables

Click **"Advanced"** and add these environment variables:

```
DB_USER=sarbajmalek3456
DB_PASS=ELON_MUSK2499
DB_NAME=wvomb
PORT=5000
JWT_SECRET=your_strong_random_secret_here_change_this
NODE_ENV=production
FRONTEND_URL_PRODUCTION=https://wvomb.vercel.app
```

**Important:** Change `JWT_SECRET` to a strong random string!

Generate one with:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Step 5: Select Plan
- **Free Plan:** Good for testing (spins down after inactivity)
- **Starter Plan ($7/month):** Recommended for production (always on)

### Step 6: Deploy
1. Click **"Create Web Service"**
2. Wait for deployment (2-5 minutes)
3. Watch the logs for any errors

### Step 7: Get Your Backend URL

Once deployed, Render will give you a URL like:
```
https://wvomb-backend.onrender.com
```

Copy this URL - you'll need it for the frontend!

## 🗄️ Configure MongoDB Atlas

### Allow Render's IP Addresses

1. Go to MongoDB Atlas
2. Click **"Network Access"**
3. Click **"Add IP Address"**
4. Select **"Allow Access from Anywhere"** (0.0.0.0/0)
   - Or add Render's specific IPs if you want more security
5. Click **"Confirm"**

## 🌱 Seed Production Database

### Option 1: From Your Local Machine

Update `backend/.env` temporarily:
```
# Comment out local, add production
# DB_NAME=wvomb
DB_NAME=wvomb_production
```

Then run:
```bash
cd backend
npm run seed
```

### Option 2: Via Render Shell

1. Go to your Render dashboard
2. Click on your service
3. Click **"Shell"** tab
4. Run:
```bash
npm run seed
```

## 🔐 Create Production Admin

Using your backend URL:

```bash
curl -X POST https://wvomb-backend.onrender.com/api/auth/create-admin \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"YourStrongPassword123!"}'
```

**CRITICAL:** After creating admin, disable the route!

Edit `backend/routes/auth.js` and comment out:
```javascript
// router.post('/create-admin', async (req, res) => {
//   ... entire function
// });
```

Then commit and push to trigger a redeploy.

## 🔄 Update Frontend (Vercel)

### Step 1: Update Environment Variable

1. Go to Vercel Dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add or update:
   - **Name:** `VITE_API_URL`
   - **Value:** `https://wvomb-backend.onrender.com` (your Render URL)
   - **Environment:** Production
5. Click **"Save"**

### Step 2: Redeploy Frontend

1. Go to **Deployments** tab
2. Click **"..."** on the latest deployment
3. Click **"Redeploy"**
4. Wait for deployment to complete

## ✅ Test Your Production Site

### Test Backend Directly

```bash
# Health check
curl https://wvomb-backend.onrender.com

# Get services
curl https://wvomb-backend.onrender.com/api/services

# Get contact
curl https://wvomb-backend.onrender.com/api/contact
```

### Test Frontend

1. Visit https://wvomb.vercel.app
2. Check Services page - should load from database
3. Check Contact page - should load from database
4. Try Admin login - https://wvomb.vercel.app/admin/login

## 🐛 Troubleshooting

### Deployment Failed

**Check Render Logs:**
1. Go to your service dashboard
2. Click **"Logs"** tab
3. Look for error messages

**Common Issues:**
- Missing environment variables
- MongoDB connection failed (check Network Access)
- Port issues (make sure PORT=5000 is set)

### Backend Deployed but Not Responding

**Check if service is running:**
- Render dashboard should show "Live" status
- Try accessing the health check endpoint

**Check MongoDB connection:**
- Verify credentials in environment variables
- Check MongoDB Atlas Network Access allows 0.0.0.0/0

### Frontend Can't Connect to Backend

**Verify CORS:**
- Backend `server.js` should include your Vercel URL
- Already configured: `https://wvomb.vercel.app`

**Check Environment Variable:**
- Vercel should have `VITE_API_URL` set
- Frontend should be redeployed after adding variable

**Check Browser Console:**
- Look for CORS errors
- Look for network errors
- Verify API URL being used

### Services Not Loading

**Seed the database:**
```bash
npm run seed
```

**Check database:**
- Login to MongoDB Atlas
- Browse Collections
- Verify `services` collection has data

## 📊 Monitoring

### Render Dashboard
- View logs in real-time
- Monitor CPU and memory usage
- Check deployment history

### Set Up Alerts (Optional)
1. Render dashboard → Service → Settings
2. Configure notification webhooks
3. Get alerts for downtime

## 💰 Costs

### Free Tier
- **Render Free:** Service spins down after 15 minutes of inactivity
- **MongoDB Atlas Free:** 512MB storage
- **Vercel Free:** Unlimited bandwidth

### Paid Plans (Recommended for Production)
- **Render Starter:** $7/month (always on, no spin down)
- **MongoDB Atlas M2:** $9/month (2GB storage, better performance)
- **Vercel Pro:** $20/month (if you need more features)

**Total for production:** ~$7-16/month

## 🔒 Security Checklist

Before going live:

- [ ] Changed JWT_SECRET to strong random string
- [ ] Disabled `/create-admin` route
- [ ] Using HTTPS (automatic with Render)
- [ ] Strong admin password set
- [ ] MongoDB Atlas Network Access configured
- [ ] Environment variables secured (not in code)
- [ ] CORS properly configured

## 🔄 Continuous Deployment

Render automatically deploys when you push to your main branch:

1. Make changes locally
2. Commit and push to GitHub
3. Render automatically detects and deploys
4. Check logs to verify deployment

## 📝 Render Configuration Summary

```yaml
# render.yaml (optional - for infrastructure as code)
services:
  - type: web
    name: wvomb-backend
    runtime: node
    buildCommand: npm install
    startCommand: npm start
    envVars:
      - key: DB_USER
        value: sarbajmalek3456
      - key: DB_PASS
        value: ELON_MUSK2499
      - key: DB_NAME
        value: wvomb
      - key: JWT_SECRET
        generateValue: true
      - key: NODE_ENV
        value: production
```

## 🆘 Need Help?

### Render Support
- Documentation: https://render.com/docs
- Community: https://community.render.com
- Support: support@render.com

### Common Commands

```bash
# View logs
# (Use Render dashboard)

# Restart service
# (Use Render dashboard → Manual Deploy)

# Run shell commands
# (Use Render dashboard → Shell tab)
```

## ✨ Success Checklist

- [ ] Backend deployed to Render
- [ ] Backend URL copied
- [ ] MongoDB Atlas allows Render IPs
- [ ] Database seeded
- [ ] Admin account created
- [ ] `/create-admin` route disabled
- [ ] Vercel environment variable updated
- [ ] Frontend redeployed
- [ ] Production site tested
- [ ] Services loading from database
- [ ] Contact loading from database
- [ ] Admin login working

---

**Your URLs:**
- Backend: https://wvomb-backend.onrender.com (update with your actual URL)
- Frontend: https://wvomb.vercel.app
- Admin: https://wvomb.vercel.app/admin/login

**Next Steps:**
1. Deploy to Render
2. Copy backend URL
3. Update Vercel environment variable
4. Test production site
