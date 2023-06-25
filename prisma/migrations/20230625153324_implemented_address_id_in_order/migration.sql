/*
  Warnings:

  - Added the required column `addressId` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Made the column `cupSizeId` on table `products` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "order_products" DROP CONSTRAINT "order_products_orderId_fkey";

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "addressId" SMALLINT NOT NULL;

-- AlterTable
ALTER TABLE "products" ALTER COLUMN "cupSizeId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "order_products" ADD CONSTRAINT "order_products_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
