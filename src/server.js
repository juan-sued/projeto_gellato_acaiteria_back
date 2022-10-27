const server = express();

server.use([express.json(), cors()]);

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(chalk.cyan('Servidor rodando na porta ' + PORT));
});
