-- AlterTable
ALTER TABLE `Company` ADD COLUMN     `state` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN     `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
