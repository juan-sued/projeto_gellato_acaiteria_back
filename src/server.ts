import app, { init } from './app';
import chalk from 'chalk';

const PORT: string = process.env.PORT || '4000';

init().then(() => {
  app.listen(PORT, () => {
    /* eslint-disable-next-line no-console */
    console.log(`Server is listening on port ${PORT}.`);
  });
});
