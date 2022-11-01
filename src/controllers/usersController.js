import * as controllerHelper from './controllerHelper.js';
import * as usersRepository from '../repositories/usersRepository.js';

export async function registerUser(request, response) {
  const { name, email, password } = request.body;

  try {
    await usersRepository.insertUser({ name, email, password });

    return controllerHelper.okResponse(response);
  } catch {
    return controllerHelper.serverErrorResponse(response);
  }
}
