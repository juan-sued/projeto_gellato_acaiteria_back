import { IOrder } from './../../interfaces/ordersInterfaces';
import { OrderBasic, UpdateOrderData } from '@/interfaces/ordersInterfaces';
import { order_products, ordersRepository } from '@/repositories';
import { errorFactory } from '@/utils';
import { orders } from '@prisma/client';
import { productsService } from '..';
import { InsertOrder } from '@/repositories/orders/ordersRepository';

async function insertOrder({ products, details, addressId }: IOrder, userId: number) {
  interface ProductsAvaiable {
    productId: number;
    quantity: number;
  }
  const productsAvaiables: ProductsAvaiable[] = [];

  for (const product of products) {
    const productCreated = await productsService.insertProduct(product);
    if (productCreated)
      productsAvaiables.push({
        productId: productCreated.id,
        quantity: product.amount,
      });
  }

  const newOrder: InsertOrder = {
    userId,
    total: details.total,
    subTotal: details.subtTotal,
    addressId,
  };
  const order = await ordersRepository.insertOrder(newOrder);

  for (const product of productsAvaiables) await order_products.insertOrder_Product(product, order.id);
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
