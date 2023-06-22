import { Prisma, products } from '@prisma/client';
import { prisma } from '@/databases/postgreSQL';
import { ProductBasic, UpdateProductData } from '@/interfaces/productsInterfaces';

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

async function insertProduct(newProduct: products) {
  await prisma.products.create({
    data: newProduct,
  });
}

// async function insertOfertDay(userId: number, newProduct: ofertsOfDay) {
//   await prisma.ofertsOfDay.create({
//     data: {
//       userId: userId,
//       description: newProduct.description,
//       price_ofert: newProduct.price_ofert,
//       product: { connect: { id: newProduct.productId } },
//     },
//     include: {
//       product: true,
//     },
//   });
// }

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