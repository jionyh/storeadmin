import express from 'express';
import { sale } from '../controllers/sale.controller'
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Sales
 *   description: API endpoints for managing sales
 */

/**
 * @swagger
 * /sales:
 *   get:
 *     summary: Get all sales
 *     tags: [Sales]
 *     parameters:
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *         description: Date filter
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: perpage
 *         schema:
 *           type: integer
 *         description: Sales per page
 *       - in: query
 *         name: period
 *         schema:
 *           type: string
 *         description: Period for summarizing data (e.g., "month")
 *     responses:
 *       200:
 *         description: Successful response with sales list
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 pagination:
 *                   $ref: '#/components/schemas/Pagination'
 *                 periodTotal:
 *                   type: number
 *                 allSales:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Sale'
 *       404:
 *         description: No sales found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /sales/{id}:
 *   get:
 *     summary: Get a sale by ID
 *     tags: [Sales]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Sale ID
 *     responses:
 *       200:
 *         description: Successful response with the sale
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sale'
 *       400:
 *         description: Bad request or sale not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /sales:
 *   post:
 *     summary: Create new sales
 *     tags: [Sales]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/NewSale'
 *     responses:
 *       200:
 *         description: Sales created successfully
 *       400:
 *         description: Bad request or create sale error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /sales/{id}:
 *   delete:
 *     summary: Delete a sale by ID
 *     tags: [Sales]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Sale ID
 *     responses:
 *       200:
 *         description: Sale deleted successfully
 *       400:
 *         description: Bad request or sale not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Pagination:
 *       type: object
 *       properties:
 *         totalRecords:
 *           type: integer
 *         totalPages:
 *           type: integer
 *         currentPage:
 *           type: integer
 *         recordsPerPage:
 *           type: integer
 *     Sale:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         value:
 *           type: number
 *         payment_id:
 *           type: integer
 *         tenant_id:
 *           type: integer
 *     NewSale:
 *       type: object
 *       properties:
 *         value:
 *           type: number
 *         payment_id:
 *           type: integer
 *     Error:
 *       type: object
 *       properties:
 *         statusCode:
 *           type: integer
 *         message:
 *           type: string
 *         details:
 *           type: array
 *           items:
 *             type: string
 */


// Rotas de despesas //
router.get('/', sale.getAllSales)
router.get('/:id', sale.getSale)
router.post('/', sale.createSale)
router.delete('/:id', sale.deleteSale)

export default router