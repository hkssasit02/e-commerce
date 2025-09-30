import { Router } from 'express';

const router = Router();

// Cart routes will be implemented here
router.get('/', (req, res) => {
  res.json({ message: 'Cart routes coming soon' });
});

export default router;