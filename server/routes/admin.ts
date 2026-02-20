import { Router } from 'express';
import { requireAuth } from '../middleware/auth';
import { getAssessments, getAssessmentById } from '../services/assessmentService';

const router = Router();

router.use(requireAuth);

router.get('/submissions', (req, res) => {
  const { limit, offset, format } = req.query;
  
  const result = getAssessments({
    limit: limit ? parseInt(limit as string) : undefined,
    offset: offset ? parseInt(offset as string) : undefined,
  });

  if (format === 'csv') {
    const csv = [
      'id,timestamp,category,age,gender,income,city,state',
      ...result.items.map(s => 
        `${s.id},${s.timestamp},${s.category},${s.data.age || ''},${s.data.gender || ''},${s.data.income || ''},${s.data.city || ''},${s.data.state || ''}`
      )
    ].join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=submissions.csv');
    return res.send(csv);
  }

  res.json({
    submissions: result.items,
    total: result.total,
    limit: result.limit,
    offset: result.offset,
  });
});

router.get('/submissions/:id', (req, res) => {
  const submission = getAssessmentById(req.params.id);
  
  if (!submission) {
    return res.status(404).json({ error: 'Assessment not found' });
  }

  res.json(submission);
});

export default router;
