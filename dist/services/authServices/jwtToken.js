"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodedToken = exports.createToken = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const utils_1 = require("../../utils");
dotenv_1.default.config();
const SECRET = process.env.SECRET_KEY || '!5S5G6$1AE@';
const EXPIRED_TIME = process.env.TOKEN_EXP_TIME || '24h';
const createToken = (userId) => {
    const payload = { id: userId };
    return jwt.sign(payload, SECRET, { expiresIn: EXPIRED_TIME });
};
exports.createToken = createToken;
async function decodedToken(token) {
    console.log(token);
    console.log(SECRET);
    const decoded = jwt.verify(token, SECRET);
    console.log('passou');
    if (!decoded) {
        throw utils_1.errorFactory.unauthorized('valid token');
    }
    return decoded;
}
exports.decodedToken = decodedToken;
//# sourceMappingURL=jwtToken.js.map