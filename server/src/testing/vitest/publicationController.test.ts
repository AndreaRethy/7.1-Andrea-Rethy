import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { PublicationController } from "../../infrastructure/controllers/publicationController.js";
import { Request, Response } from "express";
import { prisma } from "../../db.js";

const publicationController = new PublicationController();

describe("PublicationController", () => {
    beforeEach(async () => {
        await prisma.user.deleteMany({
            where: {
                username: { in: ["julia"] },
            },
        });
        await prisma.publication.deleteMany({
            where: {
                title: { in: ["unittest1", "unittest2", "unittest3"] }
            }
        });
    });
    afterEach(async () => {
        await prisma.publication.deleteMany({
            where: {
                title: { in: ["unittest1", "unittest2", "unittest3"] }
            }
        });
    });

    // create publication
    describe("createPublication", () => {
        it("should return 201 and publication", async () => {
            const user = await prisma.user.create({
                data: {
                    username: "julia",
                    password: "Test2",
                    name: "julia",
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

    // get publications from specific user
    describe("getPublicationForUser", () => {
        it("should return 200 and publications if publications are found", async () => {
            const user = await prisma.user.create({
                data: {
                    username: "julia",
                    password: "Test2",
                    name: "julia",
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
                    username: "julia",
                    password: "Test2",
                    name: "julia",
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
    describe("getAllPublications", () => {
        it("should return 200 and publications if publications are found", async () => {
            const user = await prisma.user.create({
                data: {
                    username: "julia",
                    password: "Test2",
                    name: "julia",
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
            
            const req = {} as unknown as Request;
            const res = {
                status: vi.fn().mockReturnThis(),
                json: vi.fn(),
            } as unknown as Response;

            await publicationController.getAllPublications(req, res);
            expect(res.status).toBeCalledWith(200);
            expect(res.json).toBeCalledWith(
                expect.arrayContaining([
                    expect.objectContaining({
                        title: "unittest2"
                    }),
                ])
            );
        });
    });

    //get publication by id
    describe("getPublicationById", () => {
        it("should return 200 and publication", async () => {
            const user = await prisma.user.create({
                data: {
                    username: "julia",
                    password: "Test2",
                    name: "julia",
                }
            });

            const publication = await prisma.publication.create({
                data:
                    {
                        title: "unittest1",
                        content: "unittest1",
                        likeCount: 0,
                        authorname: user.username
                    },
            });
            
            const req = {
                params: { id: publication.id },
            } as unknown as Request;
            const res = {
                status: vi.fn().mockReturnThis(),
                json: vi.fn(),
            } as unknown as Response;

            await publicationController.getPublicationById(req, res);
            expect(res.status).toBeCalledWith(200);
            expect(res.json).toBeCalledWith(
                expect.objectContaining({
                    title: "unittest1"
                }),
            );
        });

        it("should return 404 if no publications are found", async () => {    
            const req = {
                params: { id: 0 },
            } as unknown as Request;
            const res = {
                status: vi.fn().mockReturnThis(),
                json: vi.fn(),
            } as unknown as Response;

            await publicationController.getPublicationById(req, res);
            expect(res.status).toBeCalledWith(404);
            expect(res.json).toBeCalledWith({ message: "Publication not found" });
        });
    });

    //like publication
    describe("likePublication", () => {
        it("should return 200 and publication", async () => {
            const user = await prisma.user.create({
                data: {
                    username: "julia",
                    password: "Test2",
                    name: "julia",
                }
            });

            const publication = await prisma.publication.create({
                data:
                    {
                        title: "unittest1",
                        content: "unittest1",
                        likeCount: 0,
                        authorname: user.username
                    },
            });
            
            const req = {
                params: { id: publication.id },
            } as unknown as Request;
            const res = {
                status: vi.fn().mockReturnThis(),
                json: vi.fn(),
            } as unknown as Response;

            await publicationController.likePublication(req, res);
            expect(res.status).toBeCalledWith(200);
            expect(res.json).toBeCalledWith(
                expect.objectContaining({
                    title: "unittest1"
                }),
            );
        });
    });

    // update publication
    describe("updatePublication", () => {
        it("should return 200 and updated publication", async () => {
            const user = await prisma.user.create({
                data: {
                    username: "julia",
                    password: "Test2",
                    name: "julia",
                }
            });

            const publication = await prisma.publication.create({
                data:
                    {
                        title: "unittest1",
                        content: "unittest1",
                        likeCount: 0,
                        authorname: user.username
                    },
            });
            
            const req = {
                params: { id: publication.id },
                body: {
                    title: "unittest3",
                    content: "unittest3",
                },
            } as unknown as Request;
            const res = {
                status: vi.fn().mockReturnThis(),
                json: vi.fn(),
            } as unknown as Response;

            await publicationController.updatePublication(req, res);
            expect(res.status).toBeCalledWith(200);
            expect(res.json).toBeCalledWith(
                expect.objectContaining({
                    title: "unittest3"
                }),
            );
        });
    });

    // delete publication
    describe("deletePublication", () => {
        it("should return 200 and publication", async () => {
            const user = await prisma.user.create({
                data: {
                    username: "julia",
                    password: "Test2",
                    name: "julia",
                }
            });

            const publication = await prisma.publication.create({
                data:
                    {
                        title: "unittest1",
                        content: "unittest1",
                        likeCount: 0,
                        authorname: user.username
                    },
            });
            
            const req = {
                params: { id: publication.id },
            } as unknown as Request;
            const res = {
                status: vi.fn().mockReturnThis(),
                json: vi.fn(),
            } as unknown as Response;

            await publicationController.deletePublication(req, res);
            expect(res.status).toBeCalledWith(200);
            expect(res.json).toBeCalledWith(
                expect.objectContaining({
                    title: "unittest1",
                    isDeleted: true
                }),
            );
        });
    });

    //restore publication
    describe("restorePublication", () => {
        it("should return 200 and publication", async () => {
            const user = await prisma.user.create({
                data: {
                    username: "julia",
                    password: "Test2",
                    name: "julia",
                }
            });

            const publication = await prisma.publication.create({
                data:
                    {
                        title: "unittest1",
                        content: "unittest1",
                        likeCount: 0,
                        authorname: user.username
                    },
            });
            
            const req = {
                params: { id: publication.id },
            } as unknown as Request;
            const res = {
                status: vi.fn().mockReturnThis(),
                json: vi.fn(),
            } as unknown as Response;

            await publicationController.restorePublication(req, res);
            expect(res.status).toBeCalledWith(200);
            expect(res.json).toBeCalledWith(
                expect.objectContaining({
                    title: "unittest1",
                    isDeleted: false
                }),
            );
        });
    });
});