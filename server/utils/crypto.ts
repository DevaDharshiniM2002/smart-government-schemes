import { createHash, randomBytes, timingSafeEqual } from 'crypto';

export function generateSecureToken(length = 32): string {
  return randomBytes(length).toString('hex');
}

export function hashToken(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}

export function compareTokens(provided: string, stored: string): boolean {
  try {
    const providedHash = Buffer.from(hashToken(provided));
    const storedHash = Buffer.from(stored);
    
    if (providedHash.length !== storedHash.length) return false;
    
    return timingSafeEqual(providedHash, storedHash);
  } catch {
    return false;
  }
}
