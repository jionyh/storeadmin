import express from 'express';
import { unit } from '../controllers/unit.controller'
const router = express.Router();

// Rotas de compras //
router.get('/', unit.getAllUnits)
router.post('/', unit.createUnit)
router.patch('/:id', unit.editUnit)
router.delete('/:id', unit.deleteUnit)

export default router