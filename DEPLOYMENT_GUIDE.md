# Namma Schemes - Complete Deployment Guide

## 🚀 Deployment Options

### Option 1: Deploy on Render (Recommended - Free & Easy)

#### Step 1: Prepare Your Project
1. Create `requirements.txt` in backend folder:
```txt
Flask==2.3.0
Flask-CORS==4.0.0
python-dotenv==1.0.0
gunicorn==21.2.0
```

2. Create `Procfile` in root directory:
```
web: cd backend && gunicorn app:app
```

3. Create `.gitignore`:
```
__pycache__/
*.pyc
*.db
.env
venv/
node_modules/
```

#### Step 2: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/namma-schemes.git
git push -u origin main
```

#### Step 3: Deploy on Render
1. Go to https://render.com
2. Sign up with GitHub
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Configure:
   - **Name**: namma-schemes
   - **Environment**: Python 3
   - **Build Command**: `pip install -r backend/requirements.txt`
   - **Start Command**: `cd backend && gunicorn app:app`
   - **Plan**: Free
6. Click "Create Web Service"
7. Wait 5-10 minutes for deployment
8. Your site will be live at: `https://namma-schemes.onrender.com`

---

### Option 2: Deploy on PythonAnywhere (Free)

#### Step 1: Sign Up
1. Go to https://www.pythonanywhere.com
2. Create free account

#### Step 2: Upload Files
1. Go to "Files" tab
2. Upload all your project files
3. Or use Git:
```bash
git clone https://github.com/YOUR_USERNAME/namma-schemes.git
```

#### Step 3: Setup Virtual Environment
```bash
mkvirtualenv --python=/usr/bin/python3.10 namma-env
pip install flask flask-cors python-dotenv
```

#### Step 4: Configure Web App
1. Go to "Web" tab
2. Click "Add a new web app"
3. Choose "Manual configuration"
4. Select Python 3.10
5. Set source code: `/home/YOUR_USERNAME/namma-schemes`
6. Set working directory: `/home/YOUR_USERNAME/namma-schemes/backend`
7. Edit WSGI file:
```python
import sys
path = '/home/YOUR_USERNAME/namma-schemes/backend'
if path not in sys.path:
    sys.path.append(path)

from app import app as application
```
8. Reload web app
9. Your site: `https://YOUR_USERNAME.pythonanywhere.com`

---

### Option 3: Deploy on Heroku

#### Step 1: Install Heroku CLI
Download from: https://devcenter.heroku.com/articles/heroku-cli

#### Step 2: Prepare Files
Create `runtime.txt`:
```
python-3.11.0
```

Create `Procfile`:
```
web: cd backend && gunicorn app:app --bind 0.0.0.0:$PORT
```

#### Step 3: Deploy
```bash
heroku login
heroku create namma-schemes
git push heroku main
heroku open
```

---

### Option 4: Deploy on AWS EC2 (Production)

#### Step 1: Launch EC2 Instance
1. Go to AWS Console
2. Launch Ubuntu 22.04 instance (t2.micro for free tier)
3. Configure security group:
   - Port 22 (SSH)
   - Port 80 (HTTP)
   - Port 443 (HTTPS)

#### Step 2: Connect and Setup
```bash
ssh -i your-key.pem ubuntu@your-ec2-ip

# Update system
sudo apt update && sudo apt upgrade -y

# Install Python and dependencies
sudo apt install python3-pip python3-venv nginx -y

# Clone project
git clone https://github.com/YOUR_USERNAME/namma-schemes.git
cd namma-schemes/backend

# Setup virtual environment
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Install Gunicorn
pip install gunicorn
```

#### Step 3: Configure Nginx
```bash
sudo nano /etc/nginx/sites-available/namma-schemes
```

Add:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location /static {
        alias /home/ubuntu/namma-schemes;
    }
}
```

Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/namma-schemes /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### Step 4: Setup Systemd Service
```bash
sudo nano /etc/systemd/system/namma-schemes.service
```

Add:
```ini
[Unit]
Description=Namma Schemes Flask App
After=network.target

[Service]
User=ubuntu
WorkingDirectory=/home/ubuntu/namma-schemes/backend
Environment="PATH=/home/ubuntu/namma-schemes/backend/venv/bin"
ExecStart=/home/ubuntu/namma-schemes/backend/venv/bin/gunicorn --workers 3 --bind 127.0.0.1:8000 app:app

[Install]
WantedBy=multi-user.target
```

Start service:
```bash
sudo systemctl start namma-schemes
sudo systemctl enable namma-schemes
sudo systemctl status namma-schemes
```

#### Step 5: Setup SSL (Optional but Recommended)
```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d your-domain.com
```

---

### Option 5: Deploy on Vercel (Frontend Only)

#### For Static Frontend:
1. Go to https://vercel.com
2. Import GitHub repository
3. Configure:
   - **Framework**: Other
   - **Root Directory**: ./
   - **Build Command**: (leave empty)
   - **Output Directory**: ./
4. Deploy
5. Your site: `https://namma-schemes.vercel.app`

**Note**: Backend needs separate deployment (use Render/PythonAnywhere)

---

## 🔧 Production Configuration

### 1. Environment Variables
Create `.env` file:
```env
FLASK_ENV=production
SECRET_KEY=your-secret-key-here
DATABASE_URL=sqlite:///data/production.db
ADMIN_EMAIL=admin@nammaschemes.gov.in
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your-email@gmail.com
SMTP_PASSWORD=your-app-password
```

### 2. Update Backend URLs
In all HTML files, replace:
```javascript
// From:
fetch('http://127.0.0.1:8000/api/...')

// To:
fetch('https://your-domain.com/api/...')
```

### 3. Security Checklist
- [ ] Change admin password
- [ ] Enable HTTPS
- [ ] Add password hashing (bcrypt)
- [ ] Set up CORS properly
- [ ] Add rate limiting
- [ ] Configure firewall
- [ ] Regular backups
- [ ] Monitor logs

### 4. Database Migration
For production, consider PostgreSQL:
```bash
pip install psycopg2-binary
```

Update database connection in `app.py`

---

## 📊 Monitoring & Maintenance

### Setup Monitoring
1. **Uptime Monitoring**: https://uptimerobot.com
2. **Error Tracking**: https://sentry.io
3. **Analytics**: Google Analytics

### Backup Strategy
```bash
# Backup database daily
0 2 * * * sqlite3 /path/to/users.db ".backup '/path/to/backup/users_$(date +\%Y\%m\%d).db'"
```

---

## 🎯 Quick Start (Recommended)

**For Beginners - Use Render:**

1. Push code to GitHub
2. Sign up on Render.com
3. Connect GitHub repo
4. Click Deploy
5. Done! ✅

**Your site will be live in 10 minutes!**

---

## 📞 Support

For deployment issues:
- Render: https://render.com/docs
- PythonAnywhere: https://help.pythonanywhere.com
- Heroku: https://devcenter.heroku.com

---

## 🔗 Useful Links

- **Domain Registration**: Namecheap, GoDaddy
- **Free SSL**: Let's Encrypt
- **CDN**: Cloudflare (free)
- **Email Service**: SendGrid, Mailgun

---

**Namma Schemes - Smart Government Scheme Assistant**
Ready for Production Deployment! 🚀
