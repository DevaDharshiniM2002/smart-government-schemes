import { readFileSync } from 'fs';
import { join } from 'path';
import { Scheme } from '../types';

let cachedSchemes: Scheme[] | null = null;

export function loadSchemes(): Scheme[] {
  if (cachedSchemes) return cachedSchemes;
  
  try {
    const data = readFileSync(join(process.cwd(), 'backend', 'data', 'schemes.json'), 'utf-8');
    cachedSchemes = JSON.parse(data);
    return cachedSchemes!;
  } catch {
    return [];
  }
}

export function getSchemes(filters: {
  category?: string;
  query?: string;
  limit?: number;
  offset?: number;
}) {
  let schemes = loadSchemes();
  const { category, query, limit = 50, offset = 0 } = filters;

  if (category) {
    schemes = schemes.filter(s => s.category.toLowerCase() === category.toLowerCase());
  }

  if (query) {
    const q = query.toLowerCase();
    schemes = schemes.filter(s =>
      s.name.toLowerCase().includes(q) ||
      s.summary.toLowerCase().includes(q) ||
      s.tags.some(tag => tag.toLowerCase().includes(q))
    );
  }

  const total = schemes.length;
  const items = schemes.slice(offset, offset + limit);

  return { items, total, limit, offset };
}

export function getSchemeById(id: string): Scheme | undefined {
  return loadSchemes().find(s => s.id === id);
}
