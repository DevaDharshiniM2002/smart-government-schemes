# Security Implementation

## 🔒 Security Features

### 1. Rate Limiting
- **Global**: 100 requests/minute per IP
- **Eligibility**: 10 requests/minute per IP
- **Admin**: 50 requests/minute per IP
- Prevents DDoS and brute force attacks

### 2. Input Sanitization
- Removes HTML tags (`<>`)
- Trims whitespace
- Limits input length (1000 chars)
- Prevents XSS attacks

### 3. Security Headers
- `X-Content-Type-Options: nosniff` - Prevents MIME sniffing
- `X-Frame-Options: DENY` - Prevents clickjacking
- `X-XSS-Protection: 1; mode=block` - XSS protection
- `Strict-Transport-Security` - Forces HTTPS
- `Content-Security-Policy` - Restricts resource loading
- Removes `X-Powered-By` - Hides server info

### 4. CORS Protection
- Whitelist allowed origins via `ALLOWED_ORIGINS` env var
- Credentials support enabled
- Prevents unauthorized cross-origin requests

### 5. Request Size Limits
- JSON payload: 10KB max
- URL encoded: 10KB max
- Prevents memory exhaustion attacks

### 6. Authentication
- Token-based admin authentication
- Required for all admin endpoints
- Tokens validated on every request

### 7. Request Logging
- Logs all requests to `data/access.log`
- Includes: timestamp, method, path, IP, user-agent
- Useful for security audits

### 8. Database Security
- Prepared statements (prevents SQL injection)
- Input validation with Zod schemas
- No raw SQL from user input

### 9. Error Handling
- Sanitized error messages in production
- No stack traces exposed
- Detailed errors only in development

## 🛡️ Configuration

### Environment Variables (.env)
```bash
# Required
ADMIN_TOKEN=generate-strong-random-token-here
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com

# Optional
NODE_ENV=production
PORT=3000
```

### Generate Secure Token
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## 🚨 Security Checklist

- [x] Rate limiting enabled
- [x] Input sanitization active
- [x] Security headers set
- [x] CORS configured
- [x] Request size limits
- [x] Admin authentication required
- [x] Request logging enabled
- [x] SQL injection prevention
- [x] XSS protection
- [x] Error message sanitization

## 📋 Best Practices

1. **Always use HTTPS in production**
2. **Rotate ADMIN_TOKEN regularly**
3. **Monitor access.log for suspicious activity**
4. **Keep dependencies updated**
5. **Set strong ALLOWED_ORIGINS**
6. **Use environment variables for secrets**
7. **Enable firewall on server**
8. **Regular security audits**

## 🔍 Monitoring

Check logs for:
- High request rates from single IP
- Failed authentication attempts
- Unusual request patterns
- Error spikes

```bash
# View recent logs
tail -f data/access.log

# Count requests by IP
cat data/access.log | jq -r '.ip' | sort | uniq -c | sort -rn
```

## 🚀 Production Deployment

1. Set `NODE_ENV=production`
2. Use strong `ADMIN_TOKEN`
3. Configure `ALLOWED_ORIGINS`
4. Enable HTTPS
5. Set up reverse proxy (nginx)
6. Configure firewall rules
7. Regular backups of `data/` folder
8. Monitor logs daily
