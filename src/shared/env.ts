require('dotenv').config({ override: process.env.NODE_ENV !== 'test' });

import * as config from 'config';

const ENV = {
  SERVICE: {
    HOST: config.get<string>('service.host'),
    PORT: process.env.PORT || config.get<number>('service.port'),
    PROTOCOL: config.get<string>('service.protocol'),
    BASE_URL: config.get<string>('service.baseUrl'),
  },
};

export default ENV;
