import Joi from 'joi';

const userUpdateSchema = Joi.object({
  email: Joi.string().email().trim().min(1),
  password: Joi.string().trim().min(1),
  typeOfUserId: Joi.number().min(0),
});

export { userUpdateSchema };
