import { Inject, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { instanceToPlain } from 'class-transformer';
import { firstValueFrom } from 'rxjs';
import { logger } from 'src/shared/logger';
import { KafkaTopicEnum } from '../shared/event.const';
import { EmitMessageDto } from '../shared/event.dto';
import { IKafkaService } from '../shared/event.interface';
import { KAFKA_TOKEN } from '../shared/event.provider';

@Injectable()
export class BuiltinKafkaService implements IKafkaService, OnModuleInit, OnModuleDestroy {
  constructor(@Inject(KAFKA_TOKEN) private readonly kafkaClient: ClientKafka) {}

  onModuleInit() {
    this.kafkaClient.connect().then(() => {
      logger.info('Connected to Kafka');
    });
  }

  onModuleDestroy() {
    this.kafkaClient.close().then(() => {
      logger.info('Kafka connection closed');
    });
  }

  emitMessage(payload: EmitMessageDto) {
    return firstValueFrom(this.kafkaClient.emit(KafkaTopicEnum.Base, instanceToPlain(payload)));
  }
}
