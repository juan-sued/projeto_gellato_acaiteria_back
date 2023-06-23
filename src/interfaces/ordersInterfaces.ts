import { Prisma, orders, products } from '@prisma/client';

//==================== get all ==================

export type OrderBasic = Pick<orders, 'id' | 'createdAt' | 'status' | 'subTotal'>;

//================= update ====================

interface IOrder {
  products: IProductOrder[];
  details: IDetailsOrder;
}

interface IDetailsOrder {
  total: Prisma.Decimal | number;
  subtTotal: Prisma.Decimal | number;
}

interface IProductOrder extends Omit<products, 'price' | 'id'> {
  price: Prisma.Decimal | number;
  flavoursIds: number[];
  complementsIds: number[];
  toppingsIds: number[];
  fruitsIds: number[];
  plusIds: number[];
  amount: number;
}

const exempleOrder: IOrder = {
  products: [
    {
      name: 'Açaí da Maria',
      image: 'https://asdasdasd',
      price: 10.99,
      cupSizeId: 2,
      flavoursIds: [1, 2, 3],
      complementsIds: [2, 3, 1],
      toppingsIds: [1, 2, 3],
      fruitsIds: [2, 3, 1],
      plusIds: [2, 1, 3],
      amount: 3,
    },
    {
      name: 'Açaí da Ana',
      image: 'https://asdasdasd',
      price: 10.99,
      cupSizeId: 3,
      flavoursIds: [2, 3, 1],
      complementsIds: [2, 1, 3],
      toppingsIds: [2, 1, 3],
      fruitsIds: [2, 1, 3],
      plusIds: [2, 1, 3],
      amount: 3,
    },
  ],
  details: {
    total: 32.5,
    subtTotal: 25.5,
  },
};

export interface UpdateOrderData {
  id?: number;
  userId?: number;
  total?: number;
  subTotal?: number;
  status?: string;
  createdAt?: Date;
  isDelivered?: Date | null;
}
