# Quick Deployment Script for Namma Schemes

## Step 1: Install Git (if not installed)
# Download from: https://git-scm.com/downloads

## Step 2: Initialize Git Repository
```bash
cd "e:\smart_government_scheme-main (1)\smart_government_scheme-main"
git init
git add .
git commit -m "Initial commit - Namma Schemes"
```

## Step 3: Create GitHub Repository
1. Go to https://github.com/new
2. Repository name: namma-schemes
3. Make it Public
4. Don't initialize with README
5. Click "Create repository"

## Step 4: Push to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/namma-schemes.git
git branch -M main
git push -u origin main
```

## Step 5: Deploy on Render (FREE)

### A. Sign Up
1. Go to https://render.com
2. Click "Get Started for Free"
3. Sign up with GitHub

### B. Create Web Service
1. Click "New +" button
2. Select "Web Service"
3. Connect your GitHub account
4. Select "namma-schemes" repository
5. Configure:
   - **Name**: namma-schemes
   - **Environment**: Python 3
   - **Region**: Choose closest to you
   - **Branch**: main
   - **Root Directory**: (leave empty)
   - **Build Command**: `pip install -r backend/requirements.txt`
   - **Start Command**: `cd backend && gunicorn app:app --bind 0.0.0.0:$PORT`
   - **Plan**: Free
6. Click "Create Web Service"

### C. Wait for Deployment
- Takes 5-10 minutes
- Watch the logs for progress
- Once complete, you'll get a URL like: `https://namma-schemes.onrender.com`

### D. Update Frontend URLs
After deployment, update all HTML files:

Replace:
```javascript
fetch('http://127.0.0.1:8000/api/...')
```

With:
```javascript
fetch('https://namma-schemes.onrender.com/api/...')
```

Files to update:
- register.html
- login.html
- admin-dashboard.html
- dashboard.html (if using backend API)

Then commit and push:
```bash
git add .
git commit -m "Update API URLs for production"
git push
```

Render will auto-deploy the changes!

## Step 6: Test Your Live Website

1. **Homepage**: https://namma-schemes.onrender.com/index-new.html
2. **Register**: https://namma-schemes.onrender.com/register.html
3. **Login**: https://namma-schemes.onrender.com/login.html
4. **Admin**: https://namma-schemes.onrender.com/admin-login.html

## Step 7: Custom Domain (Optional)

### Free Domain Options:
- Freenom: https://www.freenom.com
- InfinityFree: https://infinityfree.net

### Add Custom Domain on Render:
1. Go to your service settings
2. Click "Custom Domains"
3. Add your domain
4. Update DNS records as shown
5. Wait for SSL certificate (automatic)

## Troubleshooting

### Issue: Build Failed
**Solution**: Check requirements.txt has all dependencies

### Issue: App Crashes
**Solution**: Check logs in Render dashboard

### Issue: Database Not Working
**Solution**: Render free tier resets database on sleep. Use PostgreSQL for persistence.

### Issue: Slow First Load
**Solution**: Render free tier sleeps after 15 min inactivity. First request wakes it up (takes 30 sec).

## Alternative: Deploy on Vercel (Frontend Only)

If you only want to deploy frontend:

1. Go to https://vercel.com
2. Import GitHub repository
3. Deploy
4. Done!

**Note**: Backend needs separate hosting (use Render)

## Production Checklist

- [ ] Code pushed to GitHub
- [ ] Deployed on Render
- [ ] Tested registration
- [ ] Tested login
- [ ] Tested admin dashboard
- [ ] Updated API URLs
- [ ] Custom domain added (optional)
- [ ] SSL enabled (automatic on Render)
- [ ] Monitoring setup (optional)

## Cost Breakdown

**Free Tier (Render):**
- ✅ 750 hours/month free
- ✅ Automatic SSL
- ✅ Auto-deploy from GitHub
- ✅ Good for testing/demo
- ⚠️ Sleeps after 15 min inactivity
- ⚠️ Database resets on sleep

**Paid Tier ($7/month):**
- ✅ Always on
- ✅ Persistent database
- ✅ Better performance
- ✅ No sleep

## Support

Need help? Check:
- Render Docs: https://render.com/docs
- GitHub Issues: Create issue in your repo
- Community: https://community.render.com

---

**Your website will be LIVE in 15 minutes!** 🚀

Just follow steps 1-5 above!
