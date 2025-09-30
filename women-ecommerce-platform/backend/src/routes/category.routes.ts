import { Router } from 'express';
import { getAllCategories, getCategoryBySlug } from '../controllers/category.controller';

const router = Router();

router.get('/', getAllCategories);
router.get('/:slug', getCategoryBySlug);

export default router;