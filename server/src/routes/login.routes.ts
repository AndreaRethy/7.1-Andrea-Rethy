import { Router } from 'express';
import { UserController } from '../infrastructure/controllers/userController.js';

const router = Router();
const userController = new UserController();

router.post("/login", userController.getUserLogin);
router.post("/register", userController.createUser);

export default router;