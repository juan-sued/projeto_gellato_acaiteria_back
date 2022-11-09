import app from './app.js';
import chalk from 'chalk';


const PORT: string = process.env.PORT || '4000';


app.listen(PORT, () => {
  console.log(chalk.cyan('Servidor rodando na porta ' + PORT));
});
