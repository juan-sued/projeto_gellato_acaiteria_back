import { validateIdParamsMiddleware } from '@/middlewares/shared';
import { Router } from 'express';
import { deleteAddress, getAddresses, insertAddress, updateAddress } from '@/controllers/users/addressesController';
import { validateJwtTokenMiddleware, validateSchemaMiddleware } from '@/middlewares';
import { addressesSchemas } from '@/schemas';

const addressesRouter = Router();

addressesRouter
  .all('*', validateJwtTokenMiddleware)
  .all('/:id', validateIdParamsMiddleware)
  .post('/', validateSchemaMiddleware(addressesSchemas.postAddressSchema), insertAddress)
  .get('/', getAddresses)
  .get('/:id', getAddresses)
  .patch('/:id', updateAddress)
  .delete('/:id', deleteAddress);

export { addressesRouter };
