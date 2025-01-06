import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/modules/app.module';
import { STRIPE_TOKEN } from 'src/modules/payment/gateway/stripe/shared/stripe.provider';
import { configureMiddlewares } from 'src/shared/bootstrap';
import { configureSwagger } from 'src/shared/swagger';
import { mockStripeClient } from './mock';

beforeAll(async () => {
  const module = await Test.createTestingModule({
    imports: [AppModule],
  })
    .overrideProvider(STRIPE_TOKEN)
    .useValue(mockStripeClient)
    .compile();

  const app = module.createNestApplication();
  configureMiddlewares(app);
  configureSwagger(app);
  await app.init();

  (global as any).__MODULE = module;
  (global as any).__APP = app;
});

afterAll(async () => {
  const module: TestingModule = (global as any).__MODULE;
  await module.close();
});
