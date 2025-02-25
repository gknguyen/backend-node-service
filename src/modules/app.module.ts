import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { LoggerMiddleware } from 'src/middleware/logger.middleware';
import { DatabaseModule } from './common/database/database.module';
import { AccountModule } from './domain/account/account.module';
import { AuthModule } from './domain/auth/auth.module';
import { EventModule } from './event/event.module';
import { HealthModule } from './health/health.module';
import { PaymentModule } from './payment/payment.module';
import { PubsubModule } from './pubsub/pubsub.module';

@Module({
  imports: [
    HealthModule,
    PaymentModule,
    PubsubModule,
    EventModule,
    DatabaseModule,
    AuthModule,
    AccountModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
