import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import Stripe from 'stripe';
import { CardBrandEnum, CurrencyEnum } from './stripe.const';
import { IUser } from './stripe.interface';

/** https://stripe.com/docs/testing?testing-method=card-numbers */
export class CardDetailDto {
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: 'string',
    default: '424242424242',
  })
  number: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: 'string',
    default: 'full name',
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: 'string',
    default: '09',
  })
  expiryMonth: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: 'string',
    default: '2025',
  })
  expiryYear: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: 'string',
    default: '123',
  })
  cvc: string;

  @IsNotEmpty()
  @IsIn(Object.values(CardBrandEnum))
  @ApiProperty({
    type: 'string',
    enum: CardBrandEnum,
    default: CardBrandEnum.Visa,
  })
  brand: CardBrandEnum;
}

export class TransactionDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    type: 'number',
    default: 10000,
  })
  amount: number;

  @IsNotEmpty()
  @IsIn(Object.values(CurrencyEnum))
  @ApiProperty({
    type: 'string',
    enum: CurrencyEnum,
    default: CurrencyEnum.VND,
  })
  currency: CurrencyEnum;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    type: 'string',
    default: 'Monthly Subscription',
  })
  description?: string;
}

export class StripeChargeInputDto extends TransactionDto {}

export class StripeAddCustomerCardInputDto extends CardDetailDto {}

export class StripeAddCustomerInputDto implements IUser {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
  })
  id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
  })
  accountId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
  })
  email: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    type: 'string',
  })
  fullName?: string;
}

export class StripeCustomerResponseDto implements Stripe.Customer {
  id: string;
  object: 'customer';
  balance: number;
  created: number;
  // eslint-disable-next-line @typescript-eslint/naming-convention, camelcase
  default_source: string | Stripe.CustomerSource | null;
  description: string | null;
  email: string | null;
  // eslint-disable-next-line @typescript-eslint/naming-convention, camelcase
  invoice_settings: Stripe.Customer.InvoiceSettings;
  livemode: boolean;
  metadata: Stripe.Metadata;
  shipping: Stripe.Customer.Shipping | null;
}
