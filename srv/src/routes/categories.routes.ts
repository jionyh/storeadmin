import express from 'express';
import { category } from '../controllers/category.controller'

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: API endpoints for managing categories
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: List of categories
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: categories
 *               data: [ { id: 1, name: "Category 1" }, { id: 2, name: "Category 2" } ]
 *       404:
 *         description: No categories found
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: categoryNotFound
 */

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCategory'
 *     responses:
 *       200:
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Category created successfully
 *       400:
 *         description: Invalid request or category already exists
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: categoryAlreadyExist
 */

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Delete a category
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the category to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Category deleted successfully
 *       400:
 *         description: Category not found
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: categoryNotFound
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateCategory:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the cost.
 *       required:
 *         - name
 */

// Rotas de compras //
router.get('/', category.getAllCategories)
router.post('/', category.createCategory)
router.patch('/:id', category.editCategory)
//router.delete('/:id', category.deleteCategory)

export default router