import { Router } from 'express';

const router = Router();

// Admin routes will be implemented here
router.get('/', (req, res) => {
  res.json({ message: 'Admin routes coming soon' });
});

export default router;