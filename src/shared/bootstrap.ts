import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/modules/app.module';
import ENV from './env';
import { configureSwagger } from './swagger';

export async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(ENV.SERVICE.BASE_URL);
  configureSwagger(app);

  await app.listen(ENV.SERVICE.PORT);
}
