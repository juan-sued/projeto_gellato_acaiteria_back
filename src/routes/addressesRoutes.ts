import { Router } from 'express';
import validateJwtTokenMiddleware from '@/middlewares/validateJwtTokenMiddleware';
import { getAddresses, insertAddress } from '@/controllers/addressesController';

const addressesRouter = Router();

addressesRouter
  .all('*', validateJwtTokenMiddleware)
  .post('/', insertAddress)
  .get('/', getAddresses)
  .get('/:id', getAddresses);

export { addressesRouter };
