import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthApiController } from './controllers/health.api.controller';
import { AppHealthService } from './services/app-health.service';
import { KafkaHealthService } from './services/kafka-health.service';

@Module({
  imports: [TerminusModule],
  controllers: [HealthApiController],
  providers: [AppHealthService, KafkaHealthService],
})
export class HealthModule {}
