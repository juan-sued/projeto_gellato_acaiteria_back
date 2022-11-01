import bcrypt from 'bcrypt';

import * as controllerHelper from '../controllers/controllerHelper.js';
import * as signRepository from '../repositories/usersRepository.js';
import * as validateSchemaHelper from './utils/validateSchemaHelper.js';

import signInSchema from '../schemas/signInSchema.js';

async function signInMiddleware(request, response, next) {
  const userData = request.body;

  try {
    const errors = await validateSchemaHelper.validateSchema(
      userData,
      signInSchema,
      response
    );

    if (errors) {
      return controllerHelper.validateSchemaResponse(response, errors);
    }

    const user = await signRepository.getUserByEmail(userData.email);

    if (!user) return controllerHelper.notFoundResponse(response);

    const isValidPassword = bcrypt.compareSync(userData.password, user.password);

    if (!isValidPassword) {
      return controllerHelper.unprocessableEntityResponse(response);
    }
    response.locals.objUser = {
      idUser: user.id,
      name: user.name
    };
    next();
  } catch {
    return controllerHelper.serverErrorResponse(response);
  }
}

export default signInMiddleware;
