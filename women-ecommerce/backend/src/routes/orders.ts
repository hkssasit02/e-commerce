import { Router } from 'express';

const router = Router();

// Order routes will be implemented here
router.get('/', (req, res) => {
  res.json({ message: 'Orders routes coming soon' });
});

export default router;