import { Router } from 'express';
import { getAddresses, insertAddress } from '@/controllers/addressesController';
import { validateJwtTokenMiddleware } from '@/middlewares';

const addressesRouter = Router();

addressesRouter
  .all('*', validateJwtTokenMiddleware)
  .post('/', insertAddress)
  .get('/', getAddresses)
  .get('/:id', getAddresses);

export { addressesRouter };
