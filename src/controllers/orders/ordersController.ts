import { orders } from '@prisma/client';

import { Request, Response } from 'express';
import { OrderBasic } from '@/interfaces/ordersInterfaces';
import { ordersService } from '@/services';

export async function insertOrder(request: Request, response: Response) {
  const newOrder: orders = request.body;
  await ordersService.insertOrder(newOrder);

  response.sendStatus(201);
}

export async function getOrders(request: Request, response: Response) {
  const { name } = request.query as Record<string, string>;
  const { idParams } = response.locals;
  let result: OrderBasic[] | orders = [];
  if (name) result = await ordersService.getOrdersByName(name);

  if (idParams) result = await ordersService.getOrderById(idParams);

  if (!name && !idParams) result = await ordersService.getAllOrders();

  response.status(200).send(result);
}

export async function updateOrder(req: Request, res: Response) {
  const { idParams } = res.locals;

  const { total, subTotal } = req.body;

  const updatedOrder = await ordersService.updateOrder(idParams, {
    subTotal,
    total,
  });

  return res.status(200).send(updatedOrder);
}

export async function deleteOrder(request: Request, response: Response) {
  const { idParams } = response.locals;
  await ordersService.deleteOrder(idParams);

  response.sendStatus(200);
}
