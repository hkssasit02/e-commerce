import { Product, Category, ProductFilters, PaginatedResponse, SearchResult, ApiResponse } from '@/types';
import { apiService } from './api';

class ProductService {
  async getProducts(
    page: number = 1, 
    limit: number = 20, 
    filters?: ProductFilters
  ): Promise<PaginatedResponse<Product>> {
    try {
    const params = new URLSearchParams();
    params.set('page', page.toString());
    params.set('limit', limit.toString());
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            value.forEach(v => params.append(key, v.toString()));
          } else {
            params.set(key, value.toString());
          }
        }
      });
    }

      const response = await apiService.get<ApiResponse<PaginatedResponse<Product>>>(
        `/products?${params.toString()}`
      );
      
      if (!response.success) {
        throw new Error(response.error || 'Failed to get products');
      }
      
      return response.data;
    } catch (error: any) {
      if (error.response?.data?.error) {
        throw new Error(error.response.data.error);
      }
      throw new Error('Failed to get products');
    }
  }

  async getProduct(id: string): Promise<Product> {
    try {
      const response = await apiService.get<ApiResponse<Product>>(`/products/${id}`);
      
      if (!response.success) {
        throw new Error(response.error || 'Failed to get product');
      }
      
      return response.data;
    } catch (error: any) {
      if (error.response?.data?.error) {
        throw new Error(error.response.data.error);
      }
      throw new Error('Failed to get product');
    }
  }

  async getFeaturedProducts(): Promise<Product[]> {
    try {
      const response = await apiService.get<ApiResponse<Product[]>>('/products/featured');
      
      if (!response.success) {
        throw new Error(response.error || 'Failed to get featured products');
      }
      
      return response.data;
    } catch (error: any) {
      if (error.response?.data?.error) {
        throw new Error(error.response.data.error);
      }
      throw new Error('Failed to get featured products');
    }
  }

  async getProductsByCategory(categoryId: string, page: number = 1, limit: number = 20): Promise<PaginatedResponse<Product>> {
    try {
      const response = await apiService.get<ApiResponse<PaginatedResponse<Product>>>(
        `/products/category/${categoryId}?page=${page}&limit=${limit}`
      );
      
      if (!response.success) {
        throw new Error(response.error || 'Failed to get products by category');
      }
      
      return response.data;
    } catch (error: any) {
      if (error.response?.data?.error) {
        throw new Error(error.response.data.error);
      }
      throw new Error('Failed to get products by category');
    }
  }

  async searchProducts(query: string, page: number = 1, limit: number = 20): Promise<SearchResult> {
    try {
      const response = await apiService.get<ApiResponse<SearchResult>>(
        `/products/search?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}`
      );
      
      if (!response.success) {
        throw new Error(response.error || 'Failed to search products');
      }
      
      return response.data;
    } catch (error: any) {
      if (error.response?.data?.error) {
        throw new Error(error.response.data.error);
      }
      throw new Error('Failed to search products');
    }
  }

  async getCategories(): Promise<Category[]> {
    try {
      const response = await apiService.get<ApiResponse<Category[]>>('/categories');
      
      if (!response.success) {
        throw new Error(response.error || 'Failed to get categories');
      }
      
      return response.data;
    } catch (error: any) {
      if (error.response?.data?.error) {
        throw new Error(error.response.data.error);
      }
      throw new Error('Failed to get categories');
    }
  }

  async getCategory(id: string): Promise<Category> {
    try {
      const response = await apiService.get<ApiResponse<Category>>(`/categories/${id}`);
      
      if (!response.success) {
        throw new Error(response.error || 'Failed to get category');
      }
      
      return response.data;
    } catch (error: any) {
      if (error.response?.data?.error) {
        throw new Error(error.response.data.error);
      }
      throw new Error('Failed to get category');
    }
  }

  async getRelatedProducts(productId: string): Promise<Product[]> {
    try {
      const response = await apiService.get<ApiResponse<Product[]>>(`/products/${productId}/related`);
      
      if (!response.success) {
        throw new Error(response.error || 'Failed to get related products');
      }
      
      return response.data;
    } catch (error: any) {
      if (error.response?.data?.error) {
        throw new Error(error.response.data.error);
      }
      throw new Error('Failed to get related products');
    }
  }

  async getBrands(): Promise<string[]> {
    try {
      const response = await apiService.get<ApiResponse<string[]>>('/products/brands');
      
      if (!response.success) {
        throw new Error(response.error || 'Failed to get brands');
      }
      
      return response.data;
    } catch (error: any) {
      if (error.response?.data?.error) {
        throw new Error(error.response.data.error);
      }
      throw new Error('Failed to get brands');
    }
  }
}

export const productService = new ProductService();