import { Router } from 'express';
import { getSchemes, getSchemeById } from '../services/schemeService';

const router = Router();

router.get('/', (req, res) => {
  const { category, q, limit, offset } = req.query;
  
  const result = getSchemes({
    category: category as string,
    query: q as string,
    limit: limit ? parseInt(limit as string) : undefined,
    offset: offset ? parseInt(offset as string) : undefined,
  });

  res.json({
    schemes: result.items,
    total: result.total,
    limit: result.limit,
    offset: result.offset,
  });
});

router.get('/:id', (req, res) => {
  const scheme = getSchemeById(req.params.id);
  
  if (!scheme) {
    return res.status(404).json({ error: 'Scheme not found' });
  }

  res.json(scheme);
});

export default router;
