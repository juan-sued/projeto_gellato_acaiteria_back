import Joi from 'joi';
import { productsSchemas } from '.';

const customizedSchema = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().required(),
  image: Joi.string().required(),
  price: Joi.number().required(),
  cupSizeId: Joi.number().required(),
  flavoursIds: Joi.array().items(Joi.number()).required(),
  complementsIds: Joi.array().items(Joi.number()).required(),
  toppingsIds: Joi.array().items(Joi.number()).required(),
  fruitId: Joi.number().required(),
  plusIds: Joi.array().items(Joi.number()).required(),
  amountInCart: Joi.number().required(),
}).unknown(true);

const orderSchema = Joi.array().items(Joi.alternatives().try(customizedSchema, productsSchemas.productsSchema));

export { orderSchema };
