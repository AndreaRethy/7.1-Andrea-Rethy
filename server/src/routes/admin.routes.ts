import { Router } from 'express';
import { UserController } from '../infrastructure/controllers/userController.js';

import adminAuth from "../middleware/adminAuth.js";

const router = Router();
const userController = new UserController();

router.get("/users", adminAuth, userController.getAllUsers);
router.patch("/users/:id", adminAuth, userController.updateUserByAdmin);

export default router;