import { Router } from 'express';

import validateJwtTokenMiddleware from '@/middlewares/validateJwtTokenMiddleware';
import { productsController } from '@/controllers';

const productsRouter = Router();

productsRouter
  .all('/*', validateJwtTokenMiddleware)
  .post('/', productsController.insertProduct)
  .get('/', productsController.getProducts)
  .get('/:id', productsController.getProducts)
  .patch('/', productsController.updateProduct)
  .delete('/', productsController.deleteProduct);

export { productsRouter };
