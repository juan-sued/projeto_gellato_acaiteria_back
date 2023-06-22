import { StockBasic, UpdateStockData } from '@/interfaces/stockInterfaces';
import { stockRepository } from '@/repositories';
import { stock } from '@prisma/client';

async function insertStock(newStock: stock) {
  await stockRepository.insertStock(newStock);
}

async function getAllStock(): Promise<StockBasic[]> {
  const stock: StockBasic[] = await stockRepository.getAllStock();

  return stock;
}

async function getStockByName(name: string): Promise<StockBasic[]> {
  const stock: StockBasic[] = await stockRepository.getStockByFilterName(name);
  return stock;
}

async function getStockById(id: number): Promise<stock> {
  const stock: stock = await stockRepository.getStockById(id);
  return stock;
}

async function updateStock(id: number, updateStockData: UpdateStockData) {
  await stockRepository.updateStock(id, updateStockData);

  return;
}

async function deleteStock(id: number) {
  await stockRepository.deleteStock(id);
}

export { deleteStock, updateStock, getStockByName, getStockById, getAllStock, insertStock };
