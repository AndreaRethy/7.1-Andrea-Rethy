-- AlterTable
ALTER TABLE `Publication` ADD COLUMN `image` VARCHAR(191) NOT NULL DEFAULT 'no-image.jpg',
    MODIFY `likeCount` INTEGER NOT NULL DEFAULT 0;
