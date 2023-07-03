import faker from '@faker-js/faker';
import { typesOfUsers } from '@prisma/client';
import { prisma } from '@/config';

export async function createtypeOfUser(params: Partial<typesOfUsers> = {}): Promise<typesOfUsers> {
  return prisma.typesOfUsers.create({
    data: {
      name: params.name || faker.internet.userName(),
      access: 'full',
      description: 'Administrator user with full access',
    },
  });
}
