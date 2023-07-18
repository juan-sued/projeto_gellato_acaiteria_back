import { stock, Prisma, categories } from '@prisma/client';
import { prisma } from '@/config';
import { StockBasic, UpdateStockData } from '@/interfaces/stockInterfaces';

//=================== GET =====================//

function getAllStock(): Promise<StockBasic[]> {
  const params: Prisma.stockFindManyArgs = {
    select: {
      id: true,
      title: true,
      image: true,
    },
  };

  return prisma.stock.findMany(params);
}

function getStockDetails(): Promise<StockBasic[]> {
  const params: Prisma.stockFindManyArgs = {
    select: {
      id: true,
      title: true,
      image: true,
    },
  };

  return prisma.stock.findMany(params);
}

async function getStockById(id: number): Promise<stock | null> {
  const product = await prisma.stock.findUnique({
    where: {
      id,
    },
    include: {
      category: true,
    },
  });

  return product;
}
function getStockByFilterName(name: string): Promise<StockBasic[]> {
  const params: Prisma.stockFindManyArgs = {
    where: {
      title: {
        startsWith: `${name}`,
        mode: 'insensitive',
      },
    },
    skip: 0,
    take: undefined,
  };

  return prisma.stock.findMany(params);
}

//================= INSERT ===================//

async function insertStock(newStock: stock) {
  await prisma.stock.create({
    data: newStock,
  });
}

//================= UPDATE ===================//

async function updateStock(id: number, updateStockData: UpdateStockData) {
  const params: Prisma.stockUpdateArgs = {
    where: { id },
    data: updateStockData,
  };

  await prisma.stock.update(params);
}

//================= DELETE ===================//

async function deleteStock(id: number) {
  await prisma.stock.delete({ where: { id } });
}
export { getAllStock, getStockById, getStockByFilterName, insertStock, updateStock, deleteStock };
