import express from 'express';
import { unit } from '../controllers/unit.controller'
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Units
 *   description: API endpoints for managing units
 */

/**
 * @swagger
 * /units:
 *   get:
 *     summary: Get all units
 *     tags: [Units]
 *     responses:
 *       200:
 *         description: Successful response with units list
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 units:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Unit'
 *       404:
 *         description: No units found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /units:
 *   post:
 *     summary: Create a new unit
 *     tags: [Units]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewUnit'
 *     responses:
 *       200:
 *         description: Unit created successfully
 *       400:
 *         description: Bad request, validation failed, or unit already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /units/{id}:
 *   put:
 *     summary: Edit a unit
 *     tags: [Units]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Unit ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewUnit'
 *     responses:
 *       200:
 *         description: Unit edited successfully
 *       400:
 *         description: Bad request, validation failed, or unit not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /units/{id}:
 *   delete:
 *     summary: Delete a unit
 *     tags: [Units]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Unit ID
 *     responses:
 *       200:
 *         description: Unit deleted successfully
 *       400:
 *         description: Bad request or unit not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Unit:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         abbreviation:
 *           type: string
 *         tenant_id:
 *           type: integer
 *     NewUnit:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         abbreviation:
 *           type: string
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
router.get('/', unit.getAllUnits)
router.post('/', unit.createUnit)
router.patch('/:id', unit.editUnit)
router.delete('/:id', unit.deleteUnit)

export default router