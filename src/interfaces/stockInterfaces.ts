import { stock } from '@prisma/client';

//==================== stock ==================

export type StockBasic = Pick<stock, 'id' | 'title' | 'image'>;

//================= update ====================

export interface UpdateStockData {
  id?: number;
  title?: string;
  image?: string;
  price?: number;
  description?: string;
  categoryId?: number;
  unitOfMeasure?: string;
  amount?: number;
  quantityForUnity?: number;
}
