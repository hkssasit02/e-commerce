# Project Directory Structure

```
women-ecommerce-platform/
│
├── backend/                          # Backend Node.js/Express server
│   ├── prisma/
│   │   ├── schema.prisma            # Database schema definition
│   │   └── seed.ts                  # Database seeding script
│   │
│   ├── src/
│   │   ├── controllers/             # Request handlers
│   │   │   ├── admin.controller.ts
│   │   │   ├── auth.controller.ts
│   │   │   ├── cart.controller.ts
│   │   │   ├── category.controller.ts
│   │   │   ├── order.controller.ts
│   │   │   ├── product.controller.ts
│   │   │   ├── review.controller.ts
│   │   │   └── user.controller.ts
│   │   │
│   │   ├── middleware/              # Express middleware
│   │   │   ├── auth.middleware.ts
│   │   │   ├── error.middleware.ts
│   │   │   ├── rateLimit.middleware.ts
│   │   │   └── validation.middleware.ts
│   │   │
│   │   ├── routes/                  # API route definitions
│   │   │   ├── admin.routes.ts
│   │   │   ├── auth.routes.ts
│   │   │   ├── cart.routes.ts
│   │   │   ├── category.routes.ts
│   │   │   ├── order.routes.ts
│   │   │   ├── product.routes.ts
│   │   │   ├── review.routes.ts
│   │   │   └── user.routes.ts
│   │   │
│   │   ├── utils/                   # Utility functions
│   │   │   ├── jwt.ts
│   │   │   └── prisma.ts
│   │   │
│   │   └── server.ts                # Main server entry point
│   │
│   ├── .env                         # Environment variables (dev)
│   ├── .env.example                 # Environment template
│   ├── .gitignore                   # Git ignore rules
│   ├── package.json                 # Backend dependencies
│   └── tsconfig.json                # TypeScript configuration
│
├── frontend/                        # Frontend React application
│   ├── src/
│   │   ├── components/              # Reusable React components
│   │   │   ├── Footer.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── Layout.tsx
│   │   │   ├── ProductCard.tsx
│   │   │   └── ProtectedRoute.tsx
│   │   │
│   │   ├── pages/                   # Page components
│   │   │   ├── admin/
│   │   │   │   ├── AdminDashboard.tsx
│   │   │   │   ├── AdminOrders.tsx
│   │   │   │   └── AdminProducts.tsx
│   │   │   ├── CartPage.tsx
│   │   │   ├── CheckoutPage.tsx
│   │   │   ├── HomePage.tsx
│   │   │   ├── LoginPage.tsx
│   │   │   ├── OrderDetailPage.tsx
│   │   │   ├── OrdersPage.tsx
│   │   │   ├── ProductDetailPage.tsx
│   │   │   ├── ProductsPage.tsx
│   │   │   ├── ProfilePage.tsx
│   │   │   └── RegisterPage.tsx
│   │   │
│   │   ├── services/                # API service layer
│   │   │   └── api.ts
│   │   │
│   │   ├── stores/                  # State management (Zustand)
│   │   │   ├── authStore.ts
│   │   │   └── cartStore.ts
│   │   │
│   │   ├── types/                   # TypeScript type definitions
│   │   │   └── index.ts
│   │   │
│   │   ├── App.tsx                  # Main App component
│   │   ├── index.css                # Global styles
│   │   └── main.tsx                 # React entry point
│   │
│   ├── index.html                   # HTML template
│   ├── .env                         # Environment variables (dev)
│   ├── .env.example                 # Environment template
│   ├── .gitignore                   # Git ignore rules
│   ├── package.json                 # Frontend dependencies
│   ├── postcss.config.js            # PostCSS configuration
│   ├── tailwind.config.js           # TailwindCSS configuration
│   ├── tsconfig.json                # TypeScript configuration
│   ├── tsconfig.node.json           # TypeScript Node configuration
│   └── vite.config.ts               # Vite configuration
│
├── .gitignore                       # Root Git ignore
├── API_DOCUMENTATION.md             # Complete API reference
├── CONTRIBUTING.md                  # Contribution guidelines
├── DEPLOYMENT.md                    # Production deployment guide
├── DIRECTORY_STRUCTURE.md           # This file
├── FEATURES.md                      # Detailed feature documentation
├── LICENSE                          # MIT License
├── package.json                     # Root package.json (workspace)
├── PROJECT_SUMMARY.md               # Project overview
├── QUICK_START.md                   # Quick setup guide
├── README.md                        # Main project documentation
└── SETUP.md                         # Detailed setup instructions
```

## Key Directories Explained

### Backend (`/backend`)

**Controllers** (`src/controllers/`)
- Handle HTTP requests and responses
- Business logic implementation
- Data validation and processing

**Routes** (`src/routes/`)
- Define API endpoints
- Map URLs to controller functions
- Apply middleware (auth, validation)

**Middleware** (`src/middleware/`)
- Authentication and authorization
- Error handling
- Rate limiting
- Input validation

**Prisma** (`prisma/`)
- Database schema definition
- Migration files
- Seed data scripts

### Frontend (`/frontend`)

**Components** (`src/components/`)
- Reusable UI components
- Layout components (Header, Footer)
- Common elements (ProductCard, etc.)

**Pages** (`src/pages/`)
- Route-specific page components
- Full page layouts
- Admin pages subfolder

**Stores** (`src/stores/`)
- Global state management
- Auth state
- Cart state

**Services** (`src/services/`)
- API client configuration
- HTTP request functions
- Error handling

**Types** (`src/types/`)
- TypeScript interfaces
- Type definitions
- API response types

## File Naming Conventions

### Backend
- Controllers: `*.controller.ts`
- Routes: `*.routes.ts`
- Middleware: `*.middleware.ts`
- Utils: `*.ts`

### Frontend
- Components: `PascalCase.tsx` (e.g., `ProductCard.tsx`)
- Pages: `PascalCase.tsx` (e.g., `HomePage.tsx`)
- Stores: `camelCase.ts` (e.g., `authStore.ts`)
- Types: `camelCase.ts` or `index.ts`

## Configuration Files

### Backend
- `tsconfig.json` - TypeScript compiler options
- `.env` - Environment variables
- `package.json` - Dependencies and scripts
- `prisma/schema.prisma` - Database schema

### Frontend
- `vite.config.ts` - Vite build configuration
- `tailwind.config.js` - TailwindCSS customization
- `tsconfig.json` - TypeScript compiler options
- `postcss.config.js` - PostCSS plugins
- `.env` - Environment variables
- `package.json` - Dependencies and scripts

## Documentation Files

- `README.md` - Project overview and introduction
- `SETUP.md` - Detailed setup instructions
- `QUICK_START.md` - Quick setup guide
- `API_DOCUMENTATION.md` - Complete API reference
- `DEPLOYMENT.md` - Production deployment guide
- `FEATURES.md` - Feature documentation
- `PROJECT_SUMMARY.md` - Project summary
- `CONTRIBUTING.md` - Contribution guidelines
- `LICENSE` - MIT License
- `DIRECTORY_STRUCTURE.md` - This file

## Important Files

### Must Configure Before Running
- `backend/.env` - Database URL, JWT secret, Stripe keys
- `frontend/.env` - API URL, Stripe public key

### Must Not Commit
- `.env` files (use `.env.example` instead)
- `node_modules/` directories
- `dist/` or `build/` directories
- Database files

### Entry Points
- **Backend**: `backend/src/server.ts`
- **Frontend**: `frontend/src/main.tsx`

## Build Output

After building for production:

```
backend/
└── dist/              # Compiled JavaScript

frontend/
└── dist/              # Production build
    ├── assets/        # JS, CSS bundles
    └── index.html     # Entry HTML
```

## Database Files (Not Committed)

```
backend/prisma/
├── migrations/        # Migration history (git tracked)
└── dev.db            # SQLite file (if using SQLite)
```

## Environment-Specific Files

### Development
- `backend/.env` - Development database
- `frontend/.env` - Local API URL

### Production
- Set environment variables on hosting platform
- Use production database URLs
- Enable production mode

## NPM Scripts

### Root (`package.json`)
- `npm run install:all` - Install all dependencies
- `npm run dev` - Start both servers
- `npm run build` - Build both projects
- `npm run seed` - Seed database

### Backend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run seed` - Seed database
- `npx prisma studio` - Open database GUI
- `npx prisma migrate dev` - Run migrations

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

---

**Note**: This structure is designed for scalability and maintainability. Each directory has a specific purpose and follows industry best practices.