-- CreateTable
CREATE TABLE `company` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(45) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `business_name` VARCHAR(255) NOT NULL,
    `document` VARCHAR(14) NOT NULL,
    `address` VARCHAR(255) NULL,
    `zip_code` VARCHAR(8) NULL,
    `phone` VARCHAR(14) NULL,
    `email` VARCHAR(255) NOT NULL,
    `status` ENUM('ACTIVE', 'INACTIVE') NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `uuid_UNIQUE`(`uuid`),
    UNIQUE INDEX `document_UNIQUE`(`document`),
    UNIQUE INDEX `email_UNIQUE`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `company_service` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(45) NOT NULL,
    `api_key` VARCHAR(45) NOT NULL,
    `company_id` BIGINT NOT NULL,
    `service_id` BIGINT NOT NULL,
    `status` ENUM('PENDING', 'ACTIVE', 'BLOCKED', 'CLOSED') NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `uuid_UNIQUE`(`uuid`),
    UNIQUE INDEX `api_key_UNIQUE`(`api_key`),
    INDEX `fk_company_service_company_idx`(`company_id`),
    INDEX `fk_company_service_service_idx`(`service_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `service` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(45) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NULL,
    `level` ENUM('FREE', 'BASIC', 'ESSENTIAL', 'COMPLETE', 'PREMIUM') NOT NULL,
    `plan` ENUM('YEARLY', 'MONTHLY') NOT NULL,
    `status` ENUM('ACTIVE', 'INACTIVE') NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `uuid_UNIQUE`(`uuid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(45) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `document` VARCHAR(14) NOT NULL,
    `username` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NULL,
    `password` VARCHAR(255) NOT NULL,
    `status` ENUM('ACTIVE', 'INACTIVE') NOT NULL,
    `access_level` ENUM('ADMIN', 'CUSTOMER', 'EMPLOYEE') NOT NULL,
    `company_id` BIGINT NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `uuid_UNIQUE`(`uuid`),
    UNIQUE INDEX `document_UNIQUE`(`document`),
    UNIQUE INDEX `username_UNIQUE`(`username`),
    UNIQUE INDEX `email_UNIQUE`(`email`),
    INDEX `fk_user_company_idx`(`company_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `company_service` ADD CONSTRAINT `fk_company_service_company` FOREIGN KEY (`company_id`) REFERENCES `company`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `company_service` ADD CONSTRAINT `fk_company_service_service` FOREIGN KEY (`service_id`) REFERENCES `service`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `fk_company_user` FOREIGN KEY (`company_id`) REFERENCES `company`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
