# DEPLOYMENT STEPS - Follow These Exactly

## Step 1: Install Git (Required)

1. Download Git from: https://git-scm.com/download/win
2. Run the installer
3. Use default settings
4. Click "Install"
5. Restart this terminal/IDE after installation

## Step 2: After Git is Installed, Run These Commands

Open Command Prompt in your project folder and run:

```cmd
cd "e:\smart_government_scheme-main (1)\smart_government_scheme-main"
git init
git add .
git commit -m "Initial commit - Namma Schemes"
```

## Step 3: Create GitHub Account & Repository

1. Go to: https://github.com/signup
2. Create account (if you don't have one)
3. Go to: https://github.com/new
4. Repository name: `namma-schemes`
5. Make it **Public**
6. Don't check any boxes
7. Click "Create repository"

## Step 4: Push Code to GitHub

GitHub will show you commands. Run these:

```cmd
git remote add origin https://github.com/YOUR_USERNAME/namma-schemes.git
git branch -M main
git push -u origin main
```

(Replace YOUR_USERNAME with your GitHub username)

## Step 5: Deploy on Render

1. Go to: https://render.com
2. Click "Get Started for Free"
3. Sign up with GitHub
4. Click "New +" → "Web Service"
5. Click "Connect GitHub"
6. Select "namma-schemes" repository
7. Fill in:
   - **Name**: namma-schemes
   - **Environment**: Python 3
   - **Build Command**: `pip install -r backend/requirements.txt`
   - **Start Command**: `cd backend && gunicorn app:app --bind 0.0.0.0:$PORT`
   - **Plan**: Free
8. Click "Create Web Service"
9. Wait 5-10 minutes

## Step 6: Get Your Live URL

After deployment completes, Render will give you a URL like:
`https://namma-schemes.onrender.com`

## Step 7: Update API URLs (Important!)

You need to update these files with your Render URL:

### Files to Update:
1. register.html
2. login.html  
3. admin-dashboard.html

### What to Change:
Find: `http://127.0.0.1:8000`
Replace with: `https://YOUR-RENDER-URL.onrender.com`

### Then Push Updates:
```cmd
git add .
git commit -m "Update API URLs for production"
git push
```

Render will auto-deploy the changes!

## Step 8: Test Your Live Website

Visit:
- Homepage: https://YOUR-RENDER-URL.onrender.com/index-new.html
- Register: https://YOUR-RENDER-URL.onrender.com/register.html
- Login: https://YOUR-RENDER-URL.onrender.com/login.html
- Admin: https://YOUR-RENDER-URL.onrender.com/admin-login.html

## ✅ You're Done!

Your website is now live and accessible worldwide!

---

## Alternative: Manual Deployment (No Git)

If you can't install Git, you can:

1. Zip your project folder
2. Go to: https://www.pythonanywhere.com
3. Sign up for free account
4. Upload zip file
5. Extract and configure
6. Follow PythonAnywhere setup guide

---

## Need Help?

1. Install Git first: https://git-scm.com/download/win
2. Then follow steps 2-8 above
3. Total time: 20 minutes

**Start with Step 1: Install Git!**
