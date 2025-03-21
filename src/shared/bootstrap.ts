import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { json, urlencoded } from 'express';
import * as httpContext from 'express-http-context';
import helmet from 'helmet';
import * as responseTime from 'response-time';
import { HttpExceptionFilter } from 'src/exception/http-exception.filter';
import { AppModule } from 'src/modules/app.module';
import { getRabbitMQConfig } from './config/rabbitmq.config';
import ENV from './env';
import { configureSwagger } from './swagger';
import { getKafkaConfig } from './config/kafka.config';

export function configureMiddlewares(app: INestApplication) {
  app.use(helmet());
  app.use(urlencoded({ extended: true }));
  app.use(json());
  app.use(httpContext.middleware);
  app.use(responseTime({ header: 'x-response-time' }));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      errorHttpStatusCode: HttpStatus.BAD_REQUEST,
      validationError: {
        target: true,
        value: true,
      },
    }),
  );
}

export async function configureMicroservices(app: INestApplication) {
  app.connectMicroservice(getRabbitMQConfig());
  app.connectMicroservice(getKafkaConfig());
  await app.startAllMicroservices();
}

export async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  configureMiddlewares(app);
  app.setGlobalPrefix(ENV.SERVICE.BASE_URL);
  configureSwagger(app);
  await configureMicroservices(app);

  await app.listen(ENV.SERVICE.PORT);
}
