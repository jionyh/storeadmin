import express from 'express';
import { auth } from '../controllers/auth.controller'
const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: API endpoints for managing costs
 */

/**
 * @swagger
 * /costs:
 *   get:
 *     summary: SignIn
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Auth'
 */

// Rotas de Autenticação //
router.post('/signin', auth.signin)
router.post('/signup', auth.signup)

export default router