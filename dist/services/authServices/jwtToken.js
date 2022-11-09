import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { errorFactory } from '../../utils';
dotenv.config();
var SECRET = process.env.SECRET_KEY || '$1AIKSO%6A41';
var EXPIRED_TIME = process.env.TOKEN_EXP_TIME || '24h';
var createToken = function (userId) {
    var payload = { id: userId };
    return jwt.sign(payload, SECRET, { expiresIn: EXPIRED_TIME });
};
var decodedToken = function (token) {
    var decoded = jwt.verify(token, SECRET);
    if (!decoded) {
        throw errorFactory.unauthorized("valid token");
    }
    ;
    return decoded;
};
export { createToken, decodedToken };
