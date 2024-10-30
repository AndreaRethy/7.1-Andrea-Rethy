import { Request, Response } from "express";
import { PublicationService } from "../services/publicationService.js";

const publicationService = new PublicationService();

export class PublicationController {
    async getAllPublications(_req: Request, res: Response) {
        try {
            const publications = await publicationService.getAllPublications();
            if (publications.length === 0) {
                return res.status(404).json({ message: "No publications found" });
            }
            return res.status(200).json(publications)
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    async getPublicationsForUser(req: Request, res: Response) {
        const { username } = req.params;

        if (!username) {
            return res.status(400).json({ message: "Missing required field" });
        }

        try {
            const publications = await publicationService.getPublicationsForUser(username);
            if (publications.length === 0) {
                return res.status(404).json({ message: "No publications found" });
            }
            return res.status(200).json(publications)
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    async getPublicationById(req: Request, res: Response) {
        const { id } = req.params;
        const publicationId = parseInt(id)

        if (isNaN(publicationId)) {
            return res.status(400).json({ message: "invalid publication id" });
        }

        try {
            const publication = await publicationService.getPublicationById(publicationId);
            if (!publication) {
                return res.status(404).json({ message: "Publication not found" });
            }
            return res.status(200).json(publication)
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    async getTopPublications(_req: Request, res: Response) {
        try {
            const topPublications = await publicationService.getTopPublications();
            return res.status(200).json(topPublications);
        } catch (error: any) {
            console.error('Error fetching top publications:', error);
            return res.status(500).json({ error: 'Failed to retrieve top publications.' });
        }
    }

    async createPublication(req: Request, res: Response) {
        const { title, image, content, authorname } = req.body;

        if (!title || !content || !authorname) {
            return res.status(400).json({
                message: "Missing required field(s)"
            });
        }
        
        try {
            const newPublication = await publicationService.createPublication({
                title,
                image: image || undefined,
                content,
                authorname
            });
            return res.status(201).json(newPublication);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    async likePublication(req: Request, res: Response){
        const { id } = req.params;
        const ID = parseInt(id);

        if (isNaN(ID)) {
            return res.status(400).json({ message: "invalid publication id" });
        }

        try {
            const updatedLikes = await publicationService.likePublication(ID);
            return res.status(200).json(updatedLikes)
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    async updatePublication(req: Request, res: Response){
        const { id } = req.params;
        const ID = parseInt(id);
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({ message: "Missing values" });
        }

        if (isNaN(ID)) {
            return res.status(400).json({ message: "Invalid publication id" });
        }

        try {
            const updatedPublication = await publicationService.updatePublication(ID, {title, content});
            return res.status(200).json(updatedPublication)
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }
    
    async deletePublication(req: Request, res: Response){
        const { id } = req.params;
        const ID = parseInt(id);

        if (isNaN(ID)) {
            return res.status(400).json({ message: "invalid publication id" });
        }

        try {
            const deletedPublication = await publicationService.deletePublication(ID);
            return res.status(200).json(deletedPublication)
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    async restorePublication(req: Request, res: Response){
        const { id } = req.params;
        const ID = parseInt(id);

        if (isNaN(ID)) {
            return res.status(400).json({ message: "invalid publication id" });
        }

        try {
            const restoredPublication = await publicationService.restorePublication(ID);
            return res.status(200).json(restoredPublication)
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }
}