import { Router } from 'express';

const router = Router();

// Product routes will be implemented here
router.get('/', (req, res) => {
  res.json({ message: 'Products routes coming soon' });
});

export default router;