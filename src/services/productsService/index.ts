import { ProductBasic, ProductOfertDay, UpdateOfertDayData, UpdateProductData } from '@/interfaces/productsInterfaces';
import { productsRepository } from '@/repositories';
import { errorFactory } from '@/utils';
import { ofertsDay, products } from '@prisma/client';

const productExample: ProductBasic = {
  id: 1,
  title: 'name',
  image: 'http://asdasdasd',
};

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
  if (!id) throw errorFactory.unprocessableEntity(['id inexistent']);
  await productsRepository.deleteProduct(Number(id));
}

async function getAllOfertsDay(): Promise<ProductOfertDay[]> {
  const products = await productsRepository.getAllOfertsDay();
  if (!products) throw errorFactory.notFound('product');

  return products;
}

async function getOfertsDayByName(name: string): Promise<ProductOfertDay[]> {
  const products: ProductOfertDay[] = await productsRepository.getOfertDaysByFilterName(name);

  if (!products) throw errorFactory.notFound('product');

  return products;
}

async function getOfertsDayById(id: string): Promise<ofertsDay> {
  const product: ofertsDay = await productsRepository.getOfertDayById(Number(id));
  if (!product) throw errorFactory.notFound('product');

  return product;
}

async function updateOfertsDay(id: string, updateOfertsDayData: UpdateOfertDayData) {
  if (!updateOfertsDayData) throw errorFactory.unprocessableEntity(['data inexistent']);

  await productsRepository.updateOfertDay(Number(id), updateOfertsDayData);

  return;
}

async function deleteOfertsDay(id: string) {
  if (!id) throw errorFactory.unprocessableEntity(['id inexistent']);
  await productsRepository.deleteOfertDay(Number(id));
}

export {
  deleteProduct,
  updateProduct,
  getProductsByName,
  getProductById,
  getAllProducts,
  getAllOfertsDay,
  deleteOfertsDay,
  updateOfertsDay,
  getOfertsDayById,
  getOfertsDayByName,
  insertProduct,
};
