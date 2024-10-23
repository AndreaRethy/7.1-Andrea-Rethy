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

    async createPublication(data: 
        Omit<Publication, "id" | "createdAt" | "updatedAt" | "likeCount" | "isDeleted">
    ): Promise<Publication> {
        return await this.publicationRepository.createPublication(data);
    }

    async likePublication(id: number): Promise<Publication> {
        const publication = await this.publicationRepository.getPublicationById(id);
        if (!publication) {
            throw new Error("Publication not found");
        }
        return await this.publicationRepository.likePublication(id);
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

    async restorePublication(id: number): Promise<Publication> {
        const publication = await this.publicationRepository.getPublicationById(id);
        if (!publication) {
            throw new Error("Publication not found");
        }
        return await this.publicationRepository.restorePublication(id);
    }
}