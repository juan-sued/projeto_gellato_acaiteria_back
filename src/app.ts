import express, { json } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errorHandlerMiddleware } from './middlewares';
import { usersRouter } from './routes/usersRoutes';
import { authRouter } from './routes/authRoutes';
import { productsRouter } from './routes/productsRoutes';

const app = express();

app
  .use(cors())
  .use(json())
  .get('/health', (_req, res) => res.send('OK!'))
  .use('/users', usersRouter)
  .use('/auth', authRouter)
  .use('/products', productsRouter)
  .use(errorHandlerMiddleware);

export default app;
