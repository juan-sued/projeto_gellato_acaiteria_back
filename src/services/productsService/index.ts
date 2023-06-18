import { ProductBasic, UpdateProductData } from '@/interfaces/productsInterfaces';
import { productsRepository } from '@/repositories';
import { errorFactory } from '@/utils';
import { addresses, products } from '@prisma/client';
import bcrypt from 'bcrypt';

const productExample: ProductBasic = {
  id: 1,
  title: 'name',
  image: 'http://asdasdasd',
};

async function getAllProducts(name: string, id: string): Promise<ProductBasic[]> {
  const products = await productsRepository.getAllProducts();
  if (!products) throw errorFactory.notFound('product');

  return products;
}

async function getProductsByName(name: string, id: string): Promise<ProductBasic[]> {
  const products: ProductBasic[] = await productsRepository.getProductsByFilterName(name);

  if (!products) throw errorFactory.notFound('product');

  return products;
}

async function getProductById(name: string, id: string): Promise<products> {
  const product: products = await productsRepository.getProductById(Number(id));
  if (!product) throw errorFactory.notFound('product');

  return product;
}

async function updateProductService(id: string, updateProductData: UpdateProductData) {
  if (!updateProductData) throw errorFactory.unprocessableEntity(['data inexistent']);

  await productsRepository.updateProduct(Number(id), updateProductData);

  return;
}

async function deleteProductService(id: string) {
  if (!id) throw errorFactory.unprocessableEntity(['id inexistent']);
  await productsRepository.deleteProduct(Number(id));
}

export { updateProductService, deleteProductService };
