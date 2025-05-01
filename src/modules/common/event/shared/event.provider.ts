import { getKafkaConfig } from 'src/shared/config/kafka.config';
import { getRabbitMQConfig } from 'src/shared/config/rabbitmq.config';
import ENV from 'src/shared/env';

export const RABBITMQ_TOKEN = 'RABBITMQ_TOKEN';
export const KAFKA_TOKEN = 'KAFKA_TOKEN';

export const eventProviders = [
  {
    name: RABBITMQ_TOKEN,
    useFactory: () => getRabbitMQConfig(),
  },
];

if (!ENV.KAFKA.IS_CUSTOM_CLIENT) {
  eventProviders.push({
    name: KAFKA_TOKEN,
    useFactory: () => getKafkaConfig(),
  });
}
