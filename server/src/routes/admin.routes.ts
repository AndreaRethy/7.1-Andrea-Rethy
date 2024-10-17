import { Router } from 'express';
import { UserController } from '../infrastructure/controllers/userController.js';

const router = Router();
const userController = new UserController();

router.get("/users", userController.getAllUsers);
//router.get("/users/:id", userController.getUserById);
//router.put("/users/:id", userController.updateUser);
//router.patch("/users/:adminId/:id", userController.updateUserByAdmin);

export default router;