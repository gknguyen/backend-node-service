import { Injectable } from '@nestjs/common';
import { HealthIndicator } from '@nestjs/terminus';
import { HealthKey } from '../shared/const';

@Injectable()
export class HealthService extends HealthIndicator {
  constructor() {
    super();
  }

  getHello() {
    return this.getStatus(HealthKey.Service, true, { checked: `I'm alive!` });
  }
}
