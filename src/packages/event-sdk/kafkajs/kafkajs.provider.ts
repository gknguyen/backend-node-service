import { KafkaJS } from '@confluentinc/kafka-javascript';
import { IEventSdkOptions } from './kafkajs.type';

export const EVENT_SDK_KAFKAJS_TOKEN = 'EVENT_SDK_KAFKAJS_TOKEN';

export function getKafkaJsProvider(options: IEventSdkOptions) {
  return {
    provide: EVENT_SDK_KAFKAJS_TOKEN,
    useFactory: async () => {
      return new KafkaJS.Kafka({
        kafkaJS: options.client,
      });
    },
  };
}
