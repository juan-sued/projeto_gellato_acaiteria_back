import { ProductBasic, UpdateProductData } from '@/interfaces/productsInterfaces';
import { productsRepository } from '@/repositories';
import { errorFactory } from '@/utils';
import { products } from '@prisma/client';

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
