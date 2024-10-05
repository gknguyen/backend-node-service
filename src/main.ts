import { bootstrap } from './shared/bootstrap';
import ENV from './shared/env';
import { getServerHostName } from './shared/utils';

bootstrap()
  .then(() => {
    console.info(`APIs available on ${getServerHostName()}${ENV.SERVICE.BASE_URL}`);
    console.info(`Docs available on ${getServerHostName()}${ENV.SERVICE.DOCS_URL}/`);
  })
  .catch((err) => {
    console.error(`Failed to start the service: ${err}`);
  });
