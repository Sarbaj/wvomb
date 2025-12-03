# WVOMB Backend API

Backend API for managing services, contact details, and contact form submissions with admin authentication and email notifications.

## 🚀 Features

- ✅ RESTful API with Express.js
- ✅ MongoDB database integration
- ✅ JWT authentication for admin
- ✅ Email notifications via SMTP
- ✅ Contact form submissions
- ✅ Service management (CRUD)
- ✅ Contact details management
- ✅ CORS configured for frontend

## 📋 Prerequisites

- Node.js v18 or higher
- MongoDB Atlas account (or local MongoDB)
- Gmail account for SMTP (or other email service)

## 🔧 Setup Instructions

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Edit `.env` with your credentials:
```env
# MongoDB
DB_USER=your_mongodb_username
DB_PASS=your_mongodb_password
DB_NAME=your_database_name

# Server
PORT=5000
JWT_SECRET=your_random_secret_key

# Email (Gmail)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-gmail-app-password
ADMIN_EMAIL=admin-email@example.com
```

**Gmail App Password:**
1. Enable 2FA on your Gmail account
2. Go to https://myaccount.google.com/apppasswords
3. Create app password for "Mail"
4. Use the 16-character code (without spaces)

### 3. Seed Database (Optional)
```bash
npm run seed
```

This will populate the database with sample services and contact information.

### 4. Create Admin Account

Start the server:
```bash
npm run dev
```

Create admin account:
```bash
curl -X POST http://localhost:5000/api/auth/create-admin \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"your_secure_password"}'
```

**IMPORTANT:** After creating the admin account, disable the `/create-admin` route in `routes/auth.js` for security.

### 5. Test Email (Optional)
```bash
npm run test-email
```

This sends a test email to verify SMTP configuration.

## 📡 API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/create-admin` - Create admin (disable after use)

### Services
**Public:**
- `GET /api/services` - Get all active services

**Admin (requires Bearer token):**
- `GET /api/services/all` - Get all services
- `GET /api/services/:id` - Get single service
- `POST /api/services` - Create service
- `PUT /api/services/:id` - Update service
- `DELETE /api/services/:id` - Delete service

### Contact
- `GET /api/contact` - Get contact details (public)
- `PUT /api/contact` - Update contact details (admin)

### Messages
**Public:**
- `POST /api/messages` - Submit contact form

**Admin (requires Bearer token):**
- `GET /api/messages` - Get all messages
- `GET /api/messages/:id` - Get single message
- `PATCH /api/messages/:id` - Update message status
- `DELETE /api/messages/:id` - Delete message

## 🗄️ Database Collections

- **admins** - Admin users with hashed passwords
- **services** - Business services
- **contacts** - Contact information
- **messages** - Contact form submissions

## 🔐 Security

- ✅ Passwords hashed with bcrypt
- ✅ JWT authentication for protected routes
- ✅ CORS configured for specific origins
- ✅ Environment variables for sensitive data
- ✅ `.env` excluded from git

## 📧 Email Notifications

When a contact form is submitted:
1. Message saved to database
2. Email sent to admin
3. User sees success message

Email includes:
- User's name and email
- Company name
- Service interest
- Message content
- Timestamp

## 🚀 Deployment

### Environment Variables for Production

Set these on your hosting platform (Railway, Render, Heroku):
```
DB_USER=your_mongodb_username
DB_PASS=your_mongodb_password
DB_NAME=your_database_name
PORT=5000
JWT_SECRET=your_strong_random_secret
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-gmail-app-password
ADMIN_EMAIL=admin-email@example.com
NODE_ENV=production
```

### MongoDB Atlas
1. Add your hosting platform's IP to Network Access
2. Or allow access from anywhere (0.0.0.0/0)

### CORS
Update `server.js` with your production frontend URL if needed.

## 🧪 Testing

```bash
# Test email
npm run test-email

# Test API endpoints
curl http://localhost:5000/api/services
curl http://localhost:5000/api/contact
```

## 📝 Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run seed` - Seed database with sample data
- `npm run test-email` - Test email configuration

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :5000
taskkill /F /PID <PID>
```

### Email Not Sending
- Check SMTP credentials in `.env`
- Use Gmail app password (not regular password)
- Check firewall/antivirus settings

### MongoDB Connection Error
- Verify credentials in `.env`
- Check MongoDB Atlas network access
- Ensure internet connection

## 📚 Documentation

- `EMAIL_SETUP_GUIDE.md` - Email configuration guide
- `DEPLOYMENT_GUIDE.md` - Production deployment guide
- `TROUBLESHOOTING.md` - Common issues and solutions

## 🔗 Related

- Frontend: `../frontend`
- Admin Panel: http://localhost:5173/admin/login

---

**Version:** 1.0.0
**License:** MIT
