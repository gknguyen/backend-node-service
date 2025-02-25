import { Module } from '@nestjs/common';
import { PaymentGatewayModule } from './gateway/payment-gateway.module';

@Module({
  imports: [PaymentGatewayModule],
  controllers: [],
  providers: [],
})
export class PaymentModule {}
