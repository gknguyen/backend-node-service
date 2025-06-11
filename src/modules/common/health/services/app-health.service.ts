import { Injectable } from '@nestjs/common';
import { HealthIndicator } from '@nestjs/terminus';
import { HealthKey } from '../shared/const';

@Injectable()
export class AppHealthService extends HealthIndicator {
  constructor() {
    super();
  }

  getHello() {
    return this.getStatus(HealthKey.App, true, { checked: `Up and running` });
  }
}
