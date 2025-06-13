import { HealthIndicatorResult } from '@nestjs/terminus';
import { HealthKey } from './health.const';

export interface IKafkaHealthService {
  check(key?: HealthKey): Promise<HealthIndicatorResult>;
}
