import json
import os
from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
from dotenv import load_dotenv
import uuid
from datetime import datetime
import database
import sqlite3

load_dotenv()

app = Flask(__name__, static_folder='..', static_url_path='')
CORS(app)

# Database path
DB_PATH = os.path.join(os.path.dirname(__file__), 'data', 'users.db')

def init_users_db():
    """Initialize users database"""
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS users
                 (id INTEGER PRIMARY KEY AUTOINCREMENT,
                  name TEXT NOT NULL,
                  email TEXT UNIQUE NOT NULL,
                  password TEXT NOT NULL,
                  created_at TEXT NOT NULL,
                  last_login TEXT)''')
    c.execute('''CREATE TABLE IF NOT EXISTS activity_logs
                 (id INTEGER PRIMARY KEY AUTOINCREMENT,
                  user_email TEXT NOT NULL,
                  user_name TEXT NOT NULL,
                  action TEXT NOT NULL,
                  timestamp TEXT NOT NULL)''')
    conn.commit()
    conn.close()

# Serve frontend
@app.route('/')
def serve_frontend():
    try:
        return send_from_directory('..', 'namma-schemes.html')
    except:
        return '''<!DOCTYPE html>
<html><head><title>Error</title></head>
<body><h1>File not found</h1></body></html>''', 404

@app.route('/<path:path>')
def serve_static(path):
    try:
        return send_from_directory('..', path)
    except:
        return jsonify({'error': 'File not found'}), 404

# Initialize database
try:
    database.init_db()
    database.migrate_json_to_db()
    init_users_db()
except Exception as e:
    print(f"Database initialization: {e}")

# Categories mapping with images
CATEGORIES = {
    'education': {
        'label': 'Education & Scholarships',
        'image': 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80',
        'color': '#3B82F6',
        'icon': '📚'
    },
    'health': {
        'label': 'Health & Insurance',
        'image': 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&q=80',
        'color': '#EF4444',
        'icon': '🏥'
    },
    'agriculture': {
        'label': 'Agriculture & Farming',
        'image': 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
        'color': '#10B981',
        'icon': '🌾'
    },
    'housing': {
        'label': 'Housing & Urban',
        'image': 'https://images.unsplash.com/photo-1448630360428-65456885c650?w=800&q=80',
        'color': '#FBBF24',
        'icon': '🏠'
    },
    'women': {
        'label': 'Women & Children',
        'image': 'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=800&q=80',
        'color': '#EC4899',
        'icon': '👶'
    },
    'pensions': {
        'label': 'Pensions & Social Security',
        'image': 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=800&q=80',
        'color': '#6366F1',
        'icon': '💰'
    },
    'widow': {
        'label': 'Widow Welfare',
        'image': 'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=800&q=80',
        'color': '#8B5CF6',
        'icon': '🤝'
    },
    'transgender': {
        'label': 'Transgender Support',
        'image': 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80',
        'color': '#F59E0B',
        'icon': '🏳️‍⚧️'
    },
    'disabled': {
        'label': 'Disabled Persons',
        'image': 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=800&q=80',
        'color': '#14B8A6',
        'icon': '♿'
    },
    'senior': {
        'label': 'Senior Citizens',
        'image': 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80',
        'color': '#6366F1',
        'icon': '👴'
    },
    'employment': {
        'label': 'Employment & Skills',
        'image': 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80',
        'color': '#0EA5E9',
        'icon': '💼'
    },
    'minority': {
        'label': 'Minority Welfare',
        'image': 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=800&q=80',
        'color': '#EC4899',
        'icon': '🕌'
    },
}

@app.route('/api/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'timestamp': datetime.now().isoformat()})

@app.route('/api/categories', methods=['GET'])
def get_categories():
    """Get all scheme categories"""
    categories = [
        {
            'key': key,
            'label': cat['label'],
            'image': cat['image'],
            'color': cat['color'],
            'icon': cat['icon']
        }
        for key, cat in CATEGORIES.items()
    ]
    return jsonify({'categories': categories})

@app.route('/api/schemes', methods=['GET'])
def get_schemes():
    """Get schemes with optional filtering"""
    schemes = database.get_all_schemes()
    
    # Get query parameters
    category = request.args.get('category', '').lower()
    query = request.args.get('q', '').lower()
    limit = request.args.get('limit', 50, type=int)
    offset = request.args.get('offset', 0, type=int)
    
    # Filter by category
    if category:
        schemes = [s for s in schemes if s.get('category', '').lower() == category]
    
    # Filter by search query
    if query:
        schemes = [
            s for s in schemes
            if query in s.get('name', '').lower()
            or query in s.get('summary', '').lower()
            or any(query in tag.lower() for tag in s.get('tags', []))
        ]
    
    # Apply pagination
    total = len(schemes)
    schemes = schemes[offset:offset + limit]
    
    return jsonify({
        'schemes': schemes,
        'total': total,
        'limit': limit,
        'offset': offset,
    })

@app.route('/api/schemes/<scheme_id>', methods=['GET'])
def get_scheme(scheme_id):
    """Get a specific scheme by ID"""
    schemes = database.get_all_schemes()
    scheme = next((s for s in schemes if s.get('id') == scheme_id), None)
    
    if not scheme:
        return jsonify({'error': 'Scheme not found'}), 404
    
    return jsonify(scheme)

@app.route('/api/eligibility-check', methods=['POST'])
def eligibility_check():
    """Check eligibility and recommend schemes"""
    try:
        data = request.get_json()
        category = data.get('category', '').lower()
        
        if not category:
            return jsonify({'error': 'Category is required'}), 400
        
        # Generate assessment ID
        assessment_id = str(uuid.uuid4())
        timestamp = datetime.now().isoformat()
        
        # Store assessment in database
        database.save_assessment(assessment_id, timestamp, data)
        
        # Load and filter schemes by category
        schemes = database.get_all_schemes()
        matching_schemes = [s for s in schemes if s.get('category', '').lower() == category]
        
        return jsonify({
            'assessment_id': assessment_id,
            'category': category,
            'schemes': matching_schemes,
            'message': f'Found {len(matching_schemes)} scheme(s) for {category}'
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/api/eligibility-submissions', methods=['GET'])
def get_submissions():
    """Get all eligibility assessments (admin endpoint)"""
    # Check admin token if set
    admin_token = os.getenv('ADMIN_TOKEN', '')
    if admin_token:
        token = request.headers.get('Authorization', '').replace('Bearer ', '')
        if token != admin_token:
            return jsonify({'error': 'Unauthorized'}), 401
    
    limit = request.args.get('limit', 200, type=int)
    offset = request.args.get('offset', 0, type=int)
    
    # Get from database
    submissions = database.get_all_assessments()
    total = len(submissions)
    submissions = submissions[offset:offset + limit]
    
    # Check for CSV export
    if request.args.get('format') == 'csv':
        import csv
        from io import StringIO
        
        output = StringIO()
        if submissions:
            writer = csv.DictWriter(output, fieldnames=['id', 'timestamp', 'category', 'age', 'gender', 'city'])
            writer.writeheader()
            for sub in submissions:
                row = {
                    'id': sub['id'],
                    'timestamp': sub['timestamp'],
                    'category': sub['data'].get('category', ''),
                    'age': sub['data'].get('age', ''),
                    'gender': sub['data'].get('gender', ''),
                    'city': sub['data'].get('city', ''),
                }
                writer.writerow(row)
        
        return output.getvalue(), 200, {'Content-Type': 'text/csv'}
    
    return jsonify({
        'submissions': submissions,
        'total': total,
        'limit': limit,
        'offset': offset,
    })

@app.route('/api/eligibility-submissions/<assessment_id>', methods=['GET'])
def get_submission(assessment_id):
    """Get a specific assessment"""
    admin_token = os.getenv('ADMIN_TOKEN', '')
    if admin_token:
        token = request.headers.get('Authorization', '').replace('Bearer ', '')
        if token != admin_token:
            return jsonify({'error': 'Unauthorized'}), 401
    
    submissions = database.get_all_assessments()
    submission = next((s for s in submissions if s['id'] == assessment_id), None)
    if not submission:
        return jsonify({'error': 'Assessment not found'}), 404
    
    return jsonify(submission)

@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Not found'}), 404

@app.errorhandler(500)
def server_error(error):
    return jsonify({'error': 'Internal server error'}), 500

# Admin & User Management Endpoints
@app.route('/api/auth/register', methods=['POST'])
def register_user():
    """Register new user"""
    try:
        data = request.get_json()
        name = data.get('name')
        email = data.get('email')
        password = data.get('password')
        
        if not name or not email or not password:
            return jsonify({'error': 'All fields required'}), 400
        
        conn = sqlite3.connect(DB_PATH)
        c = conn.cursor()
        
        # Check duplicate
        c.execute('SELECT email FROM users WHERE email = ?', (email,))
        if c.fetchone():
            conn.close()
            return jsonify({'error': 'Email already registered'}), 400
        
        # Insert user
        timestamp = datetime.now().isoformat()
        c.execute('INSERT INTO users (name, email, password, created_at) VALUES (?, ?, ?, ?)',
                  (name, email, password, timestamp))
        
        # Log activity
        c.execute('INSERT INTO activity_logs (user_email, user_name, action, timestamp) VALUES (?, ?, ?, ?)',
                  (email, name, 'registration', timestamp))
        
        conn.commit()
        conn.close()
        
        return jsonify({'success': True, 'message': 'User registered'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/auth/login', methods=['POST'])
def login_user():
    """User login"""
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        
        conn = sqlite3.connect(DB_PATH)
        c = conn.cursor()
        
        c.execute('SELECT name, email, password FROM users WHERE email = ?', (email,))
        user = c.fetchone()
        
        if not user or user[2] != password:
            conn.close()
            return jsonify({'error': 'Invalid credentials'}), 401
        
        # Update last login
        timestamp = datetime.now().isoformat()
        c.execute('UPDATE users SET last_login = ? WHERE email = ?', (timestamp, email))
        
        # Log activity
        c.execute('INSERT INTO activity_logs (user_email, user_name, action, timestamp) VALUES (?, ?, ?, ?)',
                  (email, user[0], 'login', timestamp))
        
        conn.commit()
        conn.close()
        
        return jsonify({'success': True, 'user': {'name': user[0], 'email': user[1]}})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/admin/stats', methods=['GET'])
def admin_stats():
    """Get admin statistics"""
    try:
        conn = sqlite3.connect(DB_PATH)
        c = conn.cursor()
        
        # Total users
        c.execute('SELECT COUNT(*) FROM users')
        total_users = c.fetchone()[0]
        
        # Today's registrations
        today = datetime.now().date().isoformat()
        c.execute('SELECT COUNT(*) FROM users WHERE DATE(created_at) = ?', (today,))
        today_regs = c.fetchone()[0]
        
        # Today's logins
        c.execute('SELECT COUNT(*) FROM activity_logs WHERE action = "login" AND DATE(timestamp) = ?', (today,))
        today_logins = c.fetchone()[0]
        
        # Active users (last 30 min)
        from datetime import timedelta
        active_time = (datetime.now() - timedelta(minutes=30)).isoformat()
        c.execute('SELECT COUNT(DISTINCT user_email) FROM activity_logs WHERE timestamp > ?', (active_time,))
        active_users = c.fetchone()[0]
        
        conn.close()
        
        return jsonify({
            'total_users': total_users,
            'today_registrations': today_regs,
            'today_logins': today_logins,
            'active_users': active_users
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/admin/users', methods=['GET'])
def admin_users():
    """Get all users"""
    try:
        conn = sqlite3.connect(DB_PATH)
        c = conn.cursor()
        c.execute('SELECT name, email, created_at, last_login FROM users ORDER BY created_at DESC LIMIT 50')
        users = [{'name': row[0], 'email': row[1], 'created': row[2], 'lastLogin': row[3]} for row in c.fetchall()]
        conn.close()
        return jsonify({'users': users})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/admin/activity-logs', methods=['GET'])
def admin_logs():
    """Get activity logs"""
    try:
        conn = sqlite3.connect(DB_PATH)
        c = conn.cursor()
        c.execute('SELECT user_name, user_email, action, timestamp FROM activity_logs ORDER BY timestamp DESC LIMIT 100')
        logs = [{'userName': row[0], 'userEmail': row[1], 'action': row[2], 'timestamp': row[3]} for row in c.fetchall()]
        conn.close()
        return jsonify({'logs': logs})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    # Create data directory if it doesn't exist
    os.makedirs(os.path.join(os.path.dirname(__file__), 'data'), exist_ok=True)
    
    print("Namma Schemes - Government Welfare Platform")
    print("=" * 50)
    print(f"Database: SQLite")
    print(f"Frontend + Backend: http://127.0.0.1:8000")
    print(f"API Endpoints: http://127.0.0.1:8000/api/")
    print(f"Admin Dashboard: http://127.0.0.1:8000/admin-dashboard.html")
    print("Voice Search: Tamil & English Supported")
    print("=" * 50)
    
    app.run(host='127.0.0.1', port=8000, debug=True)
