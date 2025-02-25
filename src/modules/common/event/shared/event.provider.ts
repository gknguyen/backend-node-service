import { getKafkaConfig } from 'src/shared/config/kafka.config';
import { getRabbitMQConfig } from 'src/shared/config/rabbitmq.config';

export const RABBITMQ_TOKEN = 'RABBITMQ_TOKEN';
export const KAFKA_TOKEN = 'KAFKA_TOKEN';
export const eventProviders = [
  {
    name: RABBITMQ_TOKEN,
    useFactory: () => getRabbitMQConfig(),
  },
  {
    name: KAFKA_TOKEN,
    useFactory: () => getKafkaConfig(),
  },
];
