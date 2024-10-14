import { Router } from "express";
import { PublicationController } from "../infrastructure/controllers/publicationController.js";

const router = Router();
const publicationController = new PublicationController();

router.get("/publications", publicationController.getAllPublications);
router.get("/publications/user/:username", publicationController.getPublicationsForUser);
router.get("/publications/:id", publicationController.getPublicationById);
router.post("/publications", publicationController.createPublication);
router.put("/publications/:id", publicationController.updatePublication);
router.patch("/publications/:id/like", publicationController.likePublication);
router.patch("/publications/:id/delete", publicationController.deletePublication);
router.patch("/publications/:id/restore", publicationController.restorePublication);

export default router;