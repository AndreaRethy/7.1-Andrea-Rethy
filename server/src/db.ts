import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export async function cleanDatabase() {
  try {
    await prisma.user.deleteMany({});
    await prisma.publication.deleteMany({});
  } catch (error) {
    console.error("Error limpiando la base de datos:", error);
  }
}