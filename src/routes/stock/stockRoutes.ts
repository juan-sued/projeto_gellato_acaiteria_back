import { stockSchema } from '@/schemas';
import { Router } from 'express';

import { validateJwtTokenMiddleware, validateSchemaMiddleware } from '@/middlewares';
import { getStocks, insertStock } from '@/controllers/stock/stockController';
import { validateConflictStockMiddleware } from '@/middlewares/stock';

const stockRouter = Router();

stockRouter
  .get('/', getStocks)
  .all('/*', validateJwtTokenMiddleware)
  .post('/', validateSchemaMiddleware(stockSchema.stockSchema), validateConflictStockMiddleware, insertStock);
// .get('/:id', validateIdParamsMiddleware, validateNotFoundStockMiddleware, getStock)
// .patch('/:id', validateIdParamsMiddleware, validateNotFoundStockMiddleware, updateStock)
// .delete('/:id', validateIdParamsMiddleware, validateNotFoundStockMiddleware, deleteStock);

export { stockRouter };
