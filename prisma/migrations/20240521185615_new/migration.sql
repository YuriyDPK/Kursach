/*
  Warnings:

  - You are about to drop the `_MechanicServices` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_MechanicServices` DROP FOREIGN KEY `_MechanicServices_A_fkey`;

-- DropForeignKey
ALTER TABLE `_MechanicServices` DROP FOREIGN KEY `_MechanicServices_B_fkey`;

-- DropTable
DROP TABLE `_MechanicServices`;

-- CreateTable
CREATE TABLE `MechanicServices` (
    `mechanicId` INTEGER NOT NULL,
    `serviceId` INTEGER NOT NULL,

    PRIMARY KEY (`mechanicId`, `serviceId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MechanicServices` ADD CONSTRAINT `MechanicServices_mechanicId_fkey` FOREIGN KEY (`mechanicId`) REFERENCES `Mechanic`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MechanicServices` ADD CONSTRAINT `MechanicServices_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `Service`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
