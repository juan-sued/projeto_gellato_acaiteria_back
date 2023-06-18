import { Request, Response } from 'express';
import { deleteProductService, updateProductService } from '@/services/productsService';

export async function getProductsController(request: Request, response: Response) {
  const { name } = request.query as Record<string, string>;
  const { id } = request.params;
  // const products = await getProductsService(name, id);
  // response.status(200).send(products);
}

export async function updateProductController(request: Request, response: Response) {
  const { idProduct } = response.locals;
  const updateProductData = request.body;
  await updateProductService(idProduct, updateProductData);

  response.sendStatus(200);
}

export async function deleteProductController(request: Request, response: Response) {
  const { idProduct } = response.locals;

  await deleteProductService(idProduct);

  response.sendStatus(200);
}
