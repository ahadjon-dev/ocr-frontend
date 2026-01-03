# Backend CORS Configuration

Quick reference for updating Django backend CORS settings after frontend deployment.

## 🎯 Purpose

After deploying your frontend to Vercel/Netlify, you need to update the Django backend to allow requests from your new frontend domain.

## 📝 Django Settings Update

### Location

File: `fergani/settings.py` (in your backend repository)

### Add Frontend URL

Find the `CORS_ALLOWED_ORIGINS` setting and add your frontend URL:

```python
# CORS Configuration
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",  # Local development
    "http://127.0.0.1:5173",  # Local development (alternative)
    "https://fergana-ocr-frontend.vercel.app",  # Production (Vercel)
    # Or if using Netlify:
    # "https://fergana-ocr-frontend.netlify.app",
    # Or your custom domain:
    # "https://ocr.yourdomain.com",
]

# Allow credentials (cookies, authorization headers)
CORS_ALLOW_CREDENTIALS = True

# Optional: Allow all origins in development (NOT recommended for production)
# CORS_ALLOW_ALL_ORIGINS = True  # ❌ Don't use in production
```

### Alternative: Pattern Matching

If you have multiple deployment previews (Vercel creates one per PR):

```python
# For Vercel preview deployments
CORS_ALLOWED_ORIGIN_REGEXES = [
    r"^https://fergana-ocr-frontend-.*\.vercel\.app$",  # Vercel previews
]

# Combined with specific origins
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "https://fergana-ocr-frontend.vercel.app",  # Main production
]
```

## 🚀 Deployment Process

### Step 1: Update Settings

```bash
# In your backend repository
cd /path/to/fergani-ocr

# Edit settings.py
nano fergani/settings.py

# Add your frontend URL to CORS_ALLOWED_ORIGINS
```

### Step 2: Commit Changes

```bash
git add fergani/settings.py
git commit -m "Add frontend URL to CORS allowed origins"
git push origin main
```

### Step 3: Redeploy on Railway

Railway will automatically redeploy when you push to main branch.

Or manually trigger deployment:

1. Go to https://railway.app
2. Select your project
3. Click "Deploy" or wait for auto-deploy

### Step 4: Verify CORS

Test from browser console on your frontend:

```javascript
// Open DevTools (F12) on your frontend
// Go to Console tab
fetch("https://web-production-8677.up.railway.app/api/v1/ocr/health/")
  .then((r) => r.json())
  .then((data) => console.log("✅ CORS working:", data))
  .catch((err) => console.error("❌ CORS error:", err));
```

Should see: `✅ CORS working: {status: "healthy"}`

## 🔧 Complete CORS Configuration

Here's a complete example of CORS settings in Django:

```python
# fergani/settings.py

# Install django-cors-headers if not already installed:
# pip install django-cors-headers

INSTALLED_APPS = [
    # ...
    'corsheaders',
    # ...
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # Should be as high as possible
    'django.middleware.common.CommonMiddleware',
    # ... other middleware
]

# CORS Settings
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://fergana-ocr-frontend.vercel.app",  # Your production URL
]

CORS_ALLOW_CREDENTIALS = True

CORS_ALLOW_METHODS = [
    'DELETE',
    'GET',
    'OPTIONS',
    'PATCH',
    'POST',
    'PUT',
]

CORS_ALLOW_HEADERS = [
    'accept',
    'accept-encoding',
    'authorization',
    'content-type',
    'dnt',
    'origin',
    'user-agent',
    'x-csrftoken',
    'x-requested-with',
]
```

## 🌐 Multiple Environments

If you have different environments:

```python
import os

ENVIRONMENT = os.getenv('ENVIRONMENT', 'development')

if ENVIRONMENT == 'production':
    CORS_ALLOWED_ORIGINS = [
        "https://fergana-ocr-frontend.vercel.app",
    ]
elif ENVIRONMENT == 'staging':
    CORS_ALLOWED_ORIGINS = [
        "https://fergana-ocr-frontend-staging.vercel.app",
    ]
else:  # development
    CORS_ALLOWED_ORIGINS = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ]
```

Set environment variable on Railway:

- Variable: `ENVIRONMENT`
- Value: `production`

## 🐛 Troubleshooting

### Issue: "CORS policy: No 'Access-Control-Allow-Origin' header"

**Solution**: Add frontend URL to `CORS_ALLOWED_ORIGINS` and redeploy backend.

### Issue: "Credentials flag is true, but Access-Control-Allow-Credentials is not present"

**Solution**: Add `CORS_ALLOW_CREDENTIALS = True` to settings.

### Issue: Preflight request fails

**Solution**: Ensure `OPTIONS` is in `CORS_ALLOW_METHODS`.

### Issue: Custom headers not allowed

**Solution**: Add header name to `CORS_ALLOW_HEADERS`.

### Issue: Wildcard origin with credentials

**Solution**: Cannot use `CORS_ALLOW_ALL_ORIGINS = True` with credentials. List specific origins instead.

## ✅ Verification Checklist

After updating CORS settings:

- [ ] Frontend URL added to `CORS_ALLOWED_ORIGINS`
- [ ] Changes committed and pushed to GitHub
- [ ] Backend redeployed on Railway
- [ ] Test CORS from browser console (no errors)
- [ ] Image OCR works from frontend
- [ ] PDF OCR works from frontend
- [ ] No CORS errors in Network tab (F12 → Network)

## 📋 Quick Reference

### Your URLs

- **Backend**: `https://web-production-8677.up.railway.app`
- **Frontend**: (Your Vercel/Netlify URL)

### Files to Update

- `fergani/settings.py` (backend)

### Settings to Add

```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "https://your-frontend-url.vercel.app",
]
```

### Commands

```bash
# Update backend
cd /path/to/fergani-ocr
nano fergani/settings.py
git add fergani/settings.py
git commit -m "Update CORS for frontend deployment"
git push origin main
```

## 🔗 Resources

- Django CORS Headers: https://github.com/adamchainz/django-cors-headers
- Railway Docs: https://docs.railway.app
- CORS Explained: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS

---

**Note**: Remember to update CORS settings every time you deploy to a new domain or subdomain!
