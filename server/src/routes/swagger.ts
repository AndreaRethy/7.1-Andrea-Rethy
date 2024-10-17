import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

// Metadata info about API
const options = {
    definition: {
        openapi: "3.0.0",
        info: { title: "Blog App API", version: "1.0.0" },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: []
            }
        ]
    },
    apis: ['login.routes.js', 'users.routes.js', 'publications.routes.js', 'admin.routes.js', '../db.js'] //add db?
};

// Docs in JSON format
const swaggerSpec = swaggerJSDoc(options);

// Function to setup our Swagger docs
const swaggerDocs = (app: Express, port: string | 3000): void => {
    app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.get('/api/v1/docs.json', (_req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
    console.log(`Version 1 Docs are available at http://localhost:${port}/api/v1/docs`);
};

export default swaggerDocs;