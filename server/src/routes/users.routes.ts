import { Router } from 'express';
// import { prisma } from '../db.js';
import { UserController } from '../infrastructure/controllers/userController.js';

const router = Router();
const userController = new UserController();

router.get("/users", userController.getAllUsers);
router.get("/users/:id", userController.getUserById);
router.post("/users/login", userController.getUserLogin);
router.post("/users", userController.createUser);
router.put("/users/:id", userController.updateUser);
router.patch("/users/:id", userController.updateUserByAdmin);

export default router;