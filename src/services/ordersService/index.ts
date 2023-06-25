import { IOrder } from './../../interfaces/ordersInterfaces';
import { OrderBasic, UpdateOrderData } from '@/interfaces/ordersInterfaces';
import { ordersRepository, stock_products } from '@/repositories';
import { errorFactory } from '@/utils';
import { orders } from '@prisma/client';
import { productsService } from '..';

async function insertOrder({ products, details }: IOrder) {
  for (const product of products) await productsService.insertProduct(product);

  // relacionar ingredientes com o product através da tabela stock_product - tabela stock_product

  //
  //
  //
}

// relacionar ingredientes com o product através da tabela stock_product - tabela stock_product
// relacionar o product com order através da tabela order_products - tabela order_products
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
