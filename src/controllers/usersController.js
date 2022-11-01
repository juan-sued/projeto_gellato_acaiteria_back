import * as controllerHelper from './controllerHelper.js';
import * as usersRepository from '../repositories/usersRepository.js';
import bcrypt from 'bcrypt';
export async function registerUserController(request, response) {
  const { name, email, password } = request.body;

  try {
    const encryptedPassword = bcrypt.hashSync(password, 10);

    await usersRepository.insertUser({ name, email, encryptedPassword });

    return controllerHelper.okResponse(response);
  } catch {
    return controllerHelper.serverErrorResponse(response);
  }
}

export async function loginUserController(request, response) {
  const { data } = response.locals;

  try {
    return controllerHelper.okResponse(response, data);
  } catch {
    return controllerHelper.serverErrorResponse(response);
  }
}
