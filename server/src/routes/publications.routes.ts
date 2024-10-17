import { Router } from "express";
import { PublicationController } from "../infrastructure/controllers/publicationController.js";

import authMiddlewareJWT from "../middleware/authMiddleware.js";

const router = Router();
const publicationController = new PublicationController();

/**
 * @swagger
 * /api/v1/publications:
 *   get:
 *     summary: Get a list of publications
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of publications
 */
router.get("/publications", authMiddlewareJWT, publicationController.getAllPublications);

/**
 * @swagger
 * /api/v1/publications:
 *   get:
 *     summary: Get a list of publications for a specific user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of publications
 */
router.get("/publications/user/:username", authMiddlewareJWT, publicationController.getPublicationsForUser);

/**
 * @swagger
 * /api/v1/publications:
 *   get:
 *     summary: Get a specific publication
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A specific publication
 */
router.get("/publications/:id", authMiddlewareJWT, publicationController.getPublicationById);

/**
 * @swagger
 * /api/v1/publications:
 *   post:
 *     summary: Post a publication
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Publication posted
 */
router.post("/publications", authMiddlewareJWT, publicationController.createPublication);

/**
 * @swagger
 * /api/v1/publications:
 *   put:
 *     summary: Update a specific publication
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Publication updated
 */
router.put("/publications/:id", authMiddlewareJWT, publicationController.updatePublication);

/**
 * @swagger
 * /api/v1/publications:
 *   patch:
 *     summary: Like a specific publication
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Publication liked
 */
router.patch("/publications/:id/like", authMiddlewareJWT, publicationController.likePublication);

/**
 * @swagger
 * /api/v1/publications:
 *   patch:
 *     summary: Soft delete a specific publication
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Publication marked deleted
 */
router.patch("/publications/:id/delete", authMiddlewareJWT, publicationController.deletePublication);

/**
 * @swagger
 * /api/v1/publications:
 *   patch:
 *     summary: Restore a deleted publication
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Publication marked not deleted
 */
router.patch("/publications/:id/restore", authMiddlewareJWT, publicationController.restorePublication);

export default router;