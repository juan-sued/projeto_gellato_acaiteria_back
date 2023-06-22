import { StockBasic, UpdateStockData } from '@/interfaces/stockInterfaces';
import { stockRepository } from '@/repositories';
import { errorFactory } from '@/utils';
import { stock } from '@prisma/client';

async function insertStock(newStock: stock) {
  await stockRepository.insertStock(newStock);
}

async function getAllStock(): Promise<StockBasic[]> {
  const stock = await stockRepository.getAllStock();
  if (!stock) throw errorFactory.notFound('stock');

  return stock;
}

async function getStockByName(name: string): Promise<StockBasic[]> {
  const stock: StockBasic[] = await stockRepository.getStockByFilterName(name);

  if (!stock) throw errorFactory.notFound('stock');

  return stock;
}

async function getStockById(id: string): Promise<stock> {
  const stock: stock = await stockRepository.getStockById(Number(id));
  if (!stock) throw errorFactory.notFound('stock');

  return stock;
}

async function updateStock(id: string, updateStockData: UpdateStockData) {
  if (!updateStockData) throw errorFactory.unprocessableEntity(['data inexistent']);

  await stockRepository.updateStock(Number(id), updateStockData);

  return;
}

async function deleteStock(id: string) {
  await stockRepository.deleteStock(Number(id));
}

export { deleteStock, updateStock, getStockByName, getStockById, getAllStock, insertStock };
