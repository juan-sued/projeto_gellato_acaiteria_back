import express from 'express';
import cors from 'cors';
import usersRoutes from './routes/usersRoutes.js';
import chalk from 'chalk';

const server = express();

server.use([express.json(), cors(), usersRoutes]);

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(chalk.cyan('Servidor rodando na porta ' + PORT));
});
