# Setup Guide - Women's E-Commerce Platform

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** 18+ and npm
- **PostgreSQL** database
- **Git** (for version control)
- **Stripe account** (for payment processing)

## Step 1: Clone and Install

```bash
cd women-ecommerce-platform
```

## Step 2: Backend Setup

### 2.1 Install Dependencies

```bash
cd backend
npm install
```

### 2.2 Configure Environment Variables

Create a `.env` file in the backend directory:

```bash
cp .env.example .env
```

Edit the `.env` file with your configuration:

```env
# Database - Update with your PostgreSQL credentials
DATABASE_URL="postgresql://username:password@localhost:5432/women_ecommerce?schema=public"

# JWT - Generate a secure random string
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
JWT_EXPIRES_IN="7d"

# Stripe - Get from https://dashboard.stripe.com/apikeys
STRIPE_SECRET_KEY="sk_test_your_stripe_secret_key"
STRIPE_WEBHOOK_SECRET="whsec_your_webhook_secret"

# Server
PORT=5000
NODE_ENV="development"

# Frontend URL
FRONTEND_URL="http://localhost:5173"
```

### 2.3 Setup Database

```bash
# Generate Prisma Client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# Seed the database with sample data
npm run seed
```

### 2.4 Start Backend Server

```bash
npm run dev
```

The backend server will start on http://localhost:5000

## Step 3: Frontend Setup

### 3.1 Install Dependencies

Open a new terminal window:

```bash
cd frontend
npm install
```

### 3.2 Configure Environment Variables

Create a `.env` file in the frontend directory:

```bash
cp .env.example .env
```

Edit the `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
VITE_STRIPE_PUBLIC_KEY=pk_test_your_stripe_public_key
```

### 3.3 Start Frontend Development Server

```bash
npm run dev
```

The frontend will start on http://localhost:5173

## Step 4: Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000/api
- **Prisma Studio** (Database GUI): `npx prisma studio` (in backend directory)

## Test Credentials

After running the seed script, you can use these test accounts:

### Admin Account
- **Email**: admin@example.com
- **Password**: admin123456

### Customer Account
- **Email**: customer@example.com
- **Password**: customer123

## Project Structure

```
women-ecommerce-platform/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma          # Database schema
│   │   └── seed.ts                # Sample data
│   ├── src/
│   │   ├── controllers/           # Request handlers
│   │   ├── routes/                # API routes
│   │   ├── middleware/            # Auth, error handling
│   │   ├── utils/                 # Helper functions
│   │   └── server.ts              # Entry point
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/            # Reusable components
│   │   ├── pages/                 # Page components
│   │   ├── stores/                # Zustand state management
│   │   ├── services/              # API services
│   │   ├── types/                 # TypeScript types
│   │   └── App.tsx                # Main app component
│   └── package.json
└── README.md
```

## Available Scripts

### Backend
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run seed` - Seed database with sample data
- `npx prisma studio` - Open Prisma Studio GUI

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get single product
- `GET /api/products/slug/:slug` - Get product by slug
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:itemId` - Update cart item
- `DELETE /api/cart/:itemId` - Remove from cart

### Orders
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get single order
- `POST /api/orders` - Create new order

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:slug` - Get category by slug

### User Profile
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile
- `GET /api/users/addresses` - Get addresses
- `POST /api/users/addresses` - Add address
- `PUT /api/users/addresses/:id` - Update address
- `DELETE /api/users/addresses/:id` - Delete address

### Admin
- `GET /api/admin/dashboard` - Get dashboard stats
- `GET /api/admin/orders` - Get all orders
- `PUT /api/admin/orders/:id/status` - Update order status
- `GET /api/admin/users` - Get all users

## Features Implemented

### Customer Features
✅ User registration and authentication
✅ Browse products by category
✅ Search and filter products
✅ Product detail pages with images
✅ Shopping cart management
✅ Checkout process
✅ Order tracking
✅ User profile management
✅ Address management
✅ Product reviews and ratings
✅ Responsive mobile design

### Admin Features
✅ Admin dashboard with statistics
✅ Product management (CRUD)
✅ Order management
✅ User management
✅ Order status updates

### Technical Features
✅ JWT authentication
✅ API rate limiting
✅ Input validation
✅ Error handling
✅ Database indexing
✅ Pagination
✅ Image handling
✅ Secure payment processing (Stripe)
✅ RESTful API design

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Rate limiting on API endpoints
- Input validation and sanitization
- CORS configuration
- SQL injection prevention (Prisma ORM)
- XSS protection

## Performance Optimizations

- Database indexing on frequently queried fields
- React Query for data caching
- Lazy loading for images
- Code splitting
- Optimized Prisma queries
- Pagination for large datasets

## Production Deployment

### Backend Deployment

1. Set `NODE_ENV=production` in environment variables
2. Update `DATABASE_URL` with production database
3. Build the application: `npm run build`
4. Start the server: `npm start`

### Frontend Deployment

1. Update `VITE_API_URL` with production API URL
2. Build the application: `npm run build`
3. Deploy the `dist` folder to your hosting service (Vercel, Netlify, etc.)

## Troubleshooting

### Database Connection Issues
- Ensure PostgreSQL is running
- Verify DATABASE_URL is correct
- Check PostgreSQL user permissions

### Port Already in Use
- Change PORT in backend `.env` file
- Kill the process using the port: `lsof -ti:5000 | xargs kill`

### Dependencies Issues
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

## Next Steps

1. **Email Integration**: Add email notifications for order confirmations
2. **Search Optimization**: Implement Elasticsearch for advanced search
3. **Image Upload**: Add file upload functionality for products
4. **Analytics**: Integrate Google Analytics
5. **Wishlist**: Add wishlist functionality
6. **Product Variants**: Expand size/color variant system
7. **Discount Codes**: Implement coupon system
8. **Multi-language**: Add i18n support
9. **Payment Methods**: Add more payment gateways (PayPal, etc.)
10. **Social Login**: Add OAuth (Google, Facebook)

## Support

For issues or questions, please check the documentation or create an issue in the repository.

## License

MIT License - See LICENSE file for details