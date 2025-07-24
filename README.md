# Task Management Application

A comprehensive Next.js 15 application with robust authentication and task management capabilities. This application allows users to create, view, edit, and delete tasks with intelligent filtering capabilities.

## Features

### Authentication System
- Email/password authentication
- Google OAuth integration
- Session management and persistence
- Username customization after registration
- Profile management
- Protected routes

### Task Management
- Create, view, edit, and delete tasks
- Task categorization (Work, Personal, Urgent)
- Due date tracking
- Task completion status
- Task ownership and permissions
- Intelligent filtering (by category, due date, search term)
- Toggle between viewing all tasks and personal tasks

### UI/UX
- Responsive design
- Dark/light theme support
- Loading states and error handling
- User-friendly forms with validation
- Intuitive navigation

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Authentication**: NextAuth.js, bcryptjs
- **Database**: PostgreSQL with Prisma ORM
- **Styling**: Tailwind CSS
- **State Management**: React Context API

## Getting Started

### Prerequisites

- Node.js 18.17.0 or later
- PostgreSQL database
- Google OAuth credentials (optional, for Google sign-in)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd task-management
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env.local`
   - Update the variables with your own values:
     ```
     # Database
     DATABASE_URL="postgresql://username:password@localhost:5432/taskmanagement?schema=public"

     # NextAuth.js
     NEXTAUTH_URL="http://localhost:3000"
     NEXTAUTH_SECRET="your-nextauth-secret-key-here"

     # Google OAuth (optional)
     GOOGLE_CLIENT_ID="your-google-client-id"
     GOOGLE_CLIENT_SECRET="your-google-client-secret"
     ```

4. Set up the database:
   ```bash
   npx prisma migrate dev --name init
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Application Structure

```
├── app/                  # Next.js app directory
│   ├── api/              # API routes
│   │   ├── auth/         # Authentication API routes
│   │   └── tasks/        # Task management API routes
│   ├── create-task/      # Create task page
│   ├── login/            # Login page
│   ├── profile/          # Profile pages
│   ├── register/         # Registration page
│   ├── view-task/        # View task page
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/           # React components
│   ├── auth/             # Authentication components
│   ├── Loading.tsx       # Loading spinner
│   ├── Navbar.tsx        # Navigation bar
│   ├── TaskFilters.tsx   # Task filtering component
│   ├── TaskList.tsx      # Task list component
│   └── ThemeToggle.tsx   # Theme toggle component
├── contexts/             # React contexts
│   └── ThemeContext.tsx  # Theme context
├── lib/                  # Utility functions
│   ├── auth.ts           # Authentication utilities
│   ├── db.ts             # Database client
│   └── prisma.ts         # Prisma client
├── middleware.ts         # Next.js middleware for route protection
├── prisma/               # Prisma ORM
│   └── schema.prisma     # Database schema
└── types/                # TypeScript type definitions
```

## Authentication Flow

1. **Registration**: Users can register with email/password or Google OAuth
2. **Login**: Users can log in with email/password or Google OAuth
3. **Profile Setup**: After registration, users can set a unique username
4. **Session Management**: Authentication state persists across the application
5. **Protected Routes**: Certain routes require authentication

## Task Management Flow

1. **Create Task**: Authenticated users can create tasks with name, description, due date, and category
2. **View Tasks**: Users can view all tasks or filter by various criteria
3. **Task Details**: Users can view detailed information about a task
4. **Edit Task**: Task owners can edit their tasks
5. **Delete Task**: Task owners can delete their tasks
6. **Task Filtering**: Users can filter tasks by category, due date, and search term
7. **Task Ownership**: Users can toggle between viewing all tasks and only their personal tasks

## API Routes

- **Authentication**:
  - `POST /api/auth/register`: Register a new user
  - `GET /api/auth/check-username`: Check username availability
  - `POST /api/auth/update-username`: Update user's username

- **Tasks**:
  - `GET /api/tasks`: Get all tasks (with optional filtering)
  - `POST /api/tasks`: Create a new task
  - `GET /api/tasks/[id]`: Get a specific task
  - `PUT /api/tasks/[id]`: Update a specific task
  - `DELETE /api/tasks/[id]`: Delete a specific task

## License

This project is licensed under the MIT License - see the LICENSE file for details.
