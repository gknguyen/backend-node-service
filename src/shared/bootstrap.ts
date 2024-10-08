import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { json, urlencoded } from 'express';
import * as httpContext from 'express-http-context';
import helmet from 'helmet';
import * as responseTime from 'response-time';
import { AppModule } from 'src/modules/app.module';
import ENV from './env';
import { configureSwagger } from './swagger';

export function configureMiddlewares(app: INestApplication) {
  app.use(helmet());
  app.use(urlencoded({ extended: true }));
  app.use(json());
  app.use(httpContext.middleware);
  app.use(responseTime({ header: 'x-response-time' }));
  app.useGlobalPipes(new ValidationPipe());
}

export async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  configureMiddlewares(app);
  app.setGlobalPrefix(ENV.SERVICE.BASE_URL);
  configureSwagger(app);

  await app.listen(ENV.SERVICE.PORT);
}
