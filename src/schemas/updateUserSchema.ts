import { isValidCPF, isValidMobilePhone } from '@brazilian-utils/brazilian-utils';
import Joi from 'joi';
import { errorFactory } from '../utils';

const cpfValidationSchema = Joi.string().length(11).custom(joiCpfValidation).allow('');
const mobilePhoneValidationSchema = Joi.string()
  .min(14)
  .max(15)
  .custom(joiMobilePhoneValidation)
  .allow('');

export const updateUserSchema = Joi.object({
  name: Joi.string().trim().min(1).allow(''),
  email: Joi.string().email().trim().min(1).allow(''),
  password: Joi.string().trim().min(1).allow(''),
  isAdministrator: Joi.boolean().allow(''),
  phone: mobilePhoneValidationSchema,
  cpf: cpfValidationSchema
});

function joiMobilePhoneValidation(value: string, helpers: Joi.CustomHelpers<string>) {
  if (!value) return value;

  if (!isValidMobilePhone(value)) {
    return errorFactory.unprocessableEntity(['phone unprocessable']);
  }

  return value;
}

function joiCpfValidation(value: string, helpers: Joi.CustomHelpers<string>) {
  if (!value) return value;

  if (!isValidCPF(value)) {
    return errorFactory.unprocessableEntity(['CPF unprocessable']);
  }

  return value;
}
