import { Router } from 'express';
import { UserController } from '../infrastructure/controllers/userController.js';

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
 */
router.patch("/users/:id", adminAuth, userController.updateUserByAdmin);

export default router;