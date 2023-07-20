import { Prisma, ofertsOfDay, products } from '@prisma/client';
import { prisma } from '@/config';
import { IProductInsert, ProductBasic, UpdateProductData } from '@/interfaces/productsInterfaces';
import { Product } from '@/services/productsService';

//=================== GET =====================//

function getAllProducts(): Promise<ProductBasic[]> {
  const params: Prisma.productsFindManyArgs = {
    select: {
      id: true,
      name: true,
      image: true,
      price: true,
    },
  };

  return prisma.products.findMany(params);
}

async function getProductById(id: number): Promise<products> {
  const product = await prisma.products.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      image: true,
      price: true,
      cupSizeId: true,

      cupSize: {
        select: {
          title: true,
          description: true,
          image: true,
          price: true,
          quantity_for_unity: true,
          unit_of_measure: true,

          category: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
      stock: {
        select: {
          stock: {
            select: {
              id: true,
              title: true,
              description: true,
              image: true,
              price: true,
              quantity_for_unity: true,
              unit_of_measure: true,
              amount: true,
              categoryId: true,

              category: {
                select: {
                  id: true,
                  name: true,
                  description: true,
                },
              },
            },
          },
        },
      },
    },
  });

  return product;
}

async function getFavoriteds(userId: number): Promise<ProductBasic[]> {
  const favoriteds = await prisma.products.findMany({
    where: {
      favoriteds: {
        some: {
          userId,
        },
      },
    },

    select: {
      id: true,
      name: true,
      image: true,
      price: true,
    },
  });

  return favoriteds;
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

// async function getOfertDayByDate(showInitDate: Date, showFinalDate: Date): Promise<ofertsOfDay[]> {
//   const oferts = await prisma.ofertsOfDay.findMany({
//     where: {
//       showInit: {
//         lte: showInitDate,
//       },
//       showFinal: {
//         gte: showFinalDate,
//       },
//     },
//     include: {
//       product: true,
//     },
//   });

//   return oferts;
// }

//================= INSERT ===================//

async function insertProduct(newProduct: IProductInsert) {
  const productCreated = await prisma.products.create({
    data: newProduct,
  });

  return productCreated;
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

export {
  getFavoriteds,
  insertProduct,
  getProductById,
  getAllProducts,
  getProductsByFilterName,
  updateProduct,
  deleteProduct,
};
