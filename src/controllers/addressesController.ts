import { addressesService, productsService } from '@/services';
import { addresses } from '@prisma/client';
import { Request, Response } from 'express';

export async function insertAddress(req: Request, res: Response) {
  try {
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
  } catch (error) {
    console.error('Error creating address:', error);
    return res.status(500).send({ error: 'Failed to create address' });
  }
}

export async function getProducts(request: Request, response: Response) {
  const { name } = request.query as Record<string, string>;
  const { id } = request.params;
  let result: any = [];

  if (name) result = await productsService.getOfertsDayByName(name);

  if (id) result = await productsService.getProductById(id);

  if (!name && !id) result = await productsService.getAllProducts();

  response.status(200).send(result);
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
