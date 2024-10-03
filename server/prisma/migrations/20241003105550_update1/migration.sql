/*
  Warnings:

  - You are about to drop the column `modifiedAt` on the `Publication` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `Publication` table. All the data in the column will be lost.
  - Added the required column `authorname` to the `Publication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Publication` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Publication` DROP FOREIGN KEY `Publication_username_fkey`;

-- AlterTable
ALTER TABLE `Publication` DROP COLUMN `modifiedAt`,
    DROP COLUMN `username`,
    ADD COLUMN `authorname` VARCHAR(191) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- CreateTable
CREATE TABLE `_LikedPosts` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_LikedPosts_AB_unique`(`A`, `B`),
    INDEX `_LikedPosts_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Publication` ADD CONSTRAINT `Publication_authorname_fkey` FOREIGN KEY (`authorname`) REFERENCES `User`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_LikedPosts` ADD CONSTRAINT `_LikedPosts_A_fkey` FOREIGN KEY (`A`) REFERENCES `Publication`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_LikedPosts` ADD CONSTRAINT `_LikedPosts_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
