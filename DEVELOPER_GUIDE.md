# TaskMaster - Complete Developer Guide

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture & Technology Stack](#architecture--technology-stack)
3. [Project Structure](#project-structure)
4. [Getting Started](#getting-started)
5. [Frontend Architecture](#frontend-architecture)
6. [Backend Architecture](#backend-architecture)
7. [Key Features Explained](#key-features-explained)
8. [API Documentation](#api-documentation)
9. [Database Schema](#database-schema)
10. [Security Implementation](#security-implementation)
11. [Development Workflow](#development-workflow)
12. [Testing Guide](#testing-guide)
13. [Deployment Guide](#deployment-guide)
14. [Troubleshooting](#troubleshooting)
15. [Contributing Guidelines](#contributing-guidelines)

---

## Project Overview

**TaskMaster** is a full-stack MERN (MongoDB, Express.js, React, Node.js) task management application with advanced security features. It combines a Next.js frontend with a custom Express.js backend, offering both modern UI/UX and robust server-side functionality.

### 🎯 Core Features
- **User Authentication**: JWT-based signup/login with secure token management
- **Task Management**: Complete CRUD operations with user ownership
- **Auto-logout Security**: Configurable inactivity detection with warning system
- **User Preferences**: Customizable timeout settings and activity monitoring
- **Responsive Design**: Modern UI that works on all devices
- **Real-time Updates**: Optimistic UI updates for better user experience

### 🔄 Two Implementations
The project supports **two different backend implementations**:

1. **DummyJSON Integration** (Current Default)
   - Uses external DummyJSON API for quick prototyping
   - No backend server required
   - Perfect for frontend development and testing

2. **Full MERN Stack** (Production Ready)
   - Custom Express.js backend with MongoDB
   - Complete user management and data persistence
   - Advanced security features and validation

---

## Architecture & Technology Stack

### Frontend Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS with custom components
- **State Management**: React Context API with useReducer
- **HTTP Client**: Axios with interceptors
- **Icons**: Lucide React
- **Cookie Management**: js-cookie

### Backend Stack (MERN Version)
- **Runtime**: Node.js
- **Framework**: Express.js with security middleware
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT with refresh tokens
- **Security**: Helmet, CORS, Rate limiting, bcrypt
- **Validation**: Built-in validation with custom rules

### Development Tools
- **Package Manager**: npm
- **Linting**: ESLint with Next.js config
- **Type Checking**: TypeScript compiler
- **Hot Reload**: Next.js dev server with Turbopack

---

## Project Structure

```
TaskMaster/
├── frontend/                          # Next.js Frontend Application
│   ├── src/
│   │   ├── app/                      # Next.js App Router (Pages)
│   │   │   ├── layout.tsx            # Root layout component
│   │   │   ├── page.tsx              # Home page (redirects to auth)
│   │   │   └── globals.css           # Global styles
│   │   ├── components/               # React Components
│   │   │   ├── auth/                 # Authentication Components
│   │   │   │   ├── LoginForm.tsx     # User login form
│   │   │   │   └── SignupForm.tsx    # User registration form
│   │   │   ├── layout/               # Layout Components
│   │   │   │   └── Header.tsx        # Main navigation header
│   │   │   ├── settings/             # Settings Components
│   │   │   │   └── PreferencesSettings.tsx # User preferences
│   │   │   ├── todos/                # Todo Management Components
│   │   │   │   ├── TodoForm.tsx      # Add new todo form
│   │   │   │   ├── TodoItem.tsx      # Individual todo component
│   │   │   │   └── TodoList.tsx      # Todo list with filtering
│   │   │   ├── ui/                   # Reusable UI Components
│   │   │   │   ├── Button.tsx        # Custom button component
│   │   │   │   ├── Card.tsx          # Card container component
│   │   │   │   ├── Dialog.tsx        # Modal dialog component
│   │   │   │   └── Input.tsx         # Form input component
│   │   │   ├── AuthPage.tsx          # Auth page container
│   │   │   ├── AutoLogoutWarning.tsx # Logout warning dialog
│   │   │   └── Dashboard.tsx         # Main dashboard
│   │   ├── contexts/                 # React Contexts
│   │   │   └── AuthContext.tsx       # Global auth state management
│   │   ├── hooks/                    # Custom React Hooks
│   │   │   └── useActivityTracker.ts # Activity monitoring hook
│   │   ├── lib/                      # Utility Libraries
│   │   │   └── utils.ts              # Helper functions
│   │   ├── services/                 # API Services
│   │   │   └── api.ts                # API client with axios
│   │   └── types/                    # TypeScript Definitions
│   │       └── index.ts              # Type definitions
│   ├── public/                       # Static Assets
│   │   └── [SVG icons and images]
│   ├── package.json                  # Frontend dependencies
│   ├── tailwind.config.js           # Tailwind configuration
│   ├── tsconfig.json                # TypeScript configuration
│   └── next.config.ts               # Next.js configuration
├── backend/                          # Express.js Backend (MERN Version)
│   ├── models/                      # MongoDB Models
│   │   ├── User.js                  # User schema with auth
│   │   └── Todo.js                  # Todo schema with relationships
│   ├── routes/                      # API Route Handlers
│   │   ├── auth.js                  # Authentication endpoints
│   │   └── todos.js                 # Todo CRUD endpoints
│   ├── middleware/                  # Express Middleware
│   │   └── auth.js                  # JWT authentication middleware
│   ├── server.js                    # Main Express server
│   ├── package.json                 # Backend dependencies
│   └── env.example                  # Environment variables template
├── docs/                            # Documentation Files
│   ├── README.md                    # Main project documentation
│   ├── SETUP.md                     # Quick setup guide
│   ├── PROJECT_SUMMARY.md           # Project summary
│   ├── MERN_SETUP.md               # MERN stack setup guide
│   └── DEVELOPER_GUIDE.md          # This comprehensive guide
└── test-api.js                     # API testing script
```

---

## Getting Started

### Prerequisites
- **Node.js 18+** and npm
- **MongoDB** (for MERN version) - Local installation or MongoDB Atlas
- **Modern web browser**
- **Git** for version control

### Quick Start (DummyJSON Version)

```bash
# 1. Navigate to project
cd /Users/parag/Downloads/Tesss/frontend

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open browser
open http://localhost:3000
```

### Full MERN Setup

```bash
# 1. Start MongoDB (choose one option)
# Option A: Local MongoDB
brew services start mongodb-community

# Option B: Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest

# 2. Setup Backend
cd backend
npm install
cp env.example .env
# Edit .env with your configuration
npm run dev

# 3. Setup Frontend (new terminal)
cd frontend
npm install
cp env.example .env.local
# Edit .env.local: NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
npm run dev
```

### Demo Credentials
For testing the application, use these demo credentials:
- **Username**: `emilys`
- **Password**: `emilyspass`

---

## Frontend Architecture

### State Management
The frontend uses **React Context API** with **useReducer** for global state management:

```typescript
// AuthContext.tsx - Global authentication state
interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  preferences: UserPreferences
}
```

### Component Architecture

#### 1. **Layout Components**
- `layout.tsx`: Root layout with providers
- `Header.tsx`: Navigation with user profile

#### 2. **Authentication Components**
- `AuthPage.tsx`: Container for login/signup
- `LoginForm.tsx`: User login with validation
- `SignupForm.tsx`: User registration

#### 3. **Todo Management Components**
- `Dashboard.tsx`: Main application container
- `TodoList.tsx`: List with filtering and stats
- `TodoItem.tsx`: Individual todo with edit/delete
- `TodoForm.tsx`: Add new todo form

#### 4. **UI Components**
Reusable components built with Tailwind CSS:
- `Button.tsx`: Styled button with variants
- `Card.tsx`: Container component
- `Dialog.tsx`: Modal dialogs
- `Input.tsx`: Form input with validation

### Routing Strategy
Using **Next.js App Router**:
- `/` - Home page (redirects to dashboard if authenticated)
- All routes are client-side rendered
- Authentication state determines what users see

### Data Flow

1. **Authentication Flow**:
   ```
   LoginForm → AuthContext → API Service → Cookie Storage
   ```

2. **Todo Operations Flow**:
   ```
   TodoForm/TodoItem → API Service → Optimistic Update → Server Response
   ```

3. **Activity Tracking Flow**:
   ```
   User Interaction → useActivityTracker → Timer Management → Warning Dialog
   ```

---

## Backend Architecture

### Server Structure (Express.js)

#### 1. **Main Server (server.js)**
- Express app configuration
- Security middleware (Helmet, CORS)
- Rate limiting
- Global error handling
- Database connection

#### 2. **Models (Mongoose)**

**User Model (User.js)**:
```javascript
{
  username: String (unique, required),
  email: String (unique, required),
  firstName: String (required),
  lastName: String (required),
  password: String (hashed, required),
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

**Todo Model (Todo.js)**:
```javascript
{
  title: String (required),
  description: String,
  completed: Boolean (default: false),
  priority: String (enum: low/medium/high),
  dueDate: Date,
  completedAt: Date,
  user: ObjectId (ref: User),
  category: String,
  tags: [String],
  createdAt: Date,
  updatedAt: Date
}
```

#### 3. **Routes**

**Authentication Routes (/api/auth)**:
- `POST /register` - User registration
- `POST /login` - User login
- `POST /refresh` - Token refresh
- `POST /logout` - User logout
- `GET /me` - Get current user
- `PUT /me` - Update user profile

**Todo Routes (/api/todos)**:
- `GET /` - Get user's todos with filters
- `GET /stats` - Get todo statistics
- `POST /` - Create new todo
- `GET /:id` - Get specific todo
- `PUT /:id` - Update todo
- `DELETE /:id` - Delete todo
- `PATCH /:id/toggle` - Toggle completion

#### 4. **Middleware**

**Authentication Middleware (auth.js)**:
- `authenticate`: Verify JWT tokens
- `checkResourceOwnership`: Ensure user owns resource
- `validateRefreshToken`: Validate refresh tokens
- `generateTokens`: Create access/refresh tokens

### API Response Format

```javascript
// Success Response
{
  success: true,
  message: "Operation successful",
  data: {...}
}

// Error Response
{
  error: "Error message",
  code: "ERROR_CODE", // Optional
  messages: [...] // For validation errors
}
```

---

## Key Features Explained

### 1. **User Authentication System**

#### JWT Token Management
- **Access Tokens**: Short-lived (30 minutes) for API access
- **Refresh Tokens**: Long-lived (7 days) for token renewal
- **Token Storage**: Secure cookie storage (js-cookie)
- **Automatic Refresh**: Transparent token renewal

#### Password Security
- **Hashing**: bcrypt with 12 rounds
- **Validation**: Minimum 6 characters
- **Storage**: Never stored in plain text

### 2. **Auto-logout Security Feature**

#### Activity Tracking (`useActivityTracker.ts`)
```typescript
// Monitored Events
const events = [
  'mousedown', 'mousemove', 'keypress', 
  'scroll', 'touchstart', 'click', 'keydown'
]

// Timer Management
- Inactivity Timer: Configurable timeout (1-240 minutes)
- Warning Timer: Countdown before logout (10-300 seconds)
- Activity Reset: User interaction resets timers
```

#### Warning System (`AutoLogoutWarning.tsx`)
- **Countdown Display**: Real-time countdown timer
- **User Options**: "Stay Logged In" or "Logout"
- **Automatic Logout**: When countdown reaches zero
- **Activity Override**: User interaction cancels warning

### 3. **Task Management System**

#### CRUD Operations
- **Create**: Add new tasks with validation
- **Read**: View tasks with filtering options
- **Update**: Edit task details and completion status
- **Delete**: Remove tasks with confirmation

#### Advanced Features
- **Filtering**: All, Pending, Completed tasks
- **Ownership**: Users can only edit their own tasks
- **Optimistic Updates**: Immediate UI feedback
- **Error Handling**: Graceful error recovery

### 4. **User Preferences System**

#### Configurable Settings
```typescript
interface UserPreferences {
  staySignedIn: boolean
  activityConfig: {
    inactivityTimeout: number // 1-240 minutes
    warningTime: number       // 10-300 seconds
    enabled: boolean          // Auto-logout on/off
  }
}
```

#### Persistence
- **Frontend**: localStorage for immediate access
- **Backend**: MongoDB for permanent storage
- **Synchronization**: Settings sync across devices

### 5. **Responsive Design System**

#### Tailwind CSS Implementation
- **Mobile-first**: Design starts with mobile layout
- **Breakpoints**: Responsive across all screen sizes
- **Dark Mode Ready**: Color scheme prepared for dark mode
- **Accessibility**: WCAG compliant contrast ratios

#### Component Design
- **Consistent Spacing**: Using Tailwind's spacing scale
- **Interactive States**: Hover, focus, and active states
- **Loading States**: Visual feedback for async operations
- **Error States**: User-friendly error displays

---

## API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "newuser",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "password": "password123"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "newuser",
  "password": "password123"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <access_token>
```

### Todo Endpoints

#### Get User's Todos
```http
GET /api/todos?completed=false&limit=20&skip=0
Authorization: Bearer <access_token>
```

#### Create Todo
```http
POST /api/todos
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "title": "New task",
  "description": "Task description",
  "priority": "medium",
  "dueDate": "2024-12-31T23:59:59.000Z"
}
```

#### Update Todo
```http
PUT /api/todos/:id
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "title": "Updated task",
  "completed": true
}
```

### Error Codes

| Code | Description |
|------|-------------|
| `400` | Bad Request - Invalid input data |
| `401` | Unauthorized - Invalid or expired token |
| `403` | Forbidden - Access denied to resource |
| `404` | Not Found - Resource doesn't exist |
| `429` | Too Many Requests - Rate limit exceeded |
| `500` | Internal Server Error - Server error |

---

## Database Schema

### Users Collection
```javascript
{
  _id: ObjectId("..."),
  username: "johndoe",
  email: "john@example.com",
  firstName: "John",
  lastName: "Doe",
  password: "$2b$12$...", // bcrypt hash
  preferences: {
    staySignedIn: false,
    activityConfig: {
      inactivityTimeout: 10,
      warningTime: 60,
      enabled: true
    }
  },
  refreshTokens: [
    {
      token: "jwt_refresh_token...",
      createdAt: ISODate("2024-01-01T00:00:00.000Z")
    }
  ],
  lastActive: ISODate("2024-01-01T12:00:00.000Z"),
  isActive: true,
  createdAt: ISODate("2024-01-01T00:00:00.000Z"),
  updatedAt: ISODate("2024-01-01T12:00:00.000Z")
}
```

### Todos Collection
```javascript
{
  _id: ObjectId("..."),
  title: "Complete project documentation",
  description: "Write comprehensive developer guide",
  completed: false,
  priority: "high",
  dueDate: ISODate("2024-12-31T23:59:59.000Z"),
  completedAt: null,
  user: ObjectId("..."), // Reference to Users
  category: "work",
  tags: ["documentation", "development"],
  createdAt: ISODate("2024-01-01T00:00:00.000Z"),
  updatedAt: ISODate("2024-01-01T00:00:00.000Z")
}
```

### Indexes
```javascript
// Users Collection
{ username: 1 } // Unique
{ email: 1 }    // Unique
{ lastActive: 1 }

// Todos Collection
{ user: 1, completed: 1 }
{ user: 1, createdAt: -1 }
{ user: 1, dueDate: 1 }
{ user: 1, priority: 1 }
```

---

## Security Implementation

### 1. **Authentication Security**

#### Token Management
- **JWT Secrets**: Strong, environment-specific secrets
- **Token Expiration**: Short-lived access tokens
- **Refresh Strategy**: Secure refresh token rotation
- **Storage**: Secure cookie storage (js-cookie simulation)

#### Password Security
```javascript
// Password Hashing (bcrypt)
const rounds = 12; // Strong hashing rounds
const hashedPassword = await bcrypt.hash(password, rounds);

// Password Validation
const minLength = 6;
const complexityRules = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
```

### 2. **API Security**

#### Rate Limiting
```javascript
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP'
});
```

#### CORS Configuration
```javascript
const corsOptions = {
  origin: ['http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
```

#### Security Headers (Helmet)
- **X-Content-Type-Options**: nosniff
- **X-Frame-Options**: DENY
- **X-XSS-Protection**: 1; mode=block
- **Strict-Transport-Security**: HTTPS enforcement

### 3. **Input Validation**

#### Backend Validation (Mongoose)
```javascript
// User validation
username: {
  type: String,
  required: [true, 'Username is required'],
  unique: true,
  minlength: [3, 'Username must be at least 3 characters'],
  maxlength: [30, 'Username cannot exceed 30 characters'],
  match: [/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores']
}
```

#### Frontend Validation (TypeScript)
```typescript
// Form validation
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
```

### 4. **Resource Protection**

#### Ownership Verification
```javascript
const checkResourceOwnership = (Model) => {
  return async (req, res, next) => {
    const resource = await Model.findById(req.params.id);
    if (resource.user.toString() !== req.userId.toString()) {
      return res.status(403).json({ error: 'Access denied' });
    }
    req.resource = resource;
    next();
  };
};
```

---

## Development Workflow

### 1. **Code Organization**

#### File Naming Conventions
- **Components**: PascalCase (e.g., `TodoItem.tsx`)
- **Hooks**: camelCase with 'use' prefix (e.g., `useActivityTracker.ts`)
- **Utils**: camelCase (e.g., `formatDate.ts`)
- **Types**: PascalCase interfaces (e.g., `User`, `Todo`)

#### Import Organization
```typescript
// External imports
import React from 'react'
import axios from 'axios'

// Internal imports
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/Button'

// Type imports
import type { User, Todo } from '@/types'
```

### 2. **Component Development Pattern**

```typescript
// Component Template
'use client' // For client components

import React, { useState, useEffect } from 'react'
import { ComponentProps } from '@/types'

interface ComponentState {
  loading: boolean
  error: string | null
  data: any | null
}

export function Component({ prop1, prop2 }: ComponentProps) {
  const [state, setState] = useState<ComponentState>({
    loading: false,
    error: null,
    data: null
  })

  useEffect(() => {
    // Side effects
  }, [])

  const handleAction = async () => {
    setState(prev => ({ ...prev, loading: true, error: null }))
    try {
      // Async operation
      setState(prev => ({ ...prev, data: result }))
    } catch (error) {
      setState(prev => ({ ...prev, error: error.message }))
    } finally {
      setState(prev => ({ ...prev, loading: false }))
    }
  }

  return (
    <div>
      {/* Component JSX */}
    </div>
  )
}
```

### 3. **State Management Pattern**

#### Context Usage
```typescript
// Create context
const Context = createContext<ContextType | undefined>(undefined)

// Provider pattern
export function ContextProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  
  return (
    <Context.Provider value={{ ...state, ...actions }}>
      {children}
    </Context.Provider>
  )
}

// Hook usage
export function useContext() {
  const context = useContext(Context)
  if (!context) {
    throw new Error('useContext must be used within ContextProvider')
  }
  return context
}
```

### 4. **Error Handling Strategy**

#### Frontend Error Handling
```typescript
// API Error Handling
try {
  const response = await api.call()
  return response.data
} catch (error: any) {
  console.error('API Error:', error)
  
  if (error.response?.status === 401) {
    // Handle authentication error
    logout()
  } else if (error.response?.data?.error) {
    // Handle API error
    throw new Error(error.response.data.error)
  } else {
    // Handle network error
    throw new Error('Network error occurred')
  }
}
```

#### Backend Error Handling
```javascript
// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Error:', err)
  
  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => e.message)
    return res.status(400).json({ error: 'Validation Error', messages: errors })
  }
  
  // JWT error
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'Invalid token' })
  }
  
  // Default error
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production' 
      ? 'Internal Server Error' 
      : err.message
  })
})
```

---

## Testing Guide

### 1. **Manual Testing Scenarios**

#### Authentication Testing
```bash
# Test user registration
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "firstName": "Test",
    "lastName": "User",
    "password": "password123"
  }'

# Test user login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "password123"
  }'
```

#### Todo Testing
```bash
# Create todo (requires token from login)
curl -X POST http://localhost:5000/api/todos \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "Test todo",
    "description": "This is a test todo"
  }'
```

### 2. **Frontend Testing Checklist**

#### Authentication Flow
- [ ] Login with valid credentials
- [ ] Login with invalid credentials
- [ ] Signup with valid data
- [ ] Signup with existing username/email
- [ ] Session persistence after page refresh
- [ ] Logout functionality
- [ ] Token expiration handling

#### Todo Management
- [ ] Create new todo
- [ ] Edit existing todo
- [ ] Mark todo as complete/incomplete
- [ ] Delete todo
- [ ] Filter todos (All/Pending/Completed)
- [ ] Ownership verification (can't edit others' todos)

#### Auto-logout Feature
- [ ] Inactivity detection
- [ ] Warning dialog appearance
- [ ] Countdown timer accuracy
- [ ] "Stay Logged In" functionality
- [ ] Automatic logout on timeout
- [ ] Activity reset during warning

### 3. **Browser Testing**

#### Compatibility Testing
- **Chrome**: Latest version
- **Firefox**: Latest version
- **Safari**: Latest version
- **Edge**: Latest version

#### Responsive Testing
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

### 4. **Performance Testing**

#### Metrics to Monitor
- **First Contentful Paint (FCP)**: < 1.5s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Cumulative Layout Shift (CLS)**: < 0.1
- **Time to Interactive (TTI)**: < 3.5s

#### Tools for Testing
- Chrome DevTools Lighthouse
- WebPageTest
- GTmetrix

---

## Deployment Guide

### 1. **Frontend Deployment (Vercel)**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from frontend directory
cd frontend
vercel

# Configure environment variables in Vercel dashboard
NEXT_PUBLIC_API_BASE_URL=https://your-api-domain.com/api
```

### 2. **Backend Deployment (Railway/Render)**

#### Railway Deployment
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

#### Environment Variables
```bash
# Production environment variables
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/taskmaster
JWT_SECRET=your_production_jwt_secret_256_bits_minimum
JWT_REFRESH_SECRET=your_production_refresh_secret_256_bits
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://your-frontend-domain.com
```

### 3. **Database Deployment (MongoDB Atlas)**

```bash
# 1. Create MongoDB Atlas account
# 2. Create cluster
# 3. Create database user
# 4. Whitelist IP addresses
# 5. Get connection string
mongodb+srv://username:password@cluster.mongodb.net/taskmaster
```

### 4. **Domain Configuration**

#### DNS Settings
```
Type    Name    Value
A       @       [Server IP]
CNAME   www     your-domain.com
CNAME   api     your-api-domain.com
```

#### SSL Certificate
- Use Let's Encrypt for free SSL
- Configure HTTPS redirect
- Update CORS settings for production domains

---

## Troubleshooting

### 1. **Common Frontend Issues**

#### Build Errors
```bash
# Clear Next.js cache
rm -rf .next
npm run dev

# TypeScript errors
npm run type-check

# Dependency issues
rm -rf node_modules package-lock.json
npm install
```

#### Runtime Errors
```bash
# CORS errors
# Check API base URL in .env.local
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api

# Authentication errors
# Clear cookies and localStorage
document.cookie.split(";").forEach(c => {
  document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
});
localStorage.clear();
```

### 2. **Common Backend Issues**

#### Database Connection
```bash
# MongoDB connection errors
# Check MongoDB status
brew services list | grep mongodb

# Start MongoDB
brew services start mongodb-community

# Check connection string
echo $MONGODB_URI
```

#### Authentication Issues
```bash
# JWT errors
# Verify JWT secrets are set
echo $JWT_SECRET

# Token validation errors
# Check token format in Authorization header
Authorization: Bearer <token>
```

### 3. **Performance Issues**

#### Slow API Responses
```bash
# Enable MongoDB query logging
db.setLogLevel(2)

# Add database indexes
db.todos.createIndex({ user: 1, completed: 1 })
db.users.createIndex({ username: 1 })
```

#### Frontend Performance
```bash
# Analyze bundle size
npm run build
npm run analyze

# Optimize images
# Use Next.js Image component
import Image from 'next/image'
```

### 4. **Production Issues**

#### Environment Variables
```bash
# Verify production environment variables
# Check API URL configuration
# Verify database connection string
# Confirm JWT secrets are set
```

#### CORS Issues
```bash
# Update CORS configuration for production domains
const allowedOrigins = [
  'https://your-frontend-domain.com',
  'https://www.your-frontend-domain.com'
];
```

---

## Contributing Guidelines

### 1. **Code Standards**

#### TypeScript Guidelines
- Use strict TypeScript configuration
- Define interfaces for all data structures
- Avoid `any` type, use proper typing
- Use meaningful variable and function names

#### React Guidelines
- Use functional components with hooks
- Implement proper error boundaries
- Follow React best practices for performance
- Use TypeScript for prop validation

#### CSS Guidelines
- Use Tailwind CSS utility classes
- Follow mobile-first responsive design
- Maintain consistent spacing and colors
- Implement accessible design patterns

### 2. **Git Workflow**

#### Branch Naming
```bash
# Feature branches
feature/user-authentication
feature/todo-filters

# Bug fix branches
fix/login-validation
fix/mobile-layout

# Hotfix branches
hotfix/security-patch
```

#### Commit Messages
```bash
# Format: type(scope): description
feat(auth): add JWT refresh token functionality
fix(todos): resolve edit mode state management
docs(readme): update installation instructions
style(ui): improve button hover states
```

### 3. **Pull Request Process**

#### PR Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement

## Testing
- [ ] Manual testing completed
- [ ] All existing tests pass
- [ ] New tests added if applicable

## Screenshots (if applicable)
[Add screenshots for UI changes]

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
```

### 4. **Development Environment Setup**

#### IDE Configuration (VS Code)
```json
// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "editor.rulers": [80, 120]
}
```

#### Recommended Extensions
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- TypeScript Importer
- Prettier - Code formatter
- ESLint

---

## Conclusion

This developer guide provides comprehensive information for understanding, developing, and maintaining the TaskMaster application. Whether you're a new developer joining the project or an experienced developer looking to understand the architecture, this guide should serve as your primary reference.

### Key Takeaways

1. **Modern Architecture**: The project uses modern web development practices with TypeScript, React, and Express.js
2. **Security First**: Security is built into every layer, from authentication to data validation
3. **User Experience**: The application prioritizes user experience with responsive design and real-time feedback
4. **Scalability**: The architecture supports both development and production environments
5. **Maintainability**: Code is organized, documented, and follows established patterns

### Next Steps

For new developers:
1. Follow the getting started guide
2. Run through the testing scenarios
3. Explore the codebase using this guide as reference
4. Start with small bug fixes or feature enhancements
5. Follow the contributing guidelines for any changes

For project leads:
1. Use this guide for onboarding new team members
2. Keep the guide updated as the project evolves
3. Refer to this guide when making architectural decisions
4. Use the troubleshooting section for common issues

### Support

If you encounter issues not covered in this guide:
1. Check the existing documentation files
2. Review the troubleshooting section
3. Check the GitHub issues for known problems
4. Create a new issue with detailed information

**Happy coding! 🚀**

---

*Last updated: January 2024*
*Version: 1.0.0*
