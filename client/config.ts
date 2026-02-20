export const getBackendUrl = (): string => {
  return import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
};

export const BACKEND_URL = getBackendUrl();

export const API_ENDPOINTS = {
  HEALTH: `${BACKEND_URL}/api/health`,
  CATEGORIES: `${BACKEND_URL}/api/categories`,
  SCHEMES: `${BACKEND_URL}/api/schemes`,
  ELIGIBILITY_CHECK: `${BACKEND_URL}/api/eligibility/check`,
  ELIGIBILITY_SUBMISSIONS: `${BACKEND_URL}/api/admin/submissions`,
};

export const createFetchOptions = (options?: RequestInit): RequestInit => ({
  ...options,
  headers: {
    'Content-Type': 'application/json',
    ...options?.headers,
  },
});

export const safeFetch = async (url: string, options?: RequestInit, timeoutMs: number = 5000) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...createFetchOptions(options),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
};
