import { NextFunction, Request, Response } from 'express';
import { errorFactory } from '@/utils';
import { stockRepository } from '@/repositories';

const validateConflictStockMiddleware = async (request: Request, response: Response, next: NextFunction) => {
  const { title } = request.body;
  if (!title) throw errorFactory.unprocessableEntity(['title inexistent']);

  const isRegisteredStock = await stockRepository.getStockByFilterName(title);
  console.log(isRegisteredStock);

  if (isRegisteredStock.length > 0) throw errorFactory.conflict('Stock');

  response.locals.product = isRegisteredStock;

  next();
};
const validateNotFoundStockMiddleware = async (request: Request, response: Response, next: NextFunction) => {
  const { id } = request.params;

  const isRegisteredStock = await stockRepository.getStockById(Number(id));

  if (!isRegisteredStock) throw errorFactory.notFound('Stock');

  response.locals.product = isRegisteredStock;

  next();
};

export { validateConflictStockMiddleware, validateNotFoundStockMiddleware };
