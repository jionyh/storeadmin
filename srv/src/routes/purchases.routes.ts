import express from "express";
import { purchase } from "../controllers/purchase.controller";
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Purchases
 *   description: API endpoints for managing purchases
 */

/**
 * @swagger
 * /purchases:
 *   get:
 *     summary: Get all purchases
 *     tags: [Purchases]
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
 *         description: Purchases per page
 *       - in: query
 *         name: period
 *         schema:
 *           type: string
 *         description: Period for summarizing data (e.g., "month")
 *     responses:
 *       200:
 *         description: Successful response with purchases list
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 pagination:
 *                   $ref: '#/components/schemas/Pagination'
 *                 periodTotal:
 *                   type: number
 *                 allPurchases:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Purchase'
 *       404:
 *         description: No purchases found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /purchases/{id}:
 *   get:
 *     summary: Get a purchase by ID
 *     tags: [Purchases]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Purchase ID
 *     responses:
 *       200:
 *         description: Successful response with the purchase
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Purchase'
 *       400:
 *         description: Bad request or purchase not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /purchases:
 *   post:
 *     summary: Create new purchases
 *     tags: [Purchases]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/NewPurchase'
 *     responses:
 *       200:
 *         description: Purchases created successfully
 *       400:
 *         description: Bad request or create purchase error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /purchases/{id}:
 *   delete:
 *     summary: Delete a purchase by ID
 *     tags: [Purchases]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Purchase ID
 *     responses:
 *       200:
 *         description: Purchase deleted successfully
 *       400:
 *         description: Bad request or purchase not found
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
 *     Purchase:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         quantity:
 *           type: integer
 *         value:
 *           type: number
 *         product_id:
 *           type: integer
 *         supplier:
 *           type: string
 *         unit_id:
 *           type: integer
 *         tenant_id:
 *           type: integer
 *     NewPurchase:
 *       type: object
 *       properties:
 *         quantity:
 *           type: integer
 *         value:
 *           type: number
 *         product_id:
 *           type: integer
 *         supplier:
 *           type: string
 *         unit_id:
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


// Rotas de compras //
router.get("/", purchase.getAllPurchases);
router.get("/:id", purchase.getPurchase);
router.post("/", purchase.createPurchase);
router.delete("/:id", purchase.deletePurchase);

export default router;
