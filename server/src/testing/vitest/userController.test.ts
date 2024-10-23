import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { UserController } from "../../infrastructure/controllers/userController.js";
import { Request, Response } from "express";
import { prisma } from "../../db.js";

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
                    name: "Juan"
                })
            );
        });
    })

});