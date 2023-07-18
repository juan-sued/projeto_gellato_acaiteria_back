/*
  Warnings:

  - Added the required column `showFinal` to the `ofertsOfDay` table without a default value. This is not possible if the table is not empty.
  - Added the required column `showInit` to the `ofertsOfDay` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ofertsOfDay" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "showFinal" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "showInit" TIMESTAMP(3) NOT NULL;
