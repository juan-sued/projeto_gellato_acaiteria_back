import joi from 'joi';

const signInSchema = joi.object({
  email: joi.string().email().trim().required().min(1),
  password: joi.string().trim().required().min(1)
});

export default signInSchema;
