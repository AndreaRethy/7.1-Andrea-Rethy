import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { UserController } from "../../infrastructure/controllers/userController.js";
import { Request, Response } from "express";
import { prisma } from "../../db.js";
import bcrypt from "bcrypt";

const userController = new UserController();

describe("UserController", () => {
    beforeEach(async () => {
        await prisma.user.deleteMany({
            where: {
                username: { in: ["juan", "juanUpdated", "testAdmin"] },
            },
        });
    });
    afterEach(async () => {
        await prisma.user.deleteMany({
            where: {
                username: { in: ["juan", "juanUpdated", "testAdmin"] },
            },
        });
    });

    describe("createUser", () => {
        it("should create a new user", async () => {
            const req = {
                body: {
                    username: "juan",
                    password: "Test2",
                    name: "Juan",
                },
            } as unknown as Request;
            const res = {
                status: vi.fn().mockReturnThis(),
                json: vi.fn(),
            } as unknown as Response;
            await userController.createUser(req, res);
            expect(res.status).toBeCalledWith(201);
            expect(res.json).toBeCalledWith(
                expect.objectContaining({
                    username: "juan"
                })
            );
        });

        it("should return 400 if the request body is invalid", async () => {
            const req = {
                body: {},
            } as unknown as Request;
            const res = {
                status: vi.fn().mockReturnThis(),
                json: vi.fn(),
            } as unknown as Response;
            await userController.createUser(req, res);
            expect(res.status).toBeCalledWith(400);
            expect(res.json).toBeCalledWith({ message: "Missing required field(s)" });
        });
    });

    describe("updateUser", () => {
        it("should update an existing user", async () => {
            const user = await prisma.user.create({
                data: {
                    username: "juan",
                    password: "Test2",
                    name: "Juan",
                }
            });
            const req = {
                params: { id: user.id },
                body: {
                    username: "juan",
                    password: "Test2",
                    name: "JuanUpdated",
                },
            } as unknown as Request;
            const res = {
                status: vi.fn().mockReturnThis(),
                json: vi.fn(),
            } as unknown as Response;
            await userController.updateUser(req, res);
            expect(res.status).toBeCalledWith(200);
            expect(res.json).toBeCalledWith(
                expect.objectContaining({
                    name: "JuanUpdated",
                })
            );
        });

        it("should return 404 if user is not found", async () => {
            const req = {
                params: { id: 0 },
                body: {
                    username: "juan",
                    password: "Test2",
                    name: "JuanUpdated",
                },
            } as unknown as Request;
            const res = {
                status: vi.fn().mockReturnThis(),
                json: vi.fn(),
            } as unknown as Response;
            await userController.updateUser(req, res);
            expect(res.status).toBeCalledWith(404);
            expect(res.json).toBeCalledWith({ message: "User not found" });
        });

        it("should return 400 if the request body is invalid", async () => {
            const user = await prisma.user.create({
                data: {
                    username: "juan",
                    password: "Test2",
                    name: "Juan",
                },
            });

            const req = {
                params: { id: user.id },
                body: {},
            } as unknown as Request;
            const res = {
                status: vi.fn().mockReturnThis(),
                json: vi.fn(),
            } as unknown as Response;
            await userController.updateUser(req, res);
            expect(res.status).toBeCalledWith(400);
            expect(res.json).toBeCalledWith({ message: "Error updating: missing field(s)" });
        });
    });

    describe("updateUserByAdmin", () => {
        it("should update an existing user to ADMIN role", async () => {
            const user = await prisma.user.create({
                data: {
                    username: "juan",
                    password: "Test2",
                    name: "Juan",
                }
            });
            const req = {
                params: { id: user.id },
                body: {
                    role: "ADMIN",
                    isBanned: false,
                },
            } as unknown as Request;
            const res = {
                status: vi.fn().mockReturnThis(),
                json: vi.fn(),
            } as unknown as Response;
            await userController.updateUserByAdmin(req, res);
            expect(res.status).toBeCalledWith(200);
            expect(res.json).toBeCalledWith(
                expect.objectContaining({
                    role: "ADMIN",
                })
            );
        });

        it("should return 404 if user is not found", async () => {
            const req = {
                params: { id: 0 },
                body: {
                    role: "ADMIN",
                    isBanned: false,
                },
            } as unknown as Request;
            const res = {
                status: vi.fn().mockReturnThis(),
                json: vi.fn(),
            } as unknown as Response;
            await userController.updateUserByAdmin(req, res);
            expect(res.status).toBeCalledWith(404);
            expect(res.json).toBeCalledWith({ message: "User not found" });
        });

        it("should return 400 if the request body is invalid", async () => {
            const user = await prisma.user.create({
                data: {
                    username: "juan",
                    password: "Test2",
                    name: "Juan",
                },
            });

            const req = {
                params: { id: user.id },
                body: {},
            } as unknown as Request;
            const res = {
                status: vi.fn().mockReturnThis(),
                json: vi.fn(),
            } as unknown as Response;
            await userController.updateUserByAdmin(req, res);
            expect(res.status).toBeCalledWith(400);
            expect(res.json).toBeCalledWith({ message: "Error updating: missing field(s)" });
        });
    });

    describe("getAllUsers", () => {
        it("should return 200 if users are found", async () => {
            await prisma.user.createMany({
                data: [
                    {
                        username: "juan",
                        password: "Test2",
                        name: "Juan",
                    },
                    {
                        username: "testAdmin",
                        password: "Test3",
                        name: "TestAdmin",
                    },
                ]
            });

            const req = {} as unknown as Request;
            const res = {
                status: vi.fn().mockReturnThis(),
                json: vi.fn(),
            } as unknown as Response;
            await userController.getAllUsers(req, res);
            expect(res.status).toBeCalledWith(200);
            expect(res.json).toBeCalledWith(
                expect.arrayContaining([
                    expect.objectContaining({
                        name: "Juan",
                    }),
                ])
            );
        });
    });

    describe("getUserById", () => {
        it("should return 200 if a user is found", async () => {
            const user = await await prisma.user.create({
                data: {
                    username: "juan",
                    password: "Test2",
                    name: "Juan",
                },
            });

            const req = { 
                params: { id: user.id } 
            } as unknown as Request;
            const res = {
                status: vi.fn().mockReturnThis(),
                json: vi.fn(),
            } as unknown as Response;
            await userController.getUserById(req, res);
            expect(res.status).toBeCalledWith(200);
            expect(res.json).toBeCalledWith(
                expect.objectContaining({
                    name: "Juan",
                }),
            );
        });

        it("should return 404 if user is not found", async () => {
            const req = {
                params: { id: 0 },
            } as unknown as Request;
            const res = {
                status: vi.fn().mockReturnThis(),
                json: vi.fn(),
            } as unknown as Response;
            await userController.getUserById(req, res);
            expect(res.status).toBeCalledWith(404);
            expect(res.json).toBeCalledWith({ message: "User not found" });
        });
    });

    describe("postUserLogin", () => {
        it("should return 200 if a user is found", async () => {
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash("Test2", salt)
            const user = await prisma.user.create({
                data: {
                    username: "juan",
                    password: hashedPassword,
                    name: "Juan",
                },
            });

            const req = { 
                body: { 
                    username: user.username, 
                    password: "Test2",
                },
            } as unknown as Request;
            const res = {
                status: vi.fn().mockReturnThis(),
                json: vi.fn(),
            } as unknown as Response;
            await userController.postUserLogin(req, res);
            expect(res.status).toBeCalledWith(200);
            expect(res.json).toBeCalledWith(
                expect.objectContaining({
                    username: "juan",
                }),
            );
        });

        it("should return 404 if user is not found", async () => {
            const req = {
                body: { 
                    username: "random", 
                    password: "random",
                },
            } as unknown as Request;
            const res = {
                status: vi.fn().mockReturnThis(),
                json: vi.fn(),
            } as unknown as Response;
            await userController.postUserLogin(req, res);
            expect(res.status).toBeCalledWith(404);
            expect(res.json).toBeCalledWith({ message: "User not found" });
        });
    });
});