import { Publication } from "../entities/Publication.js";

export interface publicationRepository {
    getAllPublications(): Promise<Publication[]>;
    getPublicationsForUser(username: String): Promise<Publication[]>;
    getPublicationById(id: Number): Promise<Publication | null>;
    getTopPublications(limit: Number): Promise<Publication[]>;
    createPublication(publication: Publication): Promise<Publication>;
    likePublication(publicationId: Number): Promise<Publication | null>;
    updatePublication(publicationId: Number): Promise<Publication | null>;
    deletePublication(publicationId: Number): Promise<Publication | null>;
    restorePublication(publicationId: Number): Promise<Publication | null>;
}