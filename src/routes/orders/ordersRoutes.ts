import { Router } from 'express';

import { validateJwtTokenMiddleware, validateSchemaMiddleware } from '@/middlewares';
import { orderSchema } from '@/schemas/ordersSchemas';
import { getOrders, insertOrder } from '@/controllers/orders/ordersController';

const ordersRouter = Router();

ordersRouter
  .get('/', getOrders)
  .all('/*', validateJwtTokenMiddleware)
  .post('/', validateSchemaMiddleware(orderSchema), insertOrder);
// .get('/:id', validateIdParamsMiddleware, validateNotFoundProductMiddleware, getProducts)
// .patch('/:id', validateIdParamsMiddleware, validateNotFoundProductMiddleware, updateProduct)
// .delete('/:id', validateIdParamsMiddleware, validateNotFoundProductMiddleware, deleteProduct);

export { ordersRouter };
