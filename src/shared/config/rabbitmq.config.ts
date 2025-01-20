import { ClientProvider, Transport } from '@nestjs/microservices';
import ENV from '../env';

export function getRabbitMQConfig(): ClientProvider {
  return {
    transport: Transport.RMQ,
    options: {
      urls: [ENV.RABBITMQ.URI],
      queue: ENV.SERVICE.NAME,
      queueOptions: {
        durable: false,
      },
    },
  };
}
