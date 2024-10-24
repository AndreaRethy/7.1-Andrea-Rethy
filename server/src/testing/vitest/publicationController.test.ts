import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { PublicationController } from "../../infrastructure/controllers/publicationController.js";
import { Request, Response } from "express";
import { prisma } from "../../db.js";

const publicationController = new PublicationController();

describe("PublicationController", () => {
    beforeEach(async () => {
        await prisma.user.deleteMany({
            where: {
                username: { in: ["juan"] },
            },
        });
        await prisma.publication.deleteMany({
            where: {
                title: { in: ["unittest1", "unittest2"] }
            }
        });
    });
    afterEach(async () => {
        await prisma.publication.deleteMany({
            where: {
                title: { in: ["unittest1", "unittest2"] }
            }
        });
    });

    // create publication
    describe("createPublication", () => {
        it("should return 201 and publication", async () => {
            const user = await prisma.user.create({
                data: {
                    username: "juan",
                    password: "Test2",
                    name: "Juan",
                }
            });

            const req = {
                body: {
                    title: "unittest1",
                    content: "unittest1",
                    authorname: user.username
                },
            } as unknown as Request;
            const res = {
                status: vi.fn().mockReturnThis(),
                json: vi.fn(),
            } as unknown as Response;

            await publicationController.createPublication(req, res);
            expect(res.status).toBeCalledWith(201);
            expect(res.json).toBeCalledWith(
                expect.objectContaining({
                    title: "unittest1"
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
            await publicationController.createPublication(req, res);
            expect(res.status).toBeCalledWith(400);
            expect(res.json).toBeCalledWith({ message: "Missing required field(s)" });
        });
    });

    
    describe("getPublicationForUser", () => {
        it("should return 200 and publications if publications are found", async () => {
            const user = await prisma.user.create({
                data: {
                    username: "juan",
                    password: "Test2",
                    name: "Juan",
                }
            });

            await prisma.publication.createMany({
                data: [
                    {
                        title: "unittest1",
                        content: "unittest1",
                        likeCount: 0,
                        authorname: user.username
                    },
                    {
                        title: "unittest2",
                        content: "unittest2",
                        likeCount: 0,
                        authorname: user.username
                    },
                ]
            });
            
            const req = {
                params: { username: user.username },
            } as unknown as Request;
            const res = {
                status: vi.fn().mockReturnThis(),
                json: vi.fn(),
            } as unknown as Response;

            await publicationController.getPublicationsForUser(req, res);
            expect(res.status).toBeCalledWith(200);
            expect(res.json).toBeCalledWith(
                expect.arrayContaining([
                    expect.objectContaining({
                        title: "unittest2"
                    }),
                ])
            );
        });

        it("should return 404 if no publications are found", async () => {
            const user = await prisma.user.create({
                data: {
                    username: "juan",
                    password: "Test2",
                    name: "Juan",
                }
            });
            
            const req = {
                params: { username: user.username },
            } as unknown as Request;
            const res = {
                status: vi.fn().mockReturnThis(),
                json: vi.fn(),
            } as unknown as Response;

            await publicationController.getPublicationsForUser(req, res);
            expect(res.status).toBeCalledWith(404);
            expect(res.json).toBeCalledWith({ message: "No publications found" });
        });
    });

    // get all publications

    //get publication by id

    //like publication

    // update publication

    // delete publication

    //restore publication
});