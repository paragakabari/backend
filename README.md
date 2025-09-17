# TaskMaster - Intelligent Task Management Application

A modern, secure MERN stack task management application with advanced auto-logout features for enhanced security.

## 🚀 Features

### Core Functionality
- **User Authentication**: Secure JWT-based authentication with signup and login
- **Task Management**: Create, read, update, and delete tasks with an intuitive interface
- **Real-time Updates**: Seamless task updates with optimistic UI updates
- **Responsive Design**: Modern, mobile-first design that works on all devices

### Security Features
- **Auto-logout**: Configurable inactivity detection with smart warning system
- **Session Management**: Advanced session timeout management with user preferences
- **Activity Tracking**: Monitors user interactions (mouse, keyboard, touch events)
- **Countdown Warning**: 60-second countdown before automatic logout with options to stay logged in

### Bonus Features
- **Configurable Timeout**: Users can customize inactivity timeout duration (1-240 minutes)
- **Stay Signed In**: Option to extend session duration to 7 days
- **Warning Time Configuration**: Customizable countdown duration (10-300 seconds)
- **User Preferences**: Persistent user settings stored in localStorage

## 🛠 Technology Stack

### Frontend
- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful icons
- **Axios**: HTTP client for API requests
- **js-cookie**: Cookie management

### Backend APIs
- **DummyJSON**: External API service for authentication and todos
  - Auth API: `https://dummyjson.com/docs/auth`
  - Todos API: `https://dummyjson.com/docs/todos`

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ and npm
- Modern web browser

### 1. Clone the Repository
```bash
git clone <repository-url>
cd TaskMaster
```

### 2. Install Dependencies
```bash
cd frontend
npm install
```

### 3. Environment Configuration
```bash
# Copy the example environment file
cp env.example .env.local

# Edit .env.local with your configuration (optional - defaults work fine)
```

### 4. Run the Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 🎯 Usage Guide

### Getting Started
1. **Access the Application**: Open `http://localhost:3000` in your browser
2. **Demo Login**: Use the "Use Demo Credentials" button or:
   - Username: `emilys`
   - Password: `emilyspass`
3. **Sign Up**: Create a new account (uses demo credentials for API compatibility)

### Task Management
- **Create Tasks**: Use the "Add New Task" form at the top
- **Edit Tasks**: Click the edit icon on any task you own
- **Complete Tasks**: Click the checkbox to mark tasks as complete
- **Delete Tasks**: Click the trash icon to delete tasks you own
- **Filter Tasks**: Use the filter buttons to view All, Pending, or Completed tasks

### Auto-logout Configuration
1. **Access Settings**: Click the "Settings" tab in the header
2. **Configure Timeout**: Set inactivity timeout (1-240 minutes)
3. **Set Warning Time**: Configure countdown duration (10-300 seconds)
4. **Enable/Disable**: Toggle auto-logout functionality
5. **Stay Signed In**: Enable to extend sessions to 7 days

### Security Features
- **Activity Detection**: The app monitors mouse movements, clicks, keyboard input, and scrolling
- **Inactivity Warning**: After the configured timeout, a warning dialog appears
- **Countdown Timer**: Shows remaining time before automatic logout
- **Stay Logged In**: Resets the timer and continues the session
- **Immediate Logout**: Logs out immediately without waiting

## 🏗 Project Structure

```
frontend/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── globals.css         # Global styles
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Main page
│   ├── components/             # React components
│   │   ├── auth/               # Authentication components
│   │   ├── layout/             # Layout components
│   │   ├── settings/           # Settings components
│   │   ├── todos/              # Task management components
│   │   ├── ui/                 # Reusable UI components
│   │   ├── AuthPage.tsx        # Authentication page
│   │   ├── AutoLogoutWarning.tsx # Logout warning dialog
│   │   └── Dashboard.tsx       # Main dashboard
│   ├── contexts/               # React contexts
│   │   └── AuthContext.tsx     # Authentication context
│   ├── hooks/                  # Custom React hooks
│   │   └── useActivityTracker.ts # Activity tracking hook
│   ├── lib/                    # Utility functions
│   │   └── utils.ts            # Helper utilities
│   ├── services/               # API services
│   │   └── api.ts              # API client
│   └── types/                  # TypeScript types
│       └── index.ts            # Type definitions
├── public/                     # Static assets
├── package.json                # Dependencies
└── README.md                   # This file
```

## 🔧 Configuration Options

### Environment Variables
```bash
# API Configuration
NEXT_PUBLIC_API_BASE_URL=https://dummyjson.com

# Default timeout settings
NEXT_PUBLIC_DEFAULT_INACTIVITY_TIMEOUT=10  # minutes
NEXT_PUBLIC_DEFAULT_WARNING_TIME=60        # seconds
```

### User Preferences (Configurable in Settings)
- **Inactivity Timeout**: 1-240 minutes (default: 10 minutes)
- **Warning Time**: 10-300 seconds (default: 60 seconds)
- **Auto-logout**: Enable/disable (default: enabled)
- **Stay Signed In**: Extend session to 7 days (default: disabled)

## 🎨 Design Features

### Modern UI/UX
- **Clean Interface**: Minimalist design with intuitive navigation
- **Responsive Layout**: Mobile-first design that adapts to all screen sizes
- **Consistent Styling**: Unified design system with Tailwind CSS
- **Interactive Elements**: Smooth transitions and hover effects
- **Loading States**: Visual feedback for all async operations

### Accessibility
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader Support**: Semantic HTML and ARIA labels
- **Color Contrast**: WCAG compliant color schemes
- **Focus Management**: Clear focus indicators

## 🔒 Security Implementation

### Authentication
- **JWT Tokens**: Secure token-based authentication
- **Token Refresh**: Automatic token refresh for extended sessions
- **Secure Storage**: Tokens stored in HTTP-only cookies (simulated with js-cookie)

### Activity Tracking
- **Event Monitoring**: Tracks multiple user interaction types
- **Throttled Updates**: Optimized performance with throttled event handling
- **Timer Management**: Precise timeout and warning timer management
- **State Persistence**: User preferences saved across sessions

## 🚨 Known Limitations

### DummyJSON API Constraints
- **Signup Simulation**: Real signup endpoint not available, uses demo credentials
- **Task Ownership**: Limited user-specific task filtering
- **Data Persistence**: Changes may not persist across API resets

### Development Considerations
- **Cookie Security**: In production, use HTTP-only cookies with secure flags
- **HTTPS**: Ensure HTTPS in production for secure token transmission
- **Rate Limiting**: Implement API rate limiting for production use

## 🧪 Testing the Application

### Manual Testing Scenarios

#### Authentication Flow
1. **Login**: Test with demo credentials
2. **Signup**: Test account creation flow
3. **Session Persistence**: Refresh page and verify login state
4. **Logout**: Test manual logout functionality

#### Task Management
1. **Create Tasks**: Add various task types
2. **Edit Tasks**: Modify task descriptions
3. **Complete Tasks**: Toggle completion status
4. **Delete Tasks**: Remove tasks
5. **Filter Tasks**: Test all filter options

#### Auto-logout Feature
1. **Inactivity Detection**: Stop interacting and wait for timeout
2. **Warning Dialog**: Verify countdown and buttons work
3. **Stay Logged In**: Test session extension
4. **Immediate Logout**: Test immediate logout button
5. **Activity Reset**: Interact during countdown to reset timer

#### Settings Configuration
1. **Timeout Adjustment**: Change inactivity timeout
2. **Warning Time**: Modify countdown duration
3. **Toggle Features**: Enable/disable auto-logout
4. **Stay Signed In**: Test extended session option

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Code Standards
- **TypeScript**: Use strict typing
- **ESLint**: Follow linting rules
- **Prettier**: Maintain consistent formatting
- **Component Structure**: Follow established patterns

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **DummyJSON**: For providing the backend API services
- **Next.js Team**: For the excellent React framework
- **Tailwind CSS**: For the utility-first CSS framework
- **Lucide**: For the beautiful icon set

## 📞 Support

For questions, issues, or contributions, please:
1. Check the existing issues
2. Create a new issue with detailed information
3. Follow the contribution guidelines

---

**TaskMaster** - Making task management intelligent and secure! 🚀
