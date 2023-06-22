import { Router } from 'express';

import { validateJwtTokenMiddleware, validateSchemaMiddleware } from '@/middlewares';
import { orderSchema } from '@/schemas/ordersSchemas';

const ordersRouter = Router();

ordersRouter
  //.get('/', getProducts)
  .all('/*', validateJwtTokenMiddleware)
  .post('/', validateSchemaMiddleware(orderSchema));
// .get('/:id', validateIdParamsMiddleware, validateNotFoundProductMiddleware, getProducts)
// .patch('/:id', validateIdParamsMiddleware, validateNotFoundProductMiddleware, updateProduct)
// .delete('/:id', validateIdParamsMiddleware, validateNotFoundProductMiddleware, deleteProduct);

export { ordersRouter };
