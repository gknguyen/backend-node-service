import { Test, TestingModule } from '@nestjs/testing';
import { HealthApiController } from './health.api.controller';
import { HealthService } from '../services/health.service';
import { TerminusModule } from '@nestjs/terminus';

describe('HealthApiController', () => {
  let module: TestingModule;
  let healthApiController: HealthApiController;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [TerminusModule],
      controllers: [HealthApiController],
      providers: [HealthService],
    }).compile();

    healthApiController = module.get(HealthApiController);
  });

  afterAll(async () => {
    await module.close();
  });

  it('should return service still online"', async () => {
    const result = await healthApiController.healthCheck();
    expect(result).toEqual({
      status: 'ok',
      details: {
        service: {
          status: 'up',
          checked: "I'm alive!",
        },
      },
    });
  });
});
