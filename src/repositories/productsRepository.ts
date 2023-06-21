import { UpdateOfertDayData, UpdateProductData } from './../interfaces/productsInterfaces';
import { ofertsDay, Prisma, products } from '@prisma/client';
import { prisma } from '@/databases/postgreSQL';
import { ProductBasic } from '@/interfaces/productsInterfaces';

//=================== GET =====================//

function getAllProducts(): Promise<ProductBasic[]> {
  const params: Prisma.productsFindManyArgs = {
    select: {
      id: true,
      title: true,
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
  });

  return product;
}
function getProductsByFilterName(name: string): Promise<ProductBasic[]> {
  const params: Prisma.productsFindManyArgs = {
    where: {
      title: {
        startsWith: `${name}`,
        mode: 'insensitive',
      },
    },
    skip: 0,
    take: undefined,
  };

  return prisma.products.findMany(params);
}

//============= OfertsDay ==============//

function getAllOfertsDay(): Promise<ofertsDay[]> {
  return prisma.ofertsDay.findMany();
}

function getOfertDaysByFilterName(name: string): Promise<ofertsDay[]> {
  const params: Prisma.ofertsDayFindManyArgs = {
    where: {
      product: {
        title: {
          startsWith: name,
          mode: 'insensitive',
        },
      },
    },
    skip: 0,
    take: undefined,
  };

  return prisma.ofertsDay.findMany(params);
}
function getOfertDayById(id: number): Promise<ofertsDay | null> {
  const params: Prisma.ofertsDayFindFirstArgs = {
    where: { id },
    distinct: 'productId',
    include: {
      product: true,
    },
  };
  return prisma.ofertsDay.findFirst(params);
}

//================= INSERT ===================//

async function insertProduct(newProduct: products) {
  await prisma.products.create({
    data: newProduct,
  });
}

async function insertOfertDay(newProduct: ofertsDay) {
  await prisma.ofertsDay.create({
    data: {
      description: newProduct.description,
      priceOfert: newProduct.priceOfert,
      product: { connect: { id: newProduct.productId } },
    },
    include: {
      product: true,
    },
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
async function updateOfertDay(id: number, updateOfertDayData: UpdateOfertDayData) {
  const params: Prisma.ofertsDayUpdateArgs = {
    where: { id },
    data: updateOfertDayData,
  };

  await prisma.ofertsDay.update(params);
}
//================= DELETE ===================//

async function deleteProduct(id: number) {
  await prisma.products.delete({ where: { id } });
}
async function deleteOfertDay(id: number) {
  await prisma.ofertsDay.delete({ where: { id } });
}

export {
  insertProduct,
  getProductById,
  getAllProducts,
  getProductsByFilterName,
  updateProduct,
  deleteProduct,
  deleteOfertDay,
  getOfertDayById,
  updateOfertDay,
  insertOfertDay,
  getAllOfertsDay,
  getOfertDaysByFilterName,
};
