# Quick Start Guide

Get up and running with the Women's E-Commerce Platform in 5 minutes!

## Prerequisites Checklist

Before you begin, ensure you have:
- ✅ Node.js 18+ installed (`node --version`)
- ✅ npm installed (`npm --version`)
- ✅ PostgreSQL installed and running
- ✅ Git installed (optional, for version control)

## 🚀 5-Minute Setup

### Step 1: Install Dependencies (2 minutes)

```bash
# Navigate to project root
cd women-ecommerce-platform

# Install all dependencies (backend + frontend)
npm run install:all

# OR install separately:
# cd backend && npm install
# cd ../frontend && npm install
```

### Step 2: Configure Environment (1 minute)

**Backend Configuration:**
```bash
cd backend
cp .env.example .env
```

Edit `backend/.env` with your PostgreSQL credentials:
```env
DATABASE_URL="postgresql://YOUR_USER:YOUR_PASSWORD@localhost:5432/women_ecommerce?schema=public"
```

**Frontend Configuration:**
```bash
cd frontend
cp .env.example .env
```

The default `.env` file should work for development.

### Step 3: Setup Database (1 minute)

```bash
cd backend

# Generate Prisma Client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# Seed with sample data (optional but recommended)
npm run seed
```

### Step 4: Start Development Servers (1 minute)

**Option A: Start Both (Recommended)**
```bash
# From project root
npm run dev
```

**Option B: Start Separately**
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### Step 5: Access the Application

- 🌐 **Frontend**: http://localhost:5173
- 🔌 **Backend API**: http://localhost:5000/api
- 💾 **Database GUI**: `npx prisma studio` (in backend directory)

## 🎉 You're Ready!

### Test Login Credentials

**Admin Account:**
- Email: `admin@example.com`
- Password: `admin123456`

**Customer Account:**
- Email: `customer@example.com`
- Password: `customer123`

## 🧪 Quick Test

1. **Homepage**: Visit http://localhost:5173
2. **Browse Products**: Click on any category
3. **Login**: Use test credentials above
4. **Add to Cart**: Select a product and add to cart
5. **Checkout**: Complete a test order
6. **Admin Panel**: Login as admin and access `/admin`

## 📱 Test on Mobile

```bash
# Get your local IP
# Windows: ipconfig
# Mac/Linux: ifconfig

# Access from mobile device:
http://YOUR_LOCAL_IP:5173
```

## 🔧 Common Issues & Solutions

### Port Already in Use

**Backend (Port 5000):**
```bash
# Linux/Mac
lsof -ti:5000 | xargs kill

# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

**Frontend (Port 5173):**
```bash
# Change port in vite.config.ts
server: {
  port: 3000, // Use different port
}
```

### Database Connection Error

1. **Check PostgreSQL is running:**
```bash
# Linux
sudo systemctl status postgresql

# Mac
brew services list

# Windows
services.msc (look for PostgreSQL)
```

2. **Verify credentials in `.env`**
3. **Create database manually:**
```bash
psql -U postgres
CREATE DATABASE women_ecommerce;
\q
```

### Prisma Client Error

```bash
cd backend
npx prisma generate
```

### Module Not Found

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

## 🎯 Next Steps

1. **Explore Features**: Browse products, add to cart, checkout
2. **Admin Panel**: Login as admin to manage products
3. **API Testing**: Use Postman with API_DOCUMENTATION.md
4. **Customize**: Modify colors, branding, products
5. **Deploy**: Follow DEPLOYMENT.md for production

## 📚 Documentation

- [README.md](./README.md) - Project overview
- [SETUP.md](./SETUP.md) - Detailed setup guide
- [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) - API reference
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Production deployment
- [FEATURES.md](./FEATURES.md) - Complete feature list

## 🆘 Need Help?

1. **Documentation**: Check the docs above
2. **Issues**: Create a GitHub issue
3. **Logs**: Check terminal output for errors
4. **Prisma Studio**: `npx prisma studio` to inspect database

## ⚡ Pro Tips

### Development Workflow

```bash
# Open Prisma Studio in browser
cd backend && npx prisma studio

# Watch backend logs
cd backend && npm run dev

# Watch frontend in browser with auto-reload
cd frontend && npm run dev
```

### Useful Commands

```bash
# View all routes
cd backend && grep -r "router\." src/routes/

# Check database schema
cd backend && npx prisma db pull

# Reset database (WARNING: deletes all data)
cd backend && npx prisma migrate reset

# Build for production
npm run build
```

### VS Code Extensions (Recommended)

- Prisma
- ESLint
- Prettier
- TypeScript
- Tailwind CSS IntelliSense
- React Developer Tools (browser extension)

### Browser DevTools

- React Developer Tools (Chrome/Firefox)
- Redux DevTools (if using Redux)
- Network tab for API debugging
- Console for error messages

## 🎨 Customization

### Change Primary Color

**Frontend** - Edit `frontend/tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: {
        500: '#your-color', // Change this
      },
    },
  },
}
```

**Ant Design** - Edit `frontend/src/App.tsx`:
```typescript
<ConfigProvider
  theme={{
    token: {
      colorPrimary: '#your-color', // Change this
    },
  }}
>
```

### Add New Category

```bash
# Use Prisma Studio
cd backend && npx prisma studio

# Or add in seed file
# backend/prisma/seed.ts
```

### Modify Sample Data

Edit `backend/prisma/seed.ts` and run:
```bash
cd backend && npm run seed
```

## 🔐 Security Note

**⚠️ IMPORTANT**: The provided `.env` files contain default values for development only.

**Never use these in production:**
- Change `JWT_SECRET` to a strong random string
- Use real Stripe keys
- Use a secure database password
- Enable HTTPS
- Set `NODE_ENV=production`

## 📊 Monitor Your App

### View Logs

```bash
# Backend logs
cd backend
npm run dev # Watch console

# Frontend logs
cd frontend
npm run dev # Watch console & browser console
```

### Database Queries

```bash
# Enable query logging
# Edit backend/src/utils/prisma.ts
log: ['query', 'error', 'warn']
```

## 🚀 Performance Tips

1. **Enable React Query DevTools** (already configured)
2. **Use lazy loading** for images
3. **Monitor bundle size**: `npm run build` and check dist folder
4. **Profile with React DevTools**
5. **Use production builds** for testing performance

## 📱 Test Responsive Design

```bash
# In browser DevTools (F12)
# - Toggle device toolbar (Ctrl+Shift+M)
# - Test different screen sizes
# - Test touch interactions
```

## ✅ Verification Checklist

After setup, verify:
- [ ] Backend server running on http://localhost:5000
- [ ] Frontend app running on http://localhost:5173
- [ ] Database connection working
- [ ] Can register new user
- [ ] Can login
- [ ] Can browse products
- [ ] Can add to cart
- [ ] Can checkout (test mode)
- [ ] Admin panel accessible
- [ ] Responsive on mobile

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Ant Design Components](https://ant.design/components/overview)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Stripe Testing](https://stripe.com/docs/testing)

## 💡 Development Tips

1. **Hot Reload**: Both servers support hot reload - save and see changes
2. **Error Messages**: Read error messages carefully - they usually tell you what's wrong
3. **Browser Console**: Check for frontend errors
4. **Network Tab**: Monitor API calls
5. **Prisma Studio**: Best way to inspect and modify database data

---

**Happy Coding! 🚀**

If you encounter any issues, check the troubleshooting section or create an issue on GitHub.