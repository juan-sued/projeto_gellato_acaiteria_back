import Joi from 'joi';

const productsSchema = Joi.object({
  name: Joi.string().required(),
  image: Joi.string().required(),
  price: Joi.number().required(),
  cupSizeId: Joi.number().required(),
  flavoursIds: Joi.array().items(Joi.number()).required(),
  complementsIds: Joi.array().items(Joi.number()).required(),
  toppingsIds: Joi.array().items(Joi.number()).required(),
  fruitsIds: Joi.array().items(Joi.number()).required(),
  plusIds: Joi.array().items(Joi.number()).required(),
});

export { productsSchema };
