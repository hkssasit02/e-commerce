import { Request, Response, NextFunction } from 'express';
import { prisma } from '../utils/prisma';
import { AppError } from '../middleware/error.middleware';

export const getAllCategories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await prisma.category.findMany({
      include: {
        children: true,
        _count: {
          select: { products: true }
        }
      },
      orderBy: { name: 'asc' }
    });

    res.json({
      status: 'success',
      data: { categories }
    });
  } catch (error) {
    next(error);
  }
};

export const getCategoryBySlug = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { slug } = req.params;

    const category = await prisma.category.findUnique({
      where: { slug },
      include: {
        children: true,
        products: {
          where: { isActive: true },
          take: 20
        }
      }
    });

    if (!category) {
      throw new AppError('Category not found', 404);
    }

    res.json({
      status: 'success',
      data: { category }
    });
  } catch (error) {
    next(error);
  }
};