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

    async getPublicationsForUser(username: string): Promise<Publication[]> {
        return await this.publicationRepository.getPublicationsForUser(username);
    }

    async createPublication(data: 
        Omit<Publication, "id" | "createdAt" | "updatedAt">
    ): Promise<Publication> {
        return await this.publicationRepository.createPublication(data);
    }

    async likePublication(
        id: number,
        data: Partial<Omit<Publication, "id">>
    ): Promise<Publication | null> {
        const publication = await this.publicationRepository.getPublicationById(id);
        if (!publication) {
            throw new Error("Publication not found");
        }
        return await this.publicationRepository.likePublication(id, data);
    }

    async updatePublication(
        id: number,
        data: Partial<Omit<Publication, "id">>
    ): Promise<Publication | null> {
        const publication = await this.publicationRepository.getPublicationById(id);
        if (!publication) {
            throw new Error("Publication not found");
        }
        return await this.publicationRepository.updatePublication(id, data);
    }

    async deletePublication(
        id: number,
        data: Partial<Omit<Publication, "id">>
    ): Promise<Publication | null> {
        const publication = await this.publicationRepository.getPublicationById(id);
        if (!publication) {
            throw new Error("Publication not found");
        }
        return await this.publicationRepository.deletePublication(id, data);
    }

    async recoverPublication(
        id: number,
        data: Partial<Omit<Publication, "id">>
    ): Promise<Publication | null> {
        const publication = await this.publicationRepository.getPublicationById(id);
        if (!publication) {
            throw new Error("Publication not found");
        }
        return await this.publicationRepository.recoverPublication(id, data);
    }
}