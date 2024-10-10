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

    async createPublication(data: 
        Omit<Publication, "id" | "createdAt" | "updatedAt">
    ): Promise<Publication> {
        return await prisma.publication.create({
            data: {
                ...data,
            },
        });
    }

    async likePublication(
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

    async deletePublication(
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

    async recoverPublication(
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
}
