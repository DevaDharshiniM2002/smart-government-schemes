// Backend API Configuration
const BACKEND_URL = 'http://127.0.0.1:8000';

// For production, change to your deployed backend URL:
// const BACKEND_URL = 'https://your-backend-domain.com';

window.API_CONFIG = {
  BACKEND_URL: BACKEND_URL,
  ENDPOINTS: {
    HEALTH: `${BACKEND_URL}/api/health`,
    CATEGORIES: `${BACKEND_URL}/api/categories`,
    SCHEMES: `${BACKEND_URL}/api/schemes`,
    ELIGIBILITY_CHECK: `${BACKEND_URL}/api/eligibility-check`,
    SUBMISSIONS: `${BACKEND_URL}/api/eligibility-submissions`
  }
};

console.log('✅ Backend connected:', BACKEND_URL);
