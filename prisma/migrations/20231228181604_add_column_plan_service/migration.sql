/*
  Warnings:

  - The values [LIGHT,PRO] on the enum `service_level` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `plan` to the `service` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `service` ADD COLUMN `plan` ENUM('YEARLY', 'MONTHLY') NOT NULL,
    MODIFY `level` ENUM('FREE', 'BASIC', 'ESSENTIAL', 'COMPLETE', 'PREMIUM') NOT NULL;
