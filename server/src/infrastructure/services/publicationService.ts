import { publicationRepositoryImpl } from "../repositories/publicationRepositoryImpl.js";
import { Publication } from "@prisma/client";

export class PublicationService {
    private publicationRepository: publicationRepositoryImpl;
    constructor() {
        this.publicationRepository = new publicationRepositoryImpl();
    }

    async getAllPublications(): Promise<Publication[]> {
        return await this.publicationRepository.getAllPublications();
    }

    async getPublicationById(id: number): Promise<Publication | null> {
        return await this.publicationRepository.getPublicationById(id);
    }

    async getPublicationsForUser(username: string): Promise<Publication[]> {
        return await this.publicationRepository.getPublicationsForUser(username);
    }

    async getLikedPublicationsForUser(userId: number): Promise<Publication[]> {
        return await this.publicationRepository.getLikedPublicationsForUser(userId);
    }

    async getTopPublications(): Promise<Publication[]> {
        return await this.publicationRepository.getTopPublications(4);
    }

    async createPublication(data: 
        Omit<Publication, "id" | "createdAt" | "updatedAt" | "likeCount" | "isDeleted">
    ): Promise<Publication> {
        return await this.publicationRepository.createPublication(data);
    }

    async likePublication(publicationId: number, userId: number): Promise<Publication> {
        const publication = await this.publicationRepository.getPublicationById(publicationId);
        if (!publication) {
            throw new Error("Publication not found");
        }
        return await this.publicationRepository.likePublication(publicationId, userId);
    }

    async updatePublication(
        id: number,
        data: Partial<Omit<Publication, "id">>
    ): Promise<Publication | null> {
        const publication = await this.publicationRepository.getPublicationById(id);
        if (!publication) {
            return null;
        }
        return await this.publicationRepository.updatePublication(id, data);
    }

    async deletePublication(id: number): Promise<Publication> {
        const publication = await this.publicationRepository.getPublicationById(id);
        if (!publication) {
            throw new Error("Publication not found");
        }
        return await this.publicationRepository.deletePublication(id);
    }

    async hardDeletePublication(id: number): Promise<Publication> {
        const publication = await this.publicationRepository.getPublicationById(id);
        if (!publication) {
            throw new Error("Publication not found");
        }
        return await this.publicationRepository.hardDeletePublication(id);
    }

    async restorePublication(id: number): Promise<Publication> {
        const publication = await this.publicationRepository.getPublicationById(id);
        if (!publication) {
            throw new Error("Publication not found");
        }
        return await this.publicationRepository.restorePublication(id);
    }
}