-- DropIndex
DROP INDEX `Publication_content_key` ON `Publication`;

-- AlterTable
ALTER TABLE `Publication` MODIFY `content` TEXT NOT NULL;
