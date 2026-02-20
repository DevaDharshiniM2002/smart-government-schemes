"""
Admin Notification System for Namma Schemes
Handles user registration/login notifications and sends emails to admin
"""

from flask import Blueprint, request, jsonify
from datetime import datetime
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os

admin_bp = Blueprint('admin', __name__)

# Admin email configuration
ADMIN_EMAIL = os.getenv('ADMIN_EMAIL', 'admin@nammaschemes.gov.in')
SMTP_SERVER = os.getenv('SMTP_SERVER', 'smtp.gmail.com')
SMTP_PORT = int(os.getenv('SMTP_PORT', '587'))
SMTP_USERNAME = os.getenv('SMTP_USERNAME', '')
SMTP_PASSWORD = os.getenv('SMTP_PASSWORD', '')

def send_email_notification(subject, body):
    """Send email notification to admin"""
    try:
        if not SMTP_USERNAME or not SMTP_PASSWORD:
            print("Email credentials not configured. Notification logged only.")
            return False
            
        msg = MIMEMultipart()
        msg['From'] = SMTP_USERNAME
        msg['To'] = ADMIN_EMAIL
        msg['Subject'] = subject
        
        msg.attach(MIMEText(body, 'html'))
        
        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()
        server.login(SMTP_USERNAME, SMTP_PASSWORD)
        server.send_message(msg)
        server.quit()
        
        print(f"Email sent to {ADMIN_EMAIL}")
        return True
    except Exception as e:
        print(f"Email error: {e}")
        return False

@admin_bp.route('/api/admin/notify-registration', methods=['POST'])
def notify_registration():
    """Notify admin of new user registration"""
    try:
        data = request.get_json()
        user_name = data.get('name')
        user_email = data.get('email')
        timestamp = data.get('timestamp', datetime.now().isoformat())
        
        # Create email content
        subject = f"New User Registration - {user_name}"
        body = f"""
        <html>
        <body style="font-family: Arial, sans-serif;">
            <h2 style="color: #0B3D91;">New User Registration</h2>
            <p>A new user has registered on Namma Schemes platform.</p>
            <table style="border-collapse: collapse; margin: 20px 0;">
                <tr>
                    <td style="padding: 8px; font-weight: bold;">Name:</td>
                    <td style="padding: 8px;">{user_name}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; font-weight: bold;">Email:</td>
                    <td style="padding: 8px;">{user_email}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; font-weight: bold;">Date & Time:</td>
                    <td style="padding: 8px;">{datetime.fromisoformat(timestamp).strftime('%Y-%m-%d %H:%M:%S')}</td>
                </tr>
            </table>
            <p style="color: #666; font-size: 12px;">This is an automated notification from Namma Schemes Admin System.</p>
        </body>
        </html>
        """
        
        # Send email
        email_sent = send_email_notification(subject, body)
        
        # Log to database (in production)
        print(f"Registration notification: {user_name} ({user_email}) at {timestamp}")
        
        return jsonify({
            'success': True,
            'message': 'Admin notified',
            'email_sent': email_sent
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@admin_bp.route('/api/admin/notify-login', methods=['POST'])
def notify_login():
    """Notify admin of user login"""
    try:
        data = request.get_json()
        user_name = data.get('name')
        user_email = data.get('email')
        timestamp = data.get('timestamp', datetime.now().isoformat())
        
        # Log to database
        print(f"Login notification: {user_name} ({user_email}) at {timestamp}")
        
        # Optional: Send email for login (can be disabled for frequent logins)
        # For now, just log it
        
        return jsonify({
            'success': True,
            'message': 'Login logged'
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@admin_bp.route('/api/admin/stats', methods=['GET'])
def get_stats():
    """Get admin dashboard statistics"""
    # In production, query from database
    # For now, return mock data
    return jsonify({
        'total_users': 0,
        'today_registrations': 0,
        'today_logins': 0,
        'active_users': 0
    })

@admin_bp.route('/api/admin/users', methods=['GET'])
def get_users():
    """Get all registered users"""
    # In production, query from database
    return jsonify({
        'users': []
    })

@admin_bp.route('/api/admin/activity-logs', methods=['GET'])
def get_activity_logs():
    """Get user activity logs"""
    # In production, query from database
    return jsonify({
        'logs': []
    })
