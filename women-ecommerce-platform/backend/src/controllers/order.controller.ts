import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { prisma } from '../utils/prisma';
import { AppError } from '../middleware/error.middleware';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia'
});

export const createOrder = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id;
    const { addressId, paymentMethod } = req.body;

    // Get user's cart
    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: { product: true }
        }
      }
    });

    if (!cart || cart.items.length === 0) {
      throw new AppError('Cart is empty', 400);
    }

    // Verify address belongs to user
    const address = await prisma.address.findFirst({
      where: { id: addressId, userId }
    });

    if (!address) {
      throw new AppError('Address not found', 404);
    }

    // Calculate totals
    let subtotal = 0;
    for (const item of cart.items) {
      if (item.product.stock < item.quantity) {
        throw new AppError(`Insufficient stock for ${item.product.name}`, 400);
      }
      subtotal += item.product.price * item.quantity;
    }

    const shippingCost = subtotal > 500 ? 0 : 50; // Free shipping over 500
    const tax = subtotal * 0.18; // 18% tax
    const total = subtotal + shippingCost + tax;

    // Generate order number
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Create Stripe payment intent
    let stripePaymentId;
    if (paymentMethod === 'stripe') {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(total * 100), // Convert to cents
        currency: 'inr',
        metadata: {
          orderNumber,
          userId
        }
      });
      stripePaymentId = paymentIntent.id;
    }

    // Create order
    const order = await prisma.order.create({
      data: {
        userId,
        addressId,
        orderNumber,
        paymentMethod,
        stripePaymentId,
        subtotal,
        shippingCost,
        tax,
        total,
        items: {
          create: cart.items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            size: item.size,
            color: item.color,
            price: item.product.price
          }))
        }
      },
      include: {
        items: {
          include: { product: true }
        },
        address: true
      }
    });

    // Update product stock
    for (const item of cart.items) {
      await prisma.product.update({
        where: { id: item.productId },
        data: { stock: { decrement: item.quantity } }
      });
    }

    // Clear cart
    await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });

    res.status(201).json({
      status: 'success',
      data: {
        order,
        ...(stripePaymentId && {
          clientSecret: (await stripe.paymentIntents.retrieve(stripePaymentId)).client_secret
        })
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getUserOrders = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id;
    const { page = '1', limit = '10' } = req.query;

    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
    const take = parseInt(limit as string);

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where: { userId },
        skip,
        take,
        orderBy: { createdAt: 'desc' },
        include: {
          items: {
            include: {
              product: {
                select: {
                  id: true,
                  name: true,
                  slug: true,
                  images: true
                }
              }
            }
          },
          address: true
        }
      }),
      prisma.order.count({ where: { userId } })
    ]);

    res.json({
      status: 'success',
      data: {
        orders,
        pagination: {
          page: parseInt(page as string),
          limit: parseInt(limit as string),
          total,
          totalPages: Math.ceil(total / parseInt(limit as string))
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getOrderById = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id;
    const { id } = req.params;

    const order = await prisma.order.findFirst({
      where: {
        id,
        userId
      },
      include: {
        items: {
          include: { product: true }
        },
        address: true
      }
    });

    if (!order) {
      throw new AppError('Order not found', 404);
    }

    res.json({
      status: 'success',
      data: { order }
    });
  } catch (error) {
    next(error);
  }
};