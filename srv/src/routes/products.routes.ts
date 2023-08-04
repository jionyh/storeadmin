import express from 'express';
import { products } from '../controllers/product.controller'
const router = express.Router();

// Rotas de compras //
router.get('/', products.getAllProducts)
//router.get('/:id', products.getPurchase)
router.post('/', products.createProduct)
//router.delete('/:id', products.deletePurchase)

export default router