import { ofertsOfDay } from '@prisma/client';

export type ProductOfertDay = Omit<ofertsOfDay, 'productId'>;

export interface UpdateOfertDayData {
  id?: number;
  productId?: number;
  description?: string;
  priceOfert?: number;
}
