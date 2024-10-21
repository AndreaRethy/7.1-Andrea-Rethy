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
 *     tags:
 *       - Users
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
 * @openapi
 * /api/v1/users/{id}:
 *   patch:
 *     summary: Update user role and/or ban status
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *                 example: 'USER'
 *               isBanned:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       200:
 *         description: User updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 */
router.patch("/users/:id", adminAuth, userController.updateUserByAdmin);

/**
 * @openapi
 * /api/v1/users/{id}:
 *   get:
 *     summary: Retrieve a specific user
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User details retrieved.
 *       401:
 *         description: Unauthorized
 */
router.get("/users/:id", authMiddlewareJWT, userController.getUserById);

/**
 * @openapi
 * /api/v1/users/{id}:
 *   put:
 *     summary: Update a specific user
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdate'
 *     responses:
 *       200:
 *         description: User updated successfully.
 *       401:
 *         description: Unauthorized
 */
router.put("/users/:id", authMiddlewareJWT, userController.updateUser);

export default router;