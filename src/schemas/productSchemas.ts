import Joi from 'joi';

const productSchemas = Joi.object({
  title: Joi.string().required(),
  image: Joi.string().required(),
  price: Joi.number().required(),
  description: Joi.string().required(),
  categoryId: Joi.number().required(),
  unitOfMeasure: Joi.string().required(),
  amount: Joi.number().required(),
  quantityForUnity: Joi.number().required(),
});

export { productSchemas };
