import Joi from 'joi';

const postTypeOfUserSchema = Joi.object({
  name: Joi.string().max(100),
  access: Joi.string().max(200),
  description: Joi.string().max(200),
});
export { postTypeOfUserSchema };
