import { categories } from '@prisma/client';
import { categoriesService } from '@/services';
import { Request, Response } from 'express';

export async function insertCategories(request: Request, response: Response) {
  const newCategories: categories = request.body;
  await categoriesService.insertCategories(newCategories);

  response.sendStatus(201);
}

export async function getCategories(request: Request, response: Response) {
  const { name } = request.query as Record<string, string>;
  const { id } = request.params;
  let result: categories[] | categories = [];
  if (name) result = await categoriesService.getCategoriesByName(name);

  if (id) result = await categoriesService.getCategoriesById(id);

  if (!name && !id) result = await categoriesService.getAllCategories();

  response.status(200).send(result);
}

export async function updateCategories(req: Request, res: Response) {
  const { id } = req.params;
  const { name, description } = req.body;

  const updatedCategories = await categoriesService.updateCategories(id, {
    name,
    description,
  });

  return res.status(200).send(updatedCategories);
}

export async function deleteCategories(request: Request, response: Response) {
  const { id } = request.params;
  console.log('entrou');
  await categoriesService.deleteCategories(id);

  response.sendStatus(200);
}
