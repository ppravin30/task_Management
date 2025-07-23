# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Task Management Application** built with Next.js 15, React 19, TypeScript, and Prisma ORM with PostgreSQL. The application allows users to create, view, edit, and delete tasks with categories and due dates.

## Architecture

### Tech Stack
- **Frontend**: Next.js 15 with App Router, React 19, TypeScript
- **Styling**: Tailwind CSS v4 with CSS modules for component-specific styles
- **Database**: PostgreSQL with Prisma ORM
- **Development**: Turbopack for fast development builds

### Project Structure
```
app/
├── api/              # API routes (Next.js App Router)
│   ├── route.ts      # Task CRUD operations (GET all, POST create)
│   └── tasks/[id]/   # Individual task operations (GET, PUT, DELETE)
├── create-task/      # Task creation page
├── view-task/        # Task viewing page
└── layout.tsx        # Root layout with Navbar

components/
├── Navbar.tsx        # Navigation component
└── TaskList.tsx      # Main task list with view/delete actions

prisma/
└── schema.prisma     # Database schema (Task model)
```

### Database Schema
The application uses a single `Task` model with:
- `id`: Auto-incrementing primary key
- `name`: Task name (String)
- `dueDate`: Due date (DateTime)
- `category`: Task category (String)

### API Endpoints
- `GET /api` - Fetch all tasks (ordered by id desc)
- `POST /api` - Create new task
- `GET /api/tasks/[id]` - Get single task
- `PUT /api/tasks/[id]` - Update task
- `DELETE /api/tasks/[id]` - Delete task

## Development Commands

### Daily Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Database Operations
```bash
npx prisma generate  # Generate Prisma client after schema changes
npx prisma db push   # Push schema changes to database
npx prisma studio    # Open Prisma Studio for database GUI
```

### Environment Setup
- Requires `DATABASE_URL` environment variable for PostgreSQL connection
- Prisma client uses standard output location (`node_modules/@prisma/client`)

## Production Ready Features

### API Features
- Complete CRUD operations for tasks
- Proper error handling and validation
- Input sanitization and date validation
- Singleton Prisma client pattern for optimal performance
- Next.js 15 compatible API route parameters

### UI/UX Features
- Responsive design with Tailwind CSS
- **Dark/Light mode toggle** with system preference detection
- **Theme persistence** via localStorage
- Loading states and error handling
- Form validation with user feedback
- Confirmation dialogs for destructive actions
- Accessible form labels and focus states
- Mobile-optimized navigation
- Smooth transitions and animations

### Performance & SEO
- Static generation where possible
- Optimized fonts with display: swap
- Proper metadata and viewport configuration
- ESLint configuration with strict rules

## Key Implementation Details

### Path Aliases
- `@/*` maps to project root for imports (e.g., `@/components/Navbar`)

### Theme System
- React Context-based theme management (`contexts/ThemeContext.tsx`)
- Client-side theme provider (`components/ClientThemeProvider.tsx`)
- Theme toggle component with sun/moon icons
- System preference detection on first load
- localStorage persistence for user preference
- SSR-safe implementation with fallbacks

### Styling
- Global styles in `app/globals.css`
- Tailwind CSS v4 with PostCSS configuration
- Dark mode support via `class` strategy
- Comprehensive dark mode color schemes for all components
- Smooth transitions between light and dark themes

### Client-Side Features
- Task list with real-time updates after delete operations
- Navigation between create and view pages using Next.js router
- Loading states and error handling for API calls
- Theme switching with immediate visual feedback

### TypeScript Configuration
- Strict mode enabled
- Custom path mapping for clean imports
- Next.js plugin integration for optimal development experience