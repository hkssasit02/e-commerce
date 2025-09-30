import { Router } from 'express';

const router = Router();

// Category routes will be implemented here
router.get('/', (req, res) => {
  res.json({ message: 'Categories routes coming soon' });
});

export default router;