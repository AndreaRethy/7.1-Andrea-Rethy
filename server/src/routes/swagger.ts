import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express, Request, Response } from 'express';

// Metadata info about APIs
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
      schemas: {
        LoginRequest: {
          type: 'object',
          required: ['username', 'password'],
          properties: {
            username: {
              type: 'string',
              example: 'johndoe',
              description: 'The username of the user.',
            },
            password: {
              type: 'string',
              example: 'StrongP@ssw0rd!',
              description: 'The password of the user.',
            },
          },
        },
        LoginResponse: {
          type: 'object',
          properties: {
            token: {
              type: 'string',
              example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
              description: 'JWT token for authenticated access.',
            },
            user: {
              $ref: '#/components/schemas/User',
            },
          },
        },
        RegisterRequest: {
          type: 'object',
          required: ['username', 'password', 'name'],
          properties: {
            username: {
              type: 'string',
              example: 'johndoe',
              description: 'The username of the user.',
            },
            password: {
              type: 'string',
              example: 'StrongP@ssw0rd!',
              description: 'The password of the user.',
            },
            name: {
              type: 'string',
              example: 'John Doe',
              description: 'The name of the user.',
            },
          },
        },
        RegisterResponse: {
          type: 'object',
          properties: {
            user: {
              $ref: '#/components/schemas/User',
            },
          },
        },
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1,
            },
            username: {
              type: 'string',
              example: 'johndoe',
            },
            name: {
              type: 'string',
              example: 'John Doe',
            },
            role: {
              type: 'string',
              enum: ['ADMIN', 'USER'],
              example: 'USER',
            },
          },
        },
        UserUpdate: {
          type: 'object',
          properties: {
            username: {
              type: 'string',
              example: 'johndoe',
            },
            name: {
              type: 'string',
              example: 'John Doe'
            },
            password: {
              type: 'string',
              example: '123456',
            },
          },
        },
        Publication: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1,
            },
            title: {
              type: 'string',
              example: 'Understanding Hexagonal Architecture',
            },
            content: {
              type: 'string',
              example: 'Hexagonal architecture is a software design pattern...',
            },
            authorname: {
              type: 'string',
              example: 'johndoe',
            },
            likes: {
              type: 'integer',
              example: 10,
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              example: '2024-01-01T00:00:00Z',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              example: '2024-01-02T00:00:00Z',
            },
          },
        },
        PublicationCreate: {
          type: 'object',
          required: ['title', 'content', 'authorname'],
          properties: {
            title: {
              type: 'string',
              example: 'New Publication Title',
            },
            content: {
              type: 'string',
              example: 'Content of the new publication...',
            },
            authorname: {
              type: 'string',
              example: 'johndoe',
            },
          },
        },
        PublicationUpdate: {
          type: 'object',
          properties: {
            title: {
              type: 'string',
              example: 'Updated Publication Title',
            },
            content: {
              type: 'string',
              example: 'Updated content of the publication...',
            },
          },
        },
        LikeResponse: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1,
            },
            likes: {
              type: 'integer',
              example: 11,
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/login.routes.ts', './src/routes/users.routes.ts', './src/routes/publications.routes.ts']
};

// Docs in JSON format
const swaggerSpec = swaggerJSDoc(options);

// Function to setup our Swagger docs
const swaggerDocs = (app: Express, port: string | 3000): void => {
  app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get('/api/v1/docs.json', (_req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
  console.log(`Version 1 Docs are available at http://localhost:${port}/api/v1/docs`);
};

export default swaggerDocs;
