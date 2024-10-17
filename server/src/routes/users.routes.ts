import { Router } from 'express';
import { UserController } from '../infrastructure/controllers/userController.js';

import authMiddlewareJWT from "../middleware/authMiddleware.js";
import adminAuth from "../middleware/adminAuth.js";

const router = Router();
const userController = new UserController();

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Retrieve a list of users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users.
 *       401:
 *         description: Unauthorized
 */
router.get("/users", adminAuth, userController.getAllUsers);

/**
 * @swagger
 * /api/v1/users:
 *   patch:
 *     summary: Update user role and/or ban status
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users.
 *       401:
 *         description: Unauthorized
 */
router.patch("/users/:id", adminAuth, userController.updateUserByAdmin);

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
 *       401:
 *         description: Unauthorized
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
 *       401:
 *         description: Unauthorized
 */
router.put("/users/:id", authMiddlewareJWT, userController.updateUser);

export default router;