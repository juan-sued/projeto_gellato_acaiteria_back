import * as controllerHelper from './controllerHelper.js';
import * as usersRepository from '../repositories/usersRepository.js';
import bcrypt from 'bcrypt';
export async function registerUser(request, response) {
  const { name, email, password } = request.body;

  try {
    const encryptedPassword = bcrypt.hashSync(password, 10);

    await usersRepository.insertUser({ name, email, encryptedPassword });

    return controllerHelper.okResponse(response);
  } catch {
    return controllerHelper.serverErrorResponse(response);
  }
}
