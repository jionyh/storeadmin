import express from 'express';
import { sale } from '../controllers/sale.controller'
const router = express.Router();

// Rotas de despesas //
router.get('/', sale.getAllSales)
router.get('/:id', sale.getSale)
router.post('/', sale.createSale)
router.delete('/:id', sale.deleteSale)

export default router