import { createMock } from '@golevelup/ts-jest';
import Stripe from 'stripe';

export const mockStripeClient = createMock<Stripe>();
