import { bootstrap } from './shared/bootstrap';
import ENV from './shared/env';
import { logger } from './shared/logger';
import { getServerHostName } from './shared/utils';

bootstrap()
  .then(() => {
    logger.info(`APIs available on ${getServerHostName()}${ENV.SERVICE.BASE_URL}`);
    logger.info(`Docs available on ${getServerHostName()}${ENV.SERVICE.DOCS_URL}/`);
  })
  .catch((err) => {
    logger.error(`Failed to start the service`, err);
  });
