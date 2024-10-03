import { User } from '../entities/User.js';

export interface UserRepository {
    getAllUsers(): Promise<User[]>;
    getUserById(id: Number): Promise<User | null>;
    getUserLogin(username: String, password: String): Promise<User | null>;
    createUser(user: User): Promise<User>;
    updateUser(id: Number): Promise<void>;
    deleteUser(id: Number): Promise<void>;
}