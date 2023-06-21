/*
  Warnings:

  - You are about to drop the column `cupsizeid` on the `customizedProducts` table. All the data in the column will be lost.
  - Added the required column `authorId` to the `customizedProducts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cupsizeId` to the `customizedProducts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "customizedProducts" DROP COLUMN "cupsizeid",
ADD COLUMN     "authorId" INTEGER NOT NULL,
ADD COLUMN     "cupsizeId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "customizedProducts" ADD CONSTRAINT "customizedProducts_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
