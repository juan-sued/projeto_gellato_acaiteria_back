import { OrderBasic, UpdateOrderData } from '@/interfaces/ordersInterfaces';
import { ordersRepository } from '@/repositories';
import { errorFactory } from '@/utils';
import { orders } from '@prisma/client';

async function insertOrder(newOrder: orders) {
  await ordersRepository.insertOrder(newOrder);
}

async function getAllOrders(): Promise<OrderBasic[]> {
  const orders = await ordersRepository.getAllOrders();
  if (!orders) throw errorFactory.notFound('order');

  return orders;
}

async function getOrdersByName(name: string): Promise<OrderBasic[]> {
  const orders: OrderBasic[] = await ordersRepository.getOrdersByFilterName(name);

  if (!orders) throw errorFactory.notFound('order');

  return orders;
}

async function getOrderById(id: number): Promise<orders> {
  const order: orders = await ordersRepository.getOrderById(id);
  if (!order) throw errorFactory.notFound('order');

  return order;
}

async function updateOrder(id: number, updateOrderData: UpdateOrderData) {
  if (!updateOrderData) throw errorFactory.unprocessableEntity(['data inexistent']);

  await ordersRepository.updateOrder(id, updateOrderData);

  return;
}

async function deleteOrder(id: number) {
  await ordersRepository.deleteOrder(id);
}

export { deleteOrder, updateOrder, getOrdersByName, getOrderById, getAllOrders, insertOrder };
