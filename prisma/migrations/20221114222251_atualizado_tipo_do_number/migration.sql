/*
  Warnings:

  - You are about to alter the column `cep` on the `addresses` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(10)`.
  - You are about to alter the column `state` on the `addresses` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(2)`.
  - Changed the type of `number` on the `addresses` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "addresses" ALTER COLUMN "cep" SET DATA TYPE VARCHAR(10),
ALTER COLUMN "state" SET DATA TYPE VARCHAR(2),
DROP COLUMN "number",
ADD COLUMN     "number" SMALLINT NOT NULL;
