# Fix CORS Error - Quick Guide

## ✅ What I Fixed

1. **Updated CORS configuration** in `backend/server.js`
   - Removed trailing slash from Vercel URL
   - Added proper wildcard pattern for preview deployments
   - Made CORS more flexible with function-based origin checking

2. **Updated `.env.production`** with your Render URL:
   ```
   VITE_API_URL=https://wvomb-1.onrender.com
   ```

## 🚀 Deploy the Fix

### Step 1: Push Backend Changes to GitHub

```bash
git add backend/server.js
git commit -m "Fix CORS configuration for Vercel"
git push
```

Render will automatically redeploy (takes 2-3 minutes).

### Step 2: Update Vercel Environment Variable

1. Go to https://vercel.com/dashboard
2. Select your project (wvomb)
3. Go to **Settings** → **Environment Variables**
4. Find or add `VITE_API_URL`:
   - **Name:** `VITE_API_URL`
   - **Value:** `https://wvomb-1.onrender.com`
   - **Environment:** Production
5. Click **"Save"**

### Step 3: Redeploy Frontend on Vercel

**Option A: Automatic (if you push .env.production)**
```bash
git add frontend/.env.production
git commit -m "Update production API URL"
git push
```

**Option B: Manual Redeploy**
1. Go to Vercel Dashboard
2. **Deployments** tab
3. Click **"..."** on latest deployment
4. Click **"Redeploy"**

### Step 4: Wait and Test

1. Wait for both deployments to complete (3-5 minutes)
2. Visit https://wvomb.vercel.app
3. Check Services page
4. Check Contact page
5. Should work now! ✅

## 🔍 Verify CORS is Working

### Test Backend CORS Headers

```bash
curl -I -X OPTIONS https://wvomb-1.onrender.com/api/services \
  -H "Origin: https://wvomb.vercel.app" \
  -H "Access-Control-Request-Method: GET"
```

Should see:
```
Access-Control-Allow-Origin: https://wvomb.vercel.app
Access-Control-Allow-Credentials: true
```

### Check Browser Console

After redeployment:
1. Open https://wvomb.vercel.app
2. Press F12 (DevTools)
3. Go to Console tab
4. Should NOT see CORS errors
5. Should see data loading

## 🐛 If Still Not Working

### 1. Clear Browser Cache
- Press `Ctrl + Shift + Delete`
- Clear cached images and files
- Or use Incognito mode

### 2. Check Render Logs
1. Go to Render Dashboard
2. Click on your service
3. Click **"Logs"** tab
4. Look for CORS-related errors

### 3. Verify Environment Variable on Vercel
```bash
# Check what API URL is being used
# Open browser console on https://wvomb.vercel.app
console.log(import.meta.env.VITE_API_URL)
```

Should show: `https://wvomb-1.onrender.com`

### 4. Check Backend is Running
```bash
curl https://wvomb-1.onrender.com
```

Should return: `{"message":"WVOMB Backend API is running"}`

## 📝 What Changed in CORS Config

### Before (Broken):
```javascript
origin: [
  'https://wvomb.vercel.app/',  // ❌ Trailing slash
  'https://wvomb-*.vercel.app'  // ❌ Wrong wildcard syntax
]
```

### After (Fixed):
```javascript
origin: function (origin, callback) {
  const allowedOrigins = [
    'https://wvomb.vercel.app',              // ✅ No trailing slash
    /https:\/\/wvomb-.*\.vercel\.app$/       // ✅ Proper regex
  ];
  // ... proper checking logic
}
```

## ⏱️ Timeline

1. **Push backend changes** → Render auto-deploys (2-3 min)
2. **Update Vercel env var** → Instant
3. **Redeploy frontend** → Vercel deploys (1-2 min)
4. **Total time:** ~5 minutes

## ✅ Success Checklist

- [ ] Backend changes pushed to GitHub
- [ ] Render redeployed successfully
- [ ] Vercel environment variable updated
- [ ] Frontend redeployed
- [ ] No CORS errors in browser console
- [ ] Services page loads data
- [ ] Contact page loads data
- [ ] Admin login works

## 🎯 Quick Commands

```bash
# Push backend fix
git add backend/server.js
git commit -m "Fix CORS"
git push

# Test backend
curl https://wvomb-1.onrender.com

# Test CORS
curl -I -X OPTIONS https://wvomb-1.onrender.com/api/services \
  -H "Origin: https://wvomb.vercel.app"
```

---

**Your URLs:**
- Backend: https://wvomb-1.onrender.com
- Frontend: https://wvomb.vercel.app
- Admin: https://wvomb.vercel.app/admin/login

**Status:** Ready to deploy! Just push the changes and wait 5 minutes.
