import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const SECRET = process.env.SECRET_KEY || '!5S5G6$1AE@';
const TIME = process.env.TOKEN_EXP_TIME;

const createJwtToken = (request, response, next) => {
  const { objUser } = response.locals;
  const token = jwt.sign(objUser, SECRET, { expiresIn: TIME || '24h' });
  response.locals.data = { user: objUser, token };
  next();
};

export default createJwtToken;
