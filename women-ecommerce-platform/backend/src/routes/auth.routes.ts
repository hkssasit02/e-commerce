import { Router } from 'express';
import { body } from 'express-validator';
import { register, login, forgotPassword, resetPassword } from '../controllers/auth.controller';
import { authLimiter } from '../middleware/rateLimit.middleware';
import { validate } from '../middleware/validation.middleware';

const router = Router();

router.post(
  '/register',
  authLimiter,
  [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 8 }),
    body('firstName').trim().notEmpty(),
    body('lastName').trim().notEmpty(),
    validate
  ],
  register
);

router.post(
  '/login',
  authLimiter,
  [
    body('email').isEmail().normalizeEmail(),
    body('password').notEmpty(),
    validate
  ],
  login
);

router.post(
  '/forgot-password',
  authLimiter,
  [body('email').isEmail().normalizeEmail(), validate],
  forgotPassword
);

router.post(
  '/reset-password',
  authLimiter,
  [
    body('token').notEmpty(),
    body('newPassword').isLength({ min: 8 }),
    validate
  ],
  resetPassword
);

export default router;