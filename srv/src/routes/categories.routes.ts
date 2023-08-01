import express from 'express';
import { category } from '../controllers/category.controller'
const router = express.Router();

// Rotas de compras //
router.get('/', category.getAllCategories)
router.post('/', category.createCategory)
router.patch('/:id', category.editCategory)
router.delete('/:id', category.deleteCategory)

export default router