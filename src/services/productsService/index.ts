import { IProductOrder } from './../../interfaces/ordersInterfaces';
import { IProductInsert, ProductBasic, UpdateProductData } from '@/interfaces/productsInterfaces';
import { productsRepository } from '@/repositories';
import { errorFactory } from '@/utils';
import { exclude } from '@/utils/functions-utils';
import { products } from '@prisma/client';

async function insertProduct(product: IProductOrder) {
  const formatedProduct: any = exclude(
    product,
    'complementsIds',
    'flavoursIds',
    'fruitsIds',
    'plusIds',
    'toppingsIds',
    'amount',
  );

  const productCreated = await productsRepository.insertProduct(formatedProduct);

  return productCreated;
}

async function getAllProducts(): Promise<ProductBasic[]> {
  const products = await productsRepository.getAllProducts();
  if (!products) throw errorFactory.notFound('product');

  return products;
}

async function getProductsByName(name: string): Promise<ProductBasic[]> {
  const products: ProductBasic[] = await productsRepository.getProductsByFilterName(name);

  if (!products) throw errorFactory.notFound('product');

  return products;
}

async function getProductById(id: number): Promise<products> {
  const product: products = await productsRepository.getProductById(id);
  if (!product) throw errorFactory.notFound('product');

  return product;
}

async function updateProduct(id: number, updateProductData: UpdateProductData) {
  if (!updateProductData) throw errorFactory.unprocessableEntity(['data inexistent']);

  await productsRepository.updateProduct(id, updateProductData);

  return;
}

async function deleteProduct(id: number) {
  await productsRepository.deleteProduct(id);
}

export { deleteProduct, updateProduct, getProductsByName, getProductById, getAllProducts, insertProduct };
