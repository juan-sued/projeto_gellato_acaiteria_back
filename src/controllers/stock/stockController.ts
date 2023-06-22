import { stock } from '@prisma/client';
import { stockService } from '@/services';
import { Request, Response } from 'express';
import { StockBasic } from '@/interfaces/stockInterfaces';

export async function insertStock(request: Request, response: Response) {
  const newStock: stock = request.body;
  await stockService.insertStock(newStock);

  response.sendStatus(201);
}

export async function getStock(request: Request, response: Response) {
  const { name } = request.query as Record<string, string>;
  const { id } = request.params;
  let result: StockBasic[] | stock = [];
  if (name) result = await stockService.getStockByName(name);

  if (id) result = await stockService.getStockById(Number(id));

  if (!name && !id) result = await stockService.getAllStock();

  response.status(200).send(result);
}

export async function updateStock(req: Request, res: Response) {
  const { idParams } = res.locals;
  const { title, image, price, description, categoryId, unitOfMeasure, amount, quantityForUnity } = req.body;

  const updatedStock = await stockService.updateStock(idParams, {
    title,
    image,
    price,
    description,
    categoryId,
    unitOfMeasure,
    amount,
    quantityForUnity,
  });

  return res.status(200).send(updatedStock);
}

export async function deleteStock(request: Request, response: Response) {
  const { idParams } = response.locals;
  await stockService.deleteStock(idParams);

  response.sendStatus(200);
}
