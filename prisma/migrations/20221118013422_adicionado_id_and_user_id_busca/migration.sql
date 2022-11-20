/*
  Warnings:

  - A unique constraint covering the columns `[id,userId]` on the table `addresses` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "addresses_id_userId_key" ON "addresses"("id", "userId");
