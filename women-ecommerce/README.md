# Women's E-commerce Platform

A comprehensive e-commerce platform designed specifically for women's products including fashion, beauty, accessories, and baby items. Built with modern technologies for scalability and performance.

## 🚀 Tech Stack

### Frontend
- **Vite** - Fast build tool and development server
- **React 18** - Modern React with hooks and context
- **TypeScript** - Type-safe JavaScript
- **Ant Design** - Professional UI component library
- **TailwindCSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **Lucide React** - Beautiful icons

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **TypeScript** - Type-safe backend development
- **Prisma ORM** - Modern database toolkit
- **PostgreSQL** - Robust relational database
- **JWT** - Secure authentication
- **bcryptjs** - Password hashing
- **Stripe** - Payment processing
- **Express Rate Limit** - API rate limiting
- **Helmet** - Security middleware

## 📁 Project Structure

```
women-ecommerce/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React context providers
│   │   ├── services/       # API service functions
│   │   ├── types/          # TypeScript type definitions
│   │   ├── hooks/          # Custom React hooks
│   │   └── utils/          # Utility functions
│   ├── public/             # Static assets
│   └── package.json
├── backend/                 # Node.js backend API
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── routes/         # API route definitions
│   │   ├── middleware/     # Custom middleware
│   │   ├── services/       # Business logic
│   │   ├── types/          # TypeScript types
│   │   └── utils/          # Utility functions
│   ├── prisma/             # Database schema and migrations
│   └── package.json
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL database
- Git

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your database credentials and other configuration.

4. **Set up the database:**
   ```bash
   # Generate Prisma client
   npm run prisma:generate
   
   # Run database migrations
   npm run prisma:migrate
   
   # Seed the database with sample data
   npm run prisma:seed
   ```

5. **Start the development server:**
   ```bash
   npm run dev
   ```

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   Configure API URL and Stripe publishable key.

4. **Start the development server:**
   ```bash
   npm run dev
   ```

## 🌟 Features

### Customer Features
- **User Authentication** - Secure registration and login
- **Product Catalog** - Browse products by categories
- **Advanced Search** - Search with filters and sorting
- **Shopping Cart** - Add, remove, and modify items
- **Wishlist** - Save products for later
- **Secure Checkout** - Stripe payment integration
- **Order Tracking** - Real-time order status updates
- **User Profile** - Manage personal information and addresses
- **Product Reviews** - Rate and review products
- **Responsive Design** - Optimized for all devices

### Admin Features
- **Dashboard** - Analytics and overview
- **Product Management** - CRUD operations for products
- **Order Management** - Process and track orders
- **User Management** - Manage customer accounts
- **Inventory Tracking** - Stock level monitoring
- **Sales Reports** - Revenue and sales analytics

## 🔒 Security Features

- **JWT Authentication** - Secure token-based auth
- **Password Hashing** - bcrypt with salt rounds
- **Rate Limiting** - Prevent API abuse
- **Input Validation** - Server-side validation
- **CORS Protection** - Cross-origin request security
- **Helmet Middleware** - Security headers
- **SQL Injection Prevention** - Prisma ORM protection

## 🚀 Performance Optimizations

- **Database Indexing** - Optimized queries
- **Image Optimization** - Compressed product images
- **Lazy Loading** - On-demand content loading
- **Caching Strategy** - Redis for session storage
- **CDN Integration** - Fast asset delivery
- **Code Splitting** - Reduced bundle sizes

## 📊 Database Schema

The application uses PostgreSQL with Prisma ORM. Key entities include:

- **Users** - Customer and admin accounts
- **Products** - Product catalog with variants
- **Categories** - Hierarchical product organization
- **Orders** - Purchase transactions
- **Cart** - Shopping cart management
- **Reviews** - Product ratings and comments
- **Addresses** - Shipping and billing addresses

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile

### Products
- `GET /api/products` - List products with filters
- `GET /api/products/:id` - Get product details
- `GET /api/products/featured` - Get featured products
- `GET /api/products/search` - Search products

### Categories
- `GET /api/categories` - List all categories
- `GET /api/categories/:id` - Get category details

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart/items` - Add item to cart
- `PUT /api/cart/items/:id` - Update cart item
- `DELETE /api/cart/items/:id` - Remove cart item

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get order details

## 🧪 Testing

```bash
# Run frontend tests
cd frontend && npm test

# Run backend tests
cd backend && npm test
```

## 🚀 Deployment

### Production Build

**Frontend:**
```bash
cd frontend && npm run build
```

**Backend:**
```bash
cd backend && npm run build
```

### Environment Variables

Make sure to set production environment variables:
- Database connection string
- JWT secret key
- Stripe API keys
- Email service credentials

## 📝 Default Credentials

After running the seed script, you can use these credentials:

- **Admin:** admin@womenstyle.com / admin123
- **Customer:** customer@example.com / customer123

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For support and questions, please contact the development team or create an issue in the repository.

---

**Happy Shopping! 🛍️**