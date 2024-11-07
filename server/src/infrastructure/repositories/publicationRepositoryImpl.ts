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

    async getLikedPublicationsForUser(userId: number): Promise<Publication[]> {
        return await prisma.publication.findMany({
            where: {
              likedBy: {
                some: {
                    id: userId
                }
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

    async hasUserLiked(publicationId: number, userId: number): Promise<boolean> {
        const publication = await prisma.publication.findUnique({
            where: { id: publicationId },
            select: {
                likedBy: {
                    where: { id: userId },
                },
            },
        });

        if (publication) {
            return publication.likedBy.length > 0;
        }

        return false
    }

    async likePublication(publicationId: number, userId: number): Promise<Publication> {
        try {
            const alreadyLiked = await this.hasUserLiked(publicationId, userId);
            if (alreadyLiked) {
              throw new Error('User has already liked this publication.');
            }

            const updatedPublication = await prisma.$transaction(async (tx) => {
              const publication = await tx.publication.update({
                where: { id: publicationId },
                data: {
                  likeCount: { increment: 1 },
                  likedBy: { connect: { id: userId } },
                },
              });
      
              return publication;
            });
      
            return updatedPublication;
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

    async hardDeletePublication(id: number): Promise<Publication>  {
        try {
            return await prisma.publication.delete({
                where: { id },
              });
        } catch (error) {
            throw new Error(`Publication not found or error deleting publication: ${error}`);
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
