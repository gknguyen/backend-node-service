import { Module } from '@nestjs/common';
import { StripeApiController } from './stripe/controllers/stripe.api.controller';
import { StripeService } from './stripe/services/stripe.service';
import { StripeProviders } from './stripe/shared/stripe.provider';

@Module({
  controllers: [StripeApiController],
  providers: [...StripeProviders, StripeService],
})
export class PaymentGatewayModule {}
