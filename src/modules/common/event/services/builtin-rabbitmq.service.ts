import { Inject, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ClientRMQ } from '@nestjs/microservices';
import { instanceToPlain } from 'class-transformer';
import { firstValueFrom } from 'rxjs';
import { logger } from 'src/shared/logger';
import { RabbitPatternEnum } from '../shared/event.const';
import { EmitMessageDto } from '../shared/event.dto';
import { IRabbitMQService } from '../shared/event.interface';
import { RABBITMQ_TOKEN } from '../shared/event.provider';

@Injectable()
export class BuiltinRabbitMQService implements IRabbitMQService, OnModuleInit, OnModuleDestroy {
  constructor(@Inject(RABBITMQ_TOKEN) private readonly rabbitmqClient: ClientRMQ) {}

  onModuleInit() {
    this.rabbitmqClient.connect().then(() => {
      logger.info('Connected to RabbitMQ');
    });
  }

  onModuleDestroy() {
    this.rabbitmqClient.close();
    logger.info('RabbitMQ connection closed');
  }

  emitMessage(payload: EmitMessageDto) {
    return firstValueFrom(
      this.rabbitmqClient.emit(RabbitPatternEnum.Base, instanceToPlain(payload)),
    );
  }
}
