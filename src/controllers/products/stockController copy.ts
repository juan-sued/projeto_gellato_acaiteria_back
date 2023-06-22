import { products } from '@prisma/client';
import { productsService } from '@/services';
import { Request, Response } from 'express';
import { ProductBasic } from '@/interfaces/productsInterfaces';

export async function insertProduct(request: Request, response: Response) {
  const newProduct: products = request.body;
  await productsService.insertProduct(newProduct);

  response.sendStatus(201);
}

export async function getProducts(request: Request, response: Response) {
  const { name } = request.query as Record<string, string>;
  const { id } = request.params;
  let result: ProductBasic[] | products = [];
  if (name) result = await productsService.getProductsByName(name);

  if (id) result = await productsService.getProductById(id);

  if (!name && !id) result = await productsService.getAllProducts();

  response.status(200).send(result);
}

export async function updateProduct(req: Request, res: Response) {
  const { id } = req.params;
  const { title, image, price, description, categoryId, unitOfMeasure, amount, quantityForUnity } = req.body;

  const updatedProduct = await productsService.updateProduct(id, {
    title,
    image,
    price,
    description,
    categoryId,
    unitOfMeasure,
    amount,
    quantityForUnity,
  });

  return res.status(200).send(updatedProduct);
}

export async function deleteProduct(request: Request, response: Response) {
  const { id } = request.params;
  console.log('entrou');
  await productsService.deleteProduct(id);

  response.sendStatus(200);
}
