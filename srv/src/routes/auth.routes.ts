import express from 'express';
import { auth } from '../controllers/auth.controller'
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Authentication endpoints
 */

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Sign up for a new user
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Endpoint not implemented
 * 
 * @swagger
 * /auth/signin:
 *   post:
 *     summary: Sign in a user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tenant_slug:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - tenant_slug
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Token generated successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: User not found or incorrect password
 *       404:
 *         description: Tenant not found
 */

// Rotas de Autenticação //
router.post('/signin', auth.signin)
router.post('/signup', auth.signup)

export default router