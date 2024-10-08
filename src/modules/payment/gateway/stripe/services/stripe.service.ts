import { BadRequestException, Injectable } from '@nestjs/common';
import { ERRORS } from 'src/exception/const';
import ENV from 'src/shared/env';
import Stripe from 'stripe';
import { MOCK_CARD_TOKEN_MAPPING } from '../shared/stripe.const';
import { CardDetailDto, TransactionDto } from '../shared/stripe.dto';
import { IUser } from '../shared/stripe.interface';

@Injectable()
export class StripeService {
  private readonly stripe = new Stripe(ENV.PAYMENT_GATEWAY.STRIPE.SECRET_KEY);

  async getCardToken(card: CardDetailDto) {
    /** https://stripe.com/docs/testing?testing-method=tokens#visa */
    if (ENV.PAYMENT_GATEWAY.STRIPE.TEST_MODE) return MOCK_CARD_TOKEN_MAPPING[card.brand];

    const cardToken = await this.stripe.tokens.create({
      card: {
        number: card.number,
        name: card.name,
        cvc: card.cvc,
        // eslint-disable-next-line @typescript-eslint/naming-convention, camelcase
        exp_month: card.expiryMonth,
        // eslint-disable-next-line @typescript-eslint/naming-convention, camelcase
        exp_year: card.expiryYear,
      },
    });

    return cardToken.id;
  }

  async getCustomerByEmail(email: string): Promise<Stripe.Customer | undefined> {
    const {
      data: [customer],
    } = await this.stripe.customers.search({
      query: `email:"${email}"`,
    });

    return customer;
  }

  async getCustomer(email: string) {
    const customer = await this.getCustomerByEmail(email);

    if (!customer) {
      throw new BadRequestException(ERRORS.CUSTOMER_NOT_FOUND);
    }

    const paymentMethods = await this.stripe.customers.listPaymentMethods(customer.id);

    return { ...customer, cards: paymentMethods.data };
  }

  async getOrAddCustomer(user: IUser) {
    let customer = await this.getCustomerByEmail(user.email);

    let isNew = false;
    if (!customer) {
      customer = await this.stripe.customers.create({
        email: user.email,
        name: user.fullName,
        metadata: {
          id: user.id,
        },
      });
      isNew = true;
    }

    return { ...customer, isNew };
  }

  async addCustomerCard(email: string, card: CardDetailDto) {
    const customer = await this.getCustomer(email);

    const cardToken = await this.getCardToken(card);

    return this.stripe.customers.createSource(customer.id, {
      source: cardToken,
    });
  }

  async removeCustomerCard(email: string, cardId: string) {
    const customer = await this.getCustomer(email);

    if (!customer.cards.find((card) => card.id === cardId)) {
      throw new BadRequestException(ERRORS.CUSTOMER_CARD_NOT_FOUND);
    }

    return this.stripe.customers.deleteSource(customer.id, cardId);
  }

  async charge(email: string, transaction: TransactionDto) {
    const customer = await this.getCustomer(email);

    const charge = await this.stripe.charges.create({
      customer: customer.id,
      amount: transaction.amount,
      currency: transaction.currency,
      description: transaction.description,
    });

    return charge;
  }

  async updateCustomer(user: IUser) {
    const customer = await this.getCustomerByEmail(user.email);
    if (!customer) {
      throw new BadRequestException(ERRORS.CUSTOMER_NOT_FOUND);
    }

    return this.stripe.customers.update(customer.id, {
      email: user.email,
      name: user.fullName,
      metadata: {
        id: user.id,
      },
    });
  }

  async removeCustomerByEmail(email: string) {
    const customer = await this.getCustomerByEmail(email);
    if (!customer) {
      throw new BadRequestException(ERRORS.CUSTOMER_NOT_FOUND);
    }

    return this.stripe.customers.del(customer.id);
  }
}
