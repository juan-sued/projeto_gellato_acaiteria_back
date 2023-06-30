import { Prisma, categories } from '@prisma/client';
import { prisma } from '@/config';
import { UpdateCategoriesData } from '@/interfaces/categoriesInterfaces';

//=================== GET =====================//

function getAllCategories(): Promise<categories[]> {
  const params: Prisma.categoriesFindManyArgs = {};

  return prisma.categories.findMany(params);
}
async function getCategoriesById(id: number): Promise<categories> {
  const category = await prisma.categories.findUnique({
    where: {
      id,
    },
  });

  return category;
}
function getCategoriesByFilterName(name: string): Promise<categories[]> {
  const params: Prisma.categoriesFindManyArgs = {
    where: {
      name: {
        startsWith: `${name}`,
        mode: 'insensitive',
      },
    },
    skip: 0,
    take: undefined,
  };

  return prisma.categories.findMany(params);
}

//================= INSERT ===================//

async function insertCategories(newCategories: categories) {
  await prisma.categories.create({
    data: newCategories,
  });
}

//================= UPDATE ===================//

async function updateCategories(id: number, updateCategoriesData: UpdateCategoriesData) {
  const params: Prisma.categoriesUpdateArgs = {
    where: { id },
    data: updateCategoriesData,
  };

  await prisma.categories.update(params);
}

//================= DELETE ===================//

async function deleteCategories(id: number) {
  await prisma.categories.delete({ where: { id } });
}

export {
  insertCategories,
  getCategoriesById,
  getAllCategories,
  getCategoriesByFilterName,
  updateCategories,
  deleteCategories,
};
