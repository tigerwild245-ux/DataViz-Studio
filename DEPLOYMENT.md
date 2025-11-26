# 🚀 Deployment Guide - DataViz Studio

Complete guide for deploying DataViz Studio to Vercel with Gemini AI integration.

---

## 📋 Prerequisites

1. **GitHub Account** ✅ (You have: tigerwild245-ux)
2. **Vercel Account** - Sign up at https://vercel.com (free)
3. **Gemini API Key** - Get from https://makersuite.google.com/app/apikey

---

## 🔑 Step 1: Get Your Gemini API Key

1. Visit https://makersuite.google.com/app/apikey
2. Sign in with your Google account
3. Click **"Create API key"**
4. Copy the generated key (starts with `AIza...`)
5. **Save it safely** - you'll need it for Vercel

---

## 🚀 Step 2: Deploy to Vercel

### Option A: Direct Vercel Import (Recommended)

1. **Visit Vercel:**
   ```
   https://vercel.com/new
   ```

2. **Import Git Repository:**
   - Click "Import Git Repository"
   - Paste: `https://github.com/tigerwild245-ux/DataViz-Studio`
   - Click "Import"

3. **Configure Project:**
   - **Project Name**: `dataviz-studio` (or your choice)
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)
   - **Install Command**: `npm install` (auto-detected)

4. **Add Environment Variables:**
   Click "Environment Variables" section and add:
   
   | Name | Value |
   |------|-------|
   | `GEMINI_API_KEY` | Your Gemini API key from Step 1 |
   | `GEMINI_MODEL` | `gemini-pro` |
   | `NODE_ENV` | `production` |

5. **Deploy:**
   - Click "Deploy"
   - Wait 2-3 minutes for build to complete
   - You'll get a URL like: `https://dataviz-studio.vercel.app`

### Option B: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy (from project directory)
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? dataviz-studio
# - Directory? ./
# - Override settings? No

# Add environment variables
vercel env add GEMINI_API_KEY
# Paste your API key when prompted

vercel env add GEMINI_MODEL
# Enter: gemini-pro

# Deploy to production
vercel --prod
```

---

## 🧪 Step 3: Test Your Deployment

1. **Open your Vercel URL**
   ```
   https://your-project-name.vercel.app
   ```

2. **Test File Upload:**
   - Upload `samples/sample-data.json`
   - File should appear in list

3. **Test Generation:**
   - Add custom instructions (optional)
   - Select features, theme, palette
   - Click "Generate Presentation"
   - Wait for AI analysis (may take 10-30 seconds)
   - Download should start automatically

4. **Test Generated HTML:**
   - Open downloaded file in browser
   - Navigate through slides
   - Verify interactivity works

---

## 🔧 Step 4: Verify Environment Variables

In Vercel Dashboard:

1. Go to **Project Settings** → **Environment Variables**
2. Verify these are set:
   - ✅ `GEMINI_API_KEY` (your actual key)
   - ✅ `GEMINI_MODEL` = `gemini-pro`
   - ✅ `NODE_ENV` = `production`

If missing, add them and redeploy:
```bash
vercel --prod
```

---

## 📡 API Endpoints

Your deployed application has these endpoints:

### 1. Parse File
```
POST https://your-app.vercel.app/api/parse-file
Content-Type: multipart/form-data

Body: FormData with 'file' field
```

**Supported formats:**
- Excel (.xlsx, .xls)
- CSV (.csv)
- PDF (.pdf)
- Word (.docx, .doc)
- JSON (.json)

### 2. Analyze Data
```
POST https://your-app.vercel.app/api/analyze-data
Content-Type: application/json

Body:
{
  "data": { ...parsed data },
  "customInstructions": "Optional instructions",
  "fileType": "excel|csv|pdf|word|json"
}
```

### 3. Generate Presentation
```
POST https://your-app.vercel.app/api/generate-presentation
Content-Type: application/json

Body:
{
  "analyzedData": { ...AI analysis results },
  "theme": "modern|minimal|corporate|vibrant|dark|nature",
  "palette": "purple|ocean|sunset|forest|coral|midnight",
  "selectedFeatures": ["metrics", "bar-chart", ...]
}
```

---

## 🔒 Security Notes

### Environment Variables
✅ **DO:** Store API keys in Vercel environment variables  
❌ **DON'T:** Commit `.env` files to Git  
❌ **DON'T:** Expose API keys in client-side code

### API Rate Limits
- Gemini API has usage limits (check your quota)
- Consider implementing rate limiting for production
- Monitor usage in Google Cloud Console

---

## 🐛 Troubleshooting

### Build Fails

**Error: "Cannot find module"**
```bash
# Solution: Ensure all dependencies are in package.json
# Redeploy after confirming package.json is committed
```

**Error: "GEMINI_API_KEY is not defined"**
```bash
# Solution: Add environment variable in Vercel dashboard
# Settings → Environment Variables → Add GEMINI_API_KEY
```

### Runtime Errors

**Error: "Failed to analyze data"**
- Check Gemini API key is valid
- Verify API key has no usage restrictions
- Check Gemini API quota limits

**Error: "Failed to parse file"**
- Ensure file format is supported
- Check file size (<10MB recommended)
- Verify file is not corrupted

### Performance Issues

**Slow generation times:**
- Normal for first request (cold start)
- Subsequent requests should be faster
- Consider upgrading Vercel plan for better performance

---

## 📊 Monitoring

### Vercel Analytics
Enable in Project Settings → Analytics

### Check Logs
```bash
# View deployment logs
vercel logs

# View function logs
vercel logs --follow
```

### API Usage
Monitor in:
- Vercel Dashboard → Analytics
- Google Cloud Console → API usage

---

## 🔄 Update Deployment

When you push changes to GitHub:

### Automatic Deployment
Vercel auto-deploys on every push to `main` branch

### Manual Deployment
```bash
git add .
git commit -m "Update message"
git push origin main
```

Vercel detects push and redeploys automatically!

### Rollback
In Vercel Dashboard:
1. Go to **Deployments**
2. Find previous working deployment
3. Click **"..."** → **"Promote to Production"**

---

## 🎯 Post-Deployment Checklist

After deploying:

- [ ] Application loads at Vercel URL
- [ ] File upload works
- [ ] Excel/CSV/JSON parsing works
- [ ] PDF/Word parsing works (server-side)
- [ ] Gemini AI analysis completes
- [ ] HTML download works
- [ ] Generated HTML displays correctly
- [ ] All themes and palettes work
- [ ] Mobile responsive design works
- [ ] Custom domain configured (optional)

---

## 🌐 Optional: Custom Domain

1. **In Vercel Dashboard:**
   - Go to **Settings** → **Domains**
   - Click "Add"
   - Enter your domain (e.g., `dataviz.yourdomain.com`)

2. **Add DNS Records:**
   Follow Vercel's instructions to add:
   - CNAME record pointing to `cname.vercel-dns.com`

3. **SSL Certificate:**
   - Auto-generated by Vercel
   - Typically ready in 1-2 minutes

---

## 💡 Tips for Production

1. **Monitor Usage:**
   - Track Gemini API calls
   - Set up billing alerts
   - Monitor Vercel function execution time

2. **Optimize Performance:**
   - Enable Vercel Analytics
   - Monitor function cold starts
   - Consider adding caching

3. **User Support:**
   - Add error tracking (Sentry, LogRocket)
   - Monitor user-reported issues
   - Keep README updated

4. **Backup:**
   - Regular Git commits
   - Keep local copy of `.env` securely
   - Document any custom configurations

---

## 📞 Support Resources

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Gemini API Docs**: https://ai.google.dev/docs
- **GitHub Repository**: https://github.com/tigerwild245-ux/DataViz-Studio

---

## ✅ Success!

Your DataViz Studio is now:
- ✅ Deployed to Vercel
- ✅ Connected to Gemini AI
- ✅ Processing all file formats
- ✅ Generating interactive presentations
- ✅ Accessible globally via HTTPS

**Your live URL:**
```
https://your-project-name.vercel.app
```

Share it with your team and start transforming data into visual stories! 🎉
