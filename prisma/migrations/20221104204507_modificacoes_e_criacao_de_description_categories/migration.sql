/*
  Warnings:

  - You are about to alter the column `category` on the `categories` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `VarChar(50)`.
  - You are about to drop the column `starts` on the `feedbacks` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `historic` table. All the data in the column will be lost.
  - You are about to drop the column `isDelivered` on the `stock` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[description]` on the table `categories` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `description` to the `categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stars` to the `feedbacks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `purchaseDate` to the `stock` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "description" VARCHAR(100) NOT NULL,
ALTER COLUMN "category" SET DATA TYPE VARCHAR(50);

-- AlterTable
ALTER TABLE "feedbacks" DROP COLUMN "starts",
ADD COLUMN     "stars" VARCHAR(3) NOT NULL;

-- AlterTable
ALTER TABLE "historic" DROP COLUMN "notes";

-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "isDelivered" DROP NOT NULL,
ALTER COLUMN "isDelivered" SET DATA TYPE TIMESTAMP;

-- AlterTable
ALTER TABLE "stock" DROP COLUMN "isDelivered",
ADD COLUMN     "purchaseDate" DATE NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "categories_description_key" ON "categories"("description");
