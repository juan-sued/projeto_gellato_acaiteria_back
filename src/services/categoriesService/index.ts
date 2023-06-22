import { categoriesRepository } from '@/repositories';
import { UpdateCategoriesData } from '@/interfaces/categoriesInterfaces';
import { errorFactory } from '@/utils';
import { categories } from '@prisma/client';

async function insertCategories(newCategories: categories) {
  await categoriesRepository.insertCategories(newCategories);
}

async function getAllCategories(): Promise<categories[]> {
  const categories = await categoriesRepository.getAllCategories();
  if (!categories) throw errorFactory.notFound('categories');

  return categories;
}

async function getCategoriesByName(name: string): Promise<categories[]> {
  const categories: categories[] = await categoriesRepository.getCategoriesByFilterName(name);

  if (!categories) throw errorFactory.notFound('categories');

  return categories;
}

async function getCategoriesById(id: string): Promise<categories> {
  const categories: categories = await categoriesRepository.getCategoriesById(Number(id));
  if (!categories) throw errorFactory.notFound('categories');

  return categories;
}

async function updateCategories(id: string, updateCategoriesData: UpdateCategoriesData) {
  await categoriesRepository.updateCategories(Number(id), updateCategoriesData);

  return;
}

async function deleteCategories(id: string) {
  await categoriesRepository.deleteCategories(Number(id));
}

export {
  deleteCategories,
  updateCategories,
  getCategoriesByName,
  getCategoriesById,
  getAllCategories,
  insertCategories,
};
