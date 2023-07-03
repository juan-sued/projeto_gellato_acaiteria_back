import 'reflect-metadata';
import 'express-async-errors';
import express, { Express, json } from 'express';
import cors from 'cors';
import { errorHandlerMiddleware } from './middlewares';
import { usersRouter } from './routes/users/usersRoutes';
import { authRouter } from './routes/auth/authRoutes';
import { productsRouter } from './routes/products/productsRoutes';
import { addressesRouter } from './routes/users/addressesRoutes';
import { ordersRouter } from './routes/orders/ordersRoutes';
import { stockRouter, typesOfUsersRouter } from './routes';
import { categoriesRouter } from './routes/categories/categoriesRouter';
import { connectDb, disconnectDB, loadEnv } from './config';

loadEnv();

const app = express();

app
  .use(cors())
  .use(json())
  .get('/health', (_req, res) => res.send('OK!'))
  .use('/types-users', typesOfUsersRouter)
  .use('/users', usersRouter)
  .use('/addresses', addressesRouter)
  .use('/auth', authRouter)
  .use('/products', productsRouter)
  .use('/stock', stockRouter)
  .use('/categories', categoriesRouter)
  .use('/orders', ordersRouter)
  .use(errorHandlerMiddleware);

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;
