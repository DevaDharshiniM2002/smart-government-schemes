# Connect Frontend to Backend

## Your Backend is Running ✅
- URL: http://127.0.0.1:8000
- All API endpoints are working

## To Connect Your Uploaded Frontend:

### Option 1: Update Frontend Config
In your uploaded frontend files, find the API configuration file and update:

```javascript
const BACKEND_URL = 'http://127.0.0.1:8000';
// Or if backend is deployed:
// const BACKEND_URL = 'https://your-backend-url.com';
```

### Option 2: Add CORS for Your Frontend Domain
In `backend/app.py`, update CORS to allow your frontend domain:

```python
from flask_cors import CORS

# Allow your frontend domain
CORS(app, origins=['http://localhost:5173', 'https://your-frontend-domain.com'])
```

### Option 3: Deploy Backend Publicly
If your frontend is on a public URL, deploy your backend to:
- Heroku
- Railway
- PythonAnywhere
- AWS/Azure/GCP

Then update frontend config to use the deployed backend URL.

## Test Connection

1. Backend running: http://127.0.0.1:8000/api/health
2. Categories: http://127.0.0.1:8000/api/categories
3. Schemes: http://127.0.0.1:8000/api/schemes

## Current Setup:
✅ Backend: Running on http://127.0.0.1:8000
✅ CORS: Enabled for all origins
✅ All endpoints: Working

Just update your frontend to use: `http://127.0.0.1:8000`
