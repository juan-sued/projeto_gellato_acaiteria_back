import { addresses, ofertsDay, products } from '@prisma/client';

//==================== product ==================

export type ProductBasic = Pick<products, 'id' | 'title' | 'image'>;

export type ProductOfertDay = Omit<ofertsDay, 'productId'>;

//todos os produtos

//================= update ====================

export interface UpdateProductData {
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

export interface UpdateOfertDayData {
  id?: number;
  productId?: number;
  description?: string;
  priceOfert?: number;
}
