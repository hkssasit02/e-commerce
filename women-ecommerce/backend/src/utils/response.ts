import { Response } from 'express';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export const successResponse = <T>(
  res: Response,
  data: T,
  message?: string,
  statusCode: number = 200
): Response => {
  return res.status(statusCode).json({
    success: true,
    data,
    message,
  });
};

export const errorResponse = (
  res: Response,
  error: string,
  statusCode: number = 500
): Response => {
  return res.status(statusCode).json({
    success: false,
    error,
  });
};

export const paginatedResponse = <T>(
  res: Response,
  data: T[],
  page: number,
  limit: number,
  total: number,
  message?: string
): Response => {
  const totalPages = Math.ceil(total / limit);
  
  return res.status(200).json({
    success: true,
    data,
    message,
    pagination: {
      page,
      limit,
      total,
      totalPages,
    },
  });
};