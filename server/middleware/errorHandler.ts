import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  const isProd = process.env.NODE_ENV === 'production';
  
  if (!isProd) {
    console.error('Error:', err);
  }

  if (err instanceof ZodError) {
    return res.status(400).json({
      error: 'Validation error',
      details: isProd ? undefined : err.errors.map(e => ({ field: e.path.join('.'), message: e.message })),
    });
  }

  res.status(500).json({
    error: 'Internal server error',
    message: isProd ? undefined : err.message,
    stack: isProd ? undefined : err.stack,
  });
}
