import Joi from 'joi';

const postAddressSchema = Joi.object({
  userId: Joi.number().integer().required(),
  cep: Joi.string().required(),
  street: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  number: Joi.string().required(),
  neighborhood: Joi.string().required(),
  addressesDetail: Joi.string().allow('').optional(),
});
export { postAddressSchema };
