import app from './app.js';
import chalk from 'chalk';
var PORT = process.env.PORT || '4000';
app.listen(PORT, function () {
    console.log(chalk.cyan('Servidor rodando na porta ' + PORT));
});
