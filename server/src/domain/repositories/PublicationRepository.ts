import { Publication } from "../entities/Publication.js";

export interface publicationRepository {
    getPublicationsForUser(username: String): Promise<Publication[]>;
    createPublication(publication: Publication): Promise<Publication>;
    likePublication(publicationId: Number): Promise<Publication | null>;
    updatePublication(publicationId: Number): Promise<Publication | null>;
    deletePublication(publicationId: Number): Promise<Publication | null>;
    recoverPublication(publicationId: Number): Promise<Publication | null>;
}