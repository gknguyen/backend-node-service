import { Injectable } from '@nestjs/common';
import { KafkaOptions, Transport } from '@nestjs/microservices';
import {
  HealthIndicator,
  HealthIndicatorResult,
  MicroserviceHealthIndicator,
} from '@nestjs/terminus';
import { getKafkaOptions } from 'src/shared/config/kafka.config';
import { HealthKey } from '../shared/health.const';
import { IKafkaHealthService } from '../shared/health.interface';

@Injectable()
export class BuiltinKafkaHealthService extends HealthIndicator implements IKafkaHealthService {
  constructor(private readonly microservice: MicroserviceHealthIndicator) {
    super();
  }

  async check(key = HealthKey.Kafka): Promise<HealthIndicatorResult> {
    return this.microservice.pingCheck<KafkaOptions>(key, {
      transport: Transport.KAFKA,
      options: {
        client: getKafkaOptions().client,
        producerOnlyMode: true,
      },
    });
  }
}
