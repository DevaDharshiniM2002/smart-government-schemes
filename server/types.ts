import { z } from 'zod';

export const SchemeSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.string(),
  summary: z.string(),
  tags: z.array(z.string()),
  eligibility: z.array(z.string()),
  documents: z.array(z.string()),
  apply_url: z.string().url(),
});

export const EligibilityCheckSchema = z.object({
  category: z.string().min(1),
  age: z.number().optional(),
  gender: z.string().optional(),
  income: z.number().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
});

export const CategorySchema = z.object({
  key: z.string(),
  label: z.string(),
  image: z.string().url(),
  color: z.string(),
  icon: z.string(),
});

export type Scheme = z.infer<typeof SchemeSchema>;
export type EligibilityCheck = z.infer<typeof EligibilityCheckSchema>;
export type Category = z.infer<typeof CategorySchema>;

export interface Assessment {
  id: string;
  category: string;
  data: EligibilityCheck;
  timestamp: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  limit: number;
  offset: number;
}
