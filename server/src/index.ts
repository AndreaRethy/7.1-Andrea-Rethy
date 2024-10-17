import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import loginRoutes from './routes/login.routes.js';
import userRoutes from './routes/users.routes.js'
import publicationRoutes from './routes/publications.routes.js'
import adminRoutes from './routes/admin.routes.js'
import swaggerDocs from './routes/swagger.js'

dotenv.config();
const app = express();
app.use(
    cors({
      origin: "http://localhost:5173",
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    })
  );

app.options("*", cors());

const PORT = process.env.PORT || 3000;
app.use(express.json());

app.use('/api/v1', loginRoutes);
app.use('/api/v1', userRoutes);
app.use('/api/v1', publicationRoutes);
app.use('/api/v1', adminRoutes);

app.listen(Number(PORT), "0.0.0.0", () => {
    console.log(`Server listening on localhost:${PORT}`);
    swaggerDocs(app, PORT)
  });