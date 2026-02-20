# Deployment Guide

## 🚀 Quick Start

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Configure Environment

**Backend (.env):**
```bash
NODE_ENV=production
PORT=3000
ADMIN_TOKEN=<run: pnpm run generate:token>
ALLOWED_ORIGINS=https://yourdomain.com
```

**Frontend (.env.production):**
```bash
VITE_BACKEND_URL=https://api.yourdomain.com
```

### 3. Build Application
```bash
# Build frontend
pnpm run build:client

# Build backend
pnpm run build:server
```

### 4. Start Production Server
```bash
NODE_ENV=production pnpm start
```

## 📦 Deployment Options

### Option 1: Single Server (Recommended)

Deploy both frontend and backend on same server:

```bash
# Build everything
pnpm run build

# Start server (serves both API and static files)
NODE_ENV=production pnpm start
```

Server will:
- Serve API on `/api/*`
- Serve frontend static files on `/*`

### Option 2: Separate Servers

**Backend Server:**
```bash
cd server
NODE_ENV=production node dist/server/node-build.mjs
```

**Frontend (Static Hosting):**
```bash
# Upload dist/spa/* to:
# - Netlify
# - Vercel
# - AWS S3 + CloudFront
# - Any static host
```

### Option 3: Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY dist ./dist
COPY backend/data ./backend/data
COPY data ./data
ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "dist/server/node-build.mjs"]
```

```bash
docker build -t scheme-app .
docker run -d -p 3000:3000 --env-file .env scheme-app
```

## 🌐 Nginx Configuration

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    # API requests
    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Frontend static files
    location / {
        root /var/www/scheme-app/dist/spa;
        try_files $uri $uri/ /index.html;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

## 🔐 Security Checklist

- [ ] Generate secure admin token: `pnpm run generate:token`
- [ ] Set `NODE_ENV=production`
- [ ] Configure `ALLOWED_ORIGINS` (no wildcards)
- [ ] Enable HTTPS
- [ ] Set up firewall (allow only 80, 443, 22)
- [ ] Configure rate limiting
- [ ] Set up monitoring
- [ ] Regular backups of `data/` folder

## 📊 Monitoring

### Health Check
```bash
curl https://yourdomain.com/api/health
```

### Check Logs
```bash
tail -f data/access.log
```

### Monitor Process
```bash
pm2 status
pm2 logs scheme-app
```

## 🔄 Updates & Maintenance

### Update Application
```bash
git pull
pnpm install
pnpm run build
pm2 restart scheme-app
```

### Backup Database
```bash
cp data/schemes.db data/schemes.db.backup-$(date +%Y%m%d)
```

### Rotate Admin Token
```bash
pnpm run generate:token
# Update .env with new token
pm2 restart scheme-app
```

## 🚨 Troubleshooting

### Backend not connecting
1. Check if server is running: `pm2 status`
2. Check logs: `pm2 logs scheme-app`
3. Verify port 3000 is open: `netstat -tulpn | grep 3000`
4. Check CORS settings in `.env`

### Frontend not loading
1. Check if files exist: `ls dist/spa/`
2. Verify nginx config: `nginx -t`
3. Check browser console for errors

### Database errors
1. Check file permissions: `ls -la data/`
2. Verify database exists: `ls data/schemes.db`
3. Check disk space: `df -h`

## 📈 Performance Optimization

### Enable Compression
```nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript;
```

### CDN Integration
Upload static assets to CDN:
```bash
aws s3 sync dist/spa/assets s3://your-bucket/assets
```

### Database Optimization
```bash
# Vacuum database
sqlite3 data/schemes.db "VACUUM;"
```

## 🎯 Production Checklist

- [ ] Dependencies installed
- [ ] Environment variables configured
- [ ] Application built
- [ ] HTTPS enabled
- [ ] Firewall configured
- [ ] Monitoring set up
- [ ] Backups automated
- [ ] Health checks passing
- [ ] CORS configured
- [ ] Rate limiting active
- [ ] Error logging enabled
- [ ] Admin token secure

## 📞 Support

For issues:
1. Check logs: `pm2 logs`
2. Review `SECURITY.md`
3. Check `PRODUCTION.md`
4. Verify environment variables

## 🎉 Success!

Your application is now deployed and ready to serve users!

Access:
- Frontend: https://yourdomain.com
- API: https://yourdomain.com/api/health
- Admin: Use Bearer token for `/api/admin/*` endpoints
