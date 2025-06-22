# Bongo Selekt - Premium Thrift Shopping Platform

## Overview

Bongo Selekt is a full-stack e-commerce platform for premium thrift shopping in Nigeria. It's built as a modern web application with a React frontend and Express.js backend, using PostgreSQL for data storage. The platform enables users to browse, search, and purchase second-hand items with features like user authentication, shopping cart functionality, and AI-powered recommendations.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **UI Library**: Shadcn/ui components with Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens
- **State Management**: React Query (@tanstack/react-query) for server state, React Context for auth/cart
- **Build Tool**: Vite for development and bundling

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Authentication**: Passport.js with local strategy and session-based auth
- **Session Management**: PostgreSQL-backed sessions using connect-pg-simple
- **API Design**: RESTful endpoints with proper error handling

### Database Architecture
- **Database**: PostgreSQL (Neon serverless)
- **ORM**: Drizzle ORM with type-safe queries
- **Schema**: Separate shared schema file for type consistency between frontend/backend
- **Migrations**: Drizzle Kit for database migrations

## Key Components

### Database Schema
The application uses four main tables:
- **Users**: Authentication and profile information
- **Products**: Product listings with pricing, condition, and verification status
- **Cart Items**: Shopping cart functionality with user-product relationships
- **Categories**: Product categorization system

### Authentication System
- Password hashing using Node.js crypto (scrypt)
- Session-based authentication with secure cookies
- Protected routes using custom ProtectedRoute component
- User registration, login, and logout functionality

### Product Management
- Product filtering by category, condition, price range, and search terms
- Product verification system for trusted listings
- Image handling with external URLs
- Pricing with original price and discount calculations

### Shopping Cart
- User-specific cart items with quantity management
- Add, update, and remove cart functionality
- Cart total calculations including shipping fees
- Context-based state management for cart operations

## Data Flow

1. **User Authentication**: Users register/login through Passport.js authentication
2. **Product Browsing**: Products are fetched with optional filters and search parameters
3. **Cart Management**: Authenticated users can add items to cart, stored in PostgreSQL
4. **State Synchronization**: React Query manages server state caching and synchronization
5. **Real-time Updates**: Cart and user state updates propagate through React Context

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL connection
- **drizzle-orm**: Type-safe database operations
- **passport**: Authentication middleware
- **express-session**: Session management
- **@tanstack/react-query**: Server state management
- **wouter**: Lightweight React router

### UI Dependencies
- **@radix-ui/***: Accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **shadcn/ui**: Pre-built component system
- **lucide-react**: Icon library

### Development Dependencies
- **vite**: Build tool and dev server
- **typescript**: Type checking
- **tsx**: TypeScript execution for development

## Deployment Strategy

### Development Environment
- **Runtime**: Node.js 20
- **Database**: PostgreSQL 16 (Replit module)
- **Dev Server**: Vite dev server with HMR
- **Process Manager**: tsx for TypeScript execution

### Production Build
- **Frontend**: Vite build to `dist/public`
- **Backend**: esbuild bundle to `dist/index.js`
- **Deployment Target**: Autoscale deployment on Replit
- **Port Configuration**: Internal port 5000, external port 80

### Environment Configuration
- Database connection via `DATABASE_URL` environment variable
- Session secret via `SESSION_SECRET` environment variable
- Production optimizations for security and performance

## Changelog

```
Changelog:
- June 22, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```