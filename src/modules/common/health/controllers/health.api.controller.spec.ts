import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { HealthIndicatorResult, TerminusModule } from '@nestjs/terminus';
import { Test, TestingModule } from '@nestjs/testing';
import { AppHealthService } from '../services/app-health.service';
import { HealthKey, KAFKA_HEALTH_SERVICE_TOKEN } from '../shared/health.const';
import { IKafkaHealthService } from '../shared/health.interface';
import { HealthApiController } from './health.api.controller';

describe('HealthApiController', () => {
  let module: TestingModule;
  let healthApiController: HealthApiController;
  let mockKafkaHealthService: DeepMocked<IKafkaHealthService>;

  beforeAll(async () => {
    mockKafkaHealthService = createMock<IKafkaHealthService>();

    module = await Test.createTestingModule({
      imports: [TerminusModule],
      controllers: [HealthApiController],
      providers: [
        AppHealthService,
        {
          provide: KAFKA_HEALTH_SERVICE_TOKEN,
          useValue: mockKafkaHealthService,
        },
      ],
    })
      .overrideProvider(KAFKA_HEALTH_SERVICE_TOKEN)
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
