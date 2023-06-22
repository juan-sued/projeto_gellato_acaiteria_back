/*
  Warnings:

  - You are about to drop the column `category` on the `categories` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `categories` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `categories` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "categories_category_key";

-- AlterTable
ALTER TABLE "categories" DROP COLUMN "category",
ADD COLUMN     "name" VARCHAR(50) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "categories"("name");
