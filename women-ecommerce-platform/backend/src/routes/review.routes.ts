import { Router } from 'express';
import { body } from 'express-validator';
import { createReview, getProductReviews } from '../controllers/review.controller';
import { authenticate } from '../middleware/auth.middleware';
import { validate } from '../middleware/validation.middleware';

const router = Router();

router.get('/product/:productId', getProductReviews);

router.post(
  '/',
  authenticate,
  [
    body('productId').notEmpty(),
    body('rating').isInt({ min: 1, max: 5 }),
    validate
  ],
  createReview
);

export default router;