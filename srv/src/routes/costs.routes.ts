import express from 'express';
import { cost } from '../controllers/cost.controller'
const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Costs
 *   description: API endpoints for managing costs
 */

/**
 * @swagger
 * /costs:
 *   get:
 *     summary: Get all costs
 *     tags: [Costs]
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cost'
 */

// Rotas de despesas //
router.get('/', cost.getAllCosts)
router.get('/:id', cost.getCost)
router.post('/', cost.createCost)
router.delete('/:id', cost.deleteCost)

export default router