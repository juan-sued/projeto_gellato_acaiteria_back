/*
  Warnings:

  - You are about to drop the column `category` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `feedback` on the `feedbacks` table. All the data in the column will be lost.
  - You are about to drop the column `isOfertOfDay` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `quantityPerCup` on the `products` table. All the data in the column will be lost.
  - You are about to drop the `historic` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `stock` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[categories]` on the table `categories` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `categories` to the `categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amount` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantityForUnity` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unitOfMeasure` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "historic" DROP CONSTRAINT "historic_productId_fkey";

-- DropForeignKey
ALTER TABLE "stock" DROP CONSTRAINT "stock_productId_fkey";

-- DropIndex
DROP INDEX "categories_category_key";

-- AlterTable
ALTER TABLE "categories" DROP COLUMN "category",
ADD COLUMN     "categories" VARCHAR(50) NOT NULL;

-- AlterTable
ALTER TABLE "feedbacks" DROP COLUMN "feedback",
ADD COLUMN     "feedbacks" TEXT;

-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "products" DROP COLUMN "isOfertOfDay",
DROP COLUMN "quantityPerCup",
ADD COLUMN     "amount" INTEGER NOT NULL,
ADD COLUMN     "quantityForUnity" DECIMAL NOT NULL,
ADD COLUMN     "unitOfMeasure" VARCHAR(20) NOT NULL,
ALTER COLUMN "price" SET DATA TYPE DECIMAL;

-- DropTable
DROP TABLE "historic";

-- DropTable
DROP TABLE "stock";

-- CreateTable
CREATE TABLE "ofertsDay" (
    "id" SERIAL NOT NULL,
    "productId" SMALLINT NOT NULL,
    "description" VARCHAR(100) NOT NULL,
    "priceOfert" DECIMAL NOT NULL,

    CONSTRAINT "ofertsDay_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customizedProducts_products" (
    "id" SERIAL NOT NULL,
    "productCustomizedId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "customizedProducts_products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customizedProducts" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "cupsizeid" INTEGER NOT NULL,

    CONSTRAINT "customizedProducts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ofertsDay_description_key" ON "ofertsDay"("description");

-- CreateIndex
CREATE UNIQUE INDEX "categories_categories_key" ON "categories"("categories");

-- AddForeignKey
ALTER TABLE "ofertsDay" ADD CONSTRAINT "ofertsDay_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customizedProducts_products" ADD CONSTRAINT "customizedProducts_products_productCustomizedId_fkey" FOREIGN KEY ("productCustomizedId") REFERENCES "customizedProducts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customizedProducts_products" ADD CONSTRAINT "customizedProducts_products_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
