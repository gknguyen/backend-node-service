import { Module } from '@nestjs/common';
import { HealthService } from './services/health.service';
import { HealthApiController } from './controllers/health.api.controller';
import { TerminusModule } from '@nestjs/terminus';

@Module({
  imports: [TerminusModule],
  controllers: [HealthApiController],
  providers: [HealthService],
})
export class HealthModule {}
