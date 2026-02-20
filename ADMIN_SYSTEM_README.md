# Admin Notification System - Namma Schemes

## Overview
Automatic admin notification system that tracks user registrations and logins in real-time.

## Features
✅ **User Registration Tracking** - Logs all new user registrations with timestamp
✅ **Login Activity Monitoring** - Tracks user login events
✅ **Admin Dashboard** - Real-time statistics and user activity logs
✅ **Email Notifications** - Sends email alerts to admin (configurable)
✅ **Duplicate Prevention** - Prevents duplicate email registrations
✅ **Secure Data Handling** - User data stored securely
✅ **Activity Logs** - Complete audit trail of user actions

## Admin Access

### Admin Login Credentials
- **URL**: `admin-login.html`
- **Email**: `admin@nammaschemes.gov.in`
- **Password**: `admin123`

### Admin Dashboard
- **URL**: `admin-dashboard.html`
- **Features**:
  - Total Users Count
  - Today's Registrations
  - Today's Logins
  - Active Users (last 30 minutes)
  - Recent Registrations Table
  - User Activity Logs
  - Auto-refresh every 30 seconds

## How It Works

### 1. User Registration
When a user registers:
- User data stored in localStorage with timestamp
- Activity log created with registration event
- Admin notification generated
- Email sent to admin (if configured)
- Duplicate email check prevents re-registration

### 2. User Login
When a user logs in:
- Last login timestamp updated
- Activity log created with login event
- Admin notification generated
- Session tracked for active user count

### 3. Admin Monitoring
Admin can view:
- Real-time user statistics
- Recent registrations with details
- Complete activity logs
- User status and timestamps

## Email Configuration (Production)

To enable email notifications, configure these environment variables:

```bash
ADMIN_EMAIL=admin@nammaschemes.gov.in
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your-email@gmail.com
SMTP_PASSWORD=your-app-password
```

### Gmail Setup
1. Enable 2-Factor Authentication
2. Generate App Password
3. Use App Password in SMTP_PASSWORD

## Data Storage

### Current Implementation (Demo)
- Uses localStorage for client-side storage
- Suitable for demo/testing purposes

### Production Implementation
- Migrate to backend database (PostgreSQL/MySQL)
- Use backend API endpoints in `admin_routes.py`
- Implement proper authentication and authorization
- Add rate limiting and security measures

## Security Features

1. **Password Validation** - Minimum 6 characters
2. **Duplicate Prevention** - Email uniqueness check
3. **Admin Authentication** - Separate admin login
4. **Secure Storage** - Passwords should be hashed in production
5. **Activity Logging** - Complete audit trail

## API Endpoints (Backend)

```
POST /api/admin/notify-registration
POST /api/admin/notify-login
GET  /api/admin/stats
GET  /api/admin/users
GET  /api/admin/activity-logs
```

## Testing

1. **Register New User**:
   - Go to `register.html`
   - Fill registration form
   - Check admin dashboard for new entry

2. **Login User**:
   - Go to `login.html`
   - Login with registered credentials
   - Check admin dashboard for login log

3. **View Admin Dashboard**:
   - Go to `admin-login.html`
   - Login with admin credentials
   - View real-time statistics

## Production Deployment Checklist

- [ ] Migrate to backend database
- [ ] Implement password hashing (bcrypt)
- [ ] Configure email SMTP settings
- [ ] Add rate limiting
- [ ] Implement HTTPS
- [ ] Add CSRF protection
- [ ] Set up monitoring and alerts
- [ ] Configure backup system
- [ ] Add data retention policies
- [ ] Implement GDPR compliance

## Support

For issues or questions, contact the development team.

---
**Namma Schemes - Smart Government Scheme Assistant**
