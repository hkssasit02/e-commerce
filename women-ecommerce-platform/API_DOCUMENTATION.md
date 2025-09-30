# API Documentation

Base URL: `http://localhost:5000/api` (development) or `https://your-domain.com/api` (production)

## Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## Response Format

All responses follow this format:

```json
{
  "status": "success" | "error",
  "data": { ... },
  "message": "Optional message"
}
```

## Error Responses

```json
{
  "status": "error",
  "message": "Error description"
}
```

HTTP Status Codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

---

## Authentication Endpoints

### Register User

**POST** `/auth/register`

Creates a new user account and returns JWT token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "Jane",
  "lastName": "Doe",
  "phone": "+919876543210"
}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "firstName": "Jane",
      "lastName": "Doe",
      "role": "CUSTOMER"
    },
    "token": "jwt-token"
  }
}
```

### Login

**POST** `/auth/login`

Authenticates user and returns JWT token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "user": { ... },
    "token": "jwt-token"
  }
}
```

### Forgot Password

**POST** `/auth/forgot-password`

Generates password reset token.

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

### Reset Password

**POST** `/auth/reset-password`

Resets user password using reset token.

**Request Body:**
```json
{
  "token": "reset-token",
  "newPassword": "newpassword123"
}
```

---

## Product Endpoints

### Get All Products

**GET** `/products`

Retrieves paginated list of products with optional filters.

**Query Parameters:**
- `page` (number) - Page number (default: 1)
- `limit` (number) - Items per page (default: 20)
- `category` (string) - Filter by category slug
- `search` (string) - Search in name, description, tags
- `minPrice` (number) - Minimum price filter
- `maxPrice` (number) - Maximum price filter
- `sortBy` (string) - Sort field (createdAt, price, rating, name)
- `order` (string) - Sort order (asc, desc)
- `featured` (boolean) - Filter featured products

**Example:**
```
GET /products?category=fashion-clothing&minPrice=500&maxPrice=2000&sortBy=price&order=asc&page=1&limit=20
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "products": [
      {
        "id": "uuid",
        "name": "Product Name",
        "slug": "product-name",
        "description": "Product description",
        "price": 1299,
        "comparePrice": 1799,
        "stock": 30,
        "images": ["url1", "url2"],
        "sizes": ["S", "M", "L"],
        "colors": ["Red", "Blue"],
        "rating": 4.5,
        "reviewCount": 15,
        "isFeatured": true,
        "category": {
          "id": "uuid",
          "name": "Category Name",
          "slug": "category-slug"
        }
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 150,
      "totalPages": 8
    }
  }
}
```

### Get Product by ID

**GET** `/products/:id`

**Response:** Single product object

### Get Product by Slug

**GET** `/products/slug/:slug`

**Response:** Single product object with reviews

### Create Product

**POST** `/products` 🔒 Admin Only

**Request Body:**
```json
{
  "name": "New Product",
  "slug": "new-product",
  "description": "Product description",
  "price": 999,
  "comparePrice": 1299,
  "categoryId": "category-uuid",
  "stock": 50,
  "sku": "SKU-001",
  "images": ["url1", "url2"],
  "sizes": ["S", "M", "L"],
  "colors": ["Red", "Blue"],
  "tags": ["tag1", "tag2"],
  "isFeatured": false
}
```

### Update Product

**PUT** `/products/:id` 🔒 Admin Only

**Request Body:** Partial product object

### Delete Product

**DELETE** `/products/:id` 🔒 Admin Only

---

## Cart Endpoints

All cart endpoints require authentication 🔒

### Get Cart

**GET** `/cart`

Returns user's shopping cart with items.

**Response:**
```json
{
  "status": "success",
  "data": {
    "cart": {
      "id": "uuid",
      "userId": "uuid",
      "items": [
        {
          "id": "uuid",
          "productId": "uuid",
          "quantity": 2,
          "size": "M",
          "color": "Red",
          "product": {
            "id": "uuid",
            "name": "Product Name",
            "price": 999,
            "images": ["url"]
          }
        }
      ]
    }
  }
}
```

### Add to Cart

**POST** `/cart`

**Request Body:**
```json
{
  "productId": "uuid",
  "quantity": 1,
  "size": "M",
  "color": "Red"
}
```

### Update Cart Item

**PUT** `/cart/:itemId`

**Request Body:**
```json
{
  "quantity": 3
}
```

### Remove from Cart

**DELETE** `/cart/:itemId`

### Clear Cart

**DELETE** `/cart`

---

## Order Endpoints

All order endpoints require authentication 🔒

### Get User Orders

**GET** `/orders`

**Query Parameters:**
- `page` (number)
- `limit` (number)

**Response:**
```json
{
  "status": "success",
  "data": {
    "orders": [
      {
        "id": "uuid",
        "orderNumber": "ORD-123456",
        "status": "PENDING",
        "paymentStatus": "COMPLETED",
        "total": 2499,
        "createdAt": "2024-01-01T00:00:00Z",
        "items": [...]
      }
    ],
    "pagination": { ... }
  }
}
```

### Get Order by ID

**GET** `/orders/:id`

Returns detailed order information with items and address.

### Create Order

**POST** `/orders`

**Request Body:**
```json
{
  "addressId": "uuid",
  "paymentMethod": "stripe" | "cod"
}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "order": { ... },
    "clientSecret": "stripe-client-secret" // if Stripe payment
  }
}
```

---

## Category Endpoints

### Get All Categories

**GET** `/categories`

**Response:**
```json
{
  "status": "success",
  "data": {
    "categories": [
      {
        "id": "uuid",
        "name": "Beauty & Cosmetics",
        "slug": "beauty-cosmetics",
        "description": "...",
        "image": "url",
        "children": [],
        "_count": {
          "products": 45
        }
      }
    ]
  }
}
```

### Get Category by Slug

**GET** `/categories/:slug`

Returns category with products.

---

## Review Endpoints

### Get Product Reviews

**GET** `/reviews/product/:productId`

**Query Parameters:**
- `page` (number)
- `limit` (number)

### Create Review

**POST** `/reviews` 🔒

**Request Body:**
```json
{
  "productId": "uuid",
  "rating": 5,
  "comment": "Great product!",
  "images": ["url1", "url2"]
}
```

---

## User Profile Endpoints

All user endpoints require authentication 🔒

### Get Profile

**GET** `/users/profile`

### Update Profile

**PUT** `/users/profile`

**Request Body:**
```json
{
  "firstName": "Jane",
  "lastName": "Doe",
  "phone": "+919876543210"
}
```

### Get Addresses

**GET** `/users/addresses`

### Create Address

**POST** `/users/addresses`

**Request Body:**
```json
{
  "fullName": "Jane Doe",
  "addressLine1": "123 Main St",
  "addressLine2": "Apt 4B",
  "city": "Mumbai",
  "state": "Maharashtra",
  "postalCode": "400001",
  "country": "India",
  "phone": "+919876543210",
  "isDefault": false
}
```

### Update Address

**PUT** `/users/addresses/:id`

### Delete Address

**DELETE** `/users/addresses/:id`

---

## Admin Endpoints

All admin endpoints require admin authentication 🔒

### Get Dashboard Stats

**GET** `/admin/dashboard`

**Response:**
```json
{
  "status": "success",
  "data": {
    "stats": {
      "totalUsers": 1250,
      "totalOrders": 3500,
      "totalProducts": 250,
      "totalRevenue": 2500000
    },
    "recentOrders": [...]
  }
}
```

### Get All Orders

**GET** `/admin/orders`

**Query Parameters:**
- `page` (number)
- `limit` (number)
- `status` (string) - Filter by order status

### Update Order Status

**PUT** `/admin/orders/:id/status`

**Request Body:**
```json
{
  "status": "SHIPPED",
  "trackingNumber": "TRACK123",
  "estimatedDelivery": "2024-01-15"
}
```

### Get All Users

**GET** `/admin/users`

**Query Parameters:**
- `page` (number)
- `limit` (number)

---

## Rate Limiting

- **General API**: 100 requests per 15 minutes per IP
- **Auth endpoints**: 5 requests per 15 minutes per IP

Exceeding limits returns:
```json
{
  "status": "error",
  "message": "Too many requests, please try again later."
}
```

---

## Testing with cURL

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","firstName":"Test","lastName":"User"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Get Products
```bash
curl http://localhost:5000/api/products?limit=10
```

### Add to Cart (requires token)
```bash
curl -X POST http://localhost:5000/api/cart \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"productId":"product-uuid","quantity":1}'
```

---

## Postman Collection

You can import this API into Postman using the endpoints above. Create environment variables for:
- `base_url`: http://localhost:5000/api
- `token`: Your JWT token

---

## WebSocket Events (Future Enhancement)

Future versions may include real-time features:
- Order status updates
- Live inventory updates
- Chat support
- Notifications

---

For more information, see the full documentation in the repository.