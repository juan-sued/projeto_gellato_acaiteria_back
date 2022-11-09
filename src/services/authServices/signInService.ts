import bcrypt from 'bcrypt';
import { ISign } from '../../interfaces/authInterfaces';
import { usersRepository } from '../../repositories';
import { errorFactory } from '../../utils';
import { createToken } from './jwtToken';


async function signInService(user: ISign) {

  const userRegistered = await usersRepository.getUserByEmail(user.email);
    if (!userRegistered) throw errorFactory.notFound("user");

    const dbPassword = userRegistered?.password ?? "";
    const isValidPassword = await bcrypt.compare(dbPassword, user.password);
    if (!isValidPassword) throw errorFactory.forbidden();
    
    const userId = Number(userRegistered?.id) ?? 0;
    const token = createToken(userId)
    
    return token;

}

export default signInService;
