import { ProductBasic, UpdateProductData } from '@/interfaces/productsInterfaces';
import { productsRepository } from '@/repositories';
import { errorFactory } from '@/utils';
import { ofertsOfDay, products } from '@prisma/client';

async function insertProduct(newProduct: products) {
  await productsRepository.insertProduct(newProduct);
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

async function getProductById(id: string): Promise<products> {
  const product: products = await productsRepository.getProductById(Number(id));
  if (!product) throw errorFactory.notFound('product');

  return product;
}

async function updateProduct(id: string, updateProductData: UpdateProductData) {
  if (!updateProductData) throw errorFactory.unprocessableEntity(['data inexistent']);

  await productsRepository.updateProduct(Number(id), updateProductData);

  return;
}

async function deleteProduct(id: string) {
  await productsRepository.deleteProduct(Number(id));
}

export { deleteProduct, updateProduct, getProductsByName, getProductById, getAllProducts, insertProduct };
