import { orders } from '@prisma/client';
import { Request, Response } from 'express';
import { IOrder, OrderBasic } from '@/interfaces/ordersInterfaces';
import { ordersService } from '@/services';

async function insertOrder(request: Request, response: Response) {
  const { products, details, addressId }: IOrder = request.body;
  const { idUser } = response.locals;
  await ordersService.insertOrder({ products, details, addressId }, idUser);

  response.sendStatus(201);
}

async function getOrders(request: Request, response: Response) {
  const { name } = request.query as Record<string, string>;
  const { idParams } = response.locals;
  let result: OrderBasic[] | orders = [];
  if (name) result = await ordersService.getOrdersByName(name);

  if (idParams) result = await ordersService.getOrderById(idParams);

  if (!name && !idParams) result = await ordersService.getAllOrders();

  response.status(200).send(result);
}

async function updateOrder(req: Request, res: Response) {
  const { idParams } = res.locals;

  const { total, subTotal } = req.body;

  const updatedOrder = await ordersService.updateOrder(idParams, {
    subTotal,
    total,
  });

  return res.status(200).send(updatedOrder);
}

async function deleteOrder(request: Request, response: Response) {
  const { idParams } = response.locals;
  await ordersService.deleteOrder(idParams);

  response.sendStatus(200);
}

export { insertOrder, getOrders, updateOrder, deleteOrder };
