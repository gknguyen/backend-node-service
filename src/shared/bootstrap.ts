import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/modules/app.module';
import ENV from './env';

export async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(ENV.SERVICE.PORT);
}
