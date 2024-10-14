import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import userRoutes from './routes/users.routes.js'
import publicationRoutes from './routes/publications.routes.js'

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

app.use('/api/v1', userRoutes);
app.use('/api/v1', publicationRoutes);
/*
async function main() {
    const user = await prisma.user.create({
      data: {
        username: "andrea",
        password: "password",
        name: "Andrea"
      },
    })

    console.log(user);
}

main()
.catch(e => {
    console.error(e.message)
})
.finally(async () => {
    await prisma.$disconnect()
})
*/
app.listen(Number(PORT), "0.0.0.0", () => {
    console.log(`Server listening on localhost:${PORT}`);
  });