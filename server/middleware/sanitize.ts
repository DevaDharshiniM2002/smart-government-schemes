import { Request, Response, NextFunction } from 'express';

const sanitize = (obj: any): any => {
  if (typeof obj === 'string') {
    return obj.replace(/[<>]/g, '').trim().slice(0, 1000);
  }
  if (Array.isArray(obj)) {
    return obj.map(sanitize);
  }
  if (obj && typeof obj === 'object') {
    const sanitized: any = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        sanitized[key] = sanitize(obj[key]);
      }
    }
    return sanitized;
  }
  return obj;
};

export function sanitizeInput(req: Request, res: Response, next: NextFunction) {
  if (req.body) req.body = sanitize(req.body);
  if (req.query) req.query = sanitize(req.query);
  if (req.params) req.params = sanitize(req.params);
  next();
}
