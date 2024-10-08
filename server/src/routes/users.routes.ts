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

/*
router.get('/users/:id', async (req, res) => {
    const foundUser = await prisma.user.findUnique({
        where: {
            id: parseInt(req.params.id),
        },
       // include: {
        //    publications: true,
       //     liked: true
       // } 
    });
    if (!foundUser) {
        return res.status(404).json({ error: "User not found" })
    }
    return res.json(foundUser);
});

router.post('/users', async (req, res) => {
    const newUser = await prisma.user.create({
        data: req.body,
    });
    res.json(newUser);
});

router.put('/users/:id', async (req, res) => {
    const editedUser = await prisma.user.update({
        where: {
            id: parseInt(req.params.id),
        },
        data: req.body
    });
    if (!editedUser) {
        return res.status(404).json({ error: "User not found" })
    }
    return res.json(editedUser);
});

router.delete('/users/:id', async (req, res) => {
    const deletedUser = await prisma.user.delete({
        where: {
            id: parseInt(req.params.id),
        },
    });
    if (!deletedUser) {
        return res.status(404).json({ error: "User not found" })
    }
    return res.json(deletedUser);
});
 */

export default router;