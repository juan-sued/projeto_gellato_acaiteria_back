import { IProductOrder } from '@/interfaces/ordersInterfaces';
import { categories, products } from '@prisma/client';

import { categoriesService, productsService } from '@/services';
import { Request, Response } from 'express';
import { ProductBasic, UpdateProductData } from '@/interfaces/productsInterfaces';

export async function insertProduct(request: Request, response: Response) {
  const newProduct: IProductOrder = request.body;
  await productsService.insertProduct(newProduct);

  response.sendStatus(201);
}

export async function getProducts(request: Request, response: Response) {
  const { name } = request.query as Record<string, string>;
  const { idParams } = response.locals;
  let result: ProductBasic[] | products = [];
  if (name) result = await productsService.getProductsByName(name);

  if (idParams) result = await productsService.getProductById(idParams);

  if (!name && !idParams) result = await productsService.getAllProducts();

  response.status(200).send(result);
}

export async function getProductsAndCategories(request: Request, response: Response) {
  const products: ProductBasic[] = await productsService.getAllProducts();
  const categories: categories[] = await categoriesService.getAllCategories();

  response.status(200).send({
    products: products,
    categories: categories,
  });
}

export async function updateProduct(req: Request, res: Response) {
  const { idParams } = res.locals;

  const { cupSizeId, image, name, price }: UpdateProductData = req.body;

  const updatedProduct = await productsService.updateProduct(idParams, {
    cupSizeId,
    image,
    name,
    price,
  });

  return res.status(200).send(updatedProduct);
}

export async function deleteProduct(request: Request, response: Response) {
  const { idParams } = response.locals;
  await productsService.deleteProduct(idParams);

  response.sendStatus(200);
}
