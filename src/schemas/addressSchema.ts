import { getStates, isValidCEP } from '@brazilian-utils/brazilian-utils';
import { addresses } from '@prisma/client';
import Joi from 'joi';
export type createAddress = Omit<addresses, 'id' | 'createdAt' | 'updatedAt'>;

const cepValidationSchema = Joi.string().length(9).custom(JoiCepValidation).required();

export const addressSchema = Joi.object<createAddress>({
  userId: 2,
  cep: cepValidationSchema,
  street: Joi.string().required(),
  city: Joi.string().required(),
  number: Joi.number().required(),
  state: Joi.string()
    .length(2)
    .valid(...getStates().map(s => s.code))
    .required(),
  neighborhood: Joi.string().required(),
  addressDetail: Joi.string().allow(null, '')
});

function JoiCepValidation(value: string, helpers: Joi.CustomHelpers<string>) {
  if (!value) return value;

  if (!isValidCEP(value)) {
    return helpers.error('any.invalid');
  }

  return value;
}
