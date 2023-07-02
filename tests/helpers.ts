import * as jwt from 'jsonwebtoken';
import { users } from '@prisma/client';

import { createUser } from './factories';
import { prisma } from '@/config';

export async function cleanDb() {
  await prisma.users.deleteMany({});
  await prisma.typesOfUsers.deleteMany({});
  await prisma.feedbacks.deleteMany({});
  await prisma.addresses.deleteMany({});
  await prisma.stock.deleteMany({});
  await prisma.categories.deleteMany({});
  await prisma.feedbacks.deleteMany({});
  await prisma.orders.deleteMany({});
  await prisma.order_products.deleteMany({});
  await prisma.products.deleteMany({});
  await prisma.stock_products.deleteMany({});
  await prisma.ofertsOfDay.deleteMany({});
  await prisma.favoriteds.deleteMany({});
}

export async function generateValidToken(user?: users) {
  const incomingUser = user || (await createUser());
  const token = jwt.sign({ userId: incomingUser.id }, process.env.JWT_SECRET);

  return token;
}
