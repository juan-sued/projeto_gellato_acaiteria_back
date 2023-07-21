import { stockSchemas } from '@/schemas';
import { Router } from 'express';

import { validateIdParamsMiddleware, validateJwtTokenMiddleware, validateSchemaMiddleware } from '@/middlewares';
import {
  deleteStock,
  getStock,
  getStockByCategories,
  insertStock,
  updateStock,
} from '@/controllers/stock/stockController';
import { validateConflictStockMiddleware, validateNotFoundStockMiddleware } from '@/middlewares/stock';

const stockRouter = Router();

stockRouter
  .get('/', getStock)
  .get('/stock-for-categories', getStockByCategories)
  .all('/*', validateJwtTokenMiddleware)
  .post('/', validateSchemaMiddleware(stockSchemas.stockSchema), validateConflictStockMiddleware, insertStock)
  .get('/:id', validateIdParamsMiddleware, validateNotFoundStockMiddleware, getStock)
  .patch(
    '/:id',
    validateIdParamsMiddleware,
    validateSchemaMiddleware(stockSchemas.stockUpdateSchema),
    validateNotFoundStockMiddleware,
    updateStock,
  )
  .delete('/:id', validateIdParamsMiddleware, validateNotFoundStockMiddleware, deleteStock);

export { stockRouter };
