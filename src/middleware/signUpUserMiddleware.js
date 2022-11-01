import * as controllerHelper from '../controllers/controllerHelper.js';

import * as signRepository from '../repositories/usersRepository.js';

import * as validateSchemaHelper from './utils/validateSchemaHelper.js';
import signUpSchema from '../schemas/signUpSchema.js';

async function signUpMiddleware(request, response, next) {
  const userData = request.body;

  try {
    const errors = await validateSchemaHelper.validateSchema(
      userData,
      signUpSchema,
      response
    );

    if (errors) {
      return controllerHelper.validateSchemaResponse(response, errors);
    }

    const users = await signRepository.getUserByEmail(userData.email);
    if (users) return controllerHelper.conflictResponse(response);

    next();
  } catch {
    return response.status(500).send('erro ao validar user');
  }
}

export default signUpMiddleware;
