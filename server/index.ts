import "dotenv/config";
import express from "express";
import cors from "cors";
import schemesRouter from "./routes/schemes";
import categoriesRouter from "./routes/categories";
import eligibilityRouter from "./routes/eligibility";
import adminRouter from "./routes/admin";
import { errorHandler } from "./middleware/errorHandler";
import { rateLimit } from "./middleware/rateLimit";
import { sanitizeInput } from "./middleware/sanitize";
import { securityHeaders } from "./middleware/security";
import { requestLogger } from "./middleware/logger";

const isProd = process.env.NODE_ENV === 'production';
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',').map(o => o.trim()) || [];

export function createServer() {
  const app = express();

  app.disable('x-powered-by');
  app.set('trust proxy', 1);
  
  app.use(securityHeaders);
  app.use(requestLogger);
  
  app.use(cors({
    origin: (origin, callback) => {
      if (!origin || !isProd || allowedOrigins.includes(origin) || allowedOrigins.includes('*')) {
        callback(null, true);
      } else {
        callback(new Error('CORS policy violation'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));
  
  app.use(express.json({ limit: '10kb' }));
  app.use(express.urlencoded({ extended: true, limit: '10kb' }));
  app.use(sanitizeInput);
  app.use(rateLimit(100, 60000));

  app.get("/api/health", (_req, res) => {
    res.json({ status: "healthy", timestamp: new Date().toISOString() });
  });

  app.use("/api/schemes", schemesRouter);
  app.use("/api/categories", categoriesRouter);
  app.use("/api/eligibility", rateLimit(10, 60000), eligibilityRouter);
  app.use("/api/admin", rateLimit(50, 60000), adminRouter);

  app.use(errorHandler);

  return app;
}
