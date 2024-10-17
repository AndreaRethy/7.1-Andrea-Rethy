import { Router } from "express";
import { PublicationController } from "../infrastructure/controllers/publicationController.js";

import authMiddlewareJWT from "../middleware/authMiddleware.js";

const router = Router();
const publicationController = new PublicationController();

router.get("/publications", authMiddlewareJWT, publicationController.getAllPublications);
router.get("/publications/user/:username", authMiddlewareJWT, publicationController.getPublicationsForUser);
router.get("/publications/:id", authMiddlewareJWT, publicationController.getPublicationById);
router.post("/publications", authMiddlewareJWT, publicationController.createPublication);
router.put("/publications/:id", authMiddlewareJWT, publicationController.updatePublication);
router.patch("/publications/:id/like", authMiddlewareJWT, publicationController.likePublication);
router.patch("/publications/:id/delete", authMiddlewareJWT, publicationController.deletePublication);
router.patch("/publications/:id/restore", authMiddlewareJWT, publicationController.restorePublication);

export default router;