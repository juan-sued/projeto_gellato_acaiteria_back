import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const SECRET = process.env.SECRET_KEY || '$1AIKSO%6A41';
const EXPIRED_TIME = process.env.TOKEN_EXP_TIME || '5h';

const createToken = payload => {
  return jwt.sign(payload, SECRET, { expiresIn: EXPIRED_TIME });
};

const decodedToken = token => {
  try {
    const decoded = jwt.verify(token, SECRET);
    return decoded;
  } catch (err) {
    return null;
  }
};

export { createToken, decodedToken };
