# Smart Government Scheme Platform

A modern, full-stack web application to help citizens discover and apply for government welfare schemes. Built with React, TypeScript, Express, and SQLite.

## ✨ Features

- 🔍 **Smart Search** - Find schemes by category, keywords, or tags
- ✅ **Eligibility Check** - Quick assessment to find matching schemes
- 📊 **Admin Dashboard** - View and export eligibility submissions
- 🔒 **Secure** - Production-grade security with rate limiting, CORS, and authentication
- 📱 **Responsive** - Works on all devices
- ⚡ **Fast** - Optimized performance with caching

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- pnpm (or npm)

### Installation

```bash
# Install dependencies
pnpm install

# Generate secure admin token
pnpm run generate:token

# Configure environment
cp .env.server .env
# Edit .env and add generated token
```

### Development

```bash
# Start backend server
pnpm run dev:server

# In another terminal, start frontend
pnpm run dev
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:3000/api

### Production Build

```bash
# Build everything
pnpm run build

# Start production server
NODE_ENV=production pnpm start
```

## 📁 Project Structure

```
├── client/              # React frontend
│   ├── components/      # UI components
│   ├── pages/          # Page components
│   ├── App.tsx         # Main app
│   └── config.ts       # API configuration
├── server/             # Express backend
│   ├── routes/         # API routes
│   ├── services/       # Business logic
│   ├── middleware/     # Express middleware
│   ├── types.ts        # TypeScript types
│   └── database.ts     # SQLite setup
├── backend/            # Data files
│   └── data/
│       └── schemes.json # Scheme data
├── data/               # Runtime data
│   ├── schemes.db      # SQLite database
│   └── access.log      # Request logs
└── dist/               # Build output
```

## 🔌 API Endpoints

### Public Endpoints

```bash
GET  /api/health                    # Health check
GET  /api/categories                # List categories
GET  /api/schemes                   # List schemes (with filters)
GET  /api/schemes/:id               # Get scheme by ID
POST /api/eligibility/check         # Check eligibility
```

### Admin Endpoints (Requires Token)

```bash
GET  /api/admin/submissions         # List all submissions
GET  /api/admin/submissions?format=csv  # Export as CSV
GET  /api/admin/submissions/:id     # Get submission by ID
```

**Authentication:**
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" https://api.yourdomain.com/api/admin/submissions
```

## 🔒 Security Features

- ✅ Rate limiting (100 req/min global, 10 req/min eligibility)
- ✅ Input sanitization (XSS prevention)
- ✅ Security headers (HSTS, CSP, X-Frame-Options)
- ✅ CORS whitelist
- ✅ Timing-safe token comparison
- ✅ Error sanitization in production
- ✅ Request logging
- ✅ SQL injection protection

## 🛠️ Configuration

### Environment Variables

**Backend (.env):**
```bash
NODE_ENV=production
PORT=3000
ADMIN_TOKEN=<generated-token>
ALLOWED_ORIGINS=https://yourdomain.com
```

**Frontend (.env.production):**
```bash
VITE_BACKEND_URL=https://api.yourdomain.com
```

## 📦 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy

```bash
# Build
pnpm run build

# Start
NODE_ENV=production pnpm start
```

### Docker

```bash
docker build -t scheme-app .
docker run -d -p 3000:3000 --env-file .env scheme-app
```

## 📚 Documentation

- [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment guide
- [SECURITY.md](./SECURITY.md) - Security documentation
- [PRODUCTION.md](./PRODUCTION.md) - Production best practices
- [SERVER_README.md](./SERVER_README.md) - Backend API documentation

## 🧪 Testing

```bash
# Test health endpoint
curl http://localhost:3000/api/health

# Test schemes endpoint
curl http://localhost:3000/api/schemes?category=education

# Test eligibility check
curl -X POST http://localhost:3000/api/eligibility/check \
  -H "Content-Type: application/json" \
  -d '{"category":"education","age":25}'
```

## 🎨 Tech Stack

**Frontend:**
- React 18
- TypeScript
- TailwindCSS
- Radix UI
- React Query
- Vite

**Backend:**
- Node.js
- Express
- TypeScript
- SQLite (better-sqlite3)
- Zod validation

## 📈 Performance

- Frontend: < 100KB gzipped
- API response: < 100ms average
- Database: Indexed queries
- Caching: In-memory scheme cache

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

## 📄 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

- Government of India for scheme data
- Open source community
- Contributors

## 📞 Support

For issues and questions:
- Check documentation in `/docs`
- Review logs: `tail -f data/access.log`
- Open an issue on GitHub

---

Made with ❤️ for citizens of India
