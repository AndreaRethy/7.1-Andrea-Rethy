import { Router } from 'express';
import { UserController } from '../infrastructure/controllers/userController.js';

const router = Router();
const userController = new UserController();

router.get("/users", userController.getAllUsers);
router.patch("/users/:id", userController.updateUserByAdmin);

export default router;