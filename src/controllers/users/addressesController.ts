import { addressesService, productsService } from '@/services';
import { addresses } from '@prisma/client';
import { Request, Response } from 'express';

export async function insertAddress(req: Request, res: Response) {
  const { street, number, city, state, addressesDetail, neighborhood, cep }: addresses = req.body;
  const userId = res.locals.idUser;

  const newAddress = await addressesService.createAddress({
    street,
    number,
    city,
    state,
    addressesDetail,
    neighborhood,
    cep,
    userId,
  });

  return res.status(201).send(newAddress);
}

export async function getAddresses(req: Request, res: Response) {
  const { idParams } = res.locals;
  const { idUser } = res.locals;

  let result: any = [];
  if (idParams) result = await addressesService.getAddressById(idParams);

  if (!idParams) result = await addressesService.getAllAddresses(idUser);

  res.status(200).send(result);
}

export async function updateAddress(request: Request, response: Response) {
  const { idParams } = response.locals;
  const { cep, street, city, state, number, neighborhood, addressesDetail } = request.body;
  const { userId } = response.locals;

  await addressesService.updateAddress(idParams, {
    cep,
    street,
    city,
    state,
    number,
    neighborhood,
    addressesDetail,
    userId,
  });

  response.sendStatus(200);
}

export async function deleteAddress(request: Request, response: Response) {
  const { idParams } = response.locals;

  await addressesService.deleteAddress(idParams);

  response.sendStatus(200);
}
