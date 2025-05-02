import { Global, Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ClientsModule } from '@nestjs/microservices';
import { EventSdkModule } from 'src/packages/event-sdk';
import { getKafkaCustomOptionsV2 } from 'src/shared/config/kafka.config';
import ENV from 'src/shared/env';
import { EventApiController } from './controllers/event.api.controller';
import { BuiltinKafkaService } from './services/builtin-kafka.service';
import { BuiltinRabbitMQService } from './services/builtin-rabbitmq.service';
import { CustomKafkaService } from './services/custom-kafka.service';
import { KAFKA_SERVICE_TOKEN, RABBITMQ_SERVICE_TOKEN } from './shared/event.const';
import { eventProviders } from './shared/event.provider';

const imports = [EventEmitterModule.forRoot()]; /** https://docs.nestjs.com/techniques/events */

if (!ENV.KAFKA.IS_CUSTOM_CLIENT || !ENV.RABBITMQ.IS_CUSTOM_CLIENT) {
  imports.push(
    ClientsModule.registerAsync(eventProviders),
  ); /** https://docs.nestjs.com/microservices/basics */
}

if (ENV.KAFKA.IS_CUSTOM_CLIENT) {
  // imports.push(EventSdkModule.forKafkajs(getKafkaCustomOptionsV1()));
  imports.push(EventSdkModule.forRdKafka(getKafkaCustomOptionsV2()));
}

@Global()
@Module({
  imports,
  controllers: [EventApiController],
  providers: [
    {
      provide: RABBITMQ_SERVICE_TOKEN,
      useClass: BuiltinRabbitMQService,
    },
    {
      provide: KAFKA_SERVICE_TOKEN,
      useClass: ENV.KAFKA.IS_CUSTOM_CLIENT ? CustomKafkaService : BuiltinKafkaService,
    },
  ],
})
export class EventModule {}
