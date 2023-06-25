import { NextFunction, Request, Response } from 'express';
import { errorFactory } from '@/utils';
import { ordersRepository } from '@/repositories';

const validateConflictOrderMiddleware = async (request: Request, response: Response, next: NextFunction) => {
  const { title } = request.body;
  if (!title) throw errorFactory.unprocessableEntity(['title inexistent']);

  const isRegisteredOrder = await ordersRepository.getOrdersByFilterName(title);
  console.log(isRegisteredOrder);

  if (isRegisteredOrder.length > 0) throw errorFactory.conflict('Order');

  response.locals.order = isRegisteredOrder;

  next();
};
const validateNotFoundOrderMiddleware = async (request: Request, response: Response, next: NextFunction) => {
  const { idParams } = response.locals;

  const isRegisteredOrder = await ordersRepository.getOrderById(idParams);

  if (!isRegisteredOrder) throw errorFactory.notFound('Order');

  response.locals.order = isRegisteredOrder;

  next();
};

export { validateConflictOrderMiddleware, validateNotFoundOrderMiddleware };
