-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_cupSizeId_fkey" FOREIGN KEY ("cupSizeId") REFERENCES "stock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
