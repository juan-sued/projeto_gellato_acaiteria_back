import { Prisma, order_products } from '@prisma/client';
import { prisma } from '@/databases/postgreSQL';

//=================== GET =====================//

function getAllOrder_Products(): Promise<order_products[]> {
  const params: Prisma.order_productsFindManyArgs = {};

  return prisma.order_products.findMany(params);
}

async function getOrder_ProductById(id: number): Promise<order_products> {
  const order_product = await prisma.order_products.findUnique({
    where: {
      id,
    },
  });

  return order_product;
}

//================= INSERT ===================//

export type InsertOrder_Product = {
  productId: number;
  quantity: number;
};

async function insertOrder_Product({ productId, quantity }: InsertOrder_Product, orderId: number) {
  await prisma.order_products.create({
    data: {
      productId: productId,
      orderId: orderId,
      quantity,
    },
  });
}

//================= UPDATE ===================//

async function updateOrder_Product(id: number, updateOrder_ProductData: order_products) {
  const params: Prisma.order_productsUpdateArgs = {
    where: { id },
    data: updateOrder_ProductData,
  };

  await prisma.order_products.update(params);
}

//================= DELETE ===================//

async function deleteOrder_Product(id: number) {
  await prisma.order_products.delete({ where: { id } });
}

export { insertOrder_Product, getOrder_ProductById, getAllOrder_Products, updateOrder_Product, deleteOrder_Product };
