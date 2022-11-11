import Joi from 'joi';

export const signUpSchema = Joi.object({
  name: Joi.string().trim().required().min(1),
  email: Joi.string().email().trim().required().min(1),
  password: Joi.string().trim().required().min(1),
  confirmPassword: Joi.ref('password'),
  isAdministrator: Joi.boolean()
});

export const signInSchema = Joi.object({
  email: Joi.string().email().trim().required().min(1),
  password: Joi.string().trim().required().min(1)
});
