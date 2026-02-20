import { Router } from 'express';
import { Category } from '../types';

const router = Router();

const CATEGORIES: Category[] = [
  {
    key: 'education',
    label: 'Education & Scholarships',
    image: 'https://images.pexels.com/photos/5212695/pexels-photo-5212695.jpeg',
    color: '#3B82F6',
    icon: '📚',
  },
  {
    key: 'health',
    label: 'Health & Insurance',
    image: 'https://images.pexels.com/photos/7163956/pexels-photo-7163956.jpeg',
    color: '#EF4444',
    icon: '🏥',
  },
  {
    key: 'agriculture',
    label: 'Agriculture & Farming',
    image: 'https://images.pexels.com/photos/29294526/pexels-photo-29294526.jpeg',
    color: '#10B981',
    icon: '🌾',
  },
  {
    key: 'housing',
    label: 'Housing & Urban',
    image: 'https://images.pexels.com/photos/1974596/pexels-photo-1974596.jpeg',
    color: '#FBBF24',
    icon: '🏠',
  },
  {
    key: 'women',
    label: 'Women & Children',
    image: 'https://images.pexels.com/photos/7551581/pexels-photo-7551581.jpeg',
    color: '#EC4899',
    icon: '👶',
  },
  {
    key: 'pensions',
    label: 'Pensions & Social Security',
    image: 'https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg',
    color: '#6366F1',
    icon: '💰',
  },
];

router.get('/', (req, res) => {
  res.json({ categories: CATEGORIES });
});

export default router;
