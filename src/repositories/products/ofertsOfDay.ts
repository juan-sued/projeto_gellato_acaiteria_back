import { ofertsOfDay, Prisma, products } from '@prisma/client';
import { prisma } from '@/databases/postgreSQL';
import { UpdateOfertDayData } from '@/interfaces/ofertOfDay';

//============= OfertsDay ==============//

function getAllOfertsDay(): Promise<ofertsOfDay[]> {
  return prisma.ofertsOfDay.findMany();
}

function getOfertDaysByFilterName(name: string): Promise<ofertsOfDay[]> {
  const params: Prisma.ofertsOfDayFindManyArgs = {
    where: {
      product: {
        name: {
          startsWith: name,
          mode: 'insensitive',
        },
      },
    },
    skip: 0,
    take: undefined,
  };

  return prisma.ofertsOfDay.findMany(params);
}
function getOfertDayById(id: number): Promise<ofertsOfDay | null> {
  const params: Prisma.ofertsOfDayFindFirstArgs = {
    where: { id },
    distinct: 'productId',
    include: {
      product: true,
    },
  };
  return prisma.ofertsOfDay.findFirst(params);
}

async function updateOfertDay(id: number, updateOfertDayData: UpdateOfertDayData) {
  const params: Prisma.ofertsOfDayUpdateArgs = {
    where: { id },
    data: updateOfertDayData,
  };

  await prisma.ofertsOfDay.update(params);
}

async function deleteOfertDay(id: number) {
  await prisma.ofertsOfDay.delete({ where: { id } });
}

export { getAllOfertsDay, getOfertDaysByFilterName, getOfertDayById, updateOfertDay, deleteOfertDay };
