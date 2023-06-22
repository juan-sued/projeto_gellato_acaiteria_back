import { NextFunction, Request, Response } from 'express';
import { errorFactory } from '@/utils';
import { productsRepository } from '@/repositories';

const validateConflictProductMiddleware = async (request: Request, response: Response, next: NextFunction) => {
  const { title } = request.body;
  if (!title) throw errorFactory.unprocessableEntity(['title inexistent']);

  const isRegisteredProduct = await productsRepository.getProductsByFilterName(title);
  console.log(isRegisteredProduct);

  if (isRegisteredProduct.length > 0) throw errorFactory.conflict('Product');

  response.locals.product = isRegisteredProduct;

  next();
};
const validateNotFoundProductMiddleware = async (request: Request, response: Response, next: NextFunction) => {
  const { id } = request.params;

  const isRegisteredProduct = await productsRepository.getProductById(Number(id));

  if (!isRegisteredProduct) throw errorFactory.notFound('Product');

  response.locals.product = isRegisteredProduct;

  next();
};

export { validateConflictProductMiddleware, validateNotFoundProductMiddleware };
