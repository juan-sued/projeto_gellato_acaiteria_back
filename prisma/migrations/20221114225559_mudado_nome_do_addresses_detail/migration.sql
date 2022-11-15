/*
  Warnings:

  - You are about to drop the column `addressesDetail` on the `addresses` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "addresses" DROP COLUMN "addressesDetail",
ADD COLUMN     "addressDetail" VARCHAR(255);
