import { Prisma, products } from '@prisma/client';

//==================== get all ==================

export type ProductBasic = Pick<products, 'id' | 'name' | 'image'>;

export interface IProductInsert extends Omit<products, 'id' | 'cupSizedId'> {
  cupSizedId: number | null;
}

//================= update ====================

export interface UpdateProductData {
  id?: number;
  name?: string;
  image?: string;
  price?: number | Prisma.Decimal;
  cupSizeId?: number | null;
}
