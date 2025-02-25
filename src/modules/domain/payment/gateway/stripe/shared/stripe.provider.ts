import ENV from 'src/shared/env';
import Stripe from 'stripe';

export const STRIPE_TOKEN = 'STRIPE_TOKEN';
export const StripeProviders = [
  {
    provide: STRIPE_TOKEN,
    useFactory: () => new Stripe(ENV.PAYMENT_GATEWAY.STRIPE.SECRET_KEY),
  },
];
