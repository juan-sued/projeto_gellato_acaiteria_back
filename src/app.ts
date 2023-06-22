import express, { json } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errorHandlerMiddleware } from './middlewares';
import { usersRouter } from './routes/users/usersRoutes';
import { authRouter } from './routes/auth/authRoutes';
import { productsRouter } from './routes/products/productsRoutes';
import { addressesRouter } from './routes/users/addressesRoutes';
import { ordersRouter } from './routes/orders/ordersRoutes';
import { stockRouter } from './routes';
import { categoriesRouter } from './routes/categories/categoriesRouter';

const app = express();

app
  .use(cors())
  .use(json())
  .get('/health', (_req, res) => res.send('OK!'))
  .use('/users', usersRouter)
  .use('/addresses', addressesRouter)
  .use('/auth', authRouter)
  .use('/products', productsRouter)
  .use('/stock', stockRouter)
  .use('/categories', categoriesRouter)
  .use('/orders', ordersRouter)
  .use(errorHandlerMiddleware);

export default app;
