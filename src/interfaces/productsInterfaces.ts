import { Prisma, categories, products } from '@prisma/client';

//==================== get all ==================

export type ProductBasic = Pick<products, 'id' | 'name' | 'image' | 'price'>;

export interface IProductInsert {
  image: string;
  name: string;
  price: Prisma.Decimal | number;
  cupSizeId: number;
}

export interface ProductsAndCategories {
  products: {
    notFavoriteds: ProductBasic[];
    favoriteds: ProductBasic[];
  };
  categories: categories[];
}

//================= update ====================

export interface UpdateProductData {
  id?: number;
  name?: string;
  image?: string;
  price?: number | Prisma.Decimal;
  cupSizeId?: number | null;
}
