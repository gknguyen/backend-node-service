import { Inject, Module, OnModuleInit } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EventApiController } from './controllers/event.api.controller';
import { ClientRMQ, ClientsModule } from '@nestjs/microservices';
import { eventProviders, RABBITMQ_TOKEN } from './shared/event.provider';
import { logger } from 'src/shared/logger';

@Module({
  imports: [
    EventEmitterModule.forRoot() /** https://docs.nestjs.com/techniques/events */,
    ClientsModule.registerAsync(eventProviders) /** https://docs.nestjs.com/microservices/basics */,
  ],
  controllers: [EventApiController],
})
export class EventModule implements OnModuleInit {
  constructor(@Inject(RABBITMQ_TOKEN) private readonly rabbitmqClient: ClientRMQ) {}

  onModuleInit() {
    this.rabbitmqClient.connect().then(() => {
      logger.info('Connected to RabbitMQ');
    });
  }
}
