import { Router } from 'express';

const router = Router();

// User routes will be implemented here
router.get('/', (req, res) => {
  res.json({ message: 'Users routes coming soon' });
});

export default router;