# Bongo Selekt 2025 - E-commerce Platform

## Project Overview
Bongo Selekt is a comprehensive e-commerce platform for curated thrift shopping in Nigeria. The platform offers high-quality pre-loved items (furniture, clothing, electronics, home goods) at 20-50% discount compared to traditional retail prices, targeting the $2.5 billion Nigerian thrift market.

## Architecture
- **Frontend**: React with TypeScript, Vite, TailwindCSS, shadcn/ui components
- **Backend**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Passport.js with local strategy and session-based auth
- **State Management**: TanStack Query for server state, React Context for client state

## Current Features
- User authentication (register/login/logout) 
- Product browsing with filtering and search
- Shopping cart functionality
- Admin panel with role-based access control
- Product management (CRUD operations for admins)
- Responsive design for mobile and desktop
- AI-driven product recommendations
- Featured categories and trending products

## Database Schema
- **Users**: Authentication with role-based access (user/admin)
- **Products**: Complete product catalog with categories, pricing, conditions
- **Categories**: Product categorization system
- **Cart Items**: Shopping cart persistence
- **Sessions**: User session management

## Admin Panel
- Admin login at `/admin/login` (username: admin, password: admin123)
- Product management dashboard at `/admin`
- Add new products with full details and validation
- View, edit, and delete existing products
- Statistics dashboard with product metrics

## Recent Changes
- ✓ Added database integration with PostgreSQL
- ✓ Fixed duplicate header components across pages
- ✓ Implemented admin authentication and authorization
- ✓ Created comprehensive admin dashboard for product management
- ✓ Added role-based user system with admin privileges
- ✓ Set up admin routes with proper middleware protection
- ✓ Fixed React context provider hierarchy to prevent authentication errors
- ✓ Enhanced admin UI with conditional header/footer display

## User Preferences
- Focus on clean, production-ready code
- Prioritize user experience and visual appeal
- Implement proper error handling and validation
- Use Nigerian Naira (₦) currency formatting
- Maintain responsive design principles
- NO .replit.app domain - requires custom domain deployment

## Deployment Ready
- Railway deployment configuration added
- Production environment variables configured
- Custom domain setup instructions provided
- Database migration scripts prepared
- Docker containerization ready
- SSL and security configurations implemented

## Next Steps
- Deploy to Railway with custom domain
- Implement order tracking system
- Add escrow payment integration
- Enhance AI-driven recommendations
- Mobile app development considerations
- Payment gateway integration (Stripe setup available)