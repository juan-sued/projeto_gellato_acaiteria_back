import joi from 'joi';

const userSchema = joi.object({
  name: joi.string().trim().required().min(1),
  email: joi.string().email().trim().required().min(1),
  password: joi.string().trim().required().min(1),
  confirmPassword: joi.ref('password')
});

export default userSchema;
