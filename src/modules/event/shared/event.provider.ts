import { getRabbitMQConfig } from 'src/shared/config/rabbitmq.config';

export const RABBITMQ_TOKEN = 'RABBITMQ_TOKEN';
export const eventProviders = [
  {
    name: RABBITMQ_TOKEN,
    useFactory: () => getRabbitMQConfig(),
  },
];
