/*
  Warnings:

  - You are about to drop the column `typeCep` on the `adresses` table. All the data in the column will be lost.
  - Added the required column `typeCepId` to the `adresses` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `neighborhoodsId` on the `adresses` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "adresses" DROP COLUMN "typeCep",
ADD COLUMN     "typeCepId" INTEGER NOT NULL,
DROP COLUMN "neighborhoodsId",
ADD COLUMN     "neighborhoodsId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "typesCep" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(150) NOT NULL,

    CONSTRAINT "typesCep_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "neighborhoods" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "cityId" INTEGER NOT NULL,

    CONSTRAINT "neighborhoods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cities" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(120) NOT NULL,
    "uf" VARCHAR(3) NOT NULL,

    CONSTRAINT "cities_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "typesCep_name_key" ON "typesCep"("name");

-- CreateIndex
CREATE UNIQUE INDEX "neighborhoods_name_key" ON "neighborhoods"("name");

-- CreateIndex
CREATE UNIQUE INDEX "cities_name_key" ON "cities"("name");

-- CreateIndex
CREATE UNIQUE INDEX "cities_uf_key" ON "cities"("uf");

-- AddForeignKey
ALTER TABLE "favoriteds" ADD CONSTRAINT "favoriteds_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favoriteds" ADD CONSTRAINT "favoriteds_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "adresses" ADD CONSTRAINT "adresses_neighborhoodsId_fkey" FOREIGN KEY ("neighborhoodsId") REFERENCES "neighborhoods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "adresses" ADD CONSTRAINT "adresses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "adresses" ADD CONSTRAINT "adresses_typeCepId_fkey" FOREIGN KEY ("typeCepId") REFERENCES "typesCep"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "neighborhoods" ADD CONSTRAINT "neighborhoods_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "cities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
