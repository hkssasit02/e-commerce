import { User, ApiResponse } from '@/types';
import { apiService } from './api';

interface LoginResponse {
  user: User;
  token: string;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

class AuthService {
  async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const response = await apiService.post<ApiResponse<LoginResponse>>('/auth/login', {
        email,
        password,
      });
      
      if (!response.success) {
        throw new Error(response.error || 'Login failed');
      }
      
      return response.data;
    } catch (error: any) {
      if (error.response?.data?.error) {
        throw new Error(error.response.data.error);
      }
      throw new Error('Login failed. Please check your credentials.');
    }
  }

  async register(userData: RegisterData): Promise<LoginResponse> {
    try {
      const response = await apiService.post<ApiResponse<LoginResponse>>('/auth/register', userData);
      
      if (!response.success) {
        throw new Error(response.error || 'Registration failed');
      }
      
      return response.data;
    } catch (error: any) {
      if (error.response?.data?.error) {
        throw new Error(error.response.data.error);
      }
      throw new Error('Registration failed. Please try again.');
    }
  }

  async getCurrentUser(): Promise<User> {
    try {
      const response = await apiService.get<ApiResponse<User>>('/auth/me');
      
      if (!response.success) {
        throw new Error(response.error || 'Failed to get user information');
      }
      
      return response.data;
    } catch (error: any) {
      if (error.response?.data?.error) {
        throw new Error(error.response.data.error);
      }
      throw new Error('Failed to get user information');
    }
  }

  async updateProfile(userData: Partial<User>): Promise<User> {
    try {
      const response = await apiService.put<ApiResponse<User>>('/auth/profile', userData);
      
      if (!response.success) {
        throw new Error(response.error || 'Failed to update profile');
      }
      
      return response.data;
    } catch (error: any) {
      if (error.response?.data?.error) {
        throw new Error(error.response.data.error);
      }
      throw new Error('Failed to update profile');
    }
  }

  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    try {
      const response = await apiService.post<ApiResponse<void>>('/auth/change-password', {
        currentPassword,
        newPassword,
      });
      
      if (!response.success) {
        throw new Error(response.error || 'Failed to change password');
      }
    } catch (error: any) {
      if (error.response?.data?.error) {
        throw new Error(error.response.data.error);
      }
      throw new Error('Failed to change password');
    }
  }

  async requestPasswordReset(email: string): Promise<void> {
    try {
      const response = await apiService.post<ApiResponse<void>>('/auth/forgot-password', {
        email,
      });
      
      if (!response.success) {
        throw new Error(response.error || 'Failed to send reset email');
      }
    } catch (error: any) {
      if (error.response?.data?.error) {
        throw new Error(error.response.data.error);
      }
      throw new Error('Failed to send reset email');
    }
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    try {
      const response = await apiService.post<ApiResponse<void>>('/auth/reset-password', {
        token,
        newPassword,
      });
      
      if (!response.success) {
        throw new Error(response.error || 'Failed to reset password');
      }
    } catch (error: any) {
      if (error.response?.data?.error) {
        throw new Error(error.response.data.error);
      }
      throw new Error('Failed to reset password');
    }
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}

export const authService = new AuthService();