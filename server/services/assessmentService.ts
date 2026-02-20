import { randomUUID } from 'crypto';
import { Assessment, EligibilityCheck } from '../types';

const assessments = new Map<string, Assessment>();

export function createAssessment(data: EligibilityCheck): Assessment {
  const assessment: Assessment = {
    id: randomUUID(),
    category: data.category,
    data,
    timestamp: new Date().toISOString(),
  };

  assessments.set(assessment.id, assessment);
  return assessment;
}

export function getAssessments(filters: { limit?: number; offset?: number }) {
  const { limit = 200, offset = 0 } = filters;
  const items = Array.from(assessments.values())
    .sort((a, b) => b.timestamp.localeCompare(a.timestamp))
    .slice(offset, offset + limit);
  
  return { items, total: assessments.size, limit, offset };
}

export function getAssessmentById(id: string): Assessment | undefined {
  return assessments.get(id);
}
