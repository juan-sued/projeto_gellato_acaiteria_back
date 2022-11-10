"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_1 = __importDefault(require("@prisma/client"));
const dotenv_1 = __importDefault(require("dotenv"));
const { PrismaClient } = client_1.default;
dotenv_1.default.config();
const prisma = new PrismaClient();
exports.prisma = prisma;
//# sourceMappingURL=postgreSQL.js.map