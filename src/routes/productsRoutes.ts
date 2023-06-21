import { Router } from 'express';

import { validateNotFoundProductMiddleware, validateConflictProductMiddleware } from '@/middlewares/productsMiddleware';
import { validateJwtTokenMiddleware, validateSchemaMiddleware } from '@/middlewares';
import { deleteProduct, getProducts, insertProduct, updateProduct } from '@/controllers/productsController';
import { productSchemas } from '@/schemas';

const productsRouter = Router();

productsRouter
  .all('/*', validateJwtTokenMiddleware)
  .post('/', validateSchemaMiddleware(productSchemas.productSchemas), validateConflictProductMiddleware, insertProduct)
  .get('/', getProducts)
  .get('/:id', validateNotFoundProductMiddleware, getProducts)
  .patch('/:id', validateNotFoundProductMiddleware, updateProduct)
  .delete('/:id', validateNotFoundProductMiddleware, deleteProduct);

export { productsRouter };
