import { prisma } from '../../db.js';
import { User } from '@prisma/client';

export class UserRepositoryImpl {
    async getAllUsers(): Promise<User[]> {
        return await prisma.user.findMany();
    }

    async getUserById(id: number): Promise<User | null> {
        return await prisma.user.findUnique({
            where: { id },
        });
    }

    async getUserLogin(username: string): Promise<User | null> {
      return await prisma.user.findUnique({
          where: { username },
        });
  }

    async createUser(
        data: Omit<User, "id" | "createdAt" | "role" | "isBanned">
      ): Promise<User> {
        return await prisma.user.create({
          data: {
            ...data,
            createdAt: new Date(),
          },
        });
    }

    async updateUser(
        id: number,
        data: Partial<Omit<User, "id">>
      ): Promise<User | null> {
        try {
          return await prisma.user.update({
            where: { id },
            data,
          });
        } catch (error) {
          throw new Error(`User not found or error updating user: ${error}`);
        }
    }

    async updateUserByAdmin(
        id: number,
        data: Partial<Omit<User, "id">>
      ): Promise<User | null> {
        try {
          return await prisma.user.update({
            where: { id },
            data,
          });
        } catch (error) {
          throw new Error(`User not found or error updating user: ${error}`);
        }
    }
}