import { Router } from 'express';
import { UserController } from '../infrastructure/controllers/userController.js';

const router = Router();
const userController = new UserController();

/**
 * @openapi
 * /api/v1/login:
 *   post:
 *     summary: Authenticate a user and obtain a JWT token
 *     tags:
 *       - Authentication
 *     requestBody:
 *       description: User credentials for login
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Successful authentication.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       400:
 *         description: Bad Request. Missing username or password.
 *       401:
 *         description: Unauthorized. Invalid credentials.
 *       500:
 *         description: Internal Server Error.
 */
router.post("/login", userController.getUserLogin);

/**
 * @openapi
 * /api/v1/register:
 *   post:
 *     tags:
 *       - Register
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     type: object
 */
router.post("/register", userController.createUser);

export default router;