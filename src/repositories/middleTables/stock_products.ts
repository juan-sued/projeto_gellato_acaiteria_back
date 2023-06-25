import { Prisma, stock_products } from '@prisma/client';
import { prisma } from '@/databases/postgreSQL';

//=================== GET =====================//

function getAllStock_Products(): Promise<stock_products[]> {
  const params: Prisma.stock_productsFindManyArgs = {};

  return prisma.stock_products.findMany(params);
}

async function getStock_ProductById(id: number): Promise<stock_products> {
  const stock_product = await prisma.stock_products.findUnique({
    where: {
      id,
    },
  });

  return stock_product;
}

//================= INSERT ===================//

async function insertStock_Product(productId: number, stockId: number) {
  await prisma.stock_products.create({
    data: {
      productId: productId,
      stockId: stockId,
    },
  });
}

//================= UPDATE ===================//

async function updateStock_Product(id: number, updateStock_ProductData: stock_products) {
  const params: Prisma.stock_productsUpdateArgs = {
    where: { id },
    data: updateStock_ProductData,
  };

  await prisma.stock_products.update(params);
}

//================= DELETE ===================//

async function deleteStock_Product(id: number) {
  await prisma.stock_products.delete({ where: { id } });
}

export { insertStock_Product, getStock_ProductById, getAllStock_Products, updateStock_Product, deleteStock_Product };
