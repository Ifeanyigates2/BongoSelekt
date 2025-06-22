# Bongo Selekt Deployment Guide

## Platform: Railway (Recommended)

### Prerequisites
1. GitHub account
2. Railway account (https://railway.app)
3. Custom domain ready

### Deployment Steps

#### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit - Bongo Selekt e-commerce platform"
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

#### 2. Deploy to Railway
1. Go to https://railway.app
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your Bongo Selekt repository
5. Railway will auto-detect it's a Node.js app

#### 3. Add PostgreSQL Database
1. In your Railway project dashboard
2. Click "New Service" → "Database" → "PostgreSQL"
3. Railway will automatically set DATABASE_URL environment variable

#### 4. Configure Environment Variables
In Railway dashboard → Variables tab, add:
```
NODE_ENV=production
SESSION_SECRET=your-super-secret-session-key-here
PORT=5000
```

#### 5. Custom Domain Setup
1. In Railway dashboard → Settings tab
2. Click "Domains"
3. Click "Custom Domain"
4. Enter your domain (e.g., bongoselekt.com)
5. Add the CNAME record to your domain's DNS:
   - Name: @ (or www)
   - Value: [railway-provided-url]

#### 6. Database Migration
After deployment, run database setup:
```bash
railway run npm run db:push
```

#### 7. Create Admin User
```bash
railway run npx tsx scripts/create-admin.ts
```

### Alternative Platforms

#### Vercel + PlanetScale
- Frontend: Vercel (with custom domain)
- Database: PlanetScale MySQL
- Backend: Vercel Serverless Functions

#### Render
- Full-stack deployment
- Built-in PostgreSQL
- Custom domain support
- Auto-SSL certificates

#### DigitalOcean App Platform
- Docker-based deployment
- Managed PostgreSQL
- Custom domain + SSL
- Auto-scaling

### Production Checklist
- [ ] Environment variables configured
- [ ] Database migrated
- [ ] Admin user created
- [ ] Custom domain configured
- [ ] SSL certificate active
- [ ] Performance monitoring setup
- [ ] Backup strategy implemented

### Custom Domain DNS Configuration
```
Type: CNAME
Name: @
Value: your-app.railway.app

Type: CNAME  
Name: www
Value: your-app.railway.app
```

### Post-Deployment
1. Test admin login at yoursite.com/admin/login
2. Verify product management functionality
3. Test user registration and shopping cart
4. Monitor application performance
5. Set up error tracking (optional: Sentry)

Your Bongo Selekt marketplace will be live at your custom domain!