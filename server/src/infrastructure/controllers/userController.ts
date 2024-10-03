import { Request, Response } from "express";
import { UserService } from "../services/userService.js";

const userService = new UserService();

export class UserController {
    async getAllUsers(_req: Request, res: Response) {
        try {
            const users = await userService.getAllUsers();
            if (users.length === 0) {
                return res.status(404).json({ message: "No users found" });
            }
            return res.status(200).json(users);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }
}