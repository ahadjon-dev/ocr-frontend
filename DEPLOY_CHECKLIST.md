# 🚀 Deployment Checklist

Quick checklist for deploying Fergana OCR Frontend to production.

## Pre-Deployment

### Code Preparation

- [ ] All features working locally
- [ ] No console errors in development
- [ ] TypeScript compilation passes: `npx tsc --noEmit`
- [ ] Production build succeeds: `npm run build`
- [ ] Production preview works: `npm run preview`

### Environment Configuration

- [ ] `.env` file configured with Railway backend URL
- [ ] `.env.example` committed to repository
- [ ] `.env` added to `.gitignore`
- [ ] No sensitive data in code

### Testing

- [ ] Image upload and extraction works
- [ ] PDF upload and extraction works
- [ ] All languages tested (English, Uzbek Latin, Uzbek Cyrillic, Russian, Korean)
- [ ] Error states display correctly
- [ ] Loading states work properly
- [ ] Copy and download functions work

## GitHub Setup

### Repository

- [ ] GitHub repository created
- [ ] Local git initialized: `git init`
- [ ] All files added: `git add .`
- [ ] Initial commit created
- [ ] Remote added: `git remote add origin <url>`
- [ ] Code pushed: `git push -u origin main`

### Repository Settings

- [ ] Repository description added
- [ ] Topics/tags added (react, typescript, ocr, uzbek, vite)
- [ ] README.md displays correctly
- [ ] License added (if applicable)

## Deployment Platform

### Vercel (Recommended)

- [ ] Account created/logged in
- [ ] Repository connected
- [ ] Framework preset: **Vite**
- [ ] Build command: `npm run build`
- [ ] Output directory: `dist`
- [ ] Environment variable `VITE_API_URL` set to: `https://web-production-8677.up.railway.app`
- [ ] Deployment triggered
- [ ] Deployment successful
- [ ] Custom domain configured (optional)

### Netlify (Alternative)

- [ ] Account created/logged in
- [ ] Repository connected
- [ ] Build command: `npm run build`
- [ ] Publish directory: `dist`
- [ ] Environment variable `VITE_API_URL` set to: `https://web-production-8677.up.railway.app`
- [ ] Deployment triggered
- [ ] Deployment successful
- [ ] Custom domain configured (optional)

## Backend Configuration

### CORS Settings

- [ ] Frontend URL added to Django `CORS_ALLOWED_ORIGINS`
- [ ] Railway backend redeployed with new CORS settings
- [ ] CORS working (no errors in browser console)

Example Django settings:

```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",  # Local dev
    "https://your-app.vercel.app",  # Production
]
```

## Post-Deployment Testing

### Basic Functionality

- [ ] Frontend loads without errors
- [ ] UI displays correctly
- [ ] No 404 errors for assets
- [ ] Environment variables working (check Network tab for API calls)

### Image OCR

- [ ] Upload image (.jpg, .png)
- [ ] Select language
- [ ] Click "Extract"
- [ ] Results display correctly
- [ ] Confidence score shows
- [ ] Processing time shows
- [ ] Copy to clipboard works
- [ ] Download as .txt works

### PDF OCR

- [ ] Upload PDF file
- [ ] Select language
- [ ] Click "Extract"
- [ ] Results display correctly
- [ ] Metadata shows correctly
- [ ] Copy and download work

### Error Handling

- [ ] Try uploading invalid file type
- [ ] Test with no file selected
- [ ] Test with no internet connection
- [ ] Error messages display properly
- [ ] No white screen crashes

### Performance

- [ ] Page loads quickly (< 3 seconds)
- [ ] API calls complete in reasonable time
- [ ] No memory leaks (check DevTools Memory tab)
- [ ] Mobile responsive (test on phone or DevTools)

## Browser Testing

- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari (if available)
- [ ] Mobile browsers

## Documentation

- [ ] README.md updated with deployment URL
- [ ] DEPLOYMENT.md reviewed
- [ ] Environment variables documented
- [ ] API endpoints documented

## Monitoring & Analytics

- [ ] Vercel Analytics enabled (if using Vercel)
- [ ] Error tracking setup (Sentry, optional)
- [ ] Deployment notifications configured

## Security

- [ ] HTTPS enabled (automatic on Vercel/Netlify)
- [ ] No API keys exposed in frontend
- [ ] `.env` not committed to git
- [ ] CORS properly configured
- [ ] No sensitive data in console logs

## Rollback Plan

- [ ] Previous working deployment identified
- [ ] Know how to rollback on hosting platform
- [ ] Git tag created for stable release: `git tag v1.0.0`

## Communication

- [ ] Stakeholders notified of deployment
- [ ] Deployment URL shared
- [ ] Known issues documented
- [ ] Support contact information available

## Final Checks

- [ ] All checklist items completed ✅
- [ ] Production URL: ********\_\_********
- [ ] Backend URL: `https://web-production-8677.up.railway.app` ✅
- [ ] Deployment date: ********\_\_********
- [ ] Deployed by: ********\_\_********

---

## Quick Deploy Commands

```bash
# 1. Build and test locally
npm install
npm run build
npm run preview

# 2. Push to GitHub
git add .
git commit -m "Deployment ready"
git push origin main

# 3. Deploy to Vercel
npx vercel --prod

# 4. Verify
curl https://your-app.vercel.app
```

## Emergency Rollback

### Vercel

1. Go to Deployments
2. Find last working deployment
3. Click "..." → "Promote to Production"

### Netlify

1. Go to Deploys
2. Find last working deployment
3. Click "Publish deploy"

### Git

```bash
git revert HEAD
git push origin main
```

---

**Status**: Ready for Deployment 🎉

**Next Steps**:

1. Create GitHub repository
2. Push code
3. Connect to Vercel
4. Deploy
5. Test production
6. Update backend CORS
7. Monitor and iterate
