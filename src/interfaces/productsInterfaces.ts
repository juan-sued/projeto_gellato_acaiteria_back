import { Prisma, products } from '@prisma/client';

//==================== get all ==================

export type ProductBasic = Pick<products, 'id' | 'name' | 'image'>;

export interface IProductInsert {
  image: string;
  name: string;
  price: Prisma.Decimal | number;
  cupSizeId: number;
}

//================= update ====================

export interface UpdateProductData {
  id?: number;
  name?: string;
  image?: string;
  price?: number | Prisma.Decimal;
  cupSizeId?: number | null;
}
