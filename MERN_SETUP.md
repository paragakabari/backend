# TaskMaster - Full MERN Stack Setup

## 🔥 Complete MERN Stack Implementation

This is the **complete MERN stack version** of TaskMaster with a custom Express.js backend and MongoDB database.

### Stack Components:
- **M** - MongoDB (Database)
- **E** - Express.js (Backend API)
- **R** - React (Frontend - Next.js)
- **N** - Node.js (Runtime)

## 📋 Prerequisites

### Required Software:
1. **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
2. **MongoDB** - Choose one option:
   - **Local MongoDB**: [Download MongoDB Community](https://www.mongodb.com/try/download/community)
   - **MongoDB Atlas**: [Free Cloud Database](https://www.mongodb.com/atlas)
   - **Docker**: `docker run -d -p 27017:27017 --name mongodb mongo:latest`

### Verify Installation:
```bash
node --version    # Should be v18+
npm --version     # Should be 8+
mongod --version  # If using local MongoDB
```

## 🚀 Complete Setup Guide

### Step 1: Clone and Setup Backend

```bash
# Navigate to project directory
cd /Users/parag/Downloads/Tesss

# Navigate to backend
cd backend

# Install dependencies
npm install

# Create environment file
cp env.example .env
```

### Step 2: Configure Environment Variables

Edit `backend/.env`:
```bash
# Required: Update these values
MONGODB_URI=mongodb://localhost:27017/taskmaster  # For local MongoDB
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskmaster

JWT_SECRET=your_super_secret_jwt_key_here_change_this_in_production
JWT_REFRESH_SECRET=your_refresh_secret_here

# Optional: Customize other settings
PORT=5000
FRONTEND_URL=http://localhost:3000
```

### Step 3: Start MongoDB (if using local)

```bash
# Option 1: Start MongoDB service (macOS with Homebrew)
brew services start mongodb-community

# Option 2: Start MongoDB directly
mongod --dbpath /path/to/your/data/directory

# Option 3: Using Docker
docker run -d -p 27017:27017 --name taskmaster-mongo mongo:latest
```

### Step 4: Start Backend Server

```bash
cd backend

# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

You should see:
```
🚀 TaskMaster API Server running on port 5000
✅ Connected to MongoDB successfully
📱 Environment: development
🌐 Frontend URL: http://localhost:3000
```

### Step 5: Setup Frontend

```bash
# Open new terminal
cd /Users/parag/Downloads/Tesss/frontend

# Install dependencies (if not already done)
npm install

# Create environment file
cp env.example .env.local
```

Edit `frontend/.env.local`:
```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
```

### Step 6: Start Frontend

```bash
cd frontend
npm run dev
```

## 🌐 Application URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/api/health

## 🧪 Testing the Full Stack

### 1. Test Backend API (Optional)

```bash
# Health check
curl http://localhost:5000/api/health

# Register a new user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com", 
    "firstName": "Test",
    "lastName": "User",
    "password": "password123"
  }'
```

### 2. Test Full Application

1. **Open Frontend**: http://localhost:3000
2. **Sign Up**: Create a new account
3. **Login**: Use your credentials
4. **Create Tasks**: Add some tasks
5. **Test Auto-logout**: 
   - Go to Settings
   - Set timeout to 1 minute
   - Wait and test the warning dialog

## 📁 Project Structure

```
TaskMaster/
├── backend/                    # Express.js API Server
│   ├── models/                 # MongoDB Models
│   │   ├── User.js            # User model with auth
│   │   └── Todo.js            # Todo model
│   ├── routes/                # API Routes
│   │   ├── auth.js            # Authentication endpoints
│   │   └── todos.js           # Todo CRUD endpoints
│   ├── middleware/            # Express Middleware
│   │   └── auth.js            # JWT authentication
│   ├── server.js              # Main server file
│   ├── package.json           # Backend dependencies
│   └── .env                   # Environment variables
├── frontend/                  # Next.js Application
│   └── [Previous frontend structure]
└── MERN_SETUP.md             # This file
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/me` - Update user profile

### Todos
- `GET /api/todos` - Get user's todos
- `GET /api/todos/stats` - Get todo statistics
- `POST /api/todos` - Create new todo
- `GET /api/todos/:id` - Get specific todo
- `PUT /api/todos/:id` - Update todo
- `DELETE /api/todos/:id` - Delete todo
- `PATCH /api/todos/:id/toggle` - Toggle completion

## 🔐 Security Features

### Backend Security:
- **JWT Authentication** with access and refresh tokens
- **Password Hashing** with bcrypt
- **Rate Limiting** to prevent abuse
- **CORS Protection** for cross-origin requests
- **Helmet** for security headers
- **Input Validation** and sanitization

### Frontend Security:
- **Activity Tracking** for auto-logout
- **Token Management** with automatic refresh
- **Secure Cookie Storage** (simulated)
- **XSS Protection** with React's built-in features

## 🐛 Troubleshooting

### Common Issues:

1. **MongoDB Connection Error**
   ```bash
   # Check if MongoDB is running
   brew services list | grep mongodb
   
   # Start MongoDB
   brew services start mongodb-community
   ```

2. **Port Already in Use**
   ```bash
   # Find and kill process on port 5000
   lsof -ti:5000 | xargs kill -9
   
   # Or change port in backend/.env
   PORT=5001
   ```

3. **CORS Errors**
   - Ensure `FRONTEND_URL` in backend/.env matches frontend URL
   - Check that both servers are running

4. **JWT Errors**
   - Verify `JWT_SECRET` is set in backend/.env
   - Check that tokens are being sent in Authorization header

### Logs and Debugging:

```bash
# Backend logs
cd backend
npm run dev

# Frontend logs  
cd frontend
npm run dev

# MongoDB logs (if using local installation)
tail -f /usr/local/var/log/mongodb/mongo.log
```

## 📊 Database Schema

### Users Collection:
```javascript
{
  _id: ObjectId,
  username: String,
  email: String,
  firstName: String,
  lastName: String,
  password: String (hashed),
  preferences: {
    staySignedIn: Boolean,
    activityConfig: {
      inactivityTimeout: Number,
      warningTime: Number,
      enabled: Boolean
    }
  },
  refreshTokens: [{ token: String, createdAt: Date }],
  lastActive: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Todos Collection:
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  completed: Boolean,
  priority: String,
  dueDate: Date,
  completedAt: Date,
  user: ObjectId (ref: User),
  category: String,
  tags: [String],
  createdAt: Date,
  updatedAt: Date
}
```

## 🎯 Key Differences from DummyJSON Version

### ✅ Custom Backend Features:
- **Real user registration** with unique usernames/emails
- **Persistent data** stored in MongoDB
- **User-specific todos** with proper ownership
- **Advanced todo features** (priority, due dates, categories)
- **Bulk operations** for todos
- **Search functionality** with full-text search
- **User preferences** stored in database
- **Refresh token management** for better security

### ✅ Enhanced Security:
- **Real password hashing** with bcrypt
- **Rate limiting** and DDoS protection
- **Input validation** and sanitization
- **Resource ownership** verification
- **Token expiration** and refresh logic

## 🎊 Success!

If both servers start without errors, you now have a **complete MERN stack application** running locally with:

- ✅ **Real Database** - MongoDB storing your data
- ✅ **Custom API** - Express.js handling all operations  
- ✅ **Full Authentication** - JWT with refresh tokens
- ✅ **User Management** - Registration, login, preferences
- ✅ **Task Management** - Complete CRUD with ownership
- ✅ **Auto-logout** - Activity tracking and warnings
- ✅ **Security** - Rate limiting, validation, CORS

**Your TaskMaster MERN stack application is ready for development and testing!** 🚀

---

**Need Help?** Check the troubleshooting section above or review the server logs for specific error messages.
