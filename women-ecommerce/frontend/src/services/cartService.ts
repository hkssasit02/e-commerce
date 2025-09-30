import { Cart, CartItem, ApiResponse } from '@/types';
import { apiService } from './api';

class CartService {
  async getCart(): Promise<Cart> {
    try {
      const response = await apiService.get<ApiResponse<Cart>>('/cart');
      
      if (!response.success) {
        throw new Error(response.error || 'Failed to get cart');
      }
      
      return response.data;
    } catch (error: any) {
      if (error.response?.data?.error) {
        throw new Error(error.response.data.error);
      }
      throw new Error('Failed to get cart');
    }
  }

  async addToCart(
    productId: string, 
    quantity: number, 
    variants?: { [key: string]: string }
  ): Promise<CartItem> {
    try {
      const response = await apiService.post<ApiResponse<CartItem>>('/cart/items', {
        productId,
        quantity,
        selectedVariants: variants || {},
      });
      
      if (!response.success) {
        throw new Error(response.error || 'Failed to add item to cart');
      }
      
      return response.data;
    } catch (error: any) {
      if (error.response?.data?.error) {
        throw new Error(error.response.data.error);
      }
      throw new Error('Failed to add item to cart');
    }
  }

  async updateCartItem(itemId: string, quantity: number): Promise<CartItem> {
    try {
      const response = await apiService.put<ApiResponse<CartItem>>(`/cart/items/${itemId}`, {
        quantity,
      });
      
      if (!response.success) {
        throw new Error(response.error || 'Failed to update cart item');
      }
      
      return response.data;
    } catch (error: any) {
      if (error.response?.data?.error) {
        throw new Error(error.response.data.error);
      }
      throw new Error('Failed to update cart item');
    }
  }

  async removeFromCart(itemId: string): Promise<void> {
    try {
      const response = await apiService.delete<ApiResponse<void>>(`/cart/items/${itemId}`);
      
      if (!response.success) {
        throw new Error(response.error || 'Failed to remove item from cart');
      }
    } catch (error: any) {
      if (error.response?.data?.error) {
        throw new Error(error.response.data.error);
      }
      throw new Error('Failed to remove item from cart');
    }
  }

  async clearCart(): Promise<void> {
    try {
      const response = await apiService.delete<ApiResponse<void>>('/cart');
      
      if (!response.success) {
        throw new Error(response.error || 'Failed to clear cart');
      }
    } catch (error: any) {
      if (error.response?.data?.error) {
        throw new Error(error.response.data.error);
      }
      throw new Error('Failed to clear cart');
    }
  }

  async applyCoupon(code: string): Promise<Cart> {
    try {
      const response = await apiService.post<ApiResponse<Cart>>('/cart/coupon', {
        code,
      });
      
      if (!response.success) {
        throw new Error(response.error || 'Failed to apply coupon');
      }
      
      return response.data;
    } catch (error: any) {
      if (error.response?.data?.error) {
        throw new Error(error.response.data.error);
      }
      throw new Error('Failed to apply coupon');
    }
  }

  async removeCoupon(): Promise<Cart> {
    try {
      const response = await apiService.delete<ApiResponse<Cart>>('/cart/coupon');
      
      if (!response.success) {
        throw new Error(response.error || 'Failed to remove coupon');
      }
      
      return response.data;
    } catch (error: any) {
      if (error.response?.data?.error) {
        throw new Error(error.response.data.error);
      }
      throw new Error('Failed to remove coupon');
    }
  }
}

export const cartService = new CartService();