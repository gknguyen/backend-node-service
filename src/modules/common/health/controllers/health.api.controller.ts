import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { HealthCheck, HealthCheckService } from '@nestjs/terminus';
import { pick } from 'lodash';
import { AppHealthService } from '../services/app-health.service';
import { KafkaHealthService } from '../services/kafka-health.service';

@ApiTags('Health')
@Controller({ path: 'api/health-check' })
@Controller()
export class HealthApiController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly app: AppHealthService,
    private readonly kafka: KafkaHealthService,
  ) {}

  @Get()
  @ApiOperation({
    operationId: 'healthCheck',
    description: 'Get ping check health',
  })
  @HealthCheck()
  async healthCheck() {
    const result = await this.health.check([() => this.app.getHello(), () => this.kafka.check()]);
    return pick(result, 'status', 'details');
  }
}
