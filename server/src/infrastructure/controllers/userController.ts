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

    async getUserById(req: Request, res: Response) {
        const { id } = req.params;
        const ID = parseInt(id, 10);
    
        if (isNaN(ID)) {
          return res.status(400).json({ message: "Invalid user id" });
        }
    
        try {
          const user = await userService.getUserById(ID);
          if (!user) {
            return res.status(404).json({ message: "User not found" });
          }
          return res.status(200).json(user);
        } catch (error: any) {
          return res.status(500).json({ error: error.message });
        }
      }

      async getUserLogin(req: Request, res: Response) {
        const { username, password } = req.body;
    
        if (!username || !password) {
            return res.status(400).json({ message: "Missing required field(s)" });
          }

        try {
          const user = await userService.getUserLogin(username, password);
          if (!user) {
            return res.status(404).json({ message: "User not found" });
          }
          return res.status(200).json(user);
        } catch (error: any) {
          return res.status(500).json({ error: error.message });
        }
      }

      async createUser(req: Request, res: Response) {
        const { username, password, name } = req.body;
        if (!username || !password || !name) {
          return res.status(400).json({ message: "Missing required field(s)" });
        }
        
        try {
          const newUser = await userService.createUser({
            username, password, name,
          });
          return res.status(201).json(newUser);
        } catch (error: any) {
          return res.status(500).json({ error: error.message });
        }
      }

      async updateUser(req: Request, res: Response) {
        const { id } = req.params;
        const ID = parseInt(id);
        const { username, password, name } = req.body;
        if (!username || !password || !name) {
          return res.status(400).json({ message: "Error updating: missing field(s)" });
        }
        try {
          const updatedUser = await userService.updateUser(ID, {
            username, password, name
          });
          if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
          }
          return res.status(200).json(updatedUser);
        } catch (error: any) {
          if (error.message === "User not found") {
            return res.status(404).json({ message: "User not found" });
          }
          return res.status(500).json({ error: error.message });
        }
      }

      async updateUserByAdmin(req: Request, res: Response) {
        const { id } = req.params;
        const ID = parseInt(id);
        const { role, isBanned } = req.body;
        if (role === undefined || isBanned === undefined) {
          return res.status(400).json({ message: "Error updating: missing field(s)" });
        }
        try {
          const updatedUser = await userService.updateUser(ID, {
            role, isBanned
          });
          if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
          }
          return res.status(200).json(updatedUser);
        } catch (error: any) {
          if (error.message === "User not found") {
            return res.status(404).json({ message: "User not found" });
          }
          return res.status(500).json({ error: error.message });
        }
      }
}