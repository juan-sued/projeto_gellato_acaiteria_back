import express from 'express';
import 'express-async-errors';
import cors from 'cors';

import { errorHandlerMiddleware } from './middlewares';
import { authRouter } from './routes/authRoutes';
import { usersRouter } from './routes/usersRoutes';

const app = express();
app
  .use(cors())
  .use(express.json())
  .get('/health', (_req, res) => res.send('OK!'))
  .use('/auth', authRouter)
  .use('/users/', usersRouter)
  .use(errorHandlerMiddleware);

export default app;
