import { Prisma, orders, products } from '@prisma/client';
import { prisma } from '@/databases/postgreSQL';
import { OrderBasic, UpdateOrderData } from '@/interfaces/ordersInterfaces';

//=================== GET =====================//

function getAllOrders(): Promise<OrderBasic[]> {
  const params: Prisma.ordersFindManyArgs = {
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  };

  return prisma.orders.findMany(params);
}
async function getOrderById(id: number): Promise<orders> {
  const order = await prisma.orders.findUnique({
    where: {
      id,
    },

    include: {
      address: {
        select: {
          cep: true,
          state: true,
          city: true,
          neighborhood: true,
          street: true,
          number: true,
          addressesDetail: true,
        },
      },
      products: {
        select: {
          product: {
            select: {
              id: true,
              name: true,
              image: true,
              cupSize: {
                select: {
                  quantity_for_unity: true,
                },
              },
            },
          },
          quantity: true,
        },
      },
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

export interface InsertOrder {
  userId: number;
  addressId: number;
  total: number | Prisma.Decimal;
  subTotal: number | Prisma.Decimal;
}

async function insertOrder(newOrder: InsertOrder): Promise<orders> {
  const order = await prisma.orders.create({
    data: newOrder,
  });

  return order;
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
