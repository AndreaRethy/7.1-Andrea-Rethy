import { Router } from 'express';
import { UserController } from '../infrastructure/controllers/userController.js';

const router = Router();
const userController = new UserController();

/**
 * @openapi
 * /api/v1/login:
 *   post:
 *     tags:
 *       - Login
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