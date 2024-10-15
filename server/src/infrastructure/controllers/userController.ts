import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserService } from "../services/userService.js";
import bcrypt from "bcrypt"

const userService = new UserService();

export class UserController {
    async getAllUsers(req: Request, res: Response) {
      const { adminId } = req.params;
      const ID = parseInt(adminId, 10);

      if (isNaN(ID)) {
        return res.status(400).json({ message: "Invalid id" });
      }
      
        try {
            const users = await userService.getAllUsers(ID);
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
          const user = await userService.getUserLogin(username);
          if (!user) {
            return res.status(404).json({ message: "User not found" });
          }

          try {
            if(await bcrypt.compare(password, user.password)) {
              const token = jwt.sign(
                { username: user.username },
                process.env.ACCESS_TOKEN_SECRET as string,
                { expiresIn: "1h" }
              );
              return res.status(200).json({
                accessToken: token,
                username: username,
                id: user.id,
                role: user.role
              });
            } else {
              return res.send("Not Allowed")
            }
          } catch {
            return res.status(500).send();
          }
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
          const salt = await bcrypt.genSalt();
          const hashedPassword = await bcrypt.hash(password, salt)

          try {
            const newUser = await userService.createUser({
              username, password: hashedPassword, name,
            });
            return res.status(201).json(newUser);
          } catch (error: any) {
            return res.status(500).json({ error: error.message });
          }
        } catch {
          return res.status(500).send();
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
        const { adminId, id } = req.params;
        const ID = parseInt(id);
        const adminID =parseInt(adminId);

        if (isNaN(ID) || isNaN(adminID)) {
          return res.status(400).json({ message: "Invalid id" });
        }

        const { role, isBanned } = req.body;

        if (role === undefined || isBanned === undefined) {
          return res.status(400).json({ message: "Error updating: missing field(s)" });
        }
        try {
          const updatedUser = await userService.updateUserByAdmin(adminID, ID, {
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