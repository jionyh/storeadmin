import express from "express";
import { cost } from "../controllers/cost.controller";
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
 *     description: Retrieve a list of costs based on the provided query parameters.
 *     parameters:
 *       - name: date
 *         in: query
 *         description: The date for which costs should be retrieved.
 *         schema:
 *           type: string
 *       - name: page
 *         in: query
 *         description: The page number for pagination.
 *         schema:
 *           type: integer
 *       - name: perpage
 *         in: query
 *         description: The number of results per page for pagination.
 *         schema:
 *           type: integer
 *       - name: period
 *         in: query
 *         description: The period for which costs should be grouped (e.g., "month", "week").
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response containing a list of costs.
 *         content:
 *           application/json:
 *             example:
 *               pagination: { totalRecords: 50, totalPages: 5, currentPage: 1 }
 *               costs: [...]
 *       404:
 *         description: No costs found for the given parameters.
 *         content:
 *           application/json:
 *             example:
 *               error: "costsNotFound"
 */

/**
 * @swagger
 * /costs/{id}:
 *   get:
 *     summary: Get a cost by ID
 *     tags: [Costs]
 *     description: Retrieve a single cost by its ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the cost to retrieve.
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Successful response containing the requested cost.
 *         content:
 *           application/json:
 *             example:
 *               cost: {...}
 *       400:
 *         description: Invalid request due to missing or invalid ID.
 *         content:
 *           application/json:
 *             example:
 *               error: "idNotSent"
 *       404:
 *         description: No cost found for the given ID or tenant.
 *         content:
 *           application/json:
 *             example:
 *               error: "costNotFound"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               error: "costNotFound"
 */

/**
 * @swagger
 * /costs:
 *   post:
 *     summary: Create a new cost
 *     tags: [Costs]
 *     description: Create a new cost using the provided data.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CostInput'
 *     responses:
 *       200:
 *         description: Successfully created a new cost.
 *       400:
 *         description: Bad request due to validation errors.
 *         content:
 *           application/json:
 *             example:
 *               error: "createCostError"
 */

/**
 * @swagger
 * /costs/{id}:
 *   delete:
 *     summary: Delete a cost by ID
 *     tags: [Costs]
 *     description: Delete a single cost by its ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the cost to delete.
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Successfully deleted the cost.
 *       400:
 *         description: Invalid request due to missing or invalid ID.
 *         content:
 *           application/json:
 *             example:
 *               error: "idNotSent"
 *       404:
 *         description: No cost found for the given ID.
 *         content:
 *           application/json:
 *             example:
 *               error: "costNotFound"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CostInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the cost.
 *         value:
 *           type: number
 *           description: The value of the cost.
 *       required:
 *         - name
 *         - value
 */

// Rotas de despesas //
router.get("/", cost.getAllCosts);
router.get("/:id", cost.getCost);
router.post("/", cost.createCost);
router.delete("/:id", cost.deleteCost);
router.put("/:id", cost.deleteRecurrentCost);

export default router;
