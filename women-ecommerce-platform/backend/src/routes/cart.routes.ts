import { Router } from 'express';
import { body } from 'express-validator';
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart
} from '../controllers/cart.controller';
import { authenticate } from '../middleware/auth.middleware';
import { validate } from '../middleware/validation.middleware';

const router = Router();

// All cart routes require authentication
router.use(authenticate);

router.get('/', getCart);

router.post(
  '/',
  [
    body('productId').notEmpty(),
    body('quantity').isInt({ min: 1 }),
    validate
  ],
  addToCart
);

router.put(
  '/:itemId',
  [body('quantity').isInt({ min: 1 }), validate],
  updateCartItem
);

router.delete('/:itemId', removeFromCart);
router.delete('/', clearCart);

export default router;