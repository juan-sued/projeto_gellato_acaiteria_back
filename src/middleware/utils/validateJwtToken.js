import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const SECRET = process.env.SECRET_KEY || '!5S5G6$1AE@';

const validateJwtToken = (request, response, next) => {
  const token = request.header('Authorization')?.replace('Bearer ', '');
  const { user } = request.body;
  try {
    const decodedToken = jwt.verify(token, SECRET);
    if (user !== decodedToken.email) {
      return response.status(401).send('Não autorizado!');
    }
    next();
  } catch (err) {
    return response.status(401).send('Token inválido!');
  }
};
export default validateJwtToken;
