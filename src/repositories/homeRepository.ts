import { prisma } from '../databases/postgreSQL.js';

//=================== GET =====================//
function getHomeContent() {
  return prisma.users.findFirst();
}

export { getHomeContent };
