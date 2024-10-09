import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { StripeService } from '../services/stripe.service';
import { StripeAddCustomerCardInputDto, StripeChargeInputDto } from '../shared/stripe.dto';

@ApiTags('Payment Gateway - Stripe')
@Controller({ path: 'payment-gateway/stripe' })
export class StripeApiController {
  constructor(private readonly stripeService: StripeService) {}

  @Get('customers/:email')
  @ApiOperation({
    operationId: 'getStripeCustomer',
    summary: 'Get Stripe customer information by User.',
  })
  getStripeCustomer(@Param('email') email: string) {
    return this.stripeService.getCustomer(email);
  }

  @Post('customers/cards')
  @ApiOperation({
    operationId: 'addStripeCustomerCards',
    summary: 'Add card for Stripe Customer by User.',
  })
  @ApiBody({
    description: StripeAddCustomerCardInputDto.name,
    type: StripeAddCustomerCardInputDto,
  })
  addStripeCustomerCards(@Body() body: StripeAddCustomerCardInputDto) {
    return this.stripeService.addCustomerCard(body.email, body);
  }

  @Delete('customers/:email/cards/:id')
  @ApiOperation({
    operationId: 'removeStripeCustomerCard',
    summary: 'Remove card for Stripe Customer by User.',
  })
  removeStripeCustomerCard(@Param('email') email: string, @Param('id') cardId: string) {
    return this.stripeService.removeCustomerCard(email, cardId);
  }

  @Post('customers/:email/charge')
  @ApiOperation({
    operationId: 'chargeStripeCustomer',
    summary: 'Charge transaction with Stripe gateway bu User.',
  })
  @ApiBody({
    description: StripeChargeInputDto.name,
    type: StripeChargeInputDto,
  })
  chargeStripeCustomer(@Param('email') email: string, @Body() body: StripeChargeInputDto) {
    return this.stripeService.charge(email, body);
  }
}
