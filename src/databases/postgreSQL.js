import pkg from '@prisma/client';

const { PrismaClient } = pkg;

dotenv.config();

const isDeploy = false;
const databaseConfigDev = {
  connectionString: process.env.DATABASE_URL
};

const databaseConfigDeploy = {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
};

const connection = new PrismaClient(isDeploy ? databaseConfigDeploy : databaseConfigDev);
export default connection;
