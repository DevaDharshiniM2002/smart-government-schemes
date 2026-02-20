# Namma Schemes Backend

A Flask-based REST API backend for the Namma Schemes government welfare portal.

## Features

- ✅ **Scheme Management**: CRUD operations for government welfare schemes
- ✅ **Search & Filtering**: Filter schemes by category, keywords, and tags
- ✅ **Eligibility Check**: Assess user eligibility for schemes
- ✅ **Assessment Tracking**: Store and retrieve eligibility assessments
- ✅ **Admin Dashboard**: Manage submissions and export to CSV
- ✅ **CORS Support**: Enable cross-origin requests for frontend integration
- ✅ **Error Handling**: Comprehensive error responses with proper status codes

## Quick Start

### Prerequisites

- Python 3.8+
- pip or pipenv
- Virtual environment (recommended)

### Installation

1. **Navigate to backend directory:**
```bash
cd backend
```

2. **Create a virtual environment (recommended):**
```bash
# On macOS/Linux
python3 -m venv venv
source venv/bin/activate

# On Windows
python -m venv venv
venv\Scripts\activate
```

3. **Install dependencies:**
```bash
pip install -r requirements.txt
```

4. **Create environment file (optional):**
```bash
cp .env.example .env
# Edit .env if you want to customize settings
```

5. **Run the backend:**
```bash
python app.py
```

The backend will start at `http://127.0.0.1:8000`

You should see:
```
🚀 Namma Schemes Backend
==================================================
📁 Schemes data: /path/to/backend/data/schemes.json
🌐 Running on: http://127.0.0.1:8000
==================================================
```

## API Endpoints

### Public Endpoints

#### 1. Health Check
```http
GET /api/health
```
Response:
```json
{
  "status": "healthy",
  "timestamp": "2025-02-17T10:30:00.000000"
}
```

#### 2. Get Categories
```http
GET /api/categories
```
Response:
```json
{
  "categories": [
    {"key": "education", "label": "Education & Scholarships"},
    {"key": "health", "label": "Health & Insurance"},
    {"key": "agriculture", "label": "Agriculture & Farming"},
    {"key": "housing", "label": "Housing & Urban"},
    {"key": "women", "label": "Women & Children"},
    {"key": "pensions", "label": "Pensions & Social Security"}
  ]
}
```

#### 3. Get Schemes
```http
GET /api/schemes?category=education&q=scholarship&limit=50&offset=0
```

**Query Parameters:**
- `category` (optional): Filter by category key
- `q` (optional): Search query (searches name, summary, and tags)
- `limit` (optional): Number of results (default: 50)
- `offset` (optional): Pagination offset (default: 0)

Response:
```json
{
  "schemes": [
    {
      "id": "1",
      "name": "Prime Minister Scholarship Scheme",
      "category": "education",
      "summary": "Financial assistance for meritorious students...",
      "tags": ["scholarship", "merit", "education", "central"],
      "eligibility": ["Annual family income less than 8 LPA", ...],
      "documents": ["Aadhar Card", "10th & 12th marksheets", ...],
      "apply_url": "https://scholarships.gov.in"
    }
  ],
  "total": 1,
  "limit": 50,
  "offset": 0
}
```

#### 4. Get Scheme by ID
```http
GET /api/schemes/{id}
```

Response: Single scheme object

#### 5. Check Eligibility
```http
POST /api/eligibility-check
Content-Type: application/json

{
  "category": "education",
  "age": 25,
  "gender": "female",
  "occupation": "student",
  "city": "Bengaluru",
  "income": 250000
}
```

Response:
```json
{
  "assessment_id": "uuid-string",
  "category": "education",
  "schemes": [
    { scheme objects matching category }
  ],
  "message": "Found 3 scheme(s) for education"
}
```

### Admin Endpoints

#### 6. Get Eligibility Submissions
```http
GET /api/eligibility-submissions?limit=200&offset=0
```

**Query Parameters:**
- `limit` (optional): Number of results
- `offset` (optional): Pagination offset
- `format` (optional): Set to "csv" to export as CSV

**Headers (if ADMIN_TOKEN is set):**
```
Authorization: Bearer your-secret-token
```

#### 7. Get Single Submission
```http
GET /api/eligibility-submissions/{assessment_id}
```

## Data Structure

### Scheme Object
```json
{
  "id": "string",
  "name": "string",
  "category": "education|health|agriculture|housing|women|pensions",
  "summary": "string",
  "tags": ["string"],
  "eligibility": ["string"],
  "documents": ["string"],
  "apply_url": "string (optional)"
}
```

## Environment Variables

Create a `.env` file in the backend directory:

```env
# Flask Configuration
FLASK_ENV=development
FLASK_DEBUG=True

# Server Configuration
PORT=8000
HOST=127.0.0.1

# Admin Token (optional - if set, protects admin endpoints)
ADMIN_TOKEN=your-secret-token
```

## Protecting Admin Endpoints

To protect admin endpoints with a token:

1. **Set environment variable:**
   ```bash
   export ADMIN_TOKEN="your-secret-token"
   python app.py
   ```

2. **Or edit `.env` file:**
   ```env
   ADMIN_TOKEN=your-secret-token
   ```

3. **Call admin endpoints with token:**
   ```bash
   curl -H "Authorization: Bearer your-secret-token" \
     http://127.0.0.1:8000/api/eligibility-submissions
   ```

## Testing

### Test endpoints using curl

```bash
# Health check
curl http://127.0.0.1:8000/api/health

# Get categories
curl http://127.0.0.1:8000/api/categories

# Search schemes
curl "http://127.0.0.1:8000/api/schemes?q=scholarship"

# Filter by category
curl "http://127.0.0.1:8000/api/schemes?category=education"

# Check eligibility
curl -X POST http://127.0.0.1:8000/api/eligibility-check \
  -H "Content-Type: application/json" \
  -d '{
    "category": "education",
    "age": 25,
    "income": 250000
  }'
```

### Using Python requests

```python
import requests

# Get schemes
response = requests.get('http://127.0.0.1:8000/api/schemes?category=education')
print(response.json())

# Check eligibility
response = requests.post('http://127.0.0.1:8000/api/eligibility-check', json={
    'category': 'education',
    'age': 25,
    'income': 250000
})
print(response.json())
```

## Adding More Schemes

Edit `backend/data/schemes.json` and add new scheme objects:

```json
{
  "id": "9",
  "name": "New Scheme Name",
  "category": "education",
  "summary": "Brief description",
  "tags": ["tag1", "tag2"],
  "eligibility": ["requirement1", "requirement2"],
  "documents": ["doc1", "doc2"],
  "apply_url": "https://example.com"
}
```

## Troubleshooting

### Port Already in Use
If port 8000 is already in use, modify the port in `app.py`:
```python
app.run(host='127.0.0.1', port=8001, debug=True)
```

### CORS Errors
The backend already has CORS enabled. If you get CORS errors:
- Ensure the backend is running on `http://127.0.0.1:8000`
- Check that the frontend is making requests to the correct URL

### Schemes File Not Found
The backend automatically creates the `data` directory if it doesn't exist. Ensure the `schemes.json` file is present.

### Import Errors
Make sure all dependencies are installed:
```bash
pip install -r requirements.txt
```

## Production Deployment

For production use:

1. **Use a production WSGI server:**
   ```bash
   pip install gunicorn
   gunicorn -w 4 -b 0.0.0.0:8000 app:app
   ```

2. **Set environment variables:**
   ```bash
   export FLASK_ENV=production
   export ADMIN_TOKEN="your-strong-secret-token"
   ```

3. **Use environment variables for configuration:**
   - Avoid hardcoding sensitive values
   - Use `.env` files with proper permissions

## License

MIT License

## Support

For issues or questions, please refer to the main project documentation.
