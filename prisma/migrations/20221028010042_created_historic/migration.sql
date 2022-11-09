/*
  Warnings:

  - You are about to alter the column `userId` on the `adresses` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `SmallInt`.
  - You are about to alter the column `typeCepId` on the `adresses` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `SmallInt`.
  - You are about to alter the column `neighborhoodsId` on the `adresses` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `SmallInt`.
  - You are about to alter the column `userId` on the `favoriteds` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `SmallInt`.
  - You are about to alter the column `productId` on the `favoriteds` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `SmallInt`.
  - You are about to alter the column `userId` on the `feedbacks` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `SmallInt`.
  - You are about to alter the column `cityId` on the `neighborhoods` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `SmallInt`.
  - You are about to alter the column `userId` on the `orders` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `SmallInt`.
  - You are about to alter the column `productId` on the `orders` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `SmallInt`.
  - You are about to alter the column `price` on the `products` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `SmallInt`.
  - You are about to alter the column `categoryId` on the `products` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `SmallInt`.

*/
-- DropForeignKey
ALTER TABLE "adresses" DROP CONSTRAINT "adresses_neighborhoodsId_fkey";

-- DropForeignKey
ALTER TABLE "adresses" DROP CONSTRAINT "adresses_typeCepId_fkey";

-- DropForeignKey
ALTER TABLE "adresses" DROP CONSTRAINT "adresses_userId_fkey";

-- DropForeignKey
ALTER TABLE "favoriteds" DROP CONSTRAINT "favoriteds_productId_fkey";

-- DropForeignKey
ALTER TABLE "favoriteds" DROP CONSTRAINT "favoriteds_userId_fkey";

-- DropForeignKey
ALTER TABLE "feedbacks" DROP CONSTRAINT "feedbacks_userId_fkey";

-- DropForeignKey
ALTER TABLE "neighborhoods" DROP CONSTRAINT "neighborhoods_cityId_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_productId_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_userId_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_categoryId_fkey";

-- AlterTable
ALTER TABLE "adresses" ALTER COLUMN "userId" SET DATA TYPE SMALLINT,
ALTER COLUMN "typeCepId" SET DATA TYPE SMALLINT,
ALTER COLUMN "neighborhoodsId" SET DATA TYPE SMALLINT;

-- AlterTable
ALTER TABLE "favoriteds" ALTER COLUMN "userId" SET DATA TYPE SMALLINT,
ALTER COLUMN "productId" SET DATA TYPE SMALLINT;

-- AlterTable
ALTER TABLE "feedbacks" ALTER COLUMN "userId" SET DATA TYPE SMALLINT;

-- AlterTable
ALTER TABLE "neighborhoods" ALTER COLUMN "cityId" SET DATA TYPE SMALLINT;

-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "userId" SET DATA TYPE SMALLINT,
ALTER COLUMN "productId" SET DATA TYPE SMALLINT;

-- AlterTable
ALTER TABLE "products" ALTER COLUMN "price" SET DATA TYPE SMALLINT,
ALTER COLUMN "categoryId" SET DATA TYPE SMALLINT;

-- CreateTable
CREATE TABLE "stock" (
    "id" SERIAL NOT NULL,
    "productId" SMALLINT NOT NULL,
    "availables" SMALLINT NOT NULL,
    "isDelivered" DATE NOT NULL,
    "notes" TEXT NOT NULL,

    CONSTRAINT "stock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "historic" (
    "id" SERIAL NOT NULL,
    "productId" SMALLINT NOT NULL,
    "salesCounter" INTEGER NOT NULL,
    "dataSold" DATE NOT NULL,
    "notes" TEXT NOT NULL,
    "productValue" SMALLINT NOT NULL,

    CONSTRAINT "historic_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "feedbacks" ADD CONSTRAINT "feedbacks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favoriteds" ADD CONSTRAINT "favoriteds_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favoriteds" ADD CONSTRAINT "favoriteds_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "adresses" ADD CONSTRAINT "adresses_neighborhoodsId_fkey" FOREIGN KEY ("neighborhoodsId") REFERENCES "neighborhoods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "adresses" ADD CONSTRAINT "adresses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "adresses" ADD CONSTRAINT "adresses_typeCepId_fkey" FOREIGN KEY ("typeCepId") REFERENCES "typesCep"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "neighborhoods" ADD CONSTRAINT "neighborhoods_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "cities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock" ADD CONSTRAINT "stock_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "historic" ADD CONSTRAINT "historic_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
