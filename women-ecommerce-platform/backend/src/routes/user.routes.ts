import { Router } from 'express';
import { body } from 'express-validator';
import {
  getProfile,
  updateProfile,
  getAddresses,
  createAddress,
  updateAddress,
  deleteAddress
} from '../controllers/user.controller';
import { authenticate } from '../middleware/auth.middleware';
import { validate } from '../middleware/validation.middleware';

const router = Router();

// All user routes require authentication
router.use(authenticate);

router.get('/profile', getProfile);
router.put('/profile', updateProfile);

router.get('/addresses', getAddresses);
router.post(
  '/addresses',
  [
    body('fullName').trim().notEmpty(),
    body('addressLine1').trim().notEmpty(),
    body('city').trim().notEmpty(),
    body('state').trim().notEmpty(),
    body('postalCode').trim().notEmpty(),
    body('phone').trim().notEmpty(),
    validate
  ],
  createAddress
);
router.put('/addresses/:id', updateAddress);
router.delete('/addresses/:id', deleteAddress);

export default router;