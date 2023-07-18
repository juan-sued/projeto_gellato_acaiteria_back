import { IProductOrder } from '@/interfaces/ordersInterfaces';
import {
  IProductInsert,
  ProductBasic,
  ProductsAndCategories,
  UpdateProductData,
} from '@/interfaces/productsInterfaces';
import { productsRepository, stockRepository, stock_products } from '@/repositories';
import { errorFactory, productsUtils } from '@/utils';
import { exclude } from '@/utils/functions-utils';
import { products, categories } from '@prisma/client';
import { categoriesService } from '..';

async function insertProduct({
  image,
  name,
  price,
  cupSizeId,
  flavoursIds,
  complementsIds,
  toppingsIds,
  fruitsIds,
  plusIds,
  amount,
}: IProductOrder) {
  const productIds = [cupSizeId, ...flavoursIds, ...complementsIds, ...toppingsIds, ...fruitsIds, ...plusIds];

  await productsUtils.checkStockAvailability(productIds, amount);
  const product = {
    image,
    name,
    price,
    cupSizeId,
    flavoursIds,
    complementsIds,
    toppingsIds,
    fruitsIds,
    plusIds,
    amount,
  };

  const formatedProduct: IProductInsert = exclude(
    product,
    'complementsIds',
    'flavoursIds',
    'fruitsIds',
    'plusIds',
    'toppingsIds',
    'amount',
  );

  const productCreated = await productsRepository.insertProduct(formatedProduct);

  for (const productId of productIds) await stock_products.insertStock_Product(productCreated.id, productId);

  return productCreated;
}

async function getAllProducts(): Promise<ProductBasic[]> {
  const products = await productsRepository.getAllProducts();
  if (!products) throw errorFactory.notFound('product');

  return products;
}

async function getProducts_Favorites_Categories(userId: number): Promise<ProductsAndCategories> {
  const products = await productsRepository.getAllProducts();
  if (!products) throw errorFactory.notFound('products');

  const favoriteds = await productsRepository.getFavoriteds(userId);
  if (!favoriteds) throw errorFactory.notFound('favoriteds');
  const categories = await categoriesService.getAllCategories();
  if (!categories) throw errorFactory.notFound('categories');

  const notFavoritedProducts = products.filter(
    (product) => !favoriteds.some((favorited) => favorited.id === product.id),
  );

  return {
    products: {
      notFavoriteds: notFavoritedProducts,
      favoriteds: favoriteds,
    },
    categories,
  };
}

async function getProductsAndCategories(): Promise<ProductsAndCategories> {
  const products = await productsRepository.getAllProducts();
  if (!products) throw errorFactory.notFound('products');

  const categories = await categoriesService.getAllCategories();
  if (!categories) throw errorFactory.notFound('categories');

  return {
    products: {
      notFavoriteds: products,
      favoriteds: [],
    },
    categories,
  };
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
}

async function deleteProduct(id: number) {
  await productsRepository.deleteProduct(id);
}

export {
  deleteProduct,
  updateProduct,
  getProductsByName,
  getProductById,
  getAllProducts,
  getProductsAndCategories,
  insertProduct,
  getProducts_Favorites_Categories,
};
