/*
  Warnings:

  - You are about to drop the column `availables` on the `stock` table. All the data in the column will be lost.
  - Added the required column `quantityPerCup` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `stock` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products" ADD COLUMN     "quantityPerCup" DECIMAL NOT NULL;

-- AlterTable
ALTER TABLE "stock" DROP COLUMN "availables",
ADD COLUMN     "quantity" INTEGER NOT NULL;
