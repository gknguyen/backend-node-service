import { ClientProvider, Transport } from '@nestjs/microservices';
import ENV from '../env';

export function getKafkaConfig(): ClientProvider {
  return {
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [ENV.KAFKA.BROKER],
      },
    },
  };
}
