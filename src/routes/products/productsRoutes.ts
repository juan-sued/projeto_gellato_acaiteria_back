import { Router } from 'express';

import { validateNotFoundProductMiddleware, validateConflictProductMiddleware } from '@/middlewares/products';
import { validateJwtTokenMiddleware, validateSchemaMiddleware } from '@/middlewares';
import {
  deleteProduct,
  getProducts,
  getProductsAndCategories,
  insertProduct,
  updateProduct,
} from '@/controllers/products/productsController';
import { validateIdParamsMiddleware } from '@/middlewares/shared';
import { productsSchemas } from '@/schemas';

const productsRouter = Router();

productsRouter
  .get('/', getProducts)
  .all('/*', validateJwtTokenMiddleware)
  .post('/', validateSchemaMiddleware(productsSchemas.productsSchema), insertProduct)
  .get('/products-categories', getProductsAndCategories)
  .get('/:id', validateIdParamsMiddleware, validateNotFoundProductMiddleware, getProducts)
  .patch('/:id', validateIdParamsMiddleware, validateNotFoundProductMiddleware, updateProduct)
  .delete('/:id', validateIdParamsMiddleware, validateNotFoundProductMiddleware, deleteProduct);

export { productsRouter };
