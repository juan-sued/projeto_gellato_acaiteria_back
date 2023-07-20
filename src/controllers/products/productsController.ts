import { IProductOrder } from '@/interfaces/ordersInterfaces';
import { products } from '@prisma/client';

import { favoritedsServices, productsService } from '@/services';
import { Request, Response } from 'express';
import { ProductBasic, ProductsAndCategories, UpdateProductData } from '@/interfaces/productsInterfaces';

export async function insertProduct(request: Request, response: Response) {
  const newProduct: IProductOrder = request.body;
  await productsService.insertProduct(newProduct);

  response.sendStatus(201);
}

export async function getProducts(request: Request, response: Response) {
  const { name } = request.query as Record<string, string>;
  const { idParams } = response.locals;
  let result: ProductBasic[] | products | any = [];
  if (name) result = await productsService.getProductsByName(name);

  if (idParams) result = await productsService.getProductById(idParams);

  if (!name && !idParams) result = await productsService.getAllProducts();

  response.status(200).send(result);
}

export async function getProducts_Favorites_Categories(request: Request, response: Response) {
  const { idUser } = response.locals;

  const products: ProductsAndCategories = await productsService.getProducts_Favorites_Categories(idUser);

  response.status(200).send(products);
}

export async function getProductsAndCategories(request: Request, response: Response) {
  const products: ProductsAndCategories = await productsService.getProductsAndCategories();

  response.status(200).send(products);
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

export async function updateFavorited(req: Request, res: Response) {
  const { idParams } = res.locals;
  const { idUser } = res.locals;

  const updatedFavorited = await favoritedsServices.updateFavorited(idParams, idUser);

  return res.status(200).send(updatedFavorited);
}

export async function deleteProduct(request: Request, response: Response) {
  const { idParams } = response.locals;
  await productsService.deleteProduct(idParams);

  response.sendStatus(200);
}
