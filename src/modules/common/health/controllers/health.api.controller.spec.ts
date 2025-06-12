import { Test, TestingModule } from '@nestjs/testing';
import { HealthApiController } from './health.api.controller';
import { AppHealthService } from '../services/app-health.service';
import { HealthIndicatorResult, TerminusModule } from '@nestjs/terminus';
import { KafkaHealthService } from '../services/kafka-health.service';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { HealthKey } from '../shared/const';

describe('HealthApiController', () => {
  let module: TestingModule;
  let healthApiController: HealthApiController;
  let mockKafkaHealthService: DeepMocked<KafkaHealthService>;

  beforeAll(async () => {
    mockKafkaHealthService = createMock<KafkaHealthService>();

    module = await Test.createTestingModule({
      imports: [TerminusModule],
      controllers: [HealthApiController],
      providers: [AppHealthService, KafkaHealthService],
    })
      .overrideProvider(KafkaHealthService)
      .useValue(mockKafkaHealthService)
      .compile();

    healthApiController = module.get(HealthApiController);
  });

  afterAll(async () => {
    await module.close();
  });

  it('should return service still online"', async () => {
    const appCheckStatus = {
      [HealthKey.App]: { status: 'up', checked: 'Up and running' },
    } as HealthIndicatorResult;
    const kafkaCheckStatus = {
      [HealthKey.Kafka]: { status: 'up', checked: 'Up and running' },
    } as HealthIndicatorResult;
    const res = {
      status: 'ok',
      details: {
        ...appCheckStatus,
        ...kafkaCheckStatus,
      },
    };
    mockKafkaHealthService.check.mockResolvedValue(kafkaCheckStatus);

    const result = await healthApiController.healthCheck();

    expect(result).toEqual(res);
  });
});
