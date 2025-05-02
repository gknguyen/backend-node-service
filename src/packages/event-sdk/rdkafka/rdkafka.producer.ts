import { RdKafka } from '@confluentinc/kafka-javascript';
import { Inject, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { EVENT_SDK_OPTIONS } from '../shared/shared.const';
import { IEventSdkProducer, Logger } from '../shared/shared.type';
import { IEventSdkEmitEvent, IEventSdkOptions } from './rdkafka.type';

@Injectable()
export class RdKafkaProducer implements IEventSdkProducer, OnModuleInit, OnModuleDestroy {
  private readonly producer: RdKafka.Producer;
  private readonly logger: Logger;

  constructor(@Inject(EVENT_SDK_OPTIONS) private readonly options: IEventSdkOptions) {
    this.logger = this.options.logger.namespace(
      RdKafkaProducer.name,
      this.options.producer?.log_level,
    );

    this.producer = new RdKafka.Producer(
      { ...this.options.client, ...this.options.producer },
      this.options.producerTopic,
    );

    this.producer.on('event.log', (log) => {
      this.logger.debug(`${log.fac}: ${log.message}`);
    });
    this.producer.on('event.error', (err) => {
      this.logger.error(`Error:`, err);
    });
    this.producer.on('ready', () => {
      this.logger.info(`Connected to Kafka producer`);
    });
  }

  async onModuleInit() {
    this.producer.connect();
  }

  async onModuleDestroy() {
    this.producer.disconnect();
  }

  async emit<T>(payload: IEventSdkEmitEvent<T>) {
    return this.producer.produce(
      payload.topic,
      null,
      Buffer.from(JSON.stringify(payload.data)),
      payload.key,
      null,
      null,
      payload.headers,
    );
  }
}
