import Joi from 'joi';

const stockSchema = Joi.object({
  title: Joi.string().required(),
  image: Joi.string().required(),
  price: Joi.number().required(),
  description: Joi.string().required(),
  categoryId: Joi.number().required(),
  unit_of_measure: Joi.string().required(),
  amount: Joi.number().required(),
  quantity_for_unity: Joi.number().required(),
});

export { stockSchema };
