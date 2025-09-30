import { Router } from 'express';
import {
  getDashboardStats,
  getAllOrders,
  updateOrderStatus,
  getAllUsers
} from '../controllers/admin.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';

const router = Router();

// All admin routes require admin authentication
router.use(authenticate, authorize('ADMIN'));

router.get('/dashboard', getDashboardStats);
router.get('/orders', getAllOrders);
router.put('/orders/:id/status', updateOrderStatus);
router.get('/users', getAllUsers);

export default router;