import { UserRepositoryImpl } from "../repositories/UserRepositoryImpl.js";
import { User } from '@prisma/client';

export class UserService {
    private userRepository: UserRepositoryImpl;
    constructor() {
        this.userRepository = new UserRepositoryImpl();
    }

    async getAllUsers(): Promise<User[]> {
        return await this.userRepository.getAllUsers();
    }
}