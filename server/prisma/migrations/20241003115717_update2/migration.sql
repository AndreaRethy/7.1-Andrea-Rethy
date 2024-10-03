-- AlterTable
ALTER TABLE `Publication` ADD COLUMN `isDeleted` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `isBanned` BOOLEAN NOT NULL DEFAULT false;
