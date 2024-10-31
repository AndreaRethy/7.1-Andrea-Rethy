import { Router } from "express";
import { PublicationController } from "../infrastructure/controllers/publicationController.js";

import authMiddlewareJWT from "../middleware/authMiddleware.js";

const router = Router();
const publicationController = new PublicationController();

/**
 * @openapi
 * /api/v1/publications:
 *   get:
 *     summary: Retrieve a list of all publications
 *     tags:
 *       - Publications
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of publications.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Publication'
 *       404:
 *         description: No publications found.
 *       500:
 *         description: Internal server error.
 */
router.get("/publications", authMiddlewareJWT, publicationController.getAllPublications);

/**
 * @openapi
 * /api/v1/publications/user/{username}:
 *   get:
 *     summary: Retrieve publications for a specific user
 *     tags:
 *       - Publications
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         description: Username of the author
 *     responses:
 *       200:
 *         description: A list of publications for the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Publication'
 *       400:
 *         description: Missing required field.
 *       404:
 *         description: No publications found for the user.
 *       500:
 *         description: Internal server error.
 */
router.get("/publications/user/:username", authMiddlewareJWT, publicationController.getPublicationsForUser);

/**
 * @openapi
 * /api/v1/publications/top:
 *   get:
 *     summary: Retrieve a list of the 4 publications with the highest like count
 *     tags:
 *       - Publications
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of publications.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Publication'
 *       404:
 *         description: No publications found.
 *       500:
 *         description: Internal server error.
 */
router.get("/publications/top", authMiddlewareJWT, publicationController.getTopPublications);

/**
 * @openapi
 * /api/v1/publications/{id}:
 *   get:
 *     summary: Retrieve a specific publication by ID
 *     tags:
 *       - Publications
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Publication ID
 *     responses:
 *       200:
 *         description: Publication details retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Publication'
 *       400:
 *         description: Invalid publication ID.
 *       404:
 *         description: Publication not found.
 *       500:
 *         description: Internal server error.
 */
router.get("/publications/:id", authMiddlewareJWT, publicationController.getPublicationById);

/**
 * @openapi
 * /api/v1/publications:
 *   post:
 *     summary: Create a new publication
 *     tags:
 *       - Publications
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Publication object that needs to be added
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PublicationCreate'
 *     responses:
 *       201:
 *         description: Publication created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Publication'
 *       400:
 *         description: Missing required fields.
 *       500:
 *         description: Internal server error.
 */
router.post("/publications", authMiddlewareJWT, publicationController.createPublication);

/**
 * @openapi
 * /api/v1/publications/{id}:
 *   put:
 *     summary: Update a specific publication
 *     tags:
 *       - Publications
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Publication ID
 *     requestBody:
 *       description: Publication object that needs to be updated
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PublicationUpdate'
 *     responses:
 *       200:
 *         description: Publication updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Publication'
 *       400:
 *         description: Missing values or invalid publication ID.
 *       404:
 *         description: Publication not found.
 *       500:
 *         description: Internal server error.
 */
router.put("/publications/:id", authMiddlewareJWT, publicationController.updatePublication);

/**
 * @openapi
 * /api/v1/publications/{id}/like:
 *   patch:
 *     summary: Like a publication
 *     tags:
 *       - Publications
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Publication ID
 *     responses:
 *       200:
 *         description: Publication liked successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LikeResponse'
 *       400:
 *         description: Invalid publication ID.
 *       404:
 *         description: Publication not found.
 *       500:
 *         description: Internal server error.
 */
router.patch("/publications/:id/like", authMiddlewareJWT, publicationController.likePublication);

/**
 * @openapi
 * /api/v1/publications/{id}/delete:
 *   patch:
 *     summary: Delete a specific publication
 *     tags:
 *       - Publications
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Publication ID
 *     responses:
 *       200:
 *         description: Publication deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Publication'
 *       400:
 *         description: Invalid publication ID.
 *       500:
 *         description: Internal server error.
 */
router.patch("/publications/:id/delete", authMiddlewareJWT, publicationController.deletePublication);

/**
 * @openapi
 * /api/v1/publications/{id}/restore:
 *   post:
 *     summary: Restore a deleted publication
 *     tags:
 *       - Publications
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Publication ID
 *     responses:
 *       200:
 *         description: Publication restored successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Publication'
 *       400:
 *         description: Invalid publication ID.
 *       500:
 *         description: Internal server error.
 */
router.patch("/publications/:id/restore", authMiddlewareJWT, publicationController.restorePublication);

export default router;