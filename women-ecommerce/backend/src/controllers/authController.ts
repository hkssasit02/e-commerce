import { Request, Response, NextFunction } from 'express';
import { prisma } from '../index';
import { hashPassword, comparePassword } from '../utils/password';
import { generateToken } from '../utils/jwt';
import { successResponse } from '../utils/response';
import { createError } from '../middleware/errorHandler';
import { AuthRequest } from '../middleware/auth';

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, firstName, lastName, phone } = req.body;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw createError('User with this email already exists', 400);
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        phone,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        avatar: true,
        role: true,
        createdAt: true,
      },
    });

    // Create empty cart for user
    await prisma.cart.create({
      data: {
        userId: user.id,
      },
    });

    // Generate token
    const token = generateToken({ userId: user.id });

    successResponse(res, { user, token }, 'User registered successfully', 201);
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw createError('Invalid email or password', 401);
    }

    // Check password
    const isValidPassword = await comparePassword(password, user.password);

    if (!isValidPassword) {
      throw createError('Invalid email or password', 401);
    }

    // Generate token
    const token = generateToken({ userId: user.id });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    successResponse(res, { user: userWithoutPassword, token }, 'Login successful');
  } catch (error) {
    next(error);
  }
};

export const getCurrentUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        avatar: true,
        role: true,
        createdAt: true,
        addresses: true,
      },
    });

    if (!user) {
      throw createError('User not found', 404);
    }

    successResponse(res, user, 'User retrieved successfully');
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { firstName, lastName, phone } = req.body;

    const user = await prisma.user.update({
      where: { id: req.user!.id },
      data: {
        firstName,
        lastName,
        phone,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        avatar: true,
        role: true,
        createdAt: true,
      },
    });

    successResponse(res, user, 'Profile updated successfully');
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Get user with password
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
    });

    if (!user) {
      throw createError('User not found', 404);
    }

    // Check current password
    const isValidPassword = await comparePassword(currentPassword, user.password);

    if (!isValidPassword) {
      throw createError('Current password is incorrect', 400);
    }

    // Hash new password
    const hashedNewPassword = await hashPassword(newPassword);

    // Update password
    await prisma.user.update({
      where: { id: req.user!.id },
      data: {
        password: hashedNewPassword,
      },
    });

    successResponse(res, null, 'Password changed successfully');
  } catch (error) {
    next(error);
  }
};