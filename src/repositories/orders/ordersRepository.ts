import { Prisma, orders, products } from '@prisma/client';
import { prisma } from '@/databases/postgreSQL';
import { OrderBasic, UpdateOrderData } from '@/interfaces/ordersInterfaces';

//=================== GET =====================//

function getAllOrders(): Promise<OrderBasic[]> {
  const params: Prisma.ordersFindManyArgs = {
    select: {
      id: true,
      createdAt: true,
      status: true,
      subTotal: true,
    },
  };

  return prisma.orders.findMany(params);
}
async function getOrderById(id: number): Promise<orders> {
  const order = await prisma.orders.findUnique({
    where: {
      id,
    },
  });

  return order;
}
function getOrdersByFilterName(name: string): Promise<OrderBasic[]> {
  const params: Prisma.ordersFindManyArgs = {
    where: {
      products: {
        some: {
          product: {
            name: {
              startsWith: name,
              mode: 'insensitive',
            },
          },
        },
      },
    },
  };
  return prisma.orders.findMany(params);
}

//================= INSERT ===================//

async function insertOrder(newOrder: orders) {
  await prisma.orders.create({
    data: newOrder,
  });
}

async function updateOrder(id: number, updateOrderData: UpdateOrderData) {
  const params: Prisma.ordersUpdateArgs = {
    where: { id },
    data: updateOrderData,
  };

  await prisma.orders.update(params);
}

//================= DELETE ===================//

async function deleteOrder(id: number) {
  await prisma.orders.delete({ where: { id } });
}

export { insertOrder, getOrderById, getAllOrders, getOrdersByFilterName, updateOrder, deleteOrder };
