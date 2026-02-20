import sqlite3
import json
import os

DB_PATH = os.path.join(os.path.dirname(__file__), 'data', 'schemes.db')

def init_db():
    """Initialize SQLite database"""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    # Schemes table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS schemes (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            category TEXT NOT NULL,
            summary TEXT,
            tags TEXT,
            eligibility TEXT,
            documents TEXT,
            apply_url TEXT
        )
    ''')
    
    # Assessments table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS assessments (
            id TEXT PRIMARY KEY,
            timestamp TEXT NOT NULL,
            category TEXT,
            age INTEGER,
            gender TEXT,
            city TEXT,
            data TEXT
        )
    ''')
    
    conn.commit()
    conn.close()

def migrate_json_to_db():
    """Migrate existing JSON data to SQLite"""
    json_file = os.path.join(os.path.dirname(__file__), 'data', 'schemes.json')
    
    if not os.path.exists(json_file):
        return
    
    with open(json_file, 'r') as f:
        schemes = json.load(f)
    
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    for scheme in schemes:
        cursor.execute('''
            INSERT OR REPLACE INTO schemes (id, name, category, summary, tags, eligibility, documents, apply_url)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            scheme['id'],
            scheme['name'],
            scheme['category'],
            scheme['summary'],
            json.dumps(scheme.get('tags', [])),
            json.dumps(scheme.get('eligibility', [])),
            json.dumps(scheme.get('documents', [])),
            scheme.get('apply_url', '')
        ))
    
    conn.commit()
    conn.close()

def get_all_schemes():
    """Get all schemes from database"""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM schemes')
    rows = cursor.fetchall()
    conn.close()
    
    schemes = []
    for row in rows:
        schemes.append({
            'id': row[0],
            'name': row[1],
            'category': row[2],
            'summary': row[3],
            'tags': json.loads(row[4]) if row[4] else [],
            'eligibility': json.loads(row[5]) if row[5] else [],
            'documents': json.loads(row[6]) if row[6] else [],
            'apply_url': row[7]
        })
    return schemes

def save_assessment(assessment_id, timestamp, data):
    """Save assessment to database"""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO assessments (id, timestamp, category, age, gender, city, data)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    ''', (
        assessment_id,
        timestamp,
        data.get('category', ''),
        data.get('age', 0),
        data.get('gender', ''),
        data.get('city', ''),
        json.dumps(data)
    ))
    conn.commit()
    conn.close()

def get_all_assessments():
    """Get all assessments from database"""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM assessments')
    rows = cursor.fetchall()
    conn.close()
    
    assessments = []
    for row in rows:
        assessments.append({
            'id': row[0],
            'timestamp': row[1],
            'data': json.loads(row[6])
        })
    return assessments
