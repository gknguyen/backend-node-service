import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/modules/app.module';

export async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
