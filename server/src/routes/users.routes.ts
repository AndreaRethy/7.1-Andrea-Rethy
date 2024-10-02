import { Router } from 'express';
import { prisma } from '../db.js';

const router = Router();

router.get('/users', async (_, res) => {
    const users = await prisma.user.findMany();
    res.json(users);
});

router.get('/users/:id', async (req, res) => {
    const foundUser = await prisma.user.findUnique({
        where: {
            id: parseInt(req.params.id),
        },
    });
    return res.json(foundUser);
});

router.post('/users', async (req, res) => {
    const newUser = await prisma.user.create({
        data: req.body,
    });
    res.json(newUser);
});

export default router;