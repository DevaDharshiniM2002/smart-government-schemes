import { Request, Response, NextFunction } from 'express';
import { timingSafeEqual, createHash } from 'crypto';

function hashToken(token: string): Buffer {
  return Buffer.from(createHash('sha256').update(token).digest('hex'));
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const adminToken = process.env.ADMIN_TOKEN;
  
  if (!adminToken) {
    return res.status(500).json({ error: 'Admin authentication not configured' });
  }

  const authHeader = req.headers.authorization;
  const token = authHeader?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const providedHash = hashToken(token);
    const storedHash = hashToken(adminToken);
    
    if (providedHash.length !== storedHash.length || !timingSafeEqual(providedHash, storedHash)) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  } catch {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  next();
}
