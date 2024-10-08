import { Publication } from "../entities/Publication.js";

export interface publicationRepository {
    getPublicationsForUser(userId: Number): Promise<Publication[]>;
    createPublication(publication: Publication): Promise<Publication>;
    likePublication(publicationId: Number): Promise<Publication>;
    updatePublication(publicationId: Number): Promise<Publication>;
    deletePublication(publicationId: Number): Promise<void>;
    recoverPublication(publicationId: Number): Promise<void>;
}