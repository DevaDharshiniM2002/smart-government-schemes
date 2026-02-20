# Backend Setup Guide - Namma Schemes

## Quick Start (2 minutes)

### Option 1: Using Shell Script (macOS/Linux)

```bash
cd backend
chmod +x run.sh
./run.sh
```

The script will:
- ✅ Check Python installation
- ✅ Create virtual environment
- ✅ Install dependencies
- ✅ Create .env file
- ✅ Start the server

### Option 2: Using Batch File (Windows)

```bash
cd backend
run.bat
```

The batch will:
- ✅ Check Python installation
- ✅ Create virtual environment
- ✅ Install dependencies
- ✅ Create .env file
- ✅ Start the server

### Option 3: Manual Setup

#### Step 1: Install Python Dependencies

```bash
cd backend
pip install -r requirements.txt
```

#### Step 2: Run the Backend

```bash
python app.py
```

You should see:
```
🚀 Namma Schemes Backend
==================================================
📁 Schemes data: /path/to/backend/data/schemes.json
🌐 Running on: http://127.0.0.1:8000
==================================================
```

---

## Verify Backend is Running

### Method 1: Browser
Open: http://127.0.0.1:8000/api/health

Should return:
```json
{
  "status": "healthy",
  "timestamp": "2025-02-18T10:30:00.000000"
}
```

### Method 2: curl
```bash
curl http://127.0.0.1:8000/api/health
```

### Method 3: Check Frontend
- Frontend will show ✓ indicator when backend is connected
- Search and eligibility features will work automatically

---

## Common Issues & Solutions

### ❌ "Port 8000 already in use"

**Solution:**
```bash
# On macOS/Linux
lsof -i :8000  # Find process using port
kill -9 <PID>  # Kill the process

# On Windows
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

Or change port in `backend/app.py`:
```python
app.run(host='127.0.0.1', port=8001, debug=True)
```

### ❌ "Python not found"

**Solution:**
- Install Python 3.8+ from https://www.python.org
- Add Python to PATH
- Restart terminal
- Verify: `python --version`

### ❌ "ModuleNotFoundError: No module named 'flask'"

**Solution:**
```bash
# Ensure virtual environment is activated
# On macOS/Linux
source backend/venv/bin/activate

# On Windows
backend\venv\Scripts\activate

# Then install dependencies
pip install -r requirements.txt
```

### ❌ "schemes.json not found"

**Solution:**
The file should be at `backend/data/schemes.json`. If missing:
- Verify it exists
- Check file permissions
- Backend will create the `data/` directory automatically

---

## Environment Configuration

Optional: Create `.env` file in `backend/` folder:

```env
# Flask Configuration
FLASK_ENV=development
FLASK_DEBUG=True

# Server Configuration
PORT=8000
HOST=127.0.0.1

# Admin Token (optional - to protect admin endpoints)
# ADMIN_TOKEN=your-secret-token-here
```

---

## What Works When Backend is Running

✅ **Live Search**
- Search schemes by name, tag, or keyword
- Filter by category
- See all matching results

✅ **Eligibility Checking**
- Enter personal details
- Get matching scheme recommendations
- See eligibility requirements and documents

✅ **Categories with Real Data**
- Load category metadata from backend
- Support for future category management

✅ **Admin Features**
- View all eligibility submissions
- Export submissions to CSV
- Protect endpoints with admin token

---

## What Works Without Backend

✅ **Static Categories**
- All 6 categories display with images and colors
- Full descriptions and icons
- Responsive design

✅ **Form Interface**
- Form fields are fully functional
- Can fill out eligibility details
- Layout and styling complete

✅ **Navigation**
- All pages accessible
- Smooth scrolling
- Responsive menu

---

## Testing Backend

### 1. Health Check
```bash
curl http://127.0.0.1:8000/api/health
```

### 2. Get Categories
```bash
curl http://127.0.0.1:8000/api/categories
```

### 3. Get All Schemes
```bash
curl http://127.0.0.1:8000/api/schemes
```

### 4. Search Schemes
```bash
curl "http://127.0.0.1:8000/api/schemes?q=scholarship"
```

### 5. Filter by Category
```bash
curl "http://127.0.0.1:8000/api/schemes?category=education"
```

### 6. Check Eligibility
```bash
curl -X POST http://127.0.0.1:8000/api/eligibility-check \
  -H "Content-Type: application/json" \
  -d '{
    "category": "education",
    "age": 25,
    "gender": "female",
    "income": 400000
  }'
```

---

## Advanced Usage

### Running with Gunicorn (Production)

```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:8000 app:app
```

### Enable Admin Token Protection

```bash
export ADMIN_TOKEN="your-secret-token"
python app.py
```

Then call admin endpoints with:
```bash
curl -H "Authorization: Bearer your-secret-token" \
  http://127.0.0.1:8000/api/eligibility-submissions
```

### Run on Different Port

Edit `backend/app.py`:
```python
if __name__ == '__main__':
    app.run(host='127.0.0.1', port=9000, debug=True)
```

---

## Troubleshooting

### Slow startup?
- First run installs dependencies
- Subsequent runs are faster
- Debug mode adds slight overhead

### Getting 404 errors?
- Verify backend URL: http://127.0.0.1:8000
- Check route names in `backend/app.py`
- Look at console output for errors

### CORS errors?
- CORS is enabled by default
- Check browser console for exact error
- Ensure frontend is accessing http://127.0.0.1:8000

---

## Support

For more details:
- See `backend/README.md` for complete API documentation
- See `backend/TESTING.md` for comprehensive testing guide
- Check console for detailed error messages

## Success!

When backend is running, you'll see:
- ✓ in frontend (green indicator)
- All search features working
- Eligibility checking functional
- Real scheme recommendations

Happy exploring! 🎉
