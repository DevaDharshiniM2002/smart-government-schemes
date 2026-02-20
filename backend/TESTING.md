# Backend API Testing Guide

This guide provides detailed examples for testing all backend endpoints.

## Prerequisites

- Backend running on `http://127.0.0.1:8000`
- curl, Postman, or any HTTP client
- Optional: Python with requests library

## Quick Test All Endpoints

### 1. Test Health Endpoint

**Request:**
```bash
curl http://127.0.0.1:8000/api/health
```

**Expected Response:**
```json
{
  "status": "healthy",
  "timestamp": "2025-02-17T10:30:00.000000"
}
```

---

### 2. Get All Categories

**Request:**
```bash
curl http://127.0.0.1:8000/api/categories
```

**Expected Response:**
```json
{
  "categories": [
    {
      "key": "education",
      "label": "Education & Scholarships"
    },
    {
      "key": "health",
      "label": "Health & Insurance"
    },
    {
      "key": "agriculture",
      "label": "Agriculture & Farming"
    },
    {
      "key": "housing",
      "label": "Housing & Urban"
    },
    {
      "key": "women",
      "label": "Women & Children"
    },
    {
      "key": "pensions",
      "label": "Pensions & Social Security"
    }
  ]
}
```

---

### 3. Get All Schemes

**Request:**
```bash
curl http://127.0.0.1:8000/api/schemes
```

**Expected Response:**
```json
{
  "schemes": [
    {
      "id": "1",
      "name": "Prime Minister Scholarship Scheme",
      "category": "education",
      "summary": "Financial assistance for meritorious students...",
      "tags": ["scholarship", "merit", "education", "central"],
      "eligibility": [...],
      "documents": [...],
      "apply_url": "https://scholarships.gov.in"
    },
    ...
  ],
  "total": 8,
  "limit": 50,
  "offset": 0
}
```

---

### 4. Search Schemes by Keyword

**Request:**
```bash
curl "http://127.0.0.1:8000/api/schemes?q=scholarship"
```

**Expected Response:**
```json
{
  "schemes": [
    {
      "id": "1",
      "name": "Prime Minister Scholarship Scheme",
      ...
    }
  ],
  "total": 1,
  "limit": 50,
  "offset": 0
}
```

---

### 5. Filter Schemes by Category

**Request:**
```bash
curl "http://127.0.0.1:8000/api/schemes?category=health"
```

**Expected Response:**
```json
{
  "schemes": [
    {
      "id": "2",
      "name": "Ayushman Bharat - PMJAY",
      "category": "health",
      ...
    }
  ],
  "total": 1,
  "limit": 50,
  "offset": 0
}
```

---

### 6. Search with Multiple Filters

**Request:**
```bash
curl "http://127.0.0.1:8000/api/schemes?category=agriculture&q=farmer&limit=10&offset=0"
```

**Expected Response:**
Schemes matching both category and keyword

---

### 7. Get Single Scheme by ID

**Request:**
```bash
curl http://127.0.0.1:8000/api/schemes/1
```

**Expected Response:**
```json
{
  "id": "1",
  "name": "Prime Minister Scholarship Scheme",
  "category": "education",
  "summary": "Financial assistance for meritorious students from disadvantaged backgrounds",
  "tags": ["scholarship", "merit", "education", "central"],
  "eligibility": [
    "Annual family income less than 8 LPA",
    "Minimum 60% marks in previous exam",
    "Indian citizen",
    "Age between 18-35 years"
  ],
  "documents": [
    "Aadhar Card",
    "10th & 12th marksheets",
    "Income certificate",
    "Bank account details"
  ],
  "apply_url": "https://scholarships.gov.in"
}
```

---

### 8. Check Eligibility (No Details)

**Request:**
```bash
curl -X POST http://127.0.0.1:8000/api/eligibility-check \
  -H "Content-Type: application/json" \
  -d '{"category": "education"}'
```

**Expected Response:**
```json
{
  "assessment_id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  "category": "education",
  "schemes": [
    {
      "id": "1",
      "name": "Prime Minister Scholarship Scheme",
      ...
    }
  ],
  "message": "Found 1 scheme(s) for education"
}
```

---

### 9. Check Eligibility (With Full Details)

**Request:**
```bash
curl -X POST http://127.0.0.1:8000/api/eligibility-check \
  -H "Content-Type: application/json" \
  -d '{
    "category": "education",
    "age": 25,
    "gender": "female",
    "occupation": "student",
    "city": "Bengaluru",
    "income": 450000
  }'
```

**Expected Response:**
```json
{
  "assessment_id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  "category": "education",
  "schemes": [
    {
      "id": "1",
      "name": "Prime Minister Scholarship Scheme",
      "category": "education",
      "summary": "Financial assistance for meritorious students...",
      "tags": ["scholarship", "merit", "education", "central"],
      "eligibility": [
        "Annual family income less than 8 LPA",
        "Minimum 60% marks in previous exam",
        "Indian citizen",
        "Age between 18-35 years"
      ],
      "documents": [
        "Aadhar Card",
        "10th & 12th marksheets",
        "Income certificate",
        "Bank account details"
      ],
      "apply_url": "https://scholarships.gov.in"
    }
  ],
  "message": "Found 1 scheme(s) for education"
}
```

---

### 10. Get Admin Submissions (Without Token)

**Request:**
```bash
curl http://127.0.0.1:8000/api/eligibility-submissions
```

**Expected Response:**
```json
{
  "submissions": [
    {
      "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
      "timestamp": "2025-02-17T10:30:00.000000",
      "data": {
        "category": "education",
        "age": 25,
        "gender": "female",
        "occupation": "student",
        "city": "Bengaluru",
        "income": 450000
      }
    }
  ],
  "total": 1,
  "limit": 200,
  "offset": 0
}
```

---

### 11. Export Submissions as CSV

**Request:**
```bash
curl "http://127.0.0.1:8000/api/eligibility-submissions?format=csv" > submissions.csv
```

**Expected File Content:**
```
id,timestamp,category,age,gender,city
f47ac10b-58cc-4372-a567-0e02b2c3d479,2025-02-17T10:30:00.000000,education,25,female,Bengaluru
```

---

### 12. Get Specific Submission

**Request:**
```bash
curl http://127.0.0.1:8000/api/eligibility-submissions/f47ac10b-58cc-4372-a567-0e02b2c3d479
```

**Expected Response:**
```json
{
  "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  "timestamp": "2025-02-17T10:30:00.000000",
  "data": {
    "category": "education",
    "age": 25,
    "gender": "female",
    "occupation": "student",
    "city": "Bengaluru",
    "income": 450000
  }
}
```

---

## Testing with Python

### Test Script

```python
import requests
import json

BASE_URL = "http://127.0.0.1:8000"

def test_health():
    """Test health endpoint"""
    print("Testing: Health Check")
    response = requests.get(f"{BASE_URL}/api/health")
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}\n")

def test_categories():
    """Test categories endpoint"""
    print("Testing: Get Categories")
    response = requests.get(f"{BASE_URL}/api/categories")
    print(f"Status: {response.status_code}")
    print(f"Categories: {len(response.json()['categories'])}\n")

def test_get_schemes():
    """Test get schemes endpoint"""
    print("Testing: Get All Schemes")
    response = requests.get(f"{BASE_URL}/api/schemes")
    print(f"Status: {response.status_code}")
    print(f"Total schemes: {response.json()['total']}\n")

def test_search_schemes():
    """Test search schemes endpoint"""
    print("Testing: Search Schemes")
    response = requests.get(f"{BASE_URL}/api/schemes?q=scholarship")
    print(f"Status: {response.status_code}")
    print(f"Results: {response.json()['total']}\n")

def test_eligibility():
    """Test eligibility check"""
    print("Testing: Eligibility Check")
    payload = {
        "category": "education",
        "age": 25,
        "gender": "female",
        "occupation": "student",
        "city": "Bengaluru",
        "income": 450000
    }
    response = requests.post(f"{BASE_URL}/api/eligibility-check", json=payload)
    print(f"Status: {response.status_code}")
    data = response.json()
    print(f"Assessment ID: {data['assessment_id']}")
    print(f"Matching schemes: {len(data['schemes'])}\n")

if __name__ == "__main__":
    try:
        test_health()
        test_categories()
        test_get_schemes()
        test_search_schemes()
        test_eligibility()
        print("✅ All tests passed!")
    except Exception as e:
        print(f"❌ Test failed: {e}")
```

### Run Tests

```bash
pip install requests
python test_backend.py
```

---

## Testing with Postman

### Import Collection

1. Open Postman
2. Create new Collection: "Namma Schemes"
3. Add requests:

#### Request 1: Health Check
- **Method:** GET
- **URL:** http://127.0.0.1:8000/api/health

#### Request 2: Get Categories
- **Method:** GET
- **URL:** http://127.0.0.1:8000/api/categories

#### Request 3: Get Schemes
- **Method:** GET
- **URL:** http://127.0.0.1:8000/api/schemes

#### Request 4: Search Schemes
- **Method:** GET
- **URL:** http://127.0.0.1:8000/api/schemes?q=scholarship

#### Request 5: Check Eligibility
- **Method:** POST
- **URL:** http://127.0.0.1:8000/api/eligibility-check
- **Headers:** Content-Type: application/json
- **Body (JSON):**
```json
{
  "category": "education",
  "age": 25,
  "gender": "female",
  "occupation": "student",
  "city": "Bengaluru",
  "income": 450000
}
```

---

## Common Test Scenarios

### Scenario 1: Student Looking for Scholarship
```bash
curl -X POST http://127.0.0.1:8000/api/eligibility-check \
  -H "Content-Type: application/json" \
  -d '{
    "category": "education",
    "age": 20,
    "occupation": "student",
    "income": 300000
  }'
```

### Scenario 2: Farmer Looking for Subsidies
```bash
curl -X POST http://127.0.0.1:8000/api/eligibility-check \
  -H "Content-Type: application/json" \
  -d '{
    "category": "agriculture",
    "age": 45,
    "occupation": "farmer"
  }'
```

### Scenario 3: Senior Citizen Looking for Pension
```bash
curl -X POST http://127.0.0.1:8000/api/eligibility-check \
  -H "Content-Type: application/json" \
  -d '{
    "category": "pensions",
    "age": 68
  }'
```

---

## Error Handling

### 404 Error (Scheme Not Found)
```bash
curl http://127.0.0.1:8000/api/schemes/999
```

**Response:**
```json
{
  "error": "Scheme not found"
}
```

### 400 Error (Missing Required Field)
```bash
curl -X POST http://127.0.0.1:8000/api/eligibility-check \
  -H "Content-Type: application/json" \
  -d '{}'
```

**Response:**
```json
{
  "error": "Category is required"
}
```

---

## Troubleshooting

### Backend Not Running
If you get "Connection refused":
1. Ensure backend is running: `python app.py`
2. Verify port 8000 is correct
3. Check for firewall blocking

### No Schemes Found
- Verify `backend/data/schemes.json` exists
- Check JSON is valid using `python -m json.tool data/schemes.json`
- Restart backend

### CORS Issues
The backend has CORS enabled by default. If you still get CORS errors:
- Ensure frontend is accessing correct URL: `http://127.0.0.1:8000`
- Check browser console for exact error

---

## Performance Testing

### Load Test with ApacheBench
```bash
ab -n 100 -c 10 http://127.0.0.1:8000/api/health
```

### Load Test with wrk
```bash
wrk -t4 -c100 -d30s http://127.0.0.1:8000/api/schemes
```

---

For more details, see the main [README.md](README.md) file.
