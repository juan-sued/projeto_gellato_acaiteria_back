import Joi from 'joi';

const userSchema = Joi.object({
  email: Joi.string().email().trim().min(1),
  password: Joi.string().trim().min(1),
});

export { userSchema };
