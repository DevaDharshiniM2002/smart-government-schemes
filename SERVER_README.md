# Smart Government Scheme Backend

Professional Node.js/TypeScript backend for the Smart Government Scheme platform.

## Features

- ✅ RESTful API with Express.js
- ✅ TypeScript for type safety
- ✅ Zod validation for request data
- ✅ SQLite database for persistent storage
- ✅ Admin authentication middleware
- ✅ CSV export for submissions
- ✅ Error handling and logging
- ✅ CORS enabled

## Setup

### 1. Install Dependencies

```bash
pnpm install
pnpm add better-sqlite3 @types/better-sqlite3
```

### 2. Environment Variables

Copy `.env.server` and configure:

```bash
cp .env.server .env
```

### 3. Run Development Server

```bash
pnpm run dev
```

Server runs on `http://localhost:3000`

### 4. Build for Production

```bash
pnpm run build:server
pnpm start
```

## API Endpoints

### Public Endpoints

#### Health Check
```
GET /api/health
```

#### Get Categories
```
GET /api/categories
Response: { categories: Category[] }
```

#### Get Schemes
```
GET /api/schemes?category=education&q=scholarship&limit=10&offset=0
Response: { schemes: Scheme[], total: number, limit: number, offset: number }
```

#### Get Scheme by ID
```
GET /api/schemes/:id
Response: Scheme
```

#### Check Eligibility
```
POST /api/eligibility/check
Body: {
  category: string,
  age?: number,
  gender?: string,
  income?: number,
  city?: string,
  state?: string
}
Response: {
  assessment_id: string,
  category: string,
  schemes: Scheme[],
  message: string
}
```

### Admin Endpoints (Requires Authentication)

Set `ADMIN_TOKEN` in `.env` and include in requests:
```
Authorization: Bearer your-admin-token
```

#### Get All Submissions
```
GET /api/admin/submissions?limit=200&offset=0
Response: { submissions: Assessment[], total: number, limit: number, offset: number }
```

#### Export Submissions as CSV
```
GET /api/admin/submissions?format=csv
Response: CSV file download
```

#### Get Submission by ID
```
GET /api/admin/submissions/:id
Response: Assessment
```

## Project Structure

```
server/
├── routes/           # API route handlers
│   ├── schemes.ts
│   ├── categories.ts
│   ├── eligibility.ts
│   └── admin.ts
├── services/         # Business logic
│   ├── schemeService.ts
│   └── assessmentService.ts
├── middleware/       # Express middleware
│   ├── auth.ts
│   └── errorHandler.ts
├── types.ts          # TypeScript types & Zod schemas
├── database.ts       # SQLite database setup
└── index.ts          # Server entry point
```

## Database

Uses SQLite with `better-sqlite3` for:
- Fast, embedded database
- No separate server needed
- Easy to backup (single file)
- Production-ready for moderate traffic

Database file: `data/schemes.db`

### Schema

```sql
CREATE TABLE assessments (
  id TEXT PRIMARY KEY,
  category TEXT NOT NULL,
  data TEXT NOT NULL,
  timestamp TEXT NOT NULL
);
```

## Security

- Admin routes protected with token authentication
- Input validation with Zod schemas
- CORS configured
- Error messages sanitized in production

## Deployment

### Option 1: Node.js Server
```bash
pnpm run build
NODE_ENV=production pnpm start
```

### Option 2: Docker
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY dist ./dist
COPY backend/data ./backend/data
CMD ["node", "dist/server/node-build.mjs"]
```

### Option 3: Serverless (Netlify/Vercel)
Already configured with `netlify.toml` and serverless functions.

## Testing

```bash
# Test health endpoint
curl http://localhost:3000/api/health

# Test schemes endpoint
curl http://localhost:3000/api/schemes?category=education

# Test eligibility check
curl -X POST http://localhost:3000/api/eligibility/check \
  -H "Content-Type: application/json" \
  -d '{"category":"education","age":25,"income":500000}'

# Test admin endpoint (with auth)
curl http://localhost:3000/api/admin/submissions \
  -H "Authorization: Bearer your-admin-token"
```

## Performance

- In-memory caching for schemes data
- Database indexes on category and timestamp
- Pagination support for large datasets
- Efficient JSON parsing

## Monitoring

Add logging service (e.g., Winston, Pino):

```typescript
import pino from 'pino';
const logger = pino();
logger.info('Server started');
```

## License

MIT
