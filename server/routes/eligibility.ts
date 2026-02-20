import { Router } from 'express';
import { EligibilityCheckSchema } from '../types';
import { createAssessment } from '../services/assessmentService';
import { getSchemes } from '../services/schemeService';

const router = Router();

router.post('/check', (req, res) => {
  const validation = EligibilityCheckSchema.safeParse(req.body);
  
  if (!validation.success) {
    return res.status(400).json({ error: 'Invalid input', details: validation.error.errors });
  }

  const data = validation.data;
  const assessment = createAssessment(data);
  
  const schemes = getSchemes({ category: data.category });

  res.json({
    assessment_id: assessment.id,
    category: data.category,
    schemes: schemes.items,
    message: `Found ${schemes.total} scheme(s) for ${data.category}`,
  });
});

export default router;
