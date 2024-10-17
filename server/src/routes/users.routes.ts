import { Router } from 'express';
import { UserController } from '../infrastructure/controllers/userController.js';

import authMiddlewareJWT from "../middleware/authMiddleware.js";

const router = Router();
const userController = new UserController();

router.get("/users/:id", authMiddlewareJWT, userController.getUserById);
router.put("/users/:id", authMiddlewareJWT, userController.updateUser);

export default router;