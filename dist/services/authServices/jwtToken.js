"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodedToken = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const utils_1 = require("../../utils");
dotenv_1.default.config();
const SECRET = process.env.SECRET_KEY || '$1AIKSO%6A41';
const EXPIRED_TIME = process.env.TOKEN_EXP_TIME || '24h';
const createToken = (userId) => {
    const payload = { id: userId };
    return jsonwebtoken_1.default.sign(payload, SECRET, { expiresIn: EXPIRED_TIME });
};
exports.createToken = createToken;
const decodedToken = (token) => {
    const decoded = jsonwebtoken_1.default.verify(token, SECRET);
    if (!decoded) {
        throw utils_1.errorFactory.unauthorized("valid token");
    }
    ;
    return decoded;
};
exports.decodedToken = decodedToken;
//# sourceMappingURL=jwtToken.js.map