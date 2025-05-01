import { Module } from '@nestjs/common';
import { DatabaseModule } from './common/database/database.module';
import { EventModule } from './common/event/event.module';
import { HealthModule } from './common/health/health.module';
import { AccountModule } from './domain/account/account.module';
import { AuthModule } from './domain/auth/auth.module';
import { PaymentModule } from './domain/payment/payment.module';
import { PubsubModule } from './domain/pubsub/pubsub.module';

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
export class AppModule {}
