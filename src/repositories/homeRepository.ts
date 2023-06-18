import { prisma } from '@/databases/postgreSQL';

//=================== GET =====================//
function getHomeContent() {
  return prisma.users.findFirst();
}

export { getHomeContent };
