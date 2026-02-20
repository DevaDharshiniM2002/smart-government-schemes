# Production Deployment Guide

## 🚀 Pre-Deployment Security Checklist

### 1. Generate Secure Admin Token
```bash
pnpm run generate:token
```
Copy the generated token to `.env` file.

### 2. Configure Environment Variables
```bash
NODE_ENV=production
ADMIN_TOKEN=<generated-64-char-token>
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
PORT=3000
```

### 3. Security Verification
- [ ] `NODE_ENV=production` set
- [ ] Strong `ADMIN_TOKEN` (64+ characters)
- [ ] `ALLOWED_ORIGINS` configured (no wildcards)
- [ ] HTTPS enabled
- [ ] Firewall configured
- [ ] Database backed up

### 4. Build Application
```bash
pnpm install --production
pnpm run build
```

### 5. Start Server
```bash
NODE_ENV=production pnpm start
```

## 🔒 Security Features Active

✅ **Error Sanitization** - No stack traces in production  
✅ **Timing-Safe Token Comparison** - Prevents timing attacks  
✅ **CORS Whitelist** - Only allowed origins  
✅ **Rate Limiting** - DDoS protection  
✅ **Input Sanitization** - XSS prevention  
✅ **Security Headers** - HSTS, CSP, X-Frame-Options  
✅ **Request Logging** - Audit trail  
✅ **SQL Injection Protection** - Prepared statements  
✅ **Request Size Limits** - 10KB max payload  

## 🌐 Nginx Configuration (Recommended)

```nginx
server {
    listen 443 ssl http2;
    server_name yourdomain.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 🐳 Docker Deployment

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY dist ./dist
COPY backend/data ./backend/data
ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "dist/server/node-build.mjs"]
```

```bash
docker build -t scheme-backend .
docker run -d -p 3000:3000 --env-file .env scheme-backend
```

## 📊 Monitoring

### Check Server Health
```bash
curl https://yourdomain.com/api/health
```

### Monitor Logs
```bash
tail -f data/access.log
```

### Check Failed Auth Attempts
```bash
grep "Unauthorized" data/access.log | wc -l
```

## 🔄 Token Rotation

Rotate admin token every 90 days:
```bash
pnpm run generate:token
# Update .env with new token
# Restart server
pm2 restart scheme-backend
```

## 🛡️ Firewall Rules

```bash
# Allow only necessary ports
ufw allow 22/tcp    # SSH
ufw allow 443/tcp   # HTTPS
ufw enable
```

## 📦 Process Manager (PM2)

```bash
npm install -g pm2
pm2 start dist/server/node-build.mjs --name scheme-backend
pm2 startup
pm2 save
```

## 🔍 Security Audit

Run regular security checks:
```bash
npm audit
pnpm audit
```

## 📞 Emergency Response

If token compromised:
1. Generate new token: `pnpm run generate:token`
2. Update `.env` immediately
3. Restart server
4. Review `data/access.log` for suspicious activity
5. Notify affected users if needed

## 📈 Performance Tuning

```bash
# Increase Node.js memory if needed
NODE_OPTIONS="--max-old-space-size=4096" pnpm start
```

## ✅ Post-Deployment Verification

```bash
# Test health endpoint
curl https://yourdomain.com/api/health

# Test CORS (should fail from unauthorized origin)
curl -H "Origin: https://evil.com" https://yourdomain.com/api/schemes

# Test rate limiting (should get 429 after 100 requests)
for i in {1..101}; do curl https://yourdomain.com/api/health; done

# Test admin auth (should fail without token)
curl https://yourdomain.com/api/admin/submissions
```
