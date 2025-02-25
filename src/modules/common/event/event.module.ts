import { Global, Inject, Module, OnModuleInit } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ClientKafka, ClientRMQ, ClientsModule } from '@nestjs/microservices';
import { logger } from 'src/shared/logger';
import { EventApiController } from './controllers/event.api.controller';
import { eventProviders, KAFKA_TOKEN, RABBITMQ_TOKEN } from './shared/event.provider';

@Global()
@Module({
  imports: [
    EventEmitterModule.forRoot() /** https://docs.nestjs.com/techniques/events */,
    ClientsModule.registerAsync(eventProviders) /** https://docs.nestjs.com/microservices/basics */,
  ],
  controllers: [EventApiController],
})
export class EventModule implements OnModuleInit {
  constructor(
    @Inject(RABBITMQ_TOKEN) private readonly rabbitmqClient: ClientRMQ,
    @Inject(KAFKA_TOKEN) private readonly kafkaClient: ClientKafka,
  ) {}

  onModuleInit() {
    this.rabbitmqClient.connect().then(() => {
      logger.info('Connected to RabbitMQ');
    });
    this.kafkaClient.connect().then(() => {
      logger.info('Connected to Kafka');
    });
  }
}
