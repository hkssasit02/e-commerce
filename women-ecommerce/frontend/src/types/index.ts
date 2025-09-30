// User types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  addresses: Address[];
  role: 'customer' | 'admin';
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  id: string;
  userId: string;
  type: 'home' | 'work' | 'other';
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone?: string;
  isDefault: boolean;
}

// Product types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: Category;
  subcategory?: string;
  brand: string;
  images: ProductImage[];
  variants: ProductVariant[];
  specifications: ProductSpecification[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockQuantity: number;
  tags: string[];
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
  order: number;
}

export interface ProductVariant {
  id: string;
  name: string;
  value: string;
  type: 'color' | 'size' | 'style';
  price?: number;
  stockQuantity: number;
  image?: string;
}

export interface ProductSpecification {
  name: string;
  value: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: string;
  children?: Category[];
}

// Cart types
export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  selectedVariants: { [key: string]: string };
  price: number;
}

export interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  updatedAt: string;
}

// Order types
export interface Order {
  id: string;
  userId: string;
  user: User;
  items: OrderItem[];
  status: OrderStatus;
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: PaymentMethod;
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  tracking?: TrackingInfo;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  selectedVariants: { [key: string]: string };
  price: number;
  total: number;
}

export type OrderStatus = 
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

export interface TrackingInfo {
  carrier: string;
  trackingNumber: string;
  estimatedDelivery?: string;
  updates: TrackingUpdate[];
}

export interface TrackingUpdate {
  status: string;
  location: string;
  timestamp: string;
  description: string;
}

// Payment types
export interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal' | 'stripe' | 'upi';
  last4?: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
}

// Review types
export interface Review {
  id: string;
  userId: string;
  user: User;
  productId: string;
  rating: number;
  title: string;
  comment: string;
  helpful: number;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Filter types
export interface ProductFilters {
  category?: string;
  subcategory?: string;
  brand?: string[];
  priceMin?: number;
  priceMax?: number;
  rating?: number;
  inStock?: boolean;
  tags?: string[];
  sortBy?: 'price' | 'rating' | 'newest' | 'popular';
  sortOrder?: 'asc' | 'desc';
}

// Search types
export interface SearchResult {
  products: Product[];
  categories: Category[];
  suggestions: string[];
  total: number;
}