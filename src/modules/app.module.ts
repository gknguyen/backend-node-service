import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { LoggerMiddleware } from 'src/middleware/logger.middleware';
import { EventModule } from './event/event.module';
import { HealthModule } from './health/health.module';
import { PaymentModule } from './payment/payment.module';
import { PubsubModule } from './pubsub/pubsub.module';

@Module({
  imports: [HealthModule, PaymentModule, PubsubModule, EventModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
