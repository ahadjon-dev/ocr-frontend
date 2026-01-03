# Deployment Guide - Fergana OCR Frontend

Complete guide for deploying the Fergana OCR Frontend to production.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [GitHub Setup](#github-setup)
- [Environment Configuration](#environment-configuration)
- [Build & Test](#build--test)
- [Deployment Options](#deployment-options)
- [Post-Deployment](#post-deployment)
- [Troubleshooting](#troubleshooting)

## Prerequisites

- ✅ Node.js 18+ installed
- ✅ Backend deployed to Railway: `https://web-production-8677.up.railway.app`
- ✅ GitHub account
- ✅ Git installed locally

## GitHub Setup

### 1. Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `fergana-ocr-frontend` (or your choice)
3. Description: "Modern React TypeScript frontend for Uzbek document OCR platform"
4. Visibility: Public or Private
5. **DO NOT** initialize with README (we already have one)
6. Click "Create repository"

### 2. Initialize Local Git Repository

```bash
cd /home/ahadjon/work/fergani/fergani-ocr/frontend

# Initialize git (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Fergana OCR Frontend

- React 19.2.0 + TypeScript 5.9.3
- Vite 7.3.0 build system
- Tailwind CSS 3.4.17 styling
- React Query for state management
- Document OCR with image & PDF support
- Railway backend integration
- Error boundary and safe error handling"

# Add remote (replace with your actual repo URL)
git remote add origin https://github.com/YOUR_USERNAME/fergana-ocr-frontend.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### 3. Verify .gitignore

Make sure `.env` is excluded (it should already be):

```bash
# Check if .env is in .gitignore
grep "^\.env$" .gitignore

# If not found, add it
echo ".env" >> .gitignore
```

## Environment Configuration

### Development (.env.example)

```env
# Backend API URL for local development
VITE_API_URL=http://localhost:8001
```

### Production (.env)

```env
# Backend API URL for production (Railway)
VITE_API_URL=https://web-production-8677.up.railway.app
```

**Important**: Never commit `.env` to GitHub. Only commit `.env.example`.

## Build & Test

### 1. Test Production Build Locally

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Preview production build
npm run preview
```

Visit `http://localhost:4173` to test the production build.

### 2. Verify Environment Variables

```bash
# Check if VITE_API_URL is set correctly
cat .env

# Test API connection
curl https://web-production-8677.up.railway.app/api/v1/ocr/health/
```

### 3. Type Check

```bash
npx tsc --noEmit
```

Should show no errors.

## Deployment Options

### Option 1: Vercel (Recommended)

**Why Vercel?**

- ✅ Perfect for React/Vite projects
- ✅ Automatic deployments from GitHub
- ✅ Free tier available
- ✅ Global CDN
- ✅ Easy environment variable management

**Steps:**

1. Go to https://vercel.com
2. Sign in with GitHub
3. Click "New Project"
4. Import your `fergana-ocr-frontend` repository
5. Configure:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
6. Add environment variable:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://web-production-8677.up.railway.app`
7. Click "Deploy"

Your app will be live at: `https://fergana-ocr-frontend.vercel.app`

### Option 2: Netlify

**Steps:**

1. Go to https://app.netlify.com
2. Sign in with GitHub
3. Click "Add new site" → "Import an existing project"
4. Choose GitHub and select your repository
5. Configure:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. Add environment variable:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://web-production-8677.up.railway.app`
7. Click "Deploy site"

Your app will be live at: `https://fergana-ocr-frontend.netlify.app`

### Option 3: Railway

**Steps:**

1. Go to https://railway.app
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your `fergana-ocr-frontend` repository
4. Configure:
   - **Build Command**: `npm run build`
   - **Start Command**: `npm run preview` (or use a static server)
5. Add environment variable:
   - **Variable**: `VITE_API_URL`
   - **Value**: `https://web-production-8677.up.railway.app`
6. Deploy

### Option 4: Manual Deployment (Static Hosting)

For any static file hosting service:

```bash
# Build the project
npm run build

# The 'dist' folder contains production files
# Upload the contents of 'dist' to your hosting provider
```

## Post-Deployment

### 1. Update Backend CORS Settings

Make sure your Railway backend allows requests from your frontend domain.

In Django `settings.py`, add your frontend URL to `CORS_ALLOWED_ORIGINS`:

```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",  # Local development
    "https://fergana-ocr-frontend.vercel.app",  # Production
    # Add your actual domain here
]
```

### 2. Test Production Deployment

Visit your deployed URL and test:

- ✅ File upload works
- ✅ Image extraction works
- ✅ PDF extraction works
- ✅ Language selection works
- ✅ Results display correctly
- ✅ Copy and download functions work
- ✅ No console errors

### 3. Monitor Errors

Check browser console for any errors:

```bash
# In browser DevTools (F12) → Console tab
```

### 4. Setup Custom Domain (Optional)

#### Vercel:

1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

#### Netlify:

1. Go to Site Settings → Domain management
2. Add custom domain
3. Configure DNS records

## Troubleshooting

### Issue: CORS Errors

**Symptom**: `Access-Control-Allow-Origin` errors in console

**Solution**: Add frontend domain to backend CORS settings:

```python
# Django settings.py
CORS_ALLOWED_ORIGINS = [
    "https://your-frontend-domain.com",
]
```

### Issue: Environment Variables Not Working

**Symptom**: API calls go to wrong URL

**Solution**:

1. Verify `VITE_API_URL` is set in hosting platform
2. Rebuild the project (environment variables are embedded at build time)
3. Check: `console.log(import.meta.env.VITE_API_URL)`

### Issue: Build Fails

**Symptom**: Deployment fails during build

**Solution**:

```bash
# Test build locally first
npm run build

# Check TypeScript errors
npx tsc --noEmit

# Check for missing dependencies
npm install
```

### Issue: Blank Page After Deployment

**Symptom**: Deployed app shows blank page

**Solution**:

1. Check browser console for errors
2. Verify build output directory is `dist`
3. Check that all assets are loading (Network tab in DevTools)
4. Ensure base URL is configured correctly in `vite.config.ts`

### Issue: PDF Upload Fails

**Symptom**: PDFs don't extract text

**Solution**:

1. Verify backend endpoint is accessible
2. Check CORS headers
3. Verify `VITE_API_URL` points to Railway backend
4. Test endpoint directly:
   ```bash
   curl -X POST https://web-production-8677.up.railway.app/api/v1/ocr/multi-format/extract/ \
     -F "file=@test.pdf" \
     -F "language=eng"
   ```

## Continuous Deployment

### Vercel/Netlify Automatic Deployments

Once connected to GitHub:

1. Push changes to `main` branch
2. Deployment triggers automatically
3. New version goes live in ~2 minutes

### Manual Deployment Workflow

```bash
# Make changes
git add .
git commit -m "Your commit message"
git push origin main

# Your hosting platform will auto-deploy
```

## Rollback

### Vercel:

1. Go to Deployments
2. Find previous working deployment
3. Click "..." → "Promote to Production"

### Netlify:

1. Go to Deploys
2. Find previous working deployment
3. Click "Publish deploy"

## Performance Optimization

### 1. Enable Compression

Most hosting platforms (Vercel, Netlify) automatically enable gzip/brotli compression.

### 2. Add Caching Headers

Configure in hosting platform settings:

- Cache static assets: 1 year
- Cache HTML: No cache (or short cache)

### 3. Analyze Bundle Size

```bash
npm run build

# Check dist folder size
du -sh dist/

# Analyze bundle
npx vite-bundle-visualizer
```

## Security Checklist

- ✅ `.env` is in `.gitignore`
- ✅ No API keys in frontend code
- ✅ CORS configured correctly on backend
- ✅ HTTPS enabled (automatic on Vercel/Netlify)
- ✅ Environment variables set in hosting platform
- ✅ No sensitive data in console.logs

## Monitoring

### Vercel Analytics

Enable in Project Settings → Analytics

### Sentry (Error Tracking)

```bash
npm install @sentry/react

# Add to src/main.tsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: import.meta.env.MODE,
});
```

## Support

If you encounter issues:

1. Check [Troubleshooting](#troubleshooting) section
2. Review browser console errors
3. Test backend API directly with curl
4. Check hosting platform logs
5. Open an issue on GitHub

## Summary

**Quick Deploy Checklist:**

1. ✅ Push code to GitHub
2. ✅ Connect to Vercel/Netlify
3. ✅ Set `VITE_API_URL` environment variable
4. ✅ Deploy
5. ✅ Update backend CORS settings
6. ✅ Test production deployment

**Your URLs:**

- Backend: https://web-production-8677.up.railway.app
- Frontend: (Set after deployment)

---

**Happy Deploying! 🚀**
