import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import { join } from 'path';
import ENV from './env';
import { INestApplication } from '@nestjs/common';
import { ACCESS_TOKEN, SERVICE_NAME, SERVICE_VERSION } from './const';
import { getServerHostName } from './utils';

export function getSwaggerDocument(app: INestApplication) {
  const name = ENV.SERVICE.NAME || SERVICE_NAME || 'Service';
  const description = ENV.SERVICE.DESCRIPTION || 'API specification for the service';

  const config = new DocumentBuilder()
    .setTitle(`${name} API spec`)
    .setDescription(`${description} | [swagger.json](swagger.json)`)
    .addBearerAuth({ name: ACCESS_TOKEN, type: 'apiKey', in: 'header' })
    .setVersion(SERVICE_VERSION)
    .addServer(getServerHostName())
    .build();

  return SwaggerModule.createDocument(app, config);
}

export function configureSwagger(app: INestApplication) {
  const document = getSwaggerDocument(app);

  SwaggerModule.setup(ENV.SERVICE.DOCS_URL, app, document, {
    swaggerOptions: {
      displayOperationId: true,
      customSiteTitle: ENV.SERVICE.NAME,
    },
  });

  const swaggerFilePath = join(__dirname, '../../swagger.json');
  fs.writeFileSync(swaggerFilePath, JSON.stringify(document, null, 2), {
    encoding: 'utf8',
  });

  const server = app.getHttpAdapter();
  server.get(`${ENV.SERVICE.DOCS_URL}/swagger.json`, (_, res) => {
    res.json(document);
  });
}
