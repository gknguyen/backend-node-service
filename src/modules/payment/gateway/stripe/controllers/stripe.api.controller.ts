import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { StripeService } from '../services/stripe.service';
import { StripeAddCustomerCardInputDto, StripeChargeInputDto } from '../shared/stripe.dto';

@ApiTags('Payment Gateway - Stripe')
@Controller({ path: 'payment-gateway/user/stripe' })
export class StripeApiController {
  constructor(private readonly stripeService: StripeService) {}

  @Get('customers/:email')
  @ApiOperation({
    operationId: 'userGetStripeCustomer',
    summary: 'Get Stripe customer information by User.',
  })
  userGetStripeCustomer(@Param('email') email: string) {
    return this.stripeService.getCustomer(email);
  }

  @Post('customers/cards')
  @ApiOperation({
    operationId: 'userAddStripeCustomerCards',
    summary: 'Add card for Stripe Customer by User.',
  })
  @ApiBody({
    description: StripeAddCustomerCardInputDto.name,
    type: StripeAddCustomerCardInputDto,
  })
  userAddStripeCustomerCards(@Body() body: StripeAddCustomerCardInputDto) {
    return this.stripeService.addCustomerCard(body.email, body);
  }

  @Delete('customers/:email/cards/:id')
  @ApiOperation({
    operationId: 'userRemoveStripeCustomerCard',
    summary: 'Remove card for Stripe Customer by User.',
  })
  userRemoveStripeCustomerCard(@Param('email') email: string, @Param('id') cardId: string) {
    return this.stripeService.removeCustomerCard(email, cardId);
  }

  @Post('customers/:email/charge')
  @ApiOperation({
    operationId: 'userChargeStripeCustomer',
    summary: 'Charge transaction with Stripe gateway bu User.',
  })
  @ApiBody({
    description: StripeChargeInputDto.name,
    type: StripeChargeInputDto,
  })
  userChargeStripeCustomer(@Param('email') email: string, @Body() body: StripeChargeInputDto) {
    return this.stripeService.charge(email, body);
  }
}
