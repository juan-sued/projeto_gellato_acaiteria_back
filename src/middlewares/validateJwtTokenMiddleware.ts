import dotenv from 'dotenv';

import { Request, Response, NextFunction } from 'express';
import * as usersRepository from '../repositories/usersRepository';

import { errorFactory } from '../utils/index';
import { decodedToken } from '../services/authServices/jwtToken';

dotenv.config();

async function validateJwtTokenMiddleware(request: Request, response: Response, next: NextFunction) {
  
  const token: string | undefined  = request.header('Authorization')?.replace('Bearer ', '');


    if(!token) throw errorFactory.unauthorized("token");
    
    const decoded = decodedToken(token)
 
    const user = await usersRepository.getUserById(decoded.id);

    if (!user)throw errorFactory.unauthorized("usuário inexistente");

    response.locals.idUser = decoded.id;
    
    next();

}
export default validateJwtTokenMiddleware;
