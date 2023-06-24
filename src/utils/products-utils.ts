import { IProductOrder } from '@/interfaces/ordersInterfaces';
import { stockRepository } from '@/repositories';
import { errorFactory } from '.';

async function checkProductAvailability(products: IProductOrder[]) {
  const unavailabilityList: string[] = [];

  for (const product of products) {
    const { cupSizeId, flavoursIds, complementsIds, toppingsIds, fruitsIds, plusIds, amount } = product;

    const productIds = [cupSizeId, ...flavoursIds, ...complementsIds, ...toppingsIds, ...fruitsIds, ...plusIds];

    for (const productId of productIds) {
      const stock = await stockRepository.getStockById(productId);
      if (!stock) unavailabilityList.push('productId: ' + productId);
      if (amount <= 0) unavailabilityList.push(stock.title);
    }
  }

  if (unavailabilityList.length > 0) throw errorFactory.notFound(unavailabilityList.join(', '));
}

export { checkProductAvailability };
