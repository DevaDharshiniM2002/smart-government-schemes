import { Request, Response, NextFunction } from 'express';
import { appendFileSync } from 'fs';
import { join } from 'path';

export function requestLogger(req: Request, res: Response, next: NextFunction) {
  const log = {
    timestamp: new Date().toISOString(),
    method: req.method,
    path: req.path,
    ip: req.ip || req.socket.remoteAddress,
    userAgent: req.get('user-agent'),
  };

  try {
    appendFileSync(join(process.cwd(), 'data', 'access.log'), JSON.stringify(log) + '\n');
  } catch {}

  next();
}
