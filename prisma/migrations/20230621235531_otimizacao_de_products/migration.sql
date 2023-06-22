/*
  Warnings:

  - You are about to drop the column `categories` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `amount` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `categoryId` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `quantityForUnity` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `unitOfMeasure` on the `products` table. All the data in the column will be lost.
  - You are about to alter the column `price` on the `products` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Decimal(65,30)`.
  - You are about to drop the `customizedProducts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `customizedProducts_products` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ofertsOfDay` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[category]` on the table `categories` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `category` to the `categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subTotal` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "customizedProducts" DROP CONSTRAINT "customizedProducts_authorId_fkey";

-- DropForeignKey
ALTER TABLE "customizedProducts_products" DROP CONSTRAINT "customizedProducts_products_productCustomizedId_fkey";

-- DropForeignKey
ALTER TABLE "customizedProducts_products" DROP CONSTRAINT "customizedProducts_products_productId_fkey";

-- DropForeignKey
ALTER TABLE "ofertsOfDay" DROP CONSTRAINT "ofertsDay_productId_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_productId_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_categoryId_fkey";

-- DropIndex
DROP INDEX "categories_categories_key";

-- AlterTable
ALTER TABLE "categories" DROP COLUMN "categories",
ADD COLUMN     "category" VARCHAR(50) NOT NULL;

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "productId",
ADD COLUMN     "status" TEXT NOT NULL,
ADD COLUMN     "subTotal" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "total" DECIMAL(65,30) NOT NULL;

-- AlterTable
ALTER TABLE "products" DROP COLUMN "amount",
DROP COLUMN "categoryId",
DROP COLUMN "description",
DROP COLUMN "quantityForUnity",
DROP COLUMN "title",
DROP COLUMN "unitOfMeasure",
ADD COLUMN     "cupSizeId" INTEGER,
ADD COLUMN     "name" TEXT NOT NULL,
ALTER COLUMN "image" SET DATA TYPE TEXT,
ALTER COLUMN "price" SET DATA TYPE DECIMAL(65,30);

-- DropTable
DROP TABLE "customizedProducts";

-- DropTable
DROP TABLE "customizedProducts_products";

-- DropTable
DROP TABLE "ofertsOfDay";

-- CreateTable
CREATE TABLE "ofertsOfDay" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "price_ofert" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "ofertsOfDay_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stock_products" (
    "id" SERIAL NOT NULL,
    "stockId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "stock_products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_products" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "order_products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stock" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "description" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "unit_of_measure" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "quantity_for_unity" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "stock_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ofertsOfDay_userId_key" ON "ofertsOfDay"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ofertsOfDay_description_key" ON "ofertsOfDay"("description");

-- CreateIndex
CREATE UNIQUE INDEX "stock_title_key" ON "stock"("title");

-- CreateIndex
CREATE UNIQUE INDEX "categories_category_key" ON "categories"("category");

-- AddForeignKey
ALTER TABLE "ofertsOfDay" ADD CONSTRAINT "ofertsOfDay_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ofertsOfDay" ADD CONSTRAINT "ofertsOfDay_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock_products" ADD CONSTRAINT "stock_products_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock_products" ADD CONSTRAINT "stock_products_stockId_fkey" FOREIGN KEY ("stockId") REFERENCES "stock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_products" ADD CONSTRAINT "order_products_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_products" ADD CONSTRAINT "order_products_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock" ADD CONSTRAINT "stock_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
