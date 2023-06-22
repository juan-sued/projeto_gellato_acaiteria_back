import { getCategories, insertCategories } from '@/controllers/categories/categoriesController';
import { validateJwtTokenMiddleware, validateSchemaMiddleware } from '@/middlewares';
import { categorySchema } from '@/schemas/categorySchemas';
import { Router } from 'express';

const categoriesRouter = Router();

categoriesRouter
  .get('/', getCategories)
  .all('/*', validateJwtTokenMiddleware)
  .post('/', validateSchemaMiddleware(categorySchema), validateConflictCategoriesMiddleware, insertCategories);
// .get('/:id', validateIdParamsMiddleware, validateNotFoundCategoriesMiddleware, getCategories)
// .patch('/:id', validateIdParamsMiddleware, validateNotFoundCategoriesMiddleware, updateCategories)
// .delete('/:id', validateIdParamsMiddleware, validateNotFoundCategoriesMiddleware, deleteCategories);

export { categoriesRouter };
