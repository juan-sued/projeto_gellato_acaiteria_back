import { IProductOrder } from './../../interfaces/ordersInterfaces';
import { Prisma, products } from '@prisma/client';
import { prisma } from '@/databases/postgreSQL';
import { IProductInsert, ProductBasic, UpdateProductData } from '@/interfaces/productsInterfaces';

//=================== GET =====================//

function getAllProducts(): Promise<ProductBasic[]> {
  const params: Prisma.productsFindManyArgs = {
    select: {
      id: true,
      name: true,
      image: true,
    },
  };

  return prisma.products.findMany(params);
}
async function getProductById(id: number): Promise<products> {
  const product = await prisma.products.findUnique({
    where: {
      id,
    },
    include: {
      stock: {
        include: {
          stock: true,
        },
      },
    },
  });

  return product;
}
function getProductsByFilterName(name: string): Promise<ProductBasic[]> {
  const params: Prisma.productsFindManyArgs = {
    where: {
      name: {
        startsWith: `${name}`,
        mode: 'insensitive',
      },
    },
    skip: 0,
    take: undefined,
  };

  return prisma.products.findMany(params);
}

//================= INSERT ===================//

async function insertProduct(newProduct: IProductInsert) {
  await prisma.products.create({
    data: newProduct,
  });
}

//================= UPDATE ===================//

async function updateProduct(id: number, updateProductData: UpdateProductData) {
  const params: Prisma.productsUpdateArgs = {
    where: { id },
    data: updateProductData,
  };

  await prisma.products.update(params);
}

//================= DELETE ===================//

async function deleteProduct(id: number) {
  await prisma.products.delete({ where: { id } });
}

export { insertProduct, getProductById, getAllProducts, getProductsByFilterName, updateProduct, deleteProduct };
