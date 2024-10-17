import { UserRepositoryImpl } from '../repositories/userRepositoryImpl.js';
import { User } from '@prisma/client';

export class UserService {
    private userRepository: UserRepositoryImpl;
    constructor() {
        this.userRepository = new UserRepositoryImpl();
    }

    async getAllUsers(): Promise<User[]> {
      return await this.userRepository.getAllUsers();
    }

    async getUserById(id: number): Promise<User | null> {
        try {
          const user = await this.userRepository.getUserById(id);
          if (!user) {
            return null;
          }
          return user;
        } catch (error: any) {
          throw new Error(`Error retrieving user: ${error.message}`);
        }
      }

    async getUserLogin(username: string): Promise<User | null> {
      try {
          const user = await this.userRepository.getUserLogin(username);
          if (!user) {
            return null;
          }
          return user;
        } catch (error: any) {
          throw new Error(`Error retrieving user: ${error.message}`);
        }
  }

    async createUser(
        data: Omit<User, "id" | "createdAt" | "role" | "isBanned">
      ): Promise<User> {
        return await this.userRepository.createUser(data);
    }

    async updateUser(
        id: number,
        data: Partial<Omit<User, "id">>
      ): Promise<User | null> {
        const user = await this.userRepository.getUserById(id);
        if (!user) {
        throw new Error("User not found");
        }
        return await this.userRepository.updateUser(id, data);
    }

    async updateUserByAdmin(
        adminId: number,
        id: number,
        data: Partial<Omit<User, "id">>
      ): Promise<User | null> {
        try {
          const admin = await this.userRepository.getUserById(adminId);
          if (!admin || admin.role != 'ADMIN') {
          return null;
          }
          const user = await this.userRepository.getUserById(id);
          if (!user) {
          throw new Error("User not found");
          }
          return await this.userRepository.updateUser(id, data);
        } catch (error: any) {
          throw new Error(`Error updating user: ${error.message}`);
        }
    }
}

