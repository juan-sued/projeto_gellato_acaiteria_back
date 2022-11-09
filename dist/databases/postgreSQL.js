import pkg from '@prisma/client';
import dotenv from 'dotenv';
var PrismaClient = pkg.PrismaClient;
dotenv.config();
var prisma = new PrismaClient();
export { prisma };
