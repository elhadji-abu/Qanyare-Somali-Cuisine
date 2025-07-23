# Qanyare Somali Cuisine - Restaurant Management System

## Overview

Qanyare Somali Cuisine is a full-stack restaurant management system built with modern web technologies. The application serves as a comprehensive platform for managing food orders, table reservations, and customer interactions for a Somali restaurant. It features both a customer-facing interface and an admin panel for restaurant management.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: React hooks with custom storage utilities
- **UI Components**: Shadcn/ui component library with Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens
- **Build Tool**: Vite with TypeScript support

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Database**: PostgreSQL with Drizzle ORM
- **Storage**: External PostgreSQL database with persistent data
- **Data Persistence**: Database-backed with seeded sample data
- **API**: RESTful API with JSON responses
- **Build Process**: ESBuild for production bundling

## Key Components

### Database Schema
The system uses Drizzle ORM with the following core entities:
- **Users**: Customer and admin authentication
- **Categories**: Food item categorization (with multilingual support)
- **Menu Items**: Restaurant menu with pricing and availability
- **Orders**: Customer orders with status tracking
- **Reservations**: Table and hall booking system
- **Reviews**: Customer feedback with approval workflow
- **Staff**: Employee management
- **Tables**: Table management for reservations

### Authentication System
- Simple username/password authentication
- Role-based access control (customer vs admin)
- Client-side session management using localStorage
- Server-side validation for protected routes

### Cart Management
- Local storage-based cart persistence
- Real-time cart updates with toast notifications
- Quantity management and item removal
- Order submission workflow

### UI/UX Design
- Responsive design with mobile-first approach
- Custom color scheme reflecting Somali cultural themes
- Multi-font typography (Playfair Display, Inter, Dancing Script)
- Accessible components with proper ARIA labels
- Toast notifications for user feedback

## Data Flow

### Customer Journey
1. Browse menu items by category
2. Add items to cart (stored in localStorage)
3. Create account or login
4. Place order with customer details
5. Make table/hall reservations
6. Submit reviews and feedback

### Admin Workflow
1. Admin login with elevated privileges
2. Manage menu categories and items
3. Process and update order statuses
4. Handle reservation management
5. Review and approve customer feedback
6. Manage staff information
7. View analytics and dashboard metrics

## Storage Architecture

### PostgreSQL Database System
- **External Database**: PostgreSQL database with persistent data storage
- **Drizzle ORM**: Type-safe database toolkit and query builder for data access
- **Seeded Sample Data**: Database automatically initialized with authentic Somali restaurant data
- **Persistent Storage**: Data persists across server restarts and deployments
- **CRUD Operations**: Full create, read, update, delete functionality for all entities

### Core Dependencies
- **@tanstack/react-query**: Server state management and caching
- **@radix-ui/***: Accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **wouter**: Lightweight React router
- **zod**: Runtime type validation and schema management

### Development Tools
- **vite**: Build tool and development server
- **typescript**: Type checking and development
- **tsx**: TypeScript execution for development

## Deployment Strategy

### Development Environment
- Vite development server with HMR
- TypeScript compilation with strict mode
- Environment-specific configuration
- Replit integration for cloud development

### Production Build
- Frontend: Vite build with optimized assets
- Backend: ESBuild bundling for Node.js
- Database: Drizzle migrations for schema updates
- Static assets served from Express

### Environment Configuration
- Database URL configuration via environment variables
- Build-time optimization for production
- Development-specific tooling and overlays

## Changelog

- July 23, 2025. Enhanced reviews page with spectacular multi-color vibrant gradient background featuring blues, purples, pinks, teals, and greens with animated floating effects
- July 23, 2025. Transformed admin dashboard with stunning blue-purple gradient background, animated stats cards, and glass-morphism effects throughout
- July 23, 2025. Transformed reviews page with stunning orange-pink gradient background and floating review cards with glass-morphism effects
- July 23, 2025. Completed stunning visual transformation of all admin pages with modern gradient designs and glass-morphism effects
- July 23, 2025. Enhanced admin Quick Actions with colorful gradient icons, smooth hover animations, and unique color schemes
- July 23, 2025. Transformed orders page with teal gradient background and modern card layouts
- July 23, 2025. Updated reservations page with stunning teal-to-green gradient and backdrop blur effects
- July 23, 2025. Redesigned menu management page with purple gradient theme and beautiful floating menu cards
- July 23, 2025. Confirmed "Add Menu Item" functionality is fully visible and working with golden gradient button design
- July 23, 2025. Applied consistent visual design language across all admin pages using inline styles for reliability
- July 23, 2025. Transformed admin dashboard with stunning gradient design, animations, and modern layout
- July 23, 2025. Fixed home page add to cart buttons using inline styles instead of problematic Shadcn components
- July 23, 2025. Fixed user dashboard Quick Actions navigation using wouter routing
- July 23, 2025. Enhanced order display format on user dashboard to show readable text instead of JSON
- July 22, 2025. Removed Dashboard button from navbar and implemented automatic redirect after login
- July 22, 2025. Created visually appealing user dashboard with gradient backgrounds and animations
- July 22, 2025. Fixed login and registration form submit button visibility using div elements
- July 22, 2025. Fixed menu card layout and add to cart button visibility issues
- July 22, 2025. Implemented unified cart context system for consistent state management
- July 22, 2025. Resolved CSS conflicts by using pure inline styles for menu buttons
- July 21, 2025. Migrated from in-memory storage to PostgreSQL database with Drizzle ORM
- July 21, 2025. Added persistent data storage with seeded sample Somali restaurant data
- July 21, 2025. Implemented DatabaseStorage class with full CRUD operations
- July 05, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.