import { Router } from 'express';
import { body } from 'express-validator';
import {
  getAllProducts,
  getProductById,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/product.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { validate } from '../middleware/validation.middleware';

const router = Router();

// Public routes
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.get('/slug/:slug', getProductBySlug);

// Admin routes
router.post(
  '/',
  authenticate,
  authorize('ADMIN'),
  [
    body('name').trim().notEmpty(),
    body('slug').trim().notEmpty(),
    body('description').trim().notEmpty(),
    body('price').isFloat({ min: 0 }),
    body('categoryId').notEmpty(),
    body('stock').isInt({ min: 0 }),
    body('sku').trim().notEmpty(),
    validate
  ],
  createProduct
);

router.put(
  '/:id',
  authenticate,
  authorize('ADMIN'),
  updateProduct
);

router.delete(
  '/:id',
  authenticate,
  authorize('ADMIN'),
  deleteProduct
);

export default router;