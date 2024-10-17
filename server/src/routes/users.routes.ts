import { Router } from 'express';
import { UserController } from '../infrastructure/controllers/userController.js';

import authMiddlewareJWT from "../middleware/authMiddleware.js";

const router = Router();
const userController = new UserController();

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Retrieve a specific user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users.
 */
router.get("/users/:id", authMiddlewareJWT, userController.getUserById);

/**
 * @swagger
 * /api/v1/users:
 *   put:
 *     summary: Update a specific user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users.
 */
router.put("/users/:id", authMiddlewareJWT, userController.updateUser);

export default router;