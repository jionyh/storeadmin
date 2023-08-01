import express from 'express';
import { category } from '../controllers/category.controller'
const router = express.Router();

// Rotas de compras //
router.get('/', category.getAllCategories)
router.get('/:id', category.getCategory)
router.post('/', category.createCategory)
router.patch('/',)
router.delete('/:id', category.deleteCategory)

export default router