-- DropForeignKey
ALTER TABLE "stock_products" DROP CONSTRAINT "stock_products_stockId_fkey";

-- AddForeignKey
ALTER TABLE "stock_products" ADD CONSTRAINT "stock_products_stockId_fkey" FOREIGN KEY ("stockId") REFERENCES "stock"("id") ON DELETE CASCADE ON UPDATE CASCADE;
