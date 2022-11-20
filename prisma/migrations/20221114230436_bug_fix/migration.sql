/*
  Warnings:

  - You are about to alter the column `city` on the `addresses` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(254)`.

*/
-- AlterTable
ALTER TABLE "addresses" ALTER COLUMN "city" SET DATA TYPE VARCHAR(254);
