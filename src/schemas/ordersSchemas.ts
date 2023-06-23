import Joi from 'joi';
import { productsSchema } from './productsSchemas';

const detailsOrderSchema = Joi.object({
  total: Joi.number().required(),
  subtTotal: Joi.number().required(),
}).required();

const productsOrderSchema = Joi.array()
  .items(
    productsSchema.append({
      amount: Joi.number().required(),
    }),
  )
  .required();

const orderSchema = Joi.object({
  products: productsOrderSchema,
  details: detailsOrderSchema,
});

export { orderSchema };
