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
      const user = await this.userRepository.getUserById(id);
      if (!user) {
        return null;
      }
      return user;
    }

    async postUserLogin(username: string): Promise<User | null> {
      const user = await this.userRepository.postUserLogin(username);
      if (!user) {
        return null;
      }
      return user;
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
          return null;
        }
        return await this.userRepository.updateUser(id, data);
      }

    async updateUserByAdmin(
        id: number,
        data: Partial<Omit<User, "id">>
      ): Promise<User | null> {
          const user = await this.userRepository.getUserById(id);
          if (!user) {
            return null;
          }
          return await this.userRepository.updateUser(id, data);
        }
}

