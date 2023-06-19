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
  const { id } = req.params;
  const { idUser } = res.locals;

  let result: any = [];
  if (id) result = await addressesService.getAddressById(id);

  if (!id) result = await addressesService.getAllAddresses(idUser);

  res.status(200).send(result);
}

export async function updateProduct(request: Request, response: Response) {
  const { idProduct } = response.locals;
  const updateProductData = request.body;
  await productsService.updateProduct(idProduct, updateProductData);

  response.sendStatus(200);
}

export async function deleteProduct(request: Request, response: Response) {
  const { idProduct } = response.locals;

  await productsService.deleteProduct(idProduct);

  response.sendStatus(200);
}
