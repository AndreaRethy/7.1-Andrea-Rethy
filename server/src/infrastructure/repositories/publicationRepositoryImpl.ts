import { prisma } from '../../db.js';
import { Publication } from "@prisma/client";

export class publicationRepositoryImpl {
    async getAllPublications(): Promise<Publication[]> {
        return await prisma.publication.findMany();
    }

    async getPublicationsForUser(username: string): Promise<Publication[]> {
        return await prisma.publication.findMany({
            where: {
              author: {
                username: username,
              },
            },
          });
    }

    async getPublicationById(id: number): Promise<Publication | null> {
        return await prisma.publication.findUnique({
            where: { id },
        });
    }

    async getTopPublications(limit: number): Promise<Publication[]> {
        return await prisma.publication.findMany({
            where: { isDeleted: false },
            orderBy: { likeCount: 'desc' },
            take: limit
        });
    }

    async createPublication(data: 
        Omit<Publication, "id" | "createdAt" | "updatedAt" | "likeCount" | "isDeleted">
    ): Promise<Publication> {
        return await prisma.publication.create({
            data: {
                ...data,
                likeCount: 0,
                isDeleted: false,
            },
        });
    }

    async likePublication(id: number): Promise<Publication> {
        try {
            return await prisma.publication.update({
                where: { id },
                data: {
                    likeCount: {
                        increment: 1,
                    }
                }
              });
        } catch (error) {
            throw new Error(`Publication not found or error updating publication: ${error}`);
          }
    }

    async updatePublication(
        id: number,
        data: Partial<Omit<Publication, "id">>
    ): Promise<Publication | null> {
        try {
            return await prisma.publication.update({
                where: { id },
                data,
              });
        } catch (error) {
            throw new Error(`Publication not found or error updating publication: ${error}`);
          }
    }

    async deletePublication(id: number): Promise<Publication>  {
        try {
            return await prisma.publication.update({
                where: { id },
                data: {
                    isDeleted: true,
                },
              });
        } catch (error) {
            throw new Error(`Publication not found or error updating publication: ${error}`);
          }
    }

    async restorePublication(id: number): Promise<Publication>  {
        try {
            return await prisma.publication.update({
                where: { id },
                data: {
                    isDeleted: false,
                },
              });
        } catch (error) {
            throw new Error(`Publication not found or error updating publication: ${error}`);
          }
    }
}
