import { getStates, isValidCEP } from '@brazilian-utils/brazilian-utils';
import { addresses } from '@prisma/client';
import Joi, { number } from 'joi';
export type createAddress = Omit<addresses, 'createdAt' | 'updatedAt'>;

const cepValidationSchema = Joi.string().length(9).custom(JoiCepValidation).allow('');

export const updateAddressSchema = Joi.object<createAddress>({
  cep: cepValidationSchema,
  street: Joi.string().allow(''),
  city: Joi.string().allow(''),
  number: Joi.number().allow(''),
  state: Joi.string()
    .allow('')
    .length(2)
    .valid(...getStates().map(s => s.code))
    .allow(''),
  neighborhood: Joi.string().allow(''),
  addressDetail: Joi.string().allow('')
});

function JoiCepValidation(value: string, helpers: Joi.CustomHelpers<string>) {
  if (!value) return value;

  if (!isValidCEP(value)) {
    return helpers.error('any.invalid');
  }

  return value;
}
