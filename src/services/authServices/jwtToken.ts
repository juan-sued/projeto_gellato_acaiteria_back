import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { errorFactory } from '../../utils';
dotenv.config();

interface Payload {
  id: number
  iat: number
  exp: number
}

const SECRET = process.env.SECRET_KEY || '$1AIKSO%6A41';
const EXPIRED_TIME = process.env.TOKEN_EXP_TIME || '24h';

const createToken = (userId: number) => {
  const payload = {id: userId}
  return jwt.sign(payload , SECRET, { expiresIn: EXPIRED_TIME });
};

const decodedToken = (token: string): Payload  => {
const decoded =  jwt.verify(token, SECRET) as Payload 
if (!decoded) {
  throw errorFactory.unauthorized("valid token");
};  
  return decoded
}
export { createToken, decodedToken };
