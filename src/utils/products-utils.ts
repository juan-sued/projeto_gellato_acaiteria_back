import { stockRepository } from '@/repositories';
import { errorFactory } from '.';

async function checkStockAvailability(productIds: number[], amount: number) {
  const unavailabilityList: string[] = [];

  for (const productId of productIds) {
    const stock = await stockRepository.getStockById(productId);
    if (!stock) unavailabilityList.push('productId: ' + productId);
    if (amount <= 0) unavailabilityList.push(stock.title);
  }

  if (unavailabilityList.length > 0) throw errorFactory.notFound(unavailabilityList.join(', '));
}

export { checkStockAvailability };
