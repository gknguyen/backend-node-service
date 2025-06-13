import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthApiController } from './controllers/health.api.controller';
import { AppHealthService } from './services/app-health.service';
import { CustomKafkaHealthService } from './services/custom-kafka-health.service';
import { KAFKA_HEALTH_SERVICE_TOKEN } from './shared/health.const';
import ENV from 'src/shared/env';
import { BuiltinKafkaHealthService } from './services/builtin-kafka-health.service';

@Module({
  imports: [TerminusModule],
  controllers: [HealthApiController],
  providers: [
    AppHealthService,
    {
      provide: KAFKA_HEALTH_SERVICE_TOKEN,
      useClass: ENV.KAFKA.IS_CUSTOM_CLIENT ? CustomKafkaHealthService : BuiltinKafkaHealthService,
    },
  ],
})
export class HealthModule {}
