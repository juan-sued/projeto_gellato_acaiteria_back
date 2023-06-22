import Joi from 'joi';

const categorySchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
});

export { categorySchema };
