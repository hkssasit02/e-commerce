import { Router } from 'express';
import { body } from 'express-validator';
import { createOrder, getUserOrders, getOrderById } from '../controllers/order.controller';
import { authenticate } from '../middleware/auth.middleware';
import { validate } from '../middleware/validation.middleware';

const router = Router();

// All order routes require authentication
router.use(authenticate);

router.get('/', getUserOrders);
router.get('/:id', getOrderById);

router.post(
  '/',
  [
    body('addressId').notEmpty(),
    body('paymentMethod').isIn(['stripe', 'cod']),
    validate
  ],
  createOrder
);

export default router;