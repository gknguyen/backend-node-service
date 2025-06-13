import { Inject, Injectable } from '@nestjs/common';
import { HealthIndicator } from '@nestjs/terminus';
import { HealthKey } from '../shared/health.const';
import { EVENT_SDK_ADMIN_TOKEN, IKafka } from 'src/packages/event-sdk';
import { IKafkaHealthService } from '../shared/health.interface';

@Injectable()
export class CustomKafkaHealthService extends HealthIndicator implements IKafkaHealthService {
  constructor(
    @Inject(EVENT_SDK_ADMIN_TOKEN) private readonly eventSdkAdmin: IKafka.IEventSdkAdmin,
  ) {
    super();
  }

  async check(key = HealthKey.Kafka) {
    try {
      await this.eventSdkAdmin.healthCheck();
      return this.getStatus(key, true, { message: 'Up and running' });
    } catch (error) {
      return this.getStatus(key, false, { message: error.toString() });
    }
  }
}
