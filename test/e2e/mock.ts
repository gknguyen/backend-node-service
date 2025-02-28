import { createMock } from '@golevelup/ts-jest';
import Stripe from 'stripe';

export const mockStripeClient = createMock<Stripe>();

export const mockRabbitMQClient = {
  connect: jest.fn().mockResolvedValue(true),
  emit: jest.fn(),
};

export const mockKafkaClient = {
  connect: jest.fn().mockResolvedValue(true),
  emit: jest.fn(),
};

export const mockDataSource = {
  initialize: jest.fn().mockResolvedValue(true),
  getRepository: jest.fn(),
};
