import { products } from '@prisma/client';
import { productsService } from '@/services';
import { Request, Response } from 'express';

export async function insertProduct(request: Request, response: Response) {
  const newProduct: products = request.body;
  await productsService.insertProduct(newProduct);

  response.sendStatus(201);
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
