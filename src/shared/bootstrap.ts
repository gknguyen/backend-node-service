import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { json, urlencoded } from 'express';
import * as httpContext from 'express-http-context';
import helmet from 'helmet';
import * as responseTime from 'response-time';
import { CustomExceptionFilter } from 'src/exception/exception.filter';
import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';
import { AppModule } from 'src/modules/app.module';
import { getKafkaConfig } from './config/kafka.config';
import { getRabbitMQConfig } from './config/rabbitmq.config';
import ENV from './env';
import { configureSwagger } from './swagger';

export function configureMiddlewares(app: INestApplication) {
  app.use(helmet());
  app.use(urlencoded({ extended: true }));
  app.use(json());
  app.use(httpContext.middleware);
  app.use(responseTime({ header: 'x-response-time' }));
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalFilters(new CustomExceptionFilter());
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
  app.connectMicroservice(getRabbitMQConfig(), { inheritAppConfig: true });
  if (!ENV.KAFKA.IS_CUSTOM_CLIENT)
    app.connectMicroservice(getKafkaConfig(), { inheritAppConfig: true });
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
