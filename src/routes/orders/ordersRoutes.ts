import { Router } from 'express';

import { validateIdParamsMiddleware, validateJwtTokenMiddleware, validateSchemaMiddleware } from '@/middlewares';
import { orderSchema } from '@/schemas/ordersSchemas';
import { deleteOrder, getOrders, insertOrder } from '@/controllers/orders/ordersController';
import { validateNotFoundOrderMiddleware } from '@/middlewares/orders';

const ordersRouter = Router();

ordersRouter
  .get('/', getOrders)
  .all('/*', validateJwtTokenMiddleware)
  .post('/', validateSchemaMiddleware(orderSchema), insertOrder)
  .get('/:id', validateIdParamsMiddleware, validateNotFoundOrderMiddleware, getOrders)
  // .patch('/:id', validateIdParamsMiddleware, validateNotFoundOrderMiddleware, updateOrder)
  .delete('/:id', validateIdParamsMiddleware, validateNotFoundOrderMiddleware, deleteOrder);

export { ordersRouter };
