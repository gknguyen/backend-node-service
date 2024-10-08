import { Module } from '@nestjs/common';
import { StripeApiController } from './stripe/controllers/stripe.api.controller';
import { StripeService } from './stripe/services/stripe.service';

@Module({
  imports: [],
  controllers: [StripeApiController],
  providers: [StripeService],
})
export class PaymentGatewayModule {}
