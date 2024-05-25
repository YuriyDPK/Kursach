-- DropForeignKey
ALTER TABLE `Car` DROP FOREIGN KEY `fk_brandId`;

-- DropForeignKey
ALTER TABLE `Car` DROP FOREIGN KEY `fk_dealerId`;

-- DropForeignKey
ALTER TABLE `Listing` DROP FOREIGN KEY `fk_listing_serviceId`;

-- AlterTable
ALTER TABLE `Car` MODIFY `brandId` INTEGER NULL,
    MODIFY `dealerId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Listing` MODIFY `serviceId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Car` ADD CONSTRAINT `fk_brandId` FOREIGN KEY (`brandId`) REFERENCES `Brand`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Car` ADD CONSTRAINT `fk_dealerId` FOREIGN KEY (`dealerId`) REFERENCES `Dealer`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Listing` ADD CONSTRAINT `fk_listing_serviceId` FOREIGN KEY (`serviceId`) REFERENCES `Service`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
