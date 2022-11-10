import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { errorFactory } from '../../utils';
dotenv.config();

interface Payload {
  id: number;
  iat: number;
  exp: number;
}

const SECRET: jwt.Secret = process.env.SECRET_KEY || '!5S5G6$1AE@';
const EXPIRED_TIME = process.env.TOKEN_EXP_TIME || '24h';

const createToken = (userId: number) => {
  const payload = { id: userId };
  return jwt.sign(payload, SECRET, { expiresIn: EXPIRED_TIME });
};

async function decodedToken(token: string) {
  const decoded = jwt.verify(token, SECRET) as Payload;
  if (!decoded) {
    throw errorFactory.unauthorized('valid token');
  }
  return decoded;
}
export { createToken, decodedToken };
