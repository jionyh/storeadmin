import express from 'express';
import { products } from '../controllers/product.controller'
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API endpoints for managing products
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: cat
 *         schema:
 *           type: string
 *         description: Category filter
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: perpage
 *         schema:
 *           type: integer
 *         description: Products per page
 *     responses:
 *       200:
 *         description: Successful response with products list
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 pagination:
 *                   $ref: '#/components/schemas/Pagination'
 *                 products:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *       404:
 *         description: No products found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/NewProduct'
 *     responses:
 *       200:
 *         description: Product created successfully
 *       400:
 *         description: Bad request, validation failed or existing product error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Edit a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewProduct'
 *     responses:
 *       200:
 *         description: Product edited successfully
 *       400:
 *         description: Bad request, validation failed or product not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       400:
 *         description: Bad request or product not found
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
 *         options:
 *           type: object
 *           properties:
 *             cat:
 *               type: string
 *             pageNumber:
 *               type: integer
 *             resultsPerPage:
 *               type: integer
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         category_id:
 *           type: integer
 *         tenant_id:
 *           type: integer
 *     NewProduct:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         category_id:
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
router.get('/', products.getAllProducts)
//router.get('/:id', products.getPurchase)
router.post('/', products.createProduct)
router.delete('/:id', products.deleteProduct)

export default router