import { Controller, Get } from '@nestjs/common';
import { HealthService } from '../services/health.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { HealthCheck, HealthCheckService } from '@nestjs/terminus';
import { pick } from 'lodash';

@ApiTags('Health')
@Controller({ path: 'health-check' })
@Controller()
export class HealthApiController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly healthService: HealthService,
  ) {}

  @Get()
  @ApiOperation({
    operationId: 'healthCheck',
    description: 'Get ping check health',
  })
  @HealthCheck()
  async healthCheck() {
    const result = await this.health.check([() => this.healthService.getHello()]);
    return pick(result, 'status', 'details');
  }
}
