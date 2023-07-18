import { Router } from 'express';

import { validateNotFoundProductMiddleware } from '@/middlewares/products';
import { validateJwtTokenMiddleware, validateSchemaMiddleware } from '@/middlewares';
import {
  deleteProduct,
  getProducts,
  getProductsAndCategories,
  getProducts_Favorites_Categories,
  insertProduct,
  updateFavorited,
  updateProduct,
} from '@/controllers/products/productsController';
import { validateIdParamsMiddleware } from '@/middlewares/shared';
import { productsSchemas } from '@/schemas';

const productsRouter = Router();

productsRouter
  .get('/', getProducts)
  .get('/products-categories', getProductsAndCategories)
  .all('/*', validateJwtTokenMiddleware)
  .post('/', validateSchemaMiddleware(productsSchemas.productsSchema), insertProduct)
  .get('/products-favorites-categories', getProducts_Favorites_Categories)
  .get('/:id', validateIdParamsMiddleware, validateNotFoundProductMiddleware, getProducts)
  .patch('/:id', validateIdParamsMiddleware, validateNotFoundProductMiddleware, updateProduct)
  .patch('/favoriteds/:id', validateIdParamsMiddleware, validateNotFoundProductMiddleware, updateFavorited)
  .delete('/:id', validateIdParamsMiddleware, validateNotFoundProductMiddleware, deleteProduct)

  .get('/oferts-day')
  .get('/more-orders');

export { productsRouter };
