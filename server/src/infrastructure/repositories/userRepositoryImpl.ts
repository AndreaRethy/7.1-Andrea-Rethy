import { prisma } from '../../db.js';
import { User } from '@prisma/client';

export class UserRepositoryImpl {
    async getAllUsers(): Promise<User[]> {
        return await prisma.user.findMany();
    }
}